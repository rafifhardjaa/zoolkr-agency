import type { HomepageContent } from '@/content/types'

interface ClientsMarqueeProps {
  content: HomepageContent['sections']['clients']
}

export function ClientsMarquee({ content }: ClientsMarqueeProps) {
  return (
    <section className="clients" aria-label={content.label}>
      <div className="clients-label">
        <span>{content.label}</span>
        <span className="tiny-cross" aria-hidden="true">
          +
        </span>
      </div>
      <p className="clients-note">{content.note}</p>
    </section>
  )
}
