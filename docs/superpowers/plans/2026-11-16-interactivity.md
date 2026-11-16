# Interaktivitas Swiss-Modern (A+B+C+D) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (or subagent-driven-development) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four on-brand interactions (VIEW CASE hover badge, running-text marquee, section scrollspy rail, magnetic footer CTA) without leaving the Swiss-Modern + Neo-Brutalist editorial style.

**Architecture:** Three new small components (one server, two client) plus CSS and content additions. No new dependencies: CSS animations + IntersectionObserver + pointer events only. All motion uses existing design tokens and respects `prefers-reduced-motion`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4 (plain CSS in `app/globals.css`), agent-browser for verification.

**Spec:** `docs/superpowers/specs/2026-11-16-interactivity-design.md`

## Global Constraints

- No new npm dependencies (no GSAP); use CSS + IntersectionObserver + pointer events.
- Only easing/duration tokens from `globals.css`: `--ease-out-expo`, `--ease-out-smooth`, `--ease-in-out`, `--duration-fast` (0.2s), `--duration-normal` (0.35s), `--duration-slow` (0.8s), `--duration-enter` (1.2s).
- Every animation wrapped in `prefers-reduced-motion: reduce` (use `useReducedMotion` hook for JS; media query for CSS).
- Text content lives in `content/[lang]/`, never inline in JSX.
- No border-radius > 8px; no big shadows; no multi-color gradients; glyphs (`+`, `*`, `✱`, numbers) instead of icon libraries.
- Responsive at 320 / 768 / 1440; pointer-fine-only interactions must be gated.
- Marquee moves longer than 5s → must have a pause control (hover-to-pause per DESIGN.md) and stop under reduced motion.
- Every interactive element keyboard-accessible with visible focus (R-32).

## Review Focus

These inputs/failure modes are the most likely to bite and get a check step in their owning task:

1. **Marquee seamless loop**: a half-width mismatch causes a visible jump at loop point. Check: two identical `.ticker-half` children and `translateX(-50%)`; no jump at the seam.
2. **Magnetic on a huge element**: footer headline shifting too far looks broken. Check: max offset ±6px, transform-only (no layout shift, `will-change: transform`).
3. **Scrollspy at a section boundary**: flicker between two active items when two sections straddle the middle band. Check: single IntersectionObserver over `[id]` with `rootMargin: -45% 0px -50%` and pick the last intersecting.
4. **VIEW CASE overlay covering content / unreachable by keyboard**: badge must not sit over the placeholder label and must appear on `:focus-visible`/`:focus-within`. Check: overlay is `pointer-events: none`, revealed on hover and focus-within.
5. **Reduced motion**: marquee must freeze and rail/magnetic must degrade to instant/no-op. Check: with `prefers-reduced-motion: reduce`, marquee static, magnetic transform off, rail click still works.

---

### Task 1: Content types + content values for all four features

**Files:**
- Modify: `content/types.ts`
- Modify: `content/id/homepage.ts`
- Modify: `content/en/homepage.ts`
- Modify: `content/id/portfolio.ts`
- Modify: `content/en/portfolio.ts`

**Interfaces:**
- Produces (consumed by Tasks 2–4):
  - `RailItem { id: string; label: string }` in `types.ts`
  - `HomepageContent.ticker: string`
  - `HomepageContent.rail: RailItem[]`
  - `HomepageContent.sections.work.viewLabel: string`
  - portfolio content objects gain `viewLabel: string`

- [ ] **Step 1: Add types.** In `content/types.ts`: add `RailItem`; add `ticker: string` and `rail: RailItem[]` as top-level fields on `HomepageContent`; add `viewLabel: string` to `HomepageContent['sections']['work']`.

- [ ] **Step 2: Add homepage content.** In `content/id/homepage.ts` and `content/en/homepage.ts`:
  - top level: `ticker` (`'KARYA YANG DIBUAT DENGAN SENGAJA'` / `'CREATIVE WORK, MADE ON PURPOSE'`) and `rail` array of 5 `RailItem`s whose `id` matches DOM ids and `label` is short editorial numbering:
    - id: `[{id:'hero',label:'01 / HERO'},{id:'about',label:'02 / TENTANG'},{id:'expertise',label:'03 / KEAHLIAN'},{id:'work',label:'04 / KARYA'},{id:'faq',label:'05 / FAQ'}]`
    - en: `[{id:'hero',label:'01 / HERO'},{id:'about',label:'02 / ABOUT'},{id:'expertise',label:'03 / EXPERTISE'},{id:'work',label:'04 / WORK'},{id:'faq',label:'05 / FAQ'}]`
  - `sections.work.viewLabel`: `'LIHAT STUDI'` / `'VIEW CASE'`.

- [ ] **Step 3: Add portfolio content.** In `content/id/portfolio.ts` add `viewLabel: 'LIHAT STUDI'`; `content/en/portfolio.ts` add `viewLabel: 'VIEW CASE'`.

- [ ] **Step 4: Type-check.** Run `npx tsc --noEmit`. Expected: PASS, no errors.

- [ ] **Step 5: Commit.**

```bash
git add content/types.ts content/id/homepage.ts content/en/homepage.ts content/id/portfolio.ts content/en/portfolio.ts
git commit -m "feat(content): tambah konten ticker, rail, dan view label"
```

---

### Task 2: VIEW CASE hover badge (feature A)

**Files:**
- Modify: `components/sections/WorkSection.tsx`
- Modify: `components/sections/PortfolioSection.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `content.viewLabel` (work) and `content.viewLabel` (portfolio, from Task 1).
- Produces: markup `.case-media > (.case-media-placeholder + .case-view)` reused by nothing else.

- [ ] **Step 1: Wrap media in WorkSection.** In `WorkSection.tsx`, replace the bare `<div className="case-media-placeholder">…</div>` with a `.case-media` wrapper containing the placeholder plus `<span className="case-view" aria-hidden="true">{content.viewLabel}</span>` after it. The overlay is `aria-hidden` (the card title already names the case; the badge is decorative).

- [ ] **Step 2: Same wrap in PortfolioSection.** Apply the identical wrapper in `PortfolioSection.tsx`, using `content.viewLabel`.

- [ ] **Step 3: Add CSS.** In `globals.css`, after `.case-media-placeholder` block: `.case-media { position: relative; overflow: hidden; }`; `.case-view { position: absolute; left: 0; bottom: 0; width: 100%; padding: 12px 16px; font-family: var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; font-size: 11px; color: var(--color-paper); background: var(--color-accent); transform: translateY(100%); transition: transform var(--duration-normal) var(--ease-out-smooth); pointer-events: none; }`. Reveal: `.work-card:hover .case-view, .work-card:focus-within .case-view { transform: translateY(0); }`.

- [ ] **Step 4: Verify in browser.** `agent-browser open http://localhost:3000/id`, snapshot the work card, confirm the overlay text `LIHAT STUDI` exists, then `mouse move` onto a card and confirm `transform: none`/`translateY(0)` via `get styles`. Repeat on `/id/portofolio` (`VIEW CASE`/`LIHAT STUDI`).

- [ ] **Step 5: Type-check + lint.** Run `npx tsc --noEmit` and `npm run lint`. Expected: PASS.

- [ ] **Step 6: Commit.**

```bash
git add components/sections/WorkSection.tsx components/sections/PortfolioSection.tsx app/globals.css
git commit -m "feat(work): badge VIEW CASE slide-up saat hover kartu karya"
```

---

### Task 3: Running-text marquee (feature B)

**Files:**
- Create: `components/sections/Ticker.tsx`
- Modify: `app/[lang]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `content.ticker` (from Task 1).
- Produces: `<Ticker text={string} />` (server component), inserted by the page.

- [ ] **Step 1: Create Ticker component.** `components/sections/Ticker.tsx` (server component, no `'use client'`): `export function Ticker({ text }: { text: string })`. Render `<div className="ticker" aria-hidden="true"><div className="ticker-track">…` with two identical `.ticker-half` children; each half repeats `text` joined by a `<span className="ticker-sep" aria-hidden="true">✱</span>` separator (render the phrase ~4 times per half so one half is wider than the viewport at 1440px).

- [ ] **Step 2: Insert into home page.** In `app/[lang]/page.tsx`, render `<Ticker text={content.ticker} />` immediately after `<HeroSection … />` and before `<ClientsMarquee … />`.

- [ ] **Step 3: Add CSS + keyframes.** In `globals.css`: `.ticker { overflow: hidden; border-top: 1px solid var(--color-dark-border); border-bottom: 1px solid var(--color-dark-border); background: var(--color-dark); color: #fff; }`. `.ticker-track { display: flex; width: max-content; animation: ticker 32s linear infinite; }`. `.ticker-half { display: flex; align-items: center; flex-shrink: 0; }`. Phrase styling: `font-family: var(--font-display); font-size: clamp(32px, 5vw, 72px); font-weight: 500; letter-spacing: -0.03em; padding: 24px 0; white-space: nowrap;` with `.ticker-sep { color: var(--color-rose); margin: 0 32px; }`. `@keyframes ticker { to { transform: translateX(-50%); } }`. Pause: `.ticker:hover .ticker-track { animation-play-state: paused; }`. Reduced motion: inside a `@media (prefers-reduced-motion: reduce)` block, `.ticker-track { animation: none; }`.

- [ ] **Step 4: Verify seamless + pause.** In agent-browser: load `/id`, confirm `.ticker` present and moving; `mouse move` over it and confirm `animation-play-state: paused`; screenshot the seam to confirm no jump. Set `media light reduced-motion`, confirm the track stops (`animation: none`).

- [ ] **Step 5: Type-check + lint.** Run `npx tsc --noEmit` and `npm run lint`. Expected: PASS.

- [ ] **Step 6: Commit.**

```bash
git add components/sections/Ticker.tsx app/[lang]/page.tsx app/globals.css
git commit -m "feat(ticker): running text marquee di bawah hero"
```

---

### Task 4: Section scrollspy rail (feature C)

**Files:**
- Create: `components/layout/SectionRail.tsx`
- Modify: `app/[lang]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `content.rail` (from Task 1).
- Produces: `<SectionRail sections={RailItem[]} />` (client component), rendered on the home page only.

- [ ] **Step 1: Create SectionRail.** `components/layout/SectionRail.tsx` (`'use client'`). `export function SectionRail({ sections }: { sections: RailItem[] })`. Use `useState` for active id and `useReducedMotion`. One IntersectionObserver over `sections.map(s => document.getElementById(s.id))` with `rootMargin: '-45% 0px -50% 0px'`; on entries, pick the last `isIntersecting` target and `setActive(id)`. Each item is a `<button type="button" aria-current={active === id ? 'true' : undefined}>` that calls `document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })`. Label is `section.label`. Root `<nav className="section-rail" aria-label="Bagian halaman">`.

- [ ] **Step 2: Insert into home page.** In `app/[lang]/page.tsx`, render `<SectionRail sections={content.rail} />` (position irrelevant; CSS fixes it).

- [ ] **Step 3: Add CSS.** In `globals.css`: `.section-rail { position: fixed; right: clamp(16px, 2vw, 40px); top: 50%; transform: translateY(-50%); z-index: 40; display: flex; flex-direction: column; gap: 12px; }`. Each `.section-rail button`: transparent bg, mono 11px, `color: var(--color-muted-text)`, `letter-spacing: 0.06em`, `text-transform: uppercase`, left-aligned, `cursor: pointer`, focus-visible outline accent. Active: `.section-rail button[aria-current='true'] { color: var(--color-accent); }` plus a small left tick `border-left: 2px solid var(--color-accent)` only on active (functional state, not decoration). Hide below 1024px / coarse pointer: `@media (max-width: 1023px), (pointer: coarse) { .section-rail { display: none; } }`.

- [ ] **Step 4: Verify scrollspy + click.** In agent-browser at 1440px: load `/id`, confirm rail present and `01 / HERO` has `aria-current`; scroll to `#about` and confirm active flips to `02 / TENTANG`; click rail item `04 / KARYA` and confirm the page scrolls to `#work`. Confirm rail is absent at 768px and 320px.

- [ ] **Step 5: Type-check + lint.** Run `npx tsc --noEmit` and `npm run lint`. Expected: PASS.

- [ ] **Step 6: Commit.**

```bash
git add components/layout/SectionRail.tsx app/[lang]/page.tsx app/globals.css
git commit -m "feat(rail): scrollspy section rail di halaman home"
```

---

### Task 5: Magnetic footer CTA (feature D)

**Files:**
- Create: `components/ui/Magnetic.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `<Magnetic>{children}</Magnetic>` (client component), applied to the footer headline only (single focal point, per spec "satu titik fokus, bukan semua tombol").

- [ ] **Step 1: Create Magnetic.** `components/ui/Magnetic.tsx` (`'use client'`). `export function Magnetic({ children }: { children: React.ReactNode })`. Gate with `window.matchMedia('(pointer: fine)')` and `useReducedMotion` (if coarse or reduced, render plain `children` with no listeners). Otherwise attach `onMouseMove` (compute delta from element center, clamp to ±6px, set `style.transform = translate(dx, dy)`) and `onMouseLeave` (reset to `translate(0,0)`). Wrap children in `<span className="magnetic" style={{ display: 'inline-block' }}>`. No rAF needed; the CSS transition provides the follow lag.

- [ ] **Step 2: Wrap footer headline.** In `Footer.tsx`, wrap the `.footer-headline` anchor content in `<Magnetic>`: `<Magnetic><a className="footer-headline" …>…</a></Magnetic>`.

- [ ] **Step 3: Add CSS.** In `globals.css`: `.magnetic { display: inline-block; transition: transform var(--duration-normal) var(--ease-out-smooth); will-change: transform; }`.

- [ ] **Step 4: Verify.** In agent-browser at 1440px: `mouse move` near the footer headline, confirm `get styles` reports a non-zero `transform` within ±6px; move away and confirm it returns to `none`. Confirm no layout shift (scroll width unchanged). With `media reduced-motion`, confirm no transform is applied on hover.

- [ ] **Step 5: Type-check + lint.** Run `npx tsc --noEmit` and `npm run lint`. Expected: PASS.

- [ ] **Step 6: Commit.**

```bash
git add components/ui/Magnetic.tsx components/layout/Footer.tsx app/globals.css
git commit -m "feat(magnetic): footer CTA mengikuti kursor (pointer fine saja)"
```

---

### Task 6: Full verification + Delivery Gate

**Files:** none (verification only).

- [ ] **Step 1: Type-check + lint.** Run `npx tsc --noEmit` and `npm run lint`. Expected: both PASS.

- [ ] **Step 2: Breakpoint overflow sweep.** In agent-browser, for `/id` and `/en` at 320 / 768 / 1440: confirm `document.documentElement.scrollWidth <= clientWidth` (no horizontal overflow) and rail hidden on mobile.

- [ ] **Step 3: axe audit.** Run `agent-browser a11y` on `/id` (home) and `/id/portofolio`. Expected: 0 violations; incomplete items unchanged from baseline (nav contrast over video, video-caption).

- [ ] **Step 4: Keyboard pass.** Tab through: rail buttons (reachable, `aria-current` on active, Enter scrolls), work cards (focus-within reveals VIEW CASE). Confirm visible focus outlines.

- [ ] **Step 5: Reduced-motion pass.** `agent-browser set media light reduced-motion`: marquee static, magnetic no-op, rail click still navigates.

- [ ] **Step 6: Report Delivery Gate** (PASS/FAIL per item) to the user; only commit the final state if all checks pass (each task already committed).

---
