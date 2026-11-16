import type { HomepageContent } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { Accent } from '@/components/ui/Accent'

interface ExpertiseSectionProps {
  content: HomepageContent['sections']['expertise']
}

export function ExpertiseSection({ content }: ExpertiseSectionProps) {
  return (
    <section id="expertise" className="expertise section-pad">
      <div className="expertise-intro">
        <SectionMeta label={content.label} subtitle={content.subtitle} />
        <RevealText as="h2" className="section-title">
          <Accent text={content.title} />
        </RevealText>
        <p>{content.intro}</p>
        <a className="solid-button" href={content.cta.href}>
          <span>{content.cta.label}</span>
          <span aria-hidden="true">+</span>
        </a>
        <span className="expertise-note">{content.note}</span>
      </div>
      <div className="service-list">
        {content.services.map((service) => (
          <article className="service" key={service.number}>
            <div className="service-top">
              <span>{service.number} /</span>
              <span>{service.tag}</span>
            </div>
            <RevealText as="h3">{service.title}</RevealText>
            <div className="service-media-placeholder" aria-hidden="true">
              [IMAGE PLACEHOLDER]
            </div>
            <div className="service-copy">
              <p>{service.description}</p>
              <div className="tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
