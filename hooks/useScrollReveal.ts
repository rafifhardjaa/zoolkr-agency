import { useEffect, useRef } from 'react'

/**
 * Scroll-linked reveal.
 *
 * One shared rAF loop measures every registered element and writes its reveal
 * progress (0–1) to `--reveal-p`. CSS derives opacity, transform and clip from
 * that value, so elements settle as they enter and un-settle as they leave —
 * both directions track the scroll position in real time instead of snapping
 * on a fixed-duration transition.
 */

const START = 0.92 // viewport fraction (from the top) where a reveal begins
const RANGE = 0.34 // viewport fraction the element travels to finish
const SMOOTH = 0.18 // per-frame approach, keeps fast momentum scroll smooth
const MAX_SHIFT = 0.45 // caps the delay offset so late items still finish

interface Entry {
  el: HTMLElement
  shift: number
  progress: number
  initialized: boolean
}

const entries = new Set<Entry>()
let frameId = 0
let listening = false

function isAtBottom(viewport: number): boolean {
  return window.scrollY + viewport >= document.documentElement.scrollHeight - 2
}

function measure(entry: Entry, viewport: number, atBottom: boolean): number {
  const rect = entry.el.getBoundingClientRect()

  // Already scrolled past: settled. Far below the fold: still hidden.
  if (rect.bottom <= 0) return 1
  // At the end of the page nothing can travel further, so visible content is
  // settled rather than stuck half-revealed.
  if (atBottom && rect.top < viewport) return 1
  if (rect.top > viewport * (START + RANGE)) return 0

  const raw = (viewport * START - rect.top) / (viewport * RANGE)
  const clamped = raw < 0 ? 0 : raw > 1 ? 1 : raw
  if (entry.shift <= 0) return clamped

  const shifted = (clamped - entry.shift) / (1 - entry.shift)
  return shifted < 0 ? 0 : shifted > 1 ? 1 : shifted
}

function tick(): void {
  frameId = 0
  if (entries.size === 0) return

  const viewport = window.innerHeight
  const atBottom = isAtBottom(viewport)

  const list = Array.from(entries)
  const targets = list.map((entry) => measure(entry, viewport, atBottom))
  let animating = false

  list.forEach((entry, index) => {
    const target = targets[index]

    if (!entry.initialized) {
      entry.initialized = true
      entry.progress = target
    } else if (Math.abs(target - entry.progress) > 0.0005) {
      entry.progress += (target - entry.progress) * SMOOTH
      animating = true
    } else {
      entry.progress = target
    }

    entry.el.style.setProperty('--reveal-p', entry.progress.toFixed(4))
  })

  if (animating) schedule()
}

function schedule(): void {
  if (frameId || typeof window === 'undefined') return
  frameId = window.requestAnimationFrame(tick)
}

function register(el: HTMLElement, delay: number): () => void {
  const viewport = window.innerHeight
  const entry: Entry = {
    el,
    shift: Math.min(MAX_SHIFT, Math.max(0, delay) / 1000),
    progress: 0,
    initialized: false,
  }

  if (!listening) {
    listening = true
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  }

  // Resolve the first value synchronously so nothing flashes hidden on mount.
  entry.progress = measure(entry, viewport, isAtBottom(viewport))
  entry.initialized = true
  el.setAttribute('data-reveal', 'on')
  el.style.setProperty('--reveal-p', entry.progress.toFixed(4))

  entries.add(entry)
  schedule()

  return () => {
    entries.delete(entry)
    el.removeAttribute('data-reveal')
    el.style.removeProperty('--reveal-p')
  }
}

export function useScrollReveal<T extends HTMLElement>(options?: {
  delay?: number
  enabled?: boolean
}): React.RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const delay = options?.delay ?? 0
  const enabled = options?.enabled !== false

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return
    return register(element, delay)
  }, [delay, enabled])

  return ref
}
