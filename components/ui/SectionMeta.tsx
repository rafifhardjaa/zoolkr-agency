'use client'

import { RevealText } from '@/components/ui/RevealText'

interface SectionMetaProps {
  label: string
  subtitle?: string
}

export function SectionMeta({ label, subtitle }: SectionMetaProps) {
  return (
    <RevealText as="div" className="section-meta" stagger>
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
