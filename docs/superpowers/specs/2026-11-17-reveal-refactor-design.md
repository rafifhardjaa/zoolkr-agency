# Desain: Reveal server-first + satu loop scroll + dedupe komponen

Tanggal: 2026-11-17

## Intent & mengapa

Animasi reveal sekarang bekerja, tapi mekanismenya tersebar: 35 elemen di homepage
masing-masing adalah client component dengan dua hook (reduced-motion + reveal
registration). Scroll ditangani empat listener terpisah yang semuanya membaca
layout, dan progress bar menulis state React tiap frame. Markup kartu layanan,
kartu kasus, dan tombol `+` juga disalin di beberapa file.

Tujuannya: satu mekanisme reveal untuk seluruh situs, satu loop scroll, dan satu
komponen per pola markup — tanpa mengubah tampilan atau rasa animasinya.

## Goals

- Satu `RevealEngine` client yang mendaftarkan semua `[data-reveal-el]`; tidak ada
  lagi hook reveal per elemen.
- Satu loop scroll bersama (`lib/scrollFeed.ts`) untuk reveal, progress bar, rail,
  dan nav sticky. Satu listener `scroll`/`resize`, satu rAF per frame.
- Loop reveal tidak lagi memanggil `getBoundingClientRect()` tiap frame; offset
  elemen di-cache dalam koordinat dokumen dan di-refresh saat resize / font siap.
- Progress bar dan rail menulis DOM langsung, tanpa `setState` per frame.
- Satu store `prefers-reduced-motion` (satu `matchMedia`), bukan satu per elemen.
- Ekstrak `ServiceCard`, `CaseCard`, dan `PlusLink`; hapus salinan markup.
- Pertahankan seluruh perilaku sekarang: reveal dua arah, stagger, mask, media
  parallax, reduced-motion, gutter rail 1024px, rail menyingkir di band gelap.

## Non-goals / anti-goals

- Tanpa dependency baru.
- Tanpa perubahan visual, copy, timing, easing, atau token.
- Tidak menyentuh cover halaman, hero, marquee, cursor ring, atau magnetic.
- Tidak mengubah struktur konten di `content/[lang]/`.
- Tidak mengejar skor Lighthouse; patokan performa adalah commit React per scroll,
  layout read per frame, dan frame drop dibanding baseline yang sudah diukur.

## Baseline yang diukur (sebelum)

Homepage `/id`, 1440×577, scroll 6 langkah dalam 2,56 detik (React render profile):

- 35 elemen `[data-reveal]`, semuanya `RevealText` client component.
- 54 commit React; `ScrollProgress` menulis state tiap frame, `NavBar` dan
  `SectionRail` ikut render tiap frame.
- FPS rata-rata 30 (cap headless), 21 frame drop.
- 4 listener `scroll` terpisah, 5 `matchMedia` terpisah.

## Constraints

- Token dan kontrak gerak dari `guide/DESIGN.md`; reveal tetap berbasis progress
  `--reveal-p`, bukan transition sekali-jalan.
- `prefers-reduced-motion: reduce` → tidak ada pendaftaran, tidak ada `data-reveal`,
  konten tampil normal.
- Tanpa `transform` pada `#main` (akan menjebak rail fixed).
- Keyboard dan `aria-current` tidak berubah.
- Semua perubahan tetap di working tree sampai diminta commit.

## Approaches

1. **Server-first reveal (dipilih).** `RevealText` kehilangan `'use client'` dan
   hook; markup membawa `data-reveal-el` + `data-delay`. Satu `RevealEngine` di
   layout memindai dan mendaftarkan. Semua konsumen scroll berlangganan satu
   `scrollFeed`. Duplikasi mekanisme hilang, bukan cuma dirapikan.
2. **Motion-only.** Markup tetap, hook dioptimalkan (cache offset, transform
   langsung, shared reduced-motion). Diff kecil, tapi 35 boundary client dan lima
   salinan `matchMedia` tetap ada.
3. **Dedupe-only.** Hanya ekstrak kartu/tombol. Paling aman, jank scroll tidak
   berubah.

Dipilih 1 karena hanya pendekatan itu yang menghapus sumber duplikasinya. Aman
karena semua gambar dan heading sudah punya tinggi eksplisit, jadi cache offset
tidak akan salah setelah font/gambar termuat.

## Bagian how yang sudah diputuskan

### `lib/scrollFeed.ts`

```
type ScrollState = { y: number; viewport: number; max: number; progress: number; atBottom: boolean }
subscribeScroll(frame: (state: ScrollState) => boolean | void): () => void
requestFrame(): void
onLayoutChange(fn: () => void): () => void
```

Satu listener `scroll`/`resize` (passive) menjadwalkan satu rAF. Setiap frame:
hitung state sekali, panggil semua subscriber `frame` berurutan. Subscriber
mengembalikan `true` selama masih menyelesaikan lerp, dan feed terus meminta
frame selama ada satu saja yang `true` — jadi smoothing `0.18` tetap jalan
setelah scroll berhenti tanpa rAF kedua. `requestFrame()` untuk kebutuhan
sekali jalan (mis. setelah `scan()`). Subscriber yang mendaftar setelah frame
berjalan mendapat nilai awal secara sinkron, supaya tidak ada kilatan hidden.

`onLayoutChange` dipanggil untuk resize viewport **dan** perubahan tinggi
dokumen (`ResizeObserver` pada `document.documentElement`), karena accordion FAQ
yang terbuka menggeser semua elemen di bawahnya tanpa resize.

### `lib/revealStore.ts`

- `Entry = { el, shift, top, progress, written }`; `top` = koordinat dokumen
  tanpa transform, dihitung saat daftar dan di-refresh lewat `onLayoutChange`
  + `document.fonts.ready`.
- Pengukuran bebas transform dilakukan dengan melepas `data-reveal` semua entri,
  membaca `top` dalam satu tugas sinkron, lalu memasangnya lagi sebelum frame
  berikutnya — tidak ada paint di antaranya, jadi tidak ada kilatan. Saat
  registrasi hal ini otomatis karena atribut memang belum terpasang.
- Target dihitung dari `top - state.y` terhadap `0.92 × viewport` dan
  `0.34 × viewport`; aturan `atBottom` dan "sudah lewat" tetap seperti sekarang.
- Hanya menulis `--reveal-p` bila nilainya berubah > `0.0005`; entri yang sudah
  settled (target 1) atau masih jauh di bawah (target 0) tidak menulis apa pun.
- `register(el, delay)` memasang `data-reveal="on"` dan mengembalikan pembersih.
- Selisih yang diterima: pengukuran tanpa transform membuat reveal mulai sekitar
  satu tinggi translate varian `up` lebih awal (~28px) dibanding loop lama, yang
  mengukur rect setelah transform ikut aktif. Ini di bawah 3% viewport pada
  900px dan tidak mengubah urutan atau durasi yang dirasakan; dicek di verifikasi.

### `components/ui/RevealEngine.tsx`

- `'use client'`, dipasang sekali di `app/[lang]/layout.tsx` setelah `<main>`.
- Jika reduced-motion: tidak memindai apa pun, atribut tidak dipasang.
- `scan()` memakai `querySelectorAll('[data-reveal-el]')` + `WeakSet` agar elemen
  tidak terdaftar dua kali; dipanggil saat mount, setelah `usePathname()` berubah,
  dan lewat `MutationObserver` pada `#main` (childList, subtree, dibatasi rAF).
- Perubahan media reduced-motion: matikan semua entri + lepas `data-reveal`; saat
  dimatikan ulang, pindai lagi.

### `components/ui/RevealText.tsx`

Server component. Props sama (`as`, `className`, `delay`, `href`, `stagger`,
`variant`). Render `data-reveal-el=""` dan `data-delay={delay}`; kelas varian dan
`reveal-mask-inner` tidak berubah. Tidak ada import hook.

### `components/layout/ScrollProgress.tsx`

Tanpa state: berlangganan `scrollFeed`, menulis
`bar.style.transform = 'scaleX(p)'` langsung ke DOM.

### `hooks/useNavSticky.ts` dan `components/layout/SectionRail.tsx`

Keduanya berhenti memasang listener sendiri dan berlangganan `scrollFeed`.
`SectionRail` tetap memakai IntersectionObserver untuk section aktif.

### `hooks/useReducedMotion.ts`

Store modul + `useSyncExternalStore`; satu `matchMedia('(prefers-reduced-motion: reduce)')`
dengan listener yang dibagi semua pemakai.

### Dedupe markup

- `components/sections/ServiceCard.tsx` — dipakai `ExpertiseSection` (h3) dan
  `ServicesSection` (h2).
- `components/sections/CaseCard.tsx` — dipakai `WorkSection` (dengan link + label
  "view", h3) dan `PortfolioSection` (dengan deskripsi, h2).
- `components/ui/PlusLink.tsx` — label + `+`; memilih `next/link` untuk href
  internal dan `<a>` untuk mailto/eksternal; dipakai CTA hero, nav, dan keempat
  section CTA.
- `hooks/useScrollReveal.ts` dihapus setelah `ContactForm` ikut mekanisme markup
  (`data-reveal-el`), karena tidak ada lagi pemakai.
- CSS: gabungkan hanya deklarasi yang benar-benar kembar (parallax media, aturan
  stagger). Tidak ada perubahan nilai.

## Yang diserahkan ke builder

- Daftar pasti aturan CSS kembar yang digabung, setelah dicek satu per satu.
- Apakah `data-delay` perlu dibaca dari CSS (`--stagger` var) atau tetap lewat
  `register()` — pilih yang tidak menambah pembacaan layout.
- Cara `MutationObserver` menangani dialog menu dan elemen yang di-unmount
  (pembersihan entri lewat `WeakSet` + cek `isConnected` di tick).

## Verifikasi

- `npx tsc --noEmit`, `npx eslint app components hooks`, `npx next build`.
- agent-browser di `/id` dan `/en`: 35 elemen tetap ter-reveal, `--reveal-p`
  monoton turun/naik, stagger anak berurutan, media curtain, form kontak.
- Reduced-motion: tidak ada `data-reveal`, semua konten terlihat.
- Accordion FAQ: buka satu item, refresh offset berjalan, elemen di bawahnya
  tetap reveal pada posisi yang benar (tidak ada yang muncul terlalu cepat).
- Rail: gutter 1440/1024 tanpa tumpang tindih; `data-idle` benar di atas ticker
  dan footer.
- Mobile 390: tanpa overflow horizontal.
- Profil render ulang dengan skrip scroll yang sama: commit React dari scroll
  mendekati nol (hanya `LiveClock` per detik), tidak ada layout read di loop
  reveal, frame drop tidak lebih buruk dari baseline.
- First-load JS tidak naik; route yang sekarang menghidrasi 35 `RevealText`
  seharusnya turun.
