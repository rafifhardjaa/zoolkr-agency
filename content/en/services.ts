import type { ServicesContent } from '@/content/types'

export const enServices: ServicesContent = {
  head: {
    label: 'Z / SERVICES',
    meta: '01 - 03 / THREE DISCIPLINES',
    indexLabel: 'On this page',
    footLeft: 'Independent creative studio',
    footRight: 'Semarang, ID',
  },
  title: 'Services',
  lead: 'Zoolkr is an independent creative studio. We build websites, shoot photography and video, and run a content creator agency for brands that need a real voice on social.',
  intro: 'We take on a limited number of projects each quarter, so the work stays good.',
  services: [
    {
      number: '01',
      tag: 'WEB',
      title: 'Website development',
      description:
        'We build websites in Next.js, from the first sketch to launch day. Fast, accessible, and built to last.',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      image: {
        src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Two people working on laptops',
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
        src: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Photographer shooting on a city street',
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
        src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Camera and photo prints on a desk',
        width: 800,
        height: 533,
      },
    },
  ],
  cta: { label: 'Start a project', href: '/en/kontak' },
}
