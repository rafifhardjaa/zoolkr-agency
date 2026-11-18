import type { HomepageContent } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { SectionMargin } from '@/components/ui/SectionMargin'
import { Accent } from '@/components/ui/Accent'
import { PlusLink } from '@/components/ui/PlusLink'
import { ServiceCard } from '@/components/sections/ServiceCard'

interface ExpertiseSectionProps {
  content: HomepageContent['sections']['expertise']
}

export function ExpertiseSection({ content }: ExpertiseSectionProps) {
  return (
    <section id="expertise" className="expertise section-pad">
      <SectionMargin label={content.label} />
      <div className="expertise-intro">
        <SectionMeta label={content.label} subtitle={content.subtitle} folio />
        <RevealText as="h2" className="section-title" variant="mask">
          <Accent text={content.title} />
        </RevealText>
        <RevealText as="p" delay={80}>{content.intro}</RevealText>
        <RevealText as="div" className="reveal-cta" delay={140}>
          <PlusLink className="solid-button" href={content.cta.href} label={content.cta.label} />
        </RevealText>
        <RevealText as="span" className="expertise-note" delay={200}>
          {content.note}
        </RevealText>
      </div>
      <div className="service-list">
        <RevealText as="div" className="rule-draw" variant="rule" />
        {content.services.map((service, index) => (
          <ServiceCard
            key={service.number}
            service={service}
            index={index}
            headingLevel="h3"
          />
        ))}
      </div>
    </section>
  )
}
