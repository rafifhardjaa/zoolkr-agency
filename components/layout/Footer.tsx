import Link from 'next/link'
import { localePath } from '@/lib/i18n'
import type { HomepageContent, Locale } from '@/content/types'
import { LiveClock } from '@/components/ui/LiveClock'

interface FooterProps {
  locale: Locale
  brand: string
  content: HomepageContent['sections']['footer']
}

export function Footer({ locale, brand, content }: FooterProps) {
  return (
    <footer>
      <div className="footer-cta">
        <p className="footer-kicker">{content.kicker}</p>
        <a className="footer-headline" href={content.cta.href}>
          {content.cta.label}
          <i aria-hidden="true">+</i>
        </a>
      </div>
      <div className="footer-base">
        <Link className="brand" href={localePath(locale)}>
          {brand}
        </Link>
        <a className="footer-mail" href={`mailto:${content.email}`}>
          {content.email}
        </a>
        <span className="footer-place">
          {content.place} <LiveClock className="footer-clock" />
        </span>
        <a className="footer-top-link" href="#top">
          {content.topLabel}
          <span aria-hidden="true">+</span>
        </a>
      </div>
    </footer>
  )
}