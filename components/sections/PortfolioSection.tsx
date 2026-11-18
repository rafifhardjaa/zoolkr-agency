import type { HomepageContent } from '@/content/types'
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
    <section className="work section-pad" aria-label={content.title}>
      <div className="work-heading">
        <RevealText as="span" className="portfolio-note">
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
            anchorId={`portofolio-${item.number}`}
          />
        ))}
      </div>
      <RevealText as="div" className="work-cta" delay={180}>
        <PlusLink className="solid-button" href={content.cta.href} label={content.cta.label} />
      </RevealText>
    </section>
  )
}
