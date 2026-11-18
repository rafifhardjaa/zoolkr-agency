import { notFound } from 'next/navigation'
import { getHomepageContent, isLocale } from '@/lib/i18n'
import { FaqSection } from '@/components/sections/FaqSection'
import { PageCover } from '@/components/ui/PageCover'
import { Accent } from '@/components/ui/Accent'

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
        <PageCover
          label={content.label}
          meta={content.subtitle}
          title={<Accent text={content.title} />}
          lead={content.intro}
          aside={{
            label: content.head.indexLabel,
            items: content.head.topics.map((topic) => ({ label: topic })),
          }}
          footLeft={content.head.footLeft}
          footRight={content.head.footRight}
        />
        <FaqSection content={content} hideTitle hideMeta />
      </div>
    </main>
  )
}
