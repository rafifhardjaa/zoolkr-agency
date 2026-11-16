import type { ContactContent } from '@/content/types'
import { SectionMeta } from '@/components/ui/SectionMeta'
import { RevealText } from '@/components/ui/RevealText'
import { ContactForm } from '@/components/sections/ContactForm'

interface ContactSectionProps {
  content: ContactContent
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section className="contact">
      <SectionMeta label={content.meta.label} subtitle={content.meta.subtitle} />

      <div className="contact-grid">
        <div className="contact-aside">
          <RevealText as="p" className="contact-intro">
            {content.intro}
          </RevealText>

          <RevealText as="div" className="contact-direct" delay={80}>
            <span className="contact-kicker">{content.directEmailLabel}</span>
            <a className="contact-mail" href={`mailto:${content.email}`}>
              {content.email}
            </a>
          </RevealText>

          <RevealText as="div" className="contact-direct" delay={150}>
            <span className="contact-kicker">{content.directPlaceLabel}</span>
            <p className="contact-place">{content.place}</p>
          </RevealText>

          <RevealText as="p" className="contact-privacy" delay={220}>
            {content.privacy}
          </RevealText>
        </div>

        <ContactForm form={content.form} />
      </div>
    </section>
  )
}
