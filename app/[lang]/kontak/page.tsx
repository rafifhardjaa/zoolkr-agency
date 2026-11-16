import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { ContactSection } from '@/components/sections/ContactSection'
import { enKontak } from '@/content/en/kontak'
import { idKontak } from '@/content/id/kontak'

interface KontakPageProps {
  params: Promise<{ lang: string }>
}

export default async function KontakPage({ params }: KontakPageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const content = lang === 'en' ? enKontak : idKontak

  return (
    <main id="main">
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">{content.title}</h1>
          <p className="page-lead">{content.lead}</p>
        </div>
        <ContactSection content={content} />
      </div>
    </main>
  )
}
