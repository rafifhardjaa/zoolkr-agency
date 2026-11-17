import type { CaseItem } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'

export interface CaseCardProps {
  item: CaseItem
  index: number
  headingLevel: 'h2' | 'h3'
  link?: { href: string; label: string }
  showDescription?: boolean
}

export function CaseCard({
  item,
  index,
  headingLevel,
  link,
  showDescription,
}: CaseCardProps): React.JSX.Element {
  return (
    <article className="work-card">
      <RevealText as="div" className="case-media" variant="media" delay={index * 90}>
        {link ? (
          <>
            <a
              className="case-link"
              href={link.href}
              aria-label={`${link.label}: ${item.title}`}
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
              {link.label}
            </span>
          </>
        ) : (
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}
      </RevealText>
      <RevealText as="div" className="case-info" delay={index * 90 + 90} stagger>
        <span className="case-num">{item.number} /</span>
        {headingLevel === 'h3' ? <h3>{item.title}</h3> : <h2>{item.title}</h2>}
        <div>
          <span className="case-brand">{item.brand}</span>
          <span className="case-category">{item.category}</span>
        </div>
        {showDescription ? <p className="case-desc">{item.description}</p> : null}
      </RevealText>
    </article>
  )
}
