import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const listeners = new Set<() => void>()

let query: MediaQueryList | null = null
let listening = false

function getQuery(): MediaQueryList | null {
  if (typeof window === 'undefined') return null
  if (!query) query = window.matchMedia(QUERY)
  return query
}

function getSnapshot(): boolean {
  return getQuery()?.matches ?? false
}

function getServerSnapshot(): boolean {
  return false
}

function subscribe(listener: () => void): () => void {
  const mediaQuery = getQuery()
  if (!mediaQuery) return () => {}

  listeners.add(listener)

  // One shared matchMedia for the whole app; the listener lives for the session.
  if (!listening) {
    listening = true
    mediaQuery.addEventListener('change', () => {
      for (const notify of Array.from(listeners)) notify()
    })
  }

  return () => {
    listeners.delete(listener)
  }
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
