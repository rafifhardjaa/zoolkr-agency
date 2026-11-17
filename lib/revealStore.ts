import {
  onLayoutChange,
  readScrollState,
  requestFrame,
  subscribeScroll,
} from '@/lib/scrollFeed'
import type { ScrollState } from '@/lib/scrollFeed'

/**
 * Scroll-linked reveal.
 *
 * Offsets live in document coordinates and are refreshed only on layout
 * changes, so the shared frame loop never reads layout while scrolling.
 * Each entry writes 0-1 progress to `--reveal-p`; CSS derives opacity,
 * transform and clip from it, so reveals settle and un-settle with the
 * scroll position in both directions.
 */

const START = 0.92 // viewport fraction (from the top) where a reveal begins
const RANGE = 0.34 // viewport fraction the element travels to finish
const SMOOTH = 0.18 // per-frame approach, keeps fast momentum scroll smooth
const MAX_SHIFT = 0.45 // caps the delay offset so late items still finish
const EPSILON = 0.0005

interface Entry {
  el: HTMLElement
  shift: number
  top: number
  height: number
  progress: number
  written: number
  initialized: boolean
}

const entries = new Set<Entry>()

let unsubscribeFrame: (() => void) | null = null
let unsubscribeLayout: (() => void) | null = null

function measure(entry: Entry, state: ScrollState): number {
  const top = entry.top - state.y
  const bottom = top + entry.height

  // Already scrolled past: settled. Far below the fold: still hidden.
  if (bottom <= 0) return 1
  // At the end of the page nothing can travel further, so visible content is
  // settled rather than stuck half-revealed.
  if (state.atBottom && top < state.viewport) return 1
  if (top > state.viewport * (START + RANGE)) return 0

  const raw = (state.viewport * START - top) / (state.viewport * RANGE)
  const clamped = raw < 0 ? 0 : raw > 1 ? 1 : raw
  if (entry.shift <= 0) return clamped

  const shifted = (clamped - entry.shift) / (1 - entry.shift)
  return shifted < 0 ? 0 : shifted > 1 ? 1 : shifted
}

function write(entry: Entry): void {
  if (Math.abs(entry.progress - entry.written) <= EPSILON) return
  entry.written = entry.progress
  entry.el.style.setProperty('--reveal-p', entry.progress.toFixed(4))
}

function frame(state: ScrollState): boolean {
  let animating = false

  for (const entry of Array.from(entries)) {
    if (!entry.el.isConnected) {
      entries.delete(entry)
      continue
    }

    const target = measure(entry, state)

    if (!entry.initialized) {
      entry.initialized = true
      entry.progress = target
    } else if (Math.abs(target - entry.progress) > EPSILON) {
      entry.progress += (target - entry.progress) * SMOOTH
      animating = true
    } else {
      entry.progress = target
    }

    write(entry)
  }

  return animating
}

function ensureSubscriptions(): void {
  if (!unsubscribeFrame) unsubscribeFrame = subscribeScroll(frame)
  if (!unsubscribeLayout) unsubscribeLayout = onLayoutChange(refreshReveals)
}

export function registerReveal(el: HTMLElement, delay: number): () => void {
  // No attribute is on the element yet, so this rect is transform-free.
  const rect = el.getBoundingClientRect()
  const entry: Entry = {
    el,
    shift: Math.min(MAX_SHIFT, Math.max(0, delay) / 1000),
    top: rect.top + window.scrollY,
    height: rect.height,
    progress: 0,
    written: Number.NaN,
    initialized: true,
  }

  entry.progress = measure(entry, readScrollState())
  el.setAttribute('data-reveal', 'on')
  write(entry)

  entries.add(entry)
  ensureSubscriptions()
  requestFrame()

  return () => {
    entries.delete(entry)
    el.removeAttribute('data-reveal')
    el.style.removeProperty('--reveal-p')
  }
}

export function refreshReveals(): void {
  const live = Array.from(entries).filter((entry) => entry.el.isConnected)
  if (live.length === 0) return

  // Neutralise transforms instead of stripping the attribute: reveal-mask
  // padding is layout-affecting, so removing the attribute moves everything
  // below it and the cached offsets drift.
  const root = document.documentElement
  root.classList.add('reveal-measuring')

  try {
    for (const entry of live) {
      const rect = entry.el.getBoundingClientRect()
      entry.top = rect.top + window.scrollY
      entry.height = rect.height
    }
  } finally {
    root.classList.remove('reveal-measuring')
  }

  requestFrame()
}

export function clearReveals(): void {
  for (const entry of entries) {
    entry.el.removeAttribute('data-reveal')
    entry.el.style.removeProperty('--reveal-p')
  }

  entries.clear()

  unsubscribeFrame?.()
  unsubscribeLayout?.()
  unsubscribeFrame = null
  unsubscribeLayout = null
}
