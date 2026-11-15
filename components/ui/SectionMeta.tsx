interface SectionMetaProps {
  label: string
  subtitle?: string
}

export function SectionMeta({ label, subtitle }: SectionMetaProps) {
  return (
    <div className="section-meta">
      <span>
        <b className="section-mark" aria-hidden="true">
          ✱
        </b>
        {label}
      </span>
      {subtitle ? <span>{subtitle}</span> : null}
    </div>
  )
}
