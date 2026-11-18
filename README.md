# Zoolkr

Website agency kreatif dua bahasa. Halaman utama, layanan, portofolio, FAQ, karir, dan kontak dirender dari satu set konten yang sama.

![Next.js](https://img.shields.io/badge/Next.js%2015.5-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React%2019.3-087EA4?style=flat-square&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![Zod](https://img.shields.io/badge/Zod%204-3E67B1?style=flat-square&logo=zod&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form%207-EC5990?style=flat-square&logo=reacthookform&logoColor=white) ![Resend](https://img.shields.io/badge/Resend%206-000000?style=flat-square&logo=resend&logoColor=white)

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflareworkers&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js%2020%2B-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint%209-4B32C3?style=flat-square&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier%203-F7B93E?style=flat-square&logo=prettier&logoColor=1a1a1a)

## Stack

| Bagian          | Teknologi                                   | Versi              |
| --------------- | ------------------------------------------- | ------------------ |
| Framework       | Next.js App Router, React Server Components | 15.5.29            |
| UI              | React                                       | 19.3.1             |
| Bahasa          | TypeScript strict                           | 5                  |
| Styling         | Tailwind CSS 4 dan CSS custom properties    | 4.3.5              |
| Form            | React Hook Form dan Zod                     | 7.92, 4.6          |
| Email           | Resend                                      | 6.38               |
| Hosting         | Cloudflare Workers lewat OpenNext           | 1.20               |
| Browser test    | Playwright                                  | 1.65               |
| Lint dan format | ESLint 9, Prettier 3                        | 9, 3               |
| Runtime         | Node.js                                     | 20 atau lebih baru |

Token warna, tipografi, dan spacing ada di `app/globals.css`. Aturan visualnya ada di `guide/DESIGN.md`.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Rute `/` diarahkan ke `/en` atau `/id` mengikuti header `Accept-Language`.

Dev server bisa jalan tanpa `.env`. Isi variabel berikut hanya kalau form kontak dan email ikut diuji:

```bash
# .env.local
RESEND_API_KEY=
CONTACT_FORM_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`RESEND_API_KEY` dan `CONTACT_FORM_EMAIL` dipakai oleh `app/api/contact`. Selama keduanya kosong, pesan tetap divalidasi dan direspons sukses, tetapi tidak ada email yang terkirim. `NEXT_PUBLIC_SITE_URL` dipakai untuk metadata dan punya fallback `http://localhost:3000`.

## Scripts

| Perintah                   | Fungsi                                          |
| -------------------------- | ----------------------------------------------- |
| `npm run dev`              | Dev server di port 3000                         |
| `npm run build`            | Build produksi Next.js                          |
| `npm run start`            | Jalankan hasil build                            |
| `npm run lint`             | ESLint untuk seluruh repo                       |
| `npm run build:cloudflare` | Build worker Cloudflare lewat OpenNext          |
| `npm run preview`          | Preview worker di lingkungan lokal              |
| `npm run deploy`           | Deploy worker ke Cloudflare                     |
| `npm run optimize:media`   | Regenerasi video dan poster hero dari `assets/` |

`optimize:media` butuh `ffmpeg` dan `cwebp` terpasang.

## Struktur

```text
app/[lang]/        halaman per bahasa
app/api/contact/   endpoint form kontak
components/        layout, sections, dan komponen ui
content/en, id/    seluruh teks halaman
lib/               i18n, metadata, validasi env, reveal
hooks/             perilaku client seperti sticky nav
guide/             dokumen produk, desain, dan aturan kode
public/            gambar dan video
```

## Bahasa

Rute yang tersedia: `/en` dan `/id`, masing-masing dengan `layanan`, `portofolio`, `faq`, `karir`, dan `kontak`. Tipe konten di `content/types.ts` memaksa kedua bahasa punya bentuk yang sama, jadi menambah field berarti mengisi versi `en` dan `id`.

## Deploy

```bash
npm run build:cloudflare
npm run deploy
```

Butuh akun Cloudflare dan `npx wrangler login` sekali di awal. Konfigurasi worker ada di `wrangler.jsonc`, sedangkan adapter OpenNext dan cache asetnya ada di `open-next.config.ts`.

## Dokumentasi

- [PRD](guide/PRD.md): scope produk dan halaman
- [Architecture](guide/ARCHITECTURE.md): struktur folder dan keputusan teknis
- [Design](guide/DESIGN.md): token, tipografi, dan aturan visual
- [Stack](guide/STACK.md): daftar dependency yang disetujui
- [Rules](guide/RULES.md): aturan kode yang tidak boleh dilanggar
- [Codebase](guide/CODEBASE.md): peta kode dan konvensi
- [Security](guide/SECURITY.md): penanganan input dan header
- [Changelog](guide/CHANGELOG.md): riwayat perubahan
