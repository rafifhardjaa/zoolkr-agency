'use client'

import { useEffect, useRef } from 'react'

const TEXT_SELECTOR =
  'h1,h2,h3,h4,h5,h6,p,a,button,li,em,strong,blockquote,figcaption,label,summary,time'

export function CursorFollower() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ring = ringRef.current
    if (!ring) return

    let visible = false

    const onMove = (event: MouseEvent) => {
      if (!visible) {
        visible = true
        ring.dataset.active = 'true'
      }

      ring.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`

      const element = document.elementFromPoint(event.clientX, event.clientY)
      ring.classList.toggle('is-over-text', !!element?.closest(TEXT_SELECTOR))
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
}
