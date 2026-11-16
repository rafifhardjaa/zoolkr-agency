import Link from 'next/link'
import type { HomepageContent } from '@/content/types'
import { SectionMeta } from '@/components/ui/SectionMeta'

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
        <span className="portfolio-note">{content.note}</span>
      </div>
      <div className="work-list">
        {cases.map((item) => (
          <article className="work-card" key={item.number}>
            <div className="case-media">
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="case-info">
              <span className="case-num">{item.number} /</span>
              <h2>{item.title}</h2>
              <div>
                <span className="case-brand">{item.brand}</span>
                <span className="case-category">{item.category}</span>
              </div>
              <p className="case-desc">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <Link className="solid-button" href={content.cta.href}>
        <span>{content.cta.label}</span>
        <span aria-hidden="true">+</span>
      </Link>
    </section>
  )
}
