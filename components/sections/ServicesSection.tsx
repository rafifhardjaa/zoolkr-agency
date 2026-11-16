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
      image: {
        src: string
        alt: string
        width: number
        height: number
      }
    }>
    cta: { label: string; href: string }
  }
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section className="services section-pad">
      <div className="services-intro">
        <SectionMeta label={content.title} />
        <RevealText as="div" className="reveal-cta" delay={80}>
          <Link className="solid-button" href={content.cta.href}>
            <span>{content.cta.label}</span>
            <span aria-hidden="true">+</span>
          </Link>
        </RevealText>
        <RevealText as="span" className="services-note" delay={160}>
          {content.intro}
        </RevealText>
      </div>
      <div className="service-list">
        {content.services.map((service, index) => (
          <article className="service" key={service.number}>
            <RevealText as="div" className="service-top" delay={index * 60}>
              <span>{service.number} /</span>
              <span>{service.tag}</span>
            </RevealText>
            <RevealText as="h2" variant="mask">{service.title}</RevealText>
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
