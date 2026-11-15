'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress(): React.JSX.Element {
  const progress = Math.min(1, Math.max(0, useScrollProgress()))

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: 'scaleX(' + progress + ')' }} />
    </div>
  )
}
