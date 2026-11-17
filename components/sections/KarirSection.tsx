import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { PlusLink } from '@/components/ui/PlusLink'

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
        <RevealText as="p" delay={80}>{content.body}</RevealText>
      </div>
      <RevealText as="div" className="reveal-cta" delay={140}>
        <PlusLink className="solid-button" href={content.cta.href} label={content.cta.label} />
      </RevealText>
    </section>
  )
}
