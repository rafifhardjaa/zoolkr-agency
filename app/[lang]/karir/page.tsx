import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { KarirSection } from '@/components/sections/KarirSection'
import { enKarir } from '@/content/en/karir'
import { idKarir } from '@/content/id/karir'

interface KarirPageProps {
  params: Promise<{ lang: string }>
}

export default async function KarirPage({ params }: KarirPageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const content = lang === 'en' ? enKarir : idKarir

  return (
    <main id="main">
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">{content.title}</h1>
          <p className="page-lead">{content.lead}</p>
        </div>
        <KarirSection content={content} />
      </div>
    </main>
  )
}
