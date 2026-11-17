import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IBM_Plex_Mono, Jost } from 'next/font/google'
import '../globals.css'
import { NavBar } from '@/components/layout/NavBar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { getHomepageContent, isLocale, locales } from '@/lib/i18n'
import { buildHomepageMetadata } from '@/lib/metadata'
import { CursorFollower } from '@/components/layout/CursorFollower'
import { RevealEngine } from '@/components/ui/RevealEngine'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jost',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
})

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return buildHomepageMetadata(lang, getHomepageContent(lang))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const content = getHomepageContent(lang)

  return (
    <html lang={lang} className={`${jost.variable} ${plexMono.variable}`}>
      <body id="top">
        <ScrollProgress />
        <NavBar locale={lang} content={content.nav} />
        {children}
        <RevealEngine />
        <Footer locale={lang} brand={content.nav.brand} content={content.sections.footer} />
        <CursorFollower />
      </body>
    </html>
  )
}
