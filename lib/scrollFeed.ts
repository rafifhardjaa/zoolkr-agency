export interface ScrollState {
  y: number
  viewport: number
  max: number
  progress: number
  atBottom: boolean
}

export type ScrollFrame = (state: ScrollState) => boolean | void

const subscribers = new Set<ScrollFrame>()
const layoutListeners = new Set<() => void>()

let frameId = 0
let installed = false

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

export function readScrollState(): ScrollState {
  const y = window.scrollY
  const viewport = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight
  const max = scrollHeight - viewport

  return {
    y,
    viewport,
    max,
    progress: max > 0 ? clamp01(y / max) : 0,
    atBottom: y + viewport >= scrollHeight - 2,
  }
}

function tick(): void {
  frameId = 0
  if (subscribers.size === 0) return

  const state = readScrollState()
  let animating = false

  // Snapshot: a subscriber may unsubscribe while the loop runs.
  for (const subscriber of Array.from(subscribers)) {
    if (subscriber(state) === true) animating = true
  }

  if (animating) schedule()
}

function schedule(): void {
  if (frameId || typeof window === 'undefined') return
  frameId = window.requestAnimationFrame(tick)
}

function notifyLayout(): void {
  for (const listener of Array.from(layoutListeners)) listener()
}

function handleResize(): void {
  notifyLayout()
  schedule()
}

function install(): void {
  if (installed || typeof window === 'undefined') return
  installed = true

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', handleResize)

  if (typeof ResizeObserver !== 'undefined') {
    // Accordions and late content change page height without a resize event,
    // and every cached reveal offset below them goes stale.
    new ResizeObserver(handleResize).observe(document.documentElement)
  }
}

export function requestFrame(): void {
  schedule()
}

export function subscribeScroll(frame: ScrollFrame): () => void {
  install()
  subscribers.add(frame)
  // Resolve the first value in the same task so nothing paints in a stale state.
  frame(readScrollState())
  schedule()

  return () => {
    subscribers.delete(frame)
  }
}

export function onLayoutChange(listener: () => void): () => void {
  install()
  layoutListeners.add(listener)

  return () => {
    layoutListeners.delete(listener)
  }
}
