/**
 * Running marginalia for dense sections. It repeats the section label in the
 * page gutter, the way a print spread carries its running head. Decorative, so
 * screen readers skip it and the real label stays in SectionMeta.
 */
export function SectionMargin({ label }: { label: string }) {
  return (
    <span className="section-margin" aria-hidden="true">
      {label}
    </span>
  )
}
