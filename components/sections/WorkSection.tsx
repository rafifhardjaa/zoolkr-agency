import type { HomepageContent } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { Accent } from '@/components/ui/Accent'

interface WorkSectionProps {
  content: HomepageContent['sections']['work']
}

export function WorkSection({ content }: WorkSectionProps) {
  return (
    <section id="work" className="work section-pad">
      <SectionMeta label={content.label} subtitle={content.subtitle} />
      <div className="work-heading">
        <RevealText as="h2" className="section-title">
          <Accent text={content.title} />
        </RevealText>
        <p>{content.intro}</p>
      </div>
      <div className="work-list">
        {content.cases.map((item) => (
          <article className="work-card" key={item.number}>
            <div className="case-media">
              <a
                className="case-link"
                href={content.viewHref}
                aria-label={`${content.viewLabel}: ${item.title}`}
              >
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </a>
              <span className="case-view" aria-hidden="true">
                {content.viewLabel}
              </span>
            </div>
            <div className="case-info">
              <span className="case-num">{item.number} /</span>
              <h3>{item.title}</h3>
              <div>
                <span className="case-brand">{item.brand}</span>
                <span className="case-category">{item.category}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
