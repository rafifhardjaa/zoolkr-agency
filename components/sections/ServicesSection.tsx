import Link from 'next/link'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'

interface ServicesSectionProps {
  content: {
    title: string
    lead: string
    intro: string
    services: Array<{
      number: string
      tag: string
      title: string
      description: string
      tags: string[]
    }>
    cta: { label: string; href: string }
  }
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section className="services section-pad">
      <div className="services-intro">
        <SectionMeta label={content.title} />
        <Link className="solid-button" href={content.cta.href}>
          <span>{content.cta.label}</span>
          <span aria-hidden="true">+</span>
        </Link>
        <span className="services-note">{content.intro}</span>
      </div>
      <div className="service-list">
        {content.services.map((service) => (
          <article className="service" key={service.number}>
            <div className="service-top">
              <span>{service.number} /</span>
              <span>{service.tag}</span>
            </div>
            <RevealText as="h2">{service.title}</RevealText>
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
