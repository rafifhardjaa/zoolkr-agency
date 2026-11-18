import type { ServiceItem } from '@/content/types'
import { RevealText } from '@/components/ui/RevealText'

export interface ServiceCardProps {
  service: ServiceItem
  index: number
  headingLevel: 'h2' | 'h3'
  anchorId?: string
}

export function ServiceCard({
  service,
  index,
  headingLevel,
  anchorId,
}: ServiceCardProps): React.JSX.Element {
  return (
    <article className="service" id={anchorId}>
      <RevealText as="div" className="service-top" delay={index * 60}>
        <span>{service.number} /</span>
        <span>{service.tag}</span>
      </RevealText>
      <RevealText as={headingLevel} variant="mask">
        {service.title}
      </RevealText>
      <RevealText as="div" className="service-media" variant="media">
        <img
          src={service.image.src}
          alt={service.image.alt}
          width={service.image.width}
          height={service.image.height}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </RevealText>
      <RevealText as="div" className="service-copy" delay={120} stagger>
        <p>{service.description}</p>
        <div className="tags">
          {service.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </RevealText>
    </article>
  )
}
