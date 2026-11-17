import React from 'react'

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

/**
 * Marks an element for `RevealEngine`. The engine writes 0-1 progress to
 * `--reveal-p` and CSS maps that to the visual state, so this stays a server
 * component and the markup carries the registration.
 */
export function RevealText({
  children,
  as = 'div',
  className = '',
  delay,
  href,
  stagger = false,
  variant = 'up',
}: RevealTextProps): React.JSX.Element {
  const base = stagger ? '' : VARIANT_CLASS[variant]
  const revealClasses = [base, stagger ? 'reveal-stagger' : '', className]
    .filter(Boolean)
    .join(' ')

  // Mask reveal needs one inner element to slide behind the clipped edge.
  const child = variant === 'mask' ? <span className="reveal-mask-inner">{children}</span> : children

  const props: Record<string, unknown> = {
    className: revealClasses,
    'data-reveal-el': '',
  }
  if (delay !== undefined) props['data-delay'] = delay
  if (as === 'a' && href) props.href = href

  return React.createElement(as, props, child)
}
