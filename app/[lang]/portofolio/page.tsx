import { notFound } from 'next/navigation'
import { getHomepageContent, isLocale } from '@/lib/i18n'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { PageCover } from '@/components/ui/PageCover'
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
  const cases = homepageContent.sections.work.cases

  return (
    <main id="main">
      <div className="page">
        <PageCover
          label={portfolioContent.head.label}
          meta={portfolioContent.head.meta}
          title={portfolioContent.title}
          lead={portfolioContent.lead}
          aside={{
            label: portfolioContent.head.indexLabel,
            items: cases.map((item) => ({
              meta: item.number,
              label: item.title,
              href: `#portofolio-${item.number}`,
            })),
          }}
          footLeft={portfolioContent.head.footLeft}
          footRight={portfolioContent.head.footRight}
        />
        <PortfolioSection content={portfolioContent} cases={cases} />
      </div>
    </main>
  )
}
