import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { PlusLink } from '@/components/ui/PlusLink'
import { ServiceCard } from '@/components/sections/ServiceCard'
import type { ServiceItem } from '@/content/types'

interface ServicesSectionProps {
  content: {
    title: string
    lead: string
    intro: string
    services: ServiceItem[]
    cta: { label: string; href: string }
  }
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section className="services section-pad">
      <div className="services-intro">
        <SectionMeta label={content.title} />
        <RevealText as="div" className="reveal-cta" delay={80}>
          <PlusLink className="solid-button" href={content.cta.href} label={content.cta.label} />
        </RevealText>
        <RevealText as="span" className="services-note" delay={160}>
          {content.intro}
        </RevealText>
      </div>
      <div className="service-list">
        {content.services.map((service, index) => (
          <ServiceCard
            key={service.number}
            service={service}
            index={index}
            headingLevel="h2"
          />
        ))}
      </div>
    </section>
  )
}
