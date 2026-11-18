'use client'

import { RevealText } from '@/components/ui/RevealText'

interface SectionMetaProps {
  label: string
  subtitle?: string
  /** Hangs the section number as an oversized outline folio above the rule. */
  folio?: boolean
}

export function SectionMeta({ label, subtitle, folio }: SectionMetaProps) {
  // The subtitle already carries the section number ("03 / YANG KAMI LAKUKAN"),
  // so the folio reuses it instead of adding a second content field.
  const index = folio ? subtitle?.split('/')[0]?.trim() : undefined

  return (
    <RevealText as="div" className="section-meta" stagger dataIndex={index || undefined}>
      <span>
        <b className="section-mark" aria-hidden="true">
          ✱
        </b>
        {label}
      </span>
      {subtitle ? <span>{subtitle}</span> : null}
    </RevealText>
  )
}
