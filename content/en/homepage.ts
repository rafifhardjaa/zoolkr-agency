import type { HomepageContent } from '@/content/types'

export const enContent: HomepageContent = {
  meta: {
    title: 'Zoolkr | Independent Creative Studio',
    description: 'An independent creative studio for brands that want to be looked at twice.',
  },
  nav: {
    brand: 'zoolkr',
    primaryLabel: 'Primary',
    links: [
      { label: 'Services', href: '/en/layanan' },
      { label: 'Portfolio', href: '/en/portofolio' },
      { label: 'FAQ', href: '/en/faq' },
      { label: 'Join us', href: '/en/karir' },
    ],
    languageLabel: 'Language',
    skipLabel: 'Skip to content',
    cta: {
      label: 'Contact',
      href: '/en/kontak',
    },
    menu: {
      openLabel: 'Open navigation',
      closeLabel: 'Close',
      dialogLabel: 'Expanded navigation',
      contactLabel: 'Contact',
      footLeft: 'CREATIVE WORK, MADE ON PURPOSE.',
      footRight: '© 2026 ZOOLKR',
    },
  },
  hero: {
    topline: {
      left: 'ZOOLKR / CREATIVE STUDIO',
      right: '01 / HERO',
    },
    place: {
      city: 'Semarang',
      country: 'Indonesia',
    },
    eyebrow: 'INDEPENDENT CREATIVE STUDIO',
    headline: {
      line1: 'Work that refuses',
      line2Before: 'to ',
      line2Emphasis: 'blend in',
      line2After: '.',
    },
    intro: 'A studio for brands that want to be looked at twice.',
    cta: {
      label: 'Start a project',
      href: 'mailto:hello@zoolkr.com',
    },
    foot: {
      left: 'CREATIVE WORK, MADE ON PURPOSE.',
      right: '© 2026 ZOOLKR',
    },
    videoLabel: 'Abstract maroon light folding across a dark background',
  },
  ticker: 'CREATIVE WORK, MADE ON PURPOSE',
  railLabel: 'Page sections',
  rail: [
    { id: 'hero', label: '01 / HERO' },
    { id: 'about', label: '02 / ABOUT' },
    { id: 'expertise', label: '03 / EXPERTISE' },
    { id: 'work', label: '04 / WORK' },
    { id: 'faq', label: '05 / FAQ' },
  ],
  sections: {
    clients: {
      label: 'IN GOOD COMPANY',
      note: 'Two portfolio case studies',
    },
    about: {
      label: 'Z / WHO WE ARE',
      subtitle: '02 / THE WAY WE THINK',
      manifesto: 'We make the kind of work you point at and say, *we did that*.',
      body: 'Zoolkr is a creative studio. We build websites, shoot photography, and produce video. We also run a content creator agency for brands that need a real voice on social.',
      muted: 'We work the way a small team works. One project at a time. One decision at a time. No handoff between departments that have never met each other.',
      caption: 'Studio workspace',
      cta: { label: 'Our expertise', href: '#expertise' },
    },
    expertise: {
      label: 'Z / OUR EXPERTISE',
      subtitle: '03 / WHAT WE DO',
      title: 'What we do *well*.',
      intro: 'We work across three practices. Each one is staffed by people who do that thing every day.',
      note: 'We take on a limited number of projects each quarter, so the work stays good.',
      cta: { label: 'Start a project', href: 'mailto:hello@zoolkr.com' },
      services: [
        {
          number: '01',
          tag: 'WEB',
          title: 'Website development',
          description:
            'We build websites in Next.js, from the first sketch to the launch day. Fast, accessible, and built to last.',
          tags: ['Next.js', 'TypeScript', 'Tailwind'],
          image: {
            src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Team working on laptops at a desk',
            width: 800,
            height: 533,
          },
        },
        {
          number: '02',
          tag: 'MEDIA',
          title: 'Photography and video',
          description:
            'We shoot and edit photography and video for brands that need more than a phone clip.',
          tags: ['Photography', 'Videography', 'Editing'],
          image: {
            src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Photographer shooting outdoors',
            width: 800,
            height: 533,
          },
        },
        {
          number: '03',
          tag: 'CONTENT',
          title: 'Content creator agency',
          description:
            'We run a content creator agency. Your social channels get real posts, written and shot by people who do it every day.',
          tags: ['Creator agency', 'Social content', 'Strategy'],
          image: {
            src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Three people talking around a table',
            width: 800,
            height: 533,
          },
        },
      ],
    },
    work: {
      label: 'Z / SELECTED WORK',
      subtitle: '04 / CASE STUDIES',
      title: '*Selected* work',
      intro:
        'A few projects we are proud of. Each one started with a brief and ended with something that still works.',
      viewLabel: 'VIEW CASE',
      viewHref: '/en/portofolio',
      filters: [{ label: 'All work', count: '00' }],
      cases: [
        {
          number: '01',
          title: 'Local Product Catalog',
          brand: 'Concept Study',
          category: 'WEB',
          categoryKey: 'all',
          image: {
            src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80&fm=webp',
            alt: 'Store interior with product shelves',
            width: 1600,
            height: 1000,
          },
          description:
            'Concept case study for a product catalog with editorial interface and clear navigation for a local food brand.',
        },
        {
          number: '02',
          title: 'Product Photography Series',
          brand: 'Product Photography',
          category: 'MEDIA',
          categoryKey: 'all',
          image: {
            src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80&fm=webp',
            alt: 'DSLR camera on a plain background',
            width: 1600,
            height: 1000,
          },
          description:
            'Concept case study for a product photography series with studio lighting and color editing for a beverage brand.',
        },
      ],
    },
    faq: {
      label: 'Z / GOOD QUESTIONS',
      subtitle: '05 / QUESTIONS',
      title: '*Good* questions',
      items: [
        {
          question: 'How much does a website project cost?',
          answer:
            'Each project is priced after we read the brief. We do not publish a price list, because every site is a different size.',
        },
        {
          question: 'How long does a project take?',
          answer:
            'A small site takes a few weeks. A larger project takes longer. We give you a timeline after the first conversation.',
        },
        {
          question: 'Do you work with brands outside our city?',
          answer: 'Yes. We work remotely with clients wherever they are based.',
        },
        {
          question: 'Do you handle hosting and maintenance after launch?',
          answer:
            'We launch the site and then hand it over. Ongoing maintenance is a separate engagement.',
        },
        {
          question: 'Can you work alongside our existing team?',
          answer:
            'Yes. We slot into your team or run the project end to end, whichever fits better.',
        },
      ],
      moreLabel: 'See all questions',
    },
    footer: {
      kicker: 'Have a project in mind?',
      cta: { label: "Let's talk", href: 'mailto:hello@zoolkr.com' },
      email: 'hello@zoolkr.com',
      place: 'Semarang, Indonesia',
      topLabel: 'Back to top',
    },
  },
}