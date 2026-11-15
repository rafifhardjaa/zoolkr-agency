import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { enServices } from '@/content/en/services'
import { idServices } from '@/content/id/services'

interface LayananPageProps {
  params: Promise<{ lang: string }>
}

export default async function LayananPage({ params }: LayananPageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const content = lang === 'en' ? enServices : idServices

  return (
    <main id="main">
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">{content.title}</h1>
          <p className="page-lead">{content.lead}</p>
        </div>
        <ServicesSection content={content} />
      </div>
    </main>
  )
}
