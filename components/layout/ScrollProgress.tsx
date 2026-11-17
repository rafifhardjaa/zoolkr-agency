'use client'

import { useEffect, useRef } from 'react'
import { subscribeScroll } from '@/lib/scrollFeed'

export function ScrollProgress(): React.JSX.Element {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(
    () =>
      subscribeScroll((state) => {
        const bar = barRef.current
        if (!bar) return
        bar.style.transform = 'scaleX(' + state.progress + ')'
      }),
    []
  )

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}
