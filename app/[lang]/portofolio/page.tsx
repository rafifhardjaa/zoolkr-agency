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

  const content = lang === 'en' ? enPortfolio : idPortfolio
  const placeholderCase =
    getHomepageContent(lang).sections.work.cases[0]

  return (
    <main id="main">
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">{content.title}</h1>
          <p className="page-lead">{content.lead}</p>
        </div>
        <PortfolioSection content={content} placeholderCase={placeholderCase} />
      </div>
    </main>
  )
}
