import { notFound } from 'next/navigation'
import { getHomepageContent, isLocale } from '@/lib/i18n'
import { FaqSection } from '@/components/sections/FaqSection'

interface FaqPageProps {
  params: Promise<{ lang: string }>
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const content = getHomepageContent(lang).sections.faq

  return (
    <main id="main">
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">{content.title}</h1>
        </div>
        <FaqSection content={content} hideTitle />
      </div>
    </main>
  )
}
