import type { HomepageContent, Locale, PageContent } from '@/content/types'
import { enContent } from '@/content/en/homepage'
import { idContent } from '@/content/id/homepage'
import { enPages } from '@/content/en/pages'
import { idPages } from '@/content/id/pages'

export const locales = ['en', 'id'] as const

export type LocaleName = (typeof locales)[number]

export const defaultLocale: LocaleName = 'en'

const homepageContent: Record<Locale, HomepageContent> = {
  en: enContent,
  id: idContent,
}

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'id'
}

export function getHomepageContent(locale: Locale): HomepageContent {
  return homepageContent[locale]
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'id' : 'en'
}

export function localePath(locale: Locale): string {
  return `/${locale}`
}

const pageContent: Record<Locale, PageContent> = {
  en: enPages,
  id: idPages,
}

export function getPageContent(locale: Locale): PageContent {
  return pageContent[locale]
}
