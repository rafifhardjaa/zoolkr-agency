# Reveal server-first + one scroll loop + component dedupe: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the per-element reveal hook with one engine and one scroll loop, then extract the duplicated card and CTA markup, with zero visual or timing change.

**Architecture:** `lib/scrollFeed.ts` owns the only scroll, resize, and layout observers. `lib/revealStore.ts` caches reveal offsets in document coordinates and writes `--reveal-p` from the shared frame. `RevealEngine` (one client component in the locale layout) registers `[data-reveal-el]` elements, so `RevealText` becomes a server component.

**Tech Stack:** Next.js 15.5, React 19.3, TypeScript 5, plain CSS in `app/globals.css`. No test runner in the repo and no new dependencies allowed.

**Spec:** `docs/superpowers/specs/2026-11-17-reveal-refactor-design.md`

## Global Constraints

- No new dependencies.
- No change to visual result, timing, easing, copy, or design tokens.
- `prefers-reduced-motion: reduce` means no registration and no `data-reveal`; content must stay visible.
- No `transform` on `#main`.
- Reveal math keeps `START = 0.92`, `RANGE = 0.34`, `SMOOTH = 0.18`, `MAX_SHIFT = 0.45`.
- Leave everything uncommitted until the user asks for a commit.
- There is no test runner: each task's gate is `npx tsc --noEmit`, `npx eslint <touched paths>`, and the browser probe named in Task 9 (run the relevant probe as soon as its task lands).

## Review Focus

- An element revealed while reduced motion is on must never be hidden: verify no `data-reveal` and full opacity at 1440.
- FAQ accordion open must not leave elements below it revealing early or late: offsets refresh on document height change.
- A route change (home to `/id/kontak`) must not leak the previous page's entries or double-register the new ones.
- Scroll to the very bottom must settle every visible reveal to 1 even mid-lerp.
- Media curtain wrappers must keep a measurable box so the image clip does not collapse the frame.

---

### Task 1: Shared scroll feed

**Files:**
- Create: `lib/scrollFeed.ts`
- Verify: `npx tsc --noEmit`

**Interfaces:**
- Produces:
  ```ts
  export interface ScrollState { y: number; viewport: number; max: number; progress: number; atBottom: boolean }
  export type ScrollFrame = (state: ScrollState) => boolean | void
  export function subscribeScroll(frame: ScrollFrame): () => void
  export function requestFrame(): void
  export function onLayoutChange(fn: () => void): () => void
  ```

- [ ] **Step 1: Write `lib/scrollFeed.ts`**

Module state: `subscribers = new Set<ScrollFrame>()`, `layoutListeners = new Set<() => void>()`, `frameId = 0`, `installed = false`.

`readState()` returns `y = window.scrollY`, `viewport = window.innerHeight`, `max = document.documentElement.scrollHeight - viewport`, `progress = max > 0 ? clamp(y / max) : 0`, `atBottom = y + viewport >= document.documentElement.scrollHeight - 2`.

`install()` runs once: passive `scroll` → `schedule()`, `resize` → `schedule()` plus `notifyLayout()`, and a `ResizeObserver` on `document.documentElement` (guarded by `typeof ResizeObserver !== 'undefined'`) → `notifyLayout()` plus `schedule()`.

`schedule()` is a no-op on the server or when `frameId` is set. `tick()` clears `frameId`, reads state once, iterates a snapshot of subscribers, keeps a frame request alive while any subscriber returned `true`, and returns immediately when there are no subscribers.

`subscribeScroll` installs, adds the subscriber, calls it once synchronously with `readState()`, schedules a frame, and returns a remover.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

---

### Task 2: One reduced-motion store

**Files:**
- Modify: `hooks/useReducedMotion.ts`
- Verify: `npx tsc --noEmit`

**Interfaces:**
- Produces: `useReducedMotion(): boolean` (same signature as today).

- [ ] **Step 1: Rewrite the hook as a module store**

Create the `MediaQueryList` lazily behind `typeof window === 'undefined'`, hold `listeners = new Set<() => void>()`, and attach the `change` listener to that one query on first subscribe. Return `useSyncExternalStore(subscribe, () => query?.matches ?? false, () => false)`.

- [ ] **Step 2: Verify one query per page**

Run `grep -rn "matchMedia" hooks components lib` and confirm only `hooks/useReducedMotion.ts` matches.

---

### Task 3: Reveal store and engine

**Files:**
- Create: `lib/revealStore.ts`, `components/ui/RevealEngine.tsx`
- Modify: `app/[lang]/layout.tsx`
- Verify: `npx tsc --noEmit`, `npx eslint lib components/ui app`

**Interfaces:**
- Consumes: `subscribeScroll`, `requestFrame`, `onLayoutChange` (Task 1), `useReducedMotion` (Task 2).
- Produces:
  ```ts
  export function registerReveal(el: HTMLElement, delay: number): () => void
  export function refreshReveals(): void
  export function clearReveals(): void
  ```

- [ ] **Step 1: Write `lib/revealStore.ts`**

`Entry = { el, shift, top, height, progress, written, initialized }`. Constants mirror the deleted hook.

`measure(entry, state)` replaces the live rect: `const top = entry.top - state.y`, `const bottom = top + entry.height`. Keep the rule order exactly: `bottom <= 0 → 1`; `state.atBottom && top < state.viewport → 1`; `top > state.viewport * (START + RANGE) → 0`; then clamp `(viewport * START - top) / (viewport * RANGE)` and apply the shift division.

The frame subscriber lerps with `SMOOTH`, marks `animating` only when `abs(target - progress) > 0.0005`, and writes `--reveal-p` only when it moved by more than `0.0005` since the last write. Drop entries whose `el.isConnected` is false and remove their attribute.

`registerReveal` measures `top = rect.top + window.scrollY` and `height = rect.height` before any attribute exists, installs a single `onLayoutChange(refreshReveals)` on first registration, sets `data-reveal="on"`, writes the synchronous initial progress, calls `requestFrame()`, and returns a remover that deletes the entry, removes the attribute, and removes `--reveal-p`.

`refreshReveals` removes `data-reveal` from every live entry, reads all `top` and `height` values in the same synchronous task, restores the attribute, and calls `requestFrame()`. It must not clear `--reveal-p`.

`clearReveals` removes every entry and its attribute; it is used when reduced motion turns on.

- [ ] **Step 2: Write `components/ui/RevealEngine.tsx`**

`'use client'` component returning `null`. Effect depends on `[reducedMotion, pathname]`. When reduced, call `clearReveals()` and register nothing. Otherwise: `registry = new Map<Element, () => void>()`, `root = document.getElementById('main')`, `scan()` registers every `root.querySelectorAll('[data-reveal-el]')` element not already in the registry, reading `Number(el.dataset.delay ?? 0) || 0`. Run `scan()` immediately, then `document.fonts?.ready.then(() => refreshReveals())` behind a cancelled flag.

Observe `root` with a `MutationObserver` on `{ childList: true, subtree: true }`, coalesced through one `requestAnimationFrame`. Skip re-registration for elements already in the registry and for detached elements. Cleanup disconnects the observer, cancels the pending frame, and runs every registry remover.

- [ ] **Step 3: Mount it**

In `app/[lang]/layout.tsx`, render `<RevealEngine />` right after `{children}` and before `<Footer>`.

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint lib components/ui app`
Expected: exit 0.

---

### Task 4: Server-rendered reveal markup

**Files:**
- Modify: `components/ui/RevealText.tsx`, `components/sections/ContactForm.tsx`
- Delete: `hooks/useScrollReveal.ts`
- Verify: `npx tsc --noEmit`, `npx eslint components hooks`

**Interfaces:**
- Consumes: `data-reveal-el` scanning from Task 3.
- Produces: `RevealTextProps` unchanged (`as`, `className`, `delay`, `href`, `stagger`, `variant`).

- [ ] **Step 1: Make `RevealText` a server component**

Remove `'use client'`, both hook imports, and the ref. Build props as `{ className: revealClasses, 'data-reveal-el': '' }`, add `data-delay` only when `delay !== undefined`, and add `href` when `as === 'a' && href`. Keep the existing class composition and the `reveal-mask-inner` child for `variant === 'mask'`.

- [ ] **Step 2: Move `ContactForm` onto the markup mechanism**

Drop the `useReducedMotion` and `useScrollReveal` imports and the `formRef`. Keep `className="contact-form reveal-stagger"` and add `data-reveal-el=""`. Every other behavior stays as is.

- [ ] **Step 3: Delete the old hook**

Delete `hooks/useScrollReveal.ts`. Run `grep -rn "useScrollReveal" . --include=*.ts --include=*.tsx` and confirm no matches outside `docs/`.

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint components hooks`
Expected: exit 0, and the 5 pre-existing `<img>` warnings only.

---

### Task 5: Direct-DOM progress bar

**Files:**
- Modify: `components/layout/ScrollProgress.tsx`
- Delete: `hooks/useScrollProgress.ts`
- Verify: `npx tsc --noEmit`

**Interfaces:**
- Consumes: `subscribeScroll` (Task 1).

- [ ] **Step 1: Rewrite `ScrollProgress`**

Keep the same markup. Hold a `barRef`, subscribe in an effect, and write `bar.style.transform = 'scaleX(' + state.progress + ')'` with no state. Remove the style prop from the bar.

- [ ] **Step 2: Delete the hook and confirm**

Run: `grep -rn "useScrollProgress" . --include=*.ts --include=*.tsx` then `npx tsc --noEmit`. Expected: no matches, exit 0.

---

### Task 6: Nav sticky and section rail on the feed

**Files:**
- Modify: `hooks/useNavSticky.ts`, `components/layout/SectionRail.tsx`
- Verify: `npx tsc --noEmit`, `npx eslint hooks components/layout`

**Interfaces:**
- Consumes: `subscribeScroll`, `onLayoutChange` (Task 1).

- [ ] **Step 1: `useNavSticky`**

Keep the `{ isStuck }` return and the subpage behavior (`!track → true`). Cache `bottomDoc = rect.bottom + window.scrollY`, refresh it from `onLayoutChange`, and inside the frame set stuck from `bottomDoc - state.y <= 0`. Use the functional `setIsStuck(prev => prev === next ? prev : next)` so React bails out when nothing changed. Remove the local listener and rAF.

- [ ] **Step 2: `SectionRail` overBand**

Keep the IntersectionObserver for `active` untouched. Cache the fixed rail's viewport box and each `.ticker, footer` band's document-space top and bottom. Subscribe to the feed and compare in viewport space (`bandTop - state.y` against the rail box), again with a bail-out state update. Refresh both caches from `onLayoutChange`. Remove the local listener.

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint hooks components/layout`
Expected: exit 0.

---

### Task 7: Extract `PlusLink`, `ServiceCard`, `CaseCard`

**Files:**
- Create: `components/ui/PlusLink.tsx`, `components/sections/ServiceCard.tsx`, `components/sections/CaseCard.tsx`
- Modify: `components/sections/HeroSection.tsx`, `components/layout/NavBar.tsx`, `components/sections/ExpertiseSection.tsx`, `components/sections/ServicesSection.tsx`, `components/sections/WorkSection.tsx`, `components/sections/PortfolioSection.tsx`, `components/sections/KarirSection.tsx`
- Verify: `npx tsc --noEmit`, `npx eslint components`

**Interfaces:**
- Produces:
  ```ts
  export interface PlusLinkProps { href: string; label: string; className?: string; plusClassName?: string }
  export function PlusLink(props: PlusLinkProps): React.JSX.Element
  export interface ServiceCardProps { service: ServiceItem; index: number; headingLevel: 'h2' | 'h3' }
  export function ServiceCard(props: ServiceCardProps): React.JSX.Element
  export interface CaseCardProps { item: CaseItem; index: number; headingLevel: 'h2' | 'h3'; link?: { href: string; label: string }; showDescription?: boolean }
  export function CaseCard(props: CaseCardProps): React.JSX.Element
  ```

- [ ] **Step 1: `PlusLink`**

Render `next/link` when the href does not start with `http:`, `https:`, `mailto:`, or `tel:`; otherwise a plain `<a>`. Children are `<span>{label}</span>` plus `<span className={plusClassName} aria-hidden="true">+</span>`. `className` goes on the outer element.

- [ ] **Step 2: Replace the six CTA call sites**

Hero (`text-link` / `text-link-plus`), NavBar (`nav-cta`), Expertise, Services, Portfolio, and Karir (`solid-button`). Markup and classes must match what the call site renders today.

- [ ] **Step 3: `ServiceCard`**

Move the article from `ExpertiseSection` verbatim, with `as={headingLevel}` on the title and `delay={index * 60}` on `service-top`. Use it in both sections: `h3` in Expertise, `h2` in Services.

- [ ] **Step 4: `CaseCard`**

Move the article from `WorkSection`. When `link` is set, wrap the image in `.case-link` with the aria label `` `${link.label}: ${item.title}` `` and append the `.case-view` span. When `showDescription` is set, append `<p className="case-desc">`. Use `h3` in Work and `h2` in Portfolio.

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint components`
Expected: exit 0. Production HTML for both pages must keep the same tag structure.

---

### Task 8: CSS dedupe and stale comments

**Files:**
- Modify: `app/globals.css`
- Verify: `npx next build` in Task 9

**Interfaces:**
- None.

- [ ] **Step 1: Hoist the repeated `--rp` derivation**

Add `[data-reveal] { --rp: min(1, max(0, var(--reveal-p, 0))); }` and delete the three identical local declarations in `.reveal[data-reveal]`, `.reveal-mask[data-reveal] .reveal-mask-inner`, and `.reveal-media[data-reveal] img`. Values do not change.

- [ ] **Step 2: Update the reveal comment**

The block above `.reveal[data-reveal]` still says "the hook writes". Change it to name `lib/revealStore.ts`. Leave every other comment alone.

- [ ] **Step 3: Confirm nothing else is truly twin**

`grep -n "aspect-ratio: 1.93" app/globals.css` and the image rules already share one selector list; the hover scales differ (1.04 vs 1.035). Record that no further merge was made, and do not invent one.

---

### Task 9: Verify parity and performance

**Files:** none.

- [ ] **Step 1: Static gates**

Run `npx tsc --noEmit`, `npx eslint app components hooks lib`, then stop the dev server, `rm -rf .next`, and run `npx next build`. Expected: all exit 0; only the 5 pre-existing `<img>` warnings.

- [ ] **Step 2: Start the server**

Run `npm run dev` in the background and wait for `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/id` to return `200`.

- [ ] **Step 3: Reveal parity at 1440**

With agent-browser: `set viewport 1440 900`, open `/id`, scroll in six steps over 2.5 s, and assert `document.querySelectorAll('[data-reveal]').length === 35`, that every sampled `--reveal-p` moves monotonically down and back up, that stagger children settle in order, that media wrappers still have a non-zero height, and that the contact form reveals.

- [ ] **Step 4: Reduced motion**

Relaunch with `--force-prefers-reduced-motion=reduce`, reload `/id`, and assert zero `[data-reveal]` elements and `opacity: 1` on a reveal heading.

- [ ] **Step 5: FAQ reflow**

Open the first accordion item, then scroll down and assert the elements below reveal normally, with no reveal stuck at a non-zero off-screen progress.

- [ ] **Step 6: Rail and mobile**

At 1440 and 1024, confirm the rail gutter does not overlap content and `data-idle` is set over the ticker and footer. At 390, confirm `document.documentElement.scrollWidth === innerWidth`.

- [ ] **Step 7: Render profile**

Open with `--enable react-devtools`, record `react renders start`, run the same scroll script, then `react renders stop --json`. Expected: commits from scroll near zero (only `LiveClock` per second), and frame drops no worse than the baseline of 21.

- [ ] **Step 8: Route change**

Navigate home, then to `/id/kontak` and back. Assert no stale `data-reveal` elements remain from the previous page and every new reveal registers exactly once.
