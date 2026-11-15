import type { HomepageContent } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'

interface KarirSectionProps {
  content: {
    title: string
    lead: string
    body: string
    cta: { label: string; href: string }
  }
}

export function KarirSection({ content }: KarirSectionProps) {
  return (
    <section className="karir section-pad">
      <div className="karir-intro">
        <SectionMeta label={content.title} />
        <RevealText as="h2" className="section-title">
          {content.title}
        </RevealText>
        <p>{content.lead}</p>
        <p>{content.body}</p>
      </div>
      <a className="solid-button" href={content.cta.href}>
        <span>{content.cta.label}</span>
        <span aria-hidden="true">+</span>
      </a>
    </section>
  )
}
