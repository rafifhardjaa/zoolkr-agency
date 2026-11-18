import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PageCover } from '@/components/ui/PageCover'
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
        <PageCover
          label={content.head.label}
          meta={content.head.meta}
          title={content.title}
          lead={content.lead}
          aside={{
            label: content.head.indexLabel,
            items: content.services.map((service) => ({
              meta: service.number,
              label: service.title,
              href: `#layanan-${service.number}`,
            })),
          }}
          footLeft={content.head.footLeft}
          footRight={content.head.footRight}
        />
        <ServicesSection content={content} />
      </div>
    </main>
  )
}
