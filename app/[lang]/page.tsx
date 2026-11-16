import { notFound } from 'next/navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { Ticker } from '@/components/sections/Ticker'
import { ClientsMarquee } from '@/components/sections/ClientsMarquee'
import { SectionRail } from '@/components/layout/SectionRail'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { getHomepageContent, isLocale } from '@/lib/i18n'

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const content = getHomepageContent(lang)

  return (
    <main id="main">
      <HeroSection content={content.hero} />
      <Ticker text={content.ticker} />
      <SectionRail sections={content.rail} label={content.railLabel} />
      <ClientsMarquee content={content.sections.clients} />
      <AboutSection content={content.sections.about} />
      <ExpertiseSection content={content.sections.expertise} />
      <WorkSection content={content.sections.work} />
      <FaqSection content={content.sections.faq} />
    </main>
  )
}
