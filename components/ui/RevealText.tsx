'use client'

import React from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type RevealVariant = 'up' | 'mask' | 'media'

export interface RevealTextProps {
  children: React.ReactNode
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span' | 'article' | 'a'
  className?: string
  delay?: number
  href?: string
  /** Reveals direct children one after another inside the observed wrapper. */
  stagger?: boolean
  variant?: RevealVariant
}

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: 'reveal',
  mask: 'reveal-mask',
  media: 'reveal-media',
}

export function RevealText({
  children,
  as = 'div',
  className = '',
  delay,
  href,
  stagger = false,
  variant = 'up',
}: RevealTextProps): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion()
  // The hook writes 0–1 progress to --reveal-p; CSS maps that to the visual
  // state, so entering and leaving both track the scroll position live.
  const ref = useScrollReveal<HTMLElement>({
    delay,
    enabled: !prefersReducedMotion,
  })

  const base = stagger ? '' : VARIANT_CLASS[variant]
  const revealClasses = [base, stagger ? 'reveal-stagger' : '', className]
    .filter(Boolean)
    .join(' ')

  // Mask reveal needs one inner element to slide behind the clipped edge.
  const child = variant === 'mask' ? <span className="reveal-mask-inner">{children}</span> : children

  const props = { ref, className: revealClasses } as Record<string, unknown>
  if (as === 'a' && href) props.href = href

  return React.createElement(as, props, child)
}
