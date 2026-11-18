import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageCover } from '@/components/ui/PageCover'
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
        <PageCover
          label={content.meta.label}
          meta={content.meta.subtitle}
          title={content.title}
          lead={content.lead}
          aside={{
            label: content.head.guideLabel,
            items: content.head.guide.map((item) => ({ label: item })),
          }}
          footLeft={content.head.footLeft}
          footRight={content.head.footRight}
        />
        <ContactSection content={content} />
      </div>
    </main>
  )
}
