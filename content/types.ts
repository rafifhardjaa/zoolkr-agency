export type Locale = 'id' | 'en'

export interface NavLink {
  label: string
  href: string
}

export interface Headline {
  line1: string
  line2Before: string
  line2Emphasis: string
  line2After: string
}

export interface LinkContent {
  label: string
  href: string
}

export interface SectionMetaContent {
  label: string
  subtitle: string
}

export interface ServiceItem {
  number: string
  tag: string
  title: string
  description: string
  tags: string[]
}

export interface CaseItem {
  number: string
  title: string
  brand: string
  category: string
  categoryKey: string
  stat: string
  statLabel: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface HomepageContent {
  meta: {
    title: string
    description: string
  }
  nav: {
    brand: string
    primaryLabel: string
    links: NavLink[]
    languageLabel: string
    skipLabel: string
    cta: LinkContent
    menu: {
      openLabel: string
      closeLabel: string
      dialogLabel: string
      contactLabel: string
      footLeft: string
      footRight: string
    }
  }
  hero: {
    topline: {
      left: string
      right: string
    }
    place: {
      city: string
      country: string
    }
    eyebrow: string
    headline: Headline
    intro: string
    cta: LinkContent
    foot: {
      left: string
      right: string
    }
    videoLabel: string
  }
  sections: {
    clients: {
      label: string
      note: string
    }
    about: SectionMetaContent & {
      manifesto: string
      body: string
      muted: string
      caption: string
      cta: LinkContent
    }
    expertise: SectionMetaContent & {
      title: string
      intro: string
      note: string
      cta: LinkContent
      services: ServiceItem[]
    }
    work: SectionMetaContent & {
      title: string
      intro: string
      filters: { label: string; count: string }[]
      cases: CaseItem[]
    }
    faq: SectionMetaContent & {
      title: string
      items: FaqItem[]
      moreLabel: string
    }
    footer: {
      kicker: string
      cta: LinkContent
      email: string
      place: string
      topLabel: string
    }
  }
}

export type PageKey = 'layanan' | 'portofolio' | 'faq' | 'karir'

export interface PageScaffold {
  title: string
  comingSoon: string
}

export type PageContent = Record<PageKey, PageScaffold>
