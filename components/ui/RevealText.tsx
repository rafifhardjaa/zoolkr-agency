'use client'

import React from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export interface RevealTextProps {
  children: React.ReactNode
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span'
  className?: string
  delay?: number
}

export function RevealText({
  children,
  as = 'div',
  className = '',
  delay,
}: RevealTextProps): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  const revealClasses = prefersReducedMotion
    ? className
    : `reveal${isVisible ? ' is-visible' : ''}${className ? ' ' + className : ''}`

  const style =
    !prefersReducedMotion && typeof delay === 'number'
      ? { transitionDelay: delay + 'ms' }
      : undefined

  return React.createElement(as, { ref, className: revealClasses, style }, children)
}
