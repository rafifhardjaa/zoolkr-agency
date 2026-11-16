import Link from 'next/link'
import type { HomepageContent } from '@/content/types'
import { SectionMeta } from '@/components/ui/SectionMeta'

interface PortfolioSectionProps {
  content: {
    title: string
    note: string
    cta: { label: string; href: string }
  }
  placeholderCase: HomepageContent['sections']['work']['cases'][number]
}

export function PortfolioSection({
  content,
  placeholderCase,
}: PortfolioSectionProps) {
  return (
    <section className="work section-pad">
      <div className="work-heading">
        <div>
          <SectionMeta label={content.title} />
        </div>
        <span className="portfolio-note">{content.note}</span>
      </div>
      <div className="work-list">
        <article className="work-card">
          <div className="case-media-placeholder" aria-hidden="true">
            [IMAGE PLACEHOLDER]
          </div>
          <div className="case-info">
            <span className="case-num">{placeholderCase.number} /</span>
            <h2>{placeholderCase.title}</h2>
            <div>
              <span className="case-brand">{placeholderCase.brand}</span>
              <span className="case-category">{placeholderCase.category}</span>
            </div>
            <span className="case-stat">
              {placeholderCase.stat}
              <small>{placeholderCase.statLabel}</small>
            </span>
          </div>
        </article>
      </div>
      <Link className="solid-button" href={content.cta.href}>
        <span>{content.cta.label}</span>
        <span aria-hidden="true">+</span>
      </Link>
    </section>
  )
}
