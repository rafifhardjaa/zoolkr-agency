import type { HomepageContent } from '@/content/types'

export const idContent: HomepageContent = {
  meta: {
    title: 'Zoolkr | Studio Kreatif Independen',
    description: 'Studio kreatif independen untuk brand yang ingin dilihat dua kali.',
  },
  nav: {
    brand: 'zoolkr',
    primaryLabel: 'Utama',
    links: [
      { label: 'Layanan', href: '/id/layanan' },
      { label: 'Portofolio', href: '/id/portofolio' },
      { label: 'FAQ', href: '/id/faq' },
      { label: 'Karir', href: '/id/karir' },
    ],
    languageLabel: 'Bahasa',
    skipLabel: 'Langsung ke konten',
    cta: {
      label: 'Kontak',
      href: '/id/kontak',
    },
    menu: {
      openLabel: 'Buka navigasi',
      closeLabel: 'Tutup',
      dialogLabel: 'Navigasi lengkap',
      contactLabel: 'Kontak',
      footLeft: 'KARYA YANG DIBUAT DENGAN SENGAJA.',
      footRight: '© 2026 ZOOLKR',
    },
  },
  hero: {
    topline: {
      left: 'ZOOLKR / STUDIO KREATIF',
      right: '01 / HERO',
    },
    place: {
      city: 'Semarang',
      country: 'Indonesia',
    },
    eyebrow: 'STUDIO KREATIF INDEPENDEN',
    headline: {
      line1: 'Karya yang menolak',
      line2Before: '',
      line2Emphasis: 'menyatu',
      line2After: '.',
    },
    intro: 'Studio untuk brand yang ingin dilihat dua kali.',
    cta: {
      label: 'Mulai proyek',
      href: 'mailto:hello@zoolkr.com',
    },
    foot: {
      left: 'KARYA YANG DIBUAT DENGAN SENGAJA.',
      right: '© 2026 ZOOLKR',
    },
    videoLabel: 'Cahaya marun abstrak yang melipat di atas latar gelap',
  },
  ticker: 'KARYA YANG DIBUAT DENGAN SENGAJA',
  railLabel: 'Bagian halaman',
  rail: [
    { id: 'hero', label: '01 / HERO' },
    { id: 'about', label: '02 / TENTANG' },
    { id: 'expertise', label: '03 / KEAHLIAN' },
    { id: 'work', label: '04 / KARYA' },
    { id: 'faq', label: '05 / FAQ' },
  ],
  sections: {
    clients: {
      label: 'IN GOOD COMPANY',
      note: 'Dua studi kasus portfolio',
    },
    about: {
      label: 'Z / SIAPA KAMI',
      subtitle: '02 / CARA KAMI BERPIKIR',
      manifesto: 'Karya yang kami buat, Anda bilang: *kita buat ini*.',
      body: 'Zoolkr adalah studio kreatif. Kami membangun website, memotret foto, dan memproduksi video. Kami juga menjalankan agency konten kreator untuk brand yang butuh suara asli di media sosial.',
      muted: 'Kami bekerja seperti tim kecil: satu proyek dalam satu waktu, satu keputusan dalam satu waktu, tanpa penyerahan antar departemen yang saling tidak mengenal.',
      caption: 'Ruang kerja studio',
      cta: { label: 'Keahlian kami', href: '#expertise' },
    },
    expertise: {
      label: 'Z / KEAHLIAN KAMI',
      subtitle: '03 / YANG KAMI LAKUKAN',
      title: 'Yang kami lakukan *dengan baik*.',
      intro: 'Kami bekerja dalam tiga praktik. Masing-masing diisi oleh orang yang melakukan hal itu setiap hari.',
      note: 'Kami menerima jumlah proyek terbatas setiap kuartal, sehingga karya tetap baik.',
      cta: { label: 'Mulai proyek', href: 'mailto:hello@zoolkr.com' },
      services: [
        {
          number: '01',
          tag: 'WEB',
          title: 'Pembangunan website',
          description:
            'Kami membangun website dengan Next.js, dari sketsa pertama sampai hari peluncuran. Cepat, dapat diakses, dan dibuat untuk tahan lama.',
          tags: ['Next.js', 'TypeScript', 'Tailwind'],
          image: {
            src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Tim bekerja dengan laptop di meja',
            width: 800,
            height: 533,
          },
        },
        {
          number: '02',
          tag: 'MEDIA',
          title: 'Fotografi dan video',
          description:
            'Kami memotret dan mengedit foto serta video untuk brand yang butuh lebih dari klip ponsel.',
          tags: ['Fotografi', 'Videografi', 'Editing'],
          image: {
            src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Fotografer memotret di luar ruangan',
            width: 800,
            height: 533,
          },
        },
        {
          number: '03',
          tag: 'CONTENT',
          title: 'Agency konten kreator',
          description:
            'Kami menjalankan agency konten kreator. Channel sosial Anda mendapatkan postingan asli, ditulis dan diambil oleh orang yang melakukannya setiap hari.',
          tags: ['Agency konten', 'Konten sosial', 'Strategi'],
          image: {
            src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80&fm=webp',
            alt: 'Tiga orang berdiskusi di meja kerja',
            width: 800,
            height: 533,
          },
        },
      ],
    },
    work: {
      label: 'Z / KARYA PILIHAN',
      subtitle: '04 / STUDI KASUS',
      title: 'Karya *pilihan*',
      intro:
        'Beberapa proyek yang kami banggakan. Masing-masing dimulai dari brief dan berakhir pada sesuatu yang masih bekerja.',
      viewLabel: 'LIHAT STUDI',
      viewHref: '/id/portofolio',
      filters: [{ label: 'Semua karya', count: '00' }],
      cases: [
        {
          number: '01',
          title: 'Katalog Produk Lokal',
          brand: 'Studi Konsep',
          category: 'WEB',
          categoryKey: 'all',
          image: {
            src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80&fm=webp',
            alt: 'Interior toko dengan rak produk',
            width: 1600,
            height: 1000,
          },
          description:
            'Studi kasus konsep katalog produk dengan antarmuka editorial dan navigasi yang jelas untuk brand makanan lokal.',
        },
        {
          number: '02',
          title: 'Seri Foto Produk',
          brand: 'Fotografi Produk',
          category: 'MEDIA',
          categoryKey: 'all',
          image: {
            src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80&fm=webp',
            alt: 'Kamera DSLR di atas latar putih',
            width: 1600,
            height: 1000,
          },
          description:
            'Studi kasus konsep seri foto produk dengan pencahayaan studio dan editing warna untuk brand minuman.',
        },
      ],
    },
    faq: {
      label: 'Z / PERTANYAAN UMUM',
      subtitle: '05 / PERTANYAAN',
      title: 'Pertanyaan *Baik*',
      items: [
        {
          question: 'Berapa biaya sebuah proyek website?',
          answer:
            'Setiap proyek dihargai setelah kami membaca brief. Kami tidak mempublikasikan daftar harga, karena setiap situs berbeda ukurannya.',
        },
        {
          question: 'Berapa lama sebuah proyek berlangsung?',
          answer:
            'Sebuah situs kecil membutuhkan waktu beberapa minggu. Proyek yang lebih besar membutuhkan waktu lebih lama. Kami berikan timeline setelah percakapan pertama.',
        },
        {
          question: 'Apakah Anda bekerja dengan brand di luar kota kami?',
          answer: 'Ya. Kami bekerja secara remote dengan klien di mana pun mereka berada.',
        },
        {
          question: 'Apakah Anda menangani hosting dan perawatan setelah peluncuran?',
          answer:
            'Kami meluncurkan situs dan kemudian menyerahkannya. Perawatan berkelanjutan adalah engagement terpisah.',
        },
        {
          question: 'Dapatkah Anda bekerja bersama tim yang sudah ada?',
          answer:
            'Ya. Kami masuk ke dalam tim Anda atau menjalankan proyek dari awal hingga akhir, mana yang lebih cocok.',
        },
      ],
      moreLabel: 'Lihat semua pertanyaan',
    },
    footer: {
      kicker: 'Punya proyek dalam pikiran?',
      cta: { label: 'Ngobrol dulu', href: 'mailto:hello@zoolkr.com' },
      email: 'hello@zoolkr.com',
      place: 'Semarang, Indonesia',
      topLabel: 'Kembali ke atas',
    },
  },
}