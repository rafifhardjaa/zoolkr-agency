'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const MAX_OFFSET = 6

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [pointerFine, setPointerFine] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    const update = () => setPointerFine(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const active = pointerFine && !reducedMotion

  const handleMove = (event: MouseEvent<HTMLSpanElement>) => {
    const element = ref.current
    if (!element || !active) return
    const rect = element.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    element.style.transform = `translate(${(dx * MAX_OFFSET).toFixed(2)}px, ${(
      dy * MAX_OFFSET
    ).toFixed(2)}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <span
      ref={ref}
      className="magnetic"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  )
}
