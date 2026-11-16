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
        <RevealText as="h2" className="section-title" variant="mask">
          <Accent text={content.title} />
        </RevealText>
        <RevealText as="p" delay={80}>{content.intro}</RevealText>
        <RevealText as="div" className="reveal-cta" delay={140}>
          <a className="solid-button" href={content.cta.href}>
            <span>{content.cta.label}</span>
            <span aria-hidden="true">+</span>
          </a>
        </RevealText>
        <RevealText as="span" className="expertise-note" delay={200}>
          {content.note}
        </RevealText>
      </div>
      <div className="service-list">
        {content.services.map((service, index) => (
          <article className="service" key={service.number}>
            <RevealText as="div" className="service-top" delay={index * 60}>
              <span>{service.number} /</span>
              <span>{service.tag}</span>
            </RevealText>
            <RevealText as="h3" variant="mask">{service.title}</RevealText>
            <RevealText as="div" className="service-media" variant="media">
              <img
                src={service.image.src}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </RevealText>
            <RevealText as="div" className="service-copy" delay={120} stagger>
              <p>{service.description}</p>
              <div className="tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </RevealText>
          </article>
        ))}
      </div>
    </section>
  )
}
