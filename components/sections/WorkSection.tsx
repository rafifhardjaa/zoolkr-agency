import type { HomepageContent } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { SectionMargin } from '@/components/ui/SectionMargin'
import { Accent } from '@/components/ui/Accent'
import { CaseCard } from '@/components/sections/CaseCard'

interface WorkSectionProps {
  content: HomepageContent['sections']['work']
}

export function WorkSection({ content }: WorkSectionProps) {
  return (
    <section id="work" className="work section-pad">
      <SectionMargin label={content.label} />
      <SectionMeta label={content.label} subtitle={content.subtitle} folio />
      <div className="work-heading">
        <RevealText as="h2" className="section-title" variant="mask">
          <Accent text={content.title} />
        </RevealText>
        <RevealText as="p" delay={80}>{content.intro}</RevealText>
      </div>
      <RevealText as="div" className="rule-draw" variant="rule" />
      <div className="work-list">
        {content.cases.map((item, index) => (
          <CaseCard
            key={item.number}
            item={item}
            index={index}
            headingLevel="h3"
            link={{ href: content.viewHref, label: content.viewLabel }}
          />
        ))}
      </div>
    </section>
  )
}
