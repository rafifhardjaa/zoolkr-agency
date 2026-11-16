'use client'

import { useState } from 'react'
import type { HomepageContent } from '@/content/types'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { RevealText } from '@/components/ui/RevealText'
import { Accent } from '@/components/ui/Accent'

interface FaqSectionProps {
  content: HomepageContent['sections']['faq']
  hideTitle?: boolean
}

export function FaqSection({ content, hideTitle = false }: FaqSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggle = (index: number) => {
    setOpenItems((items) =>
      items.includes(index)
        ? items.filter((i) => i !== index)
        : [...items, index],
    )
  }

  return (
    <section id="faq" className="faq section-pad">
      <div>
        <SectionMeta label={content.label} subtitle={content.subtitle} />
        {hideTitle ? null : (
          <RevealText as="h2" className="section-title">
            <Accent text={content.title} />
          </RevealText>
        )}
      </div>
      <div className="faq-list">
        {content.items.map((item, index) => {
          const open = openItems.includes(index)
          return (
            <div className={`faq-item${open ? ' open' : ''}`} key={item.question}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={open}
                aria-controls={`faq-panel-${index}`}
                onClick={() => toggle(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.question}
                <i aria-hidden="true">+</i>
              </button>
              <div
                className="faq-panel"
                id={`faq-panel-${index}`}
                aria-hidden={!open}
              >
                <div className="faq-panel-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
