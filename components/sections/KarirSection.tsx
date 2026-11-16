import Link from 'next/link'
import { SectionMeta } from '@/components/ui/SectionMeta'

interface KarirSectionProps {
  content: {
    title: string
    body: string
    cta: { label: string; href: string }
  }
}

export function KarirSection({ content }: KarirSectionProps) {
  return (
    <section className="karir section-pad">
      <div className="karir-intro">
        <SectionMeta label={content.title} />
        <p>{content.body}</p>
      </div>
      <Link className="solid-button" href={content.cta.href}>
        <span>{content.cta.label}</span>
        <span aria-hidden="true">+</span>
      </Link>
    </section>
  )
}
