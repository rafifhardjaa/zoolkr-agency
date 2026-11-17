import type { HomepageContent } from '@/content/types'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { RevealText } from '@/components/ui/RevealText'
import { PlusLink } from '@/components/ui/PlusLink'
import { CaseCard } from '@/components/sections/CaseCard'

interface PortfolioSectionProps {
  content: {
    title: string
    note: string
    cta: { label: string; href: string }
  }
  cases: HomepageContent['sections']['work']['cases']
}

export function PortfolioSection({
  content,
  cases,
}: PortfolioSectionProps) {
  return (
    <section className="work section-pad">
      <div className="work-heading">
        <div>
          <SectionMeta label={content.title} />
        </div>
        <RevealText as="span" className="portfolio-note" delay={80}>
          {content.note}
        </RevealText>
      </div>
      <div className="work-list">
        {cases.map((item, index) => (
          <CaseCard
            key={item.number}
            item={item}
            index={index}
            headingLevel="h2"
            showDescription
          />
        ))}
      </div>
      <RevealText as="div" className="work-cta" delay={180}>
        <PlusLink className="solid-button" href={content.cta.href} label={content.cta.label} />
      </RevealText>
    </section>
  )
}
