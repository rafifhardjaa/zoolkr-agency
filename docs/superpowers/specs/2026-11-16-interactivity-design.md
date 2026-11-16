# Desain: Interaktivitas Swiss-Modern (A+B+C+D)

Tanggal: 2026-11-16

## Intent & mengapa

Situs sudah punya lapisan interaksi dasar (scroll reveal, nav flip, progress bar,
cursor ring, akordeon FAQ, kolom sticky). Tujuannya menambah interaktivitas tanpa
keluar dari gaya Swiss-Modern + Neo-Brutalist editorial: terasa hidup/premium,
menaikkan engagement, dan storytelling scroll yang lebih sinematik.

## Goals

- A. Badge "VIEW CASE" slide-up saat hover kartu karya (sudah ditetapkan DESIGN.md baris 190, belum dirender).
- B. Running text marquee besar (sudah ditetapkan DESIGN.md baris 255: 32s linear infinite, pause saat hover; `@keyframes` belum ada).
- C. Scrollspy rail: angka section aktif (01 / HERO, dst) fixed di tepi, ikut scroll.
- D. Magnetic CTA: tombol primer bergeser tipis ke arah kursor.

## Non-goals / anti-goals

- Tanpa parallax berlebihan, kursor custom penuh, particle, glow, glassmorphism.
- Tanpa dependency baru (tetap GSAP-free; pakai CSS + IntersectionObserver + rAF).
- Tanpa reveal gambar clip-path (ditunda sampai gambar asli ada).
- Tidak menyentuh warna/token/heading yang sudah diatur.

## Constraints (dari DESIGN.md / RULES / AGENTS)

- Hanya easing & durasi token yang ada (`--ease-out-expo/smooth`, `--duration-fast/normal/slow/enter`).
- Semua animasi dibungkus `prefers-reduced-motion` (pakai `useReducedMotion`).
- Konten teks dari `content/[lang]/`, bukan inline di JSX.
- Tanpa border-radius > 8px, tanpa shadow besar, tanpa gradient warna-warni.
- Keyboard: hover state juga dipicu `focus-visible`.
- Responsif 320/768/1440; interaksi pointer-fine saja (rail & magnetic & cursor sudah gated).

## Approaches (yang dipilih)

1. **A: badge hover** — bungkus `.case-media-placeholder` jadi `.case-media` dengan
   overlay `.case-view` (mono uppercase, background accent, teks paper). Badge
   `transform: translateY(100%)`, slide ke 0 saat `.work-card:hover` / `:focus-visible`.
   Label dari konten (`work.viewLabel` / `portfolio.viewLabel`).
2. **B: running text** — strip full-width `.ticker` berisi frase berulang dalam
   `span` yang di-seamless duplikat, `@keyframes ticker { transform: translateX(-50%) }`,
   32s linear, `:hover { animation-play-state: paused }`. Ditempatkan di bawah hero
   (divider sinematik sebelum About). Teks dari konten (`ticker` per halaman).
3. **C: scrollspy rail** — komponen client `SectionRail` (home only, desktop/pointer-fine),
   fixed di kiri-bawah. Daftar section `[hero, about, expertise, work, faq]` + label.
   Aktif dari IntersectionObserver (`rootMargin: -45% 0px -50%`), tombol scroll-smooth
   ke `#id`. `aria-current` untuk item aktif.
4. **D: magnetic CTA** — komponen client `Magnetic` pembungkus `.solid-button` &
   `.footer-headline`. Saat pointer dekat, set CSS var `--mx/--my` (max ±6px),
   `transform: translate(var(--mx), var(--my))`, spring balik saat leave. Hanya
   pointer-fine + non-reduced-motion.

## Yang diserahkan ke builder

- Detail persis nilai translate/radius magnetic (±6px, radius 60px).
- Struktur DOM & nama class mengikuti konvensi yang sudah ada.
- Penempatan `SectionRail` hanya di `page.tsx` home.

## Panggilan saya (boleh dikoreksi saat membaca)

- Running text ditaruh di bawah hero, sebelum About.
- Magnetic juga dipasang di footer headline (satu titik fokus, bukan semua tombol).
- Scrollspy hanya di home, desktop ≥ 1024px + pointer fine.
