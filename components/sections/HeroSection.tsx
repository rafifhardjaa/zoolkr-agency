import Image from 'next/image'
import { HeroVideo } from './HeroVideo'
import type { HomepageContent } from '@/content/types'
import { LiveClock } from '@/components/ui/LiveClock'
import { PlusLink } from '@/components/ui/PlusLink'

interface HeroSectionProps {
  content: HomepageContent['hero']
}

export function HeroSection({ content }: HeroSectionProps) {
  const { headline, place } = content

  return (
    <section id="hero" className="hero-track" aria-labelledby="hero-title">
      <div className="hero">
        <Image
          className="hero-poster"
          src="/videos/hero-banner-poster.webp"
          alt=""
          width={1920}
          height={1392}
          priority
          sizes="100vw"
        />

        <HeroVideo label={content.videoLabel} />

        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <p className="hero-topline">
          <span>{content.topline.left}</span>
          <span className="hero-topline-right">
            <span>{place.city}, {place.country}</span>
            <LiveClock className="hero-clock" />
          </span>
        </p>

        <svg
          className="hero-wordmark"
          viewBox="0 0 1000 230"
          aria-hidden="true"
          focusable="false"
        >
          <text x="0" y="216" textLength="1000" lengthAdjust="spacingAndGlyphs">
            zoolkr
          </text>
        </svg>

        <div className="hero-bottom">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 id="hero-title" className="hero-title">
              {headline.line1} <br className="hero-break" />
              {headline.line2Before}
              <em>{headline.line2Emphasis}</em>
              {headline.line2After}
            </h1>
          </div>

          <div className="hero-intro">
            <p>{content.intro}</p>
            <PlusLink
              className="text-link"
              plusClassName="text-link-plus"
              href={content.cta.href}
              label={content.cta.label}
            />
          </div>

        </div>

        <div className="hero-foot">
          <span>{content.foot.left}</span>
          <span>{content.foot.right}</span>
        </div>
      </div>
    </section>
  )
}