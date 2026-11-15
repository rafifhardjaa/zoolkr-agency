import type { Metadata } from 'next'
import type { HomepageContent, Locale } from '@/content/types'
import { validateEnv } from '@/lib/env'

const siteUrl = validateEnv().NEXT_PUBLIC_SITE_URL

export function buildHomepageMetadata(locale: Locale, content: HomepageContent): Metadata {
  const { title, description } = content.meta

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: '/id',
        en: '/en',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      siteName: 'Zoolkr',
      title,
      description,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}