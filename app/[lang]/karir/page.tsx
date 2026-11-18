import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { KarirSection } from '@/components/sections/KarirSection'
import { PageCover } from '@/components/ui/PageCover'
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
        <PageCover
          label={content.head.label}
          meta={content.head.meta}
          title={content.title}
          lead={content.lead}
          aside={{
            label: content.head.guideLabel,
            items: content.head.guide.map((item) => ({ label: item })),
          }}
          footLeft={content.head.footLeft}
          footRight={content.head.footRight}
        />
        <KarirSection content={content} />
      </div>
    </main>
  )
}
