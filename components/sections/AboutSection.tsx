import type { HomepageContent } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { Accent } from '@/components/ui/Accent'

interface AboutSectionProps {
  content: HomepageContent['sections']['about']
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="about section-pad">
      <SectionMeta label={content.label} subtitle={content.subtitle} />
      <RevealText as="h2" className="manifesto">
        <Accent text={content.manifesto} />
      </RevealText>
      <div className="about-bottom">
        <RevealText as="div" className="about-photo">
          <span className="about-photo-placeholder">{content.caption}</span>
        </RevealText>
        <RevealText as="div" className="about-copy">
          <p>{content.body}</p>
          <p className="muted">{content.muted}</p>
          <a className="text-link" href={content.cta.href}>
            <span>{content.cta.label}</span>
            <span className="text-link-plus" aria-hidden="true">
              +
            </span>
          </a>
        </RevealText>
      </div>
    </section>
  )
}
