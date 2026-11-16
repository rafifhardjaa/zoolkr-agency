import Link from 'next/link'
import type { HomepageContent } from '@/content/types'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { RevealText } from '@/components/ui/RevealText'

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
          <article className="work-card" key={item.number}>
            <RevealText as="div" className="case-media" variant="media" delay={index * 90}>
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </RevealText>
            <RevealText as="div" className="case-info" delay={index * 90 + 90} stagger>
              <span className="case-num">{item.number} /</span>
              <h2>{item.title}</h2>
              <div>
                <span className="case-brand">{item.brand}</span>
                <span className="case-category">{item.category}</span>
              </div>
              <p className="case-desc">{item.description}</p>
            </RevealText>
          </article>
        ))}
      </div>
      <RevealText as="div" className="work-cta" delay={180}>
        <Link className="solid-button" href={content.cta.href}>
          <span>{content.cta.label}</span>
          <span aria-hidden="true">+</span>
        </Link>
      </RevealText>
    </section>
  )
}
