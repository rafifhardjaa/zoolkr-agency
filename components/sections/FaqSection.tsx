import type { HomepageContent } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'
import { SectionMeta } from '@/components/ui/SectionMeta'

interface FaqSectionProps {
  content: HomepageContent['sections']['faq']
}

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <section id="faq" className="faq section-pad">
      <div>
        <SectionMeta label={content.label} subtitle={content.subtitle} />
        <RevealText as="h2" className="section-title">
          {content.title}
        </RevealText>
      </div>
      <div className="faq-list">
        {content.items.map((item, index) => (
          <details key={item.question}>
            <summary>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.question}
              <i aria-hidden="true">+</i>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
