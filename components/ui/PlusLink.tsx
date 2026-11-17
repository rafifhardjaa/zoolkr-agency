import Link from 'next/link'
import React from 'react'

export interface PlusLinkProps {
  href: string
  label: string
  className?: string
  plusClassName?: string
}

function isExternal(href: string): boolean {
  return /^(?:https?:|mailto:|tel:)/.test(href)
}

export function PlusLink({
  href,
  label,
  className,
  plusClassName,
}: PlusLinkProps): React.JSX.Element {
  const content = (
    <>
      <span>{label}</span>
      <span className={plusClassName} aria-hidden="true">
        +
      </span>
    </>
  )

  if (isExternal(href)) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    )
  }

  return (
    <Link className={className} href={href}>
      {content}
    </Link>
  )
}
