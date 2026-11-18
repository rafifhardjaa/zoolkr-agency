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

export interface RailItem {
  id: string
  label: string
}

export interface ServiceItem {
  number: string
  tag: string
  title: string
  description: string
  tags: string[]
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export interface ServicesContent {
  head: {
    label: string
    meta: string
    indexLabel: string
    footLeft: string
    footRight: string
  }
  title: string
  lead: string
  intro: string
  services: ServiceItem[]
  cta: LinkContent
}

export interface CaseItem {
  number: string
  title: string
  brand: string
  category: string
  categoryKey: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PortfolioContent {
  head: {
    label: string
    meta: string
    indexLabel: string
    footLeft: string
    footRight: string
  }
  title: string
  lead: string
  note: string
  cta: LinkContent
}

export interface KarirContent {
  head: {
    label: string
    meta: string
    guideLabel: string
    guide: string[]
    footLeft: string
    footRight: string
  }
  title: string
  lead: string
  body: string
  cta: LinkContent
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
  ticker: string
  rail: RailItem[]
  railLabel: string
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
      viewLabel: string
      viewHref: string
      filters: { label: string; count: string }[]
      cases: CaseItem[]
    }
    faq: SectionMetaContent & {
      head: {
        indexLabel: string
        topics: string[]
        footLeft: string
        footRight: string
      }
      title: string
      intro: string
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

export interface ContactMessages {
  nameRequired: string
  nameMin: string
  emailRequired: string
  emailInvalid: string
  messageRequired: string
  messageMin: string
}

export interface ContactContent {
  head: {
    guideLabel: string
    guide: string[]
    footLeft: string
    footRight: string
  }
  title: string
  lead: string
  meta: SectionMetaContent
  intro: string
  email: string
  directEmailLabel: string
  place: string
  directPlaceLabel: string
  privacy: string
  form: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitLabel: string
    submittingLabel: string
    successTitle: string
    successBody: string
    errorTitle: string
    errorBody: string
    messages: ContactMessages
  }
}
