import { notFound } from 'next/navigation'
import { getHomepageContent, isLocale } from '@/lib/i18n'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { enPortfolio } from '@/content/en/portfolio'
import { idPortfolio } from '@/content/id/portfolio'

interface PortofolioPageProps {
  params: Promise<{ lang: string }>
}

export default async function PortofolioPage({ params }: PortofolioPageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const portfolioContent = lang === 'en' ? enPortfolio : idPortfolio
  const homepageContent = getHomepageContent(lang)

  return (
    <main id="main">
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">{portfolioContent.title}</h1>
          <p className="page-lead">{portfolioContent.lead}</p>
        </div>
        <PortfolioSection
          content={portfolioContent}
          cases={homepageContent.sections.work.cases}
        />
      </div>
    </main>
  )
}
