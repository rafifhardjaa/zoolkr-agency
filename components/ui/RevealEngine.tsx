'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { clearReveals, refreshReveals, registerReveal } from '@/lib/revealStore'

export function RevealEngine(): null {
  const reducedMotion = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reducedMotion) {
      clearReveals()
      return
    }

    const root = document.getElementById('main')
    const registry = new Map<HTMLElement, () => void>()
    let scanId = 0
    let cancelled = false

    const scan = () => {
      if (!root) return

      registry.forEach((remove, el) => {
        if (!el.isConnected) {
          remove()
          registry.delete(el)
        }
      })

      root.querySelectorAll<HTMLElement>('[data-reveal-el]').forEach((el) => {
        if (registry.has(el) || !el.isConnected) return
        const delay = Number(el.dataset.delay ?? 0)
        registry.set(el, registerReveal(el, Number.isFinite(delay) ? delay : 0))
      })
    }

    const scheduleScan = () => {
      if (scanId) return
      scanId = window.requestAnimationFrame(() => {
        scanId = 0
        scan()
      })
    }

    scan()

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!cancelled) refreshReveals()
      })
    }

    const observer = new MutationObserver(scheduleScan)
    if (root) observer.observe(root, { childList: true, subtree: true })

    return () => {
      cancelled = true
      observer.disconnect()
      if (scanId) window.cancelAnimationFrame(scanId)
      registry.forEach((remove) => remove())
      registry.clear()
    }
  }, [reducedMotion, pathname])

  return null
}
