# Homepage Visual Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage's visual presentation to match `visual-design-spec-2026-09.md` (Black & Yellow, Elevated) — full-bleed color bands, Fraunces italic accent typography, pill buttons — with zero copy changes.

**Architecture:** Pure presentation layer changes to existing React Server Components. No new routes, no data model changes, no copy edits. One new font loaded via `next/font/google`, one shared button radius change, then per-section restyles in the order they appear on the page.

**Tech Stack:** Next.js App Router, Tailwind CSS v4 (`@theme inline` in `globals.css`, no separate config file), `next/font/google`.

---

## Scope

**In scope (has an approved mockup behind it):** font setup, Header/nav button, Hero, Hero stat bar, ServicesPreview, WhyMetro, Testimonials, CTABanner.

**Out of scope — do not touch:** `Gallery.tsx`, `FAQ.tsx`, `SocialFeed.tsx`, `Footer.tsx`. None of these were part of any brainstorm mockup. Footer already fits the elevated system (dark band, no boxy cards) and needs no change. Gallery/FAQ/SocialFeed need their own mockup pass before anyone touches them — restyling them now would be a guess, not a design decision.

**No copy changes anywhere in this plan.** Every string that exists in a task's "before" code appears unchanged in its "after" code, unless the diff comment explicitly says otherwise.

## Verification method

This is a visual-only change set with no existing unit tests to extend (marketing site, no business logic in these components). Verification per task is:
1. `npm run build` from `metro-site/` — must complete with no type or lint errors
2. Visual confirmation — operator runs `npm run dev` themselves (do not start the dev server in this session — standing preference) and looks at the page, or the agent takes a screenshot via `mcp__chrome-devtools__take_screenshot` once told the dev server is up

---

### Task 1: Add the Fraunces accent font

**Files:**
- Modify: `metro-site/app/layout.tsx:1-19`
- Modify: `metro-site/app/globals.css:7-13`

- [ ] **Step 1: Add the Fraunces import and font instance**

In `metro-site/app/layout.tsx`, change the font import and add a third font instance:

```tsx
import { Montserrat, DM_Sans, Fraunces } from "next/font/google";
```

Add after the `dmSans` block (currently ends at line 19):

```tsx
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "600"],
  display: "swap",
});
```

- [ ] **Step 2: Register the font variable on `<html>`**

In the same file, change:

```tsx
      className={`${montserrat.variable} ${dmSans.variable} h-full antialiased`}
```

to:

```tsx
      className={`${montserrat.variable} ${dmSans.variable} ${fraunces.variable} h-full antialiased`}
```

- [ ] **Step 3: Wire the CSS variable into the theme**

In `metro-site/app/globals.css`, inside the `@theme inline { ... }` block, add a line next to the existing `--font-numeric` line (currently line 13):

```css
  --font-accent: var(--font-fraunces);
```

Add a utility class in the `@layer utilities` block (currently lines 146-150), next to `.font-numeric`:

```css
  .font-accent {
    font-family: var(--font-fraunces), serif;
    font-style: italic;
  }
```

- [ ] **Step 4: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors. `.font-accent` and `.font-numeric` are now both available as Tailwind utility classes throughout the codebase.

- [ ] **Step 5: Commit**

```bash
git add metro-site/app/layout.tsx metro-site/app/globals.css
git commit -m "feat: add Fraunces accent font for homepage visual refresh"
```

---

### Task 2: Pill-shaped buttons (shared component + Header)

**Files:**
- Modify: `metro-site/components/ui/shiny-button.tsx:24`
- Modify: `metro-site/components/layout/Header.tsx:80-83, 118-124`

- [ ] **Step 1: Change ShinyButton's corner radius from rounded-lg to rounded-full**

In `metro-site/components/ui/shiny-button.tsx` line 24, change:

```tsx
        "relative overflow-hidden rounded-lg px-6 py-2 font-medium transition-[transform,box-shadow] duration-300 ease-in-out hover:shadow hover:-translate-y-1 active:scale-[0.97]",
```

to:

```tsx
        "relative overflow-hidden rounded-full px-6 py-2 font-medium transition-[transform,box-shadow] duration-300 ease-in-out hover:shadow hover:-translate-y-1 active:scale-[0.97]",
```

This is a single-source change — `ShinyButton` is used by Hero (both desktop and mobile CTA) and CTABanner, so all three become pills automatically.

- [ ] **Step 2: Update Header's two inline buttons to match**

In `metro-site/components/layout/Header.tsx` line 80, change:

```tsx
            className="hidden md:inline-flex h-9 items-center rounded-md bg-brand-yellow px-4 text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
```

to:

```tsx
            className="hidden md:inline-flex h-9 items-center rounded-full bg-brand-yellow px-4 text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
```

At line 121, change:

```tsx
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-md bg-brand-yellow px-7 text-sm font-black tracking-widest text-brand-black"
```

to:

```tsx
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-brand-yellow px-7 text-sm font-black tracking-widest text-brand-black"
```

- [ ] **Step 3: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add metro-site/components/ui/shiny-button.tsx metro-site/components/layout/Header.tsx
git commit -m "feat: pill-shaped buttons site-wide (Header, Hero, CTABanner)"
```

---

### Task 3: Hero — eyebrow label and italic accent word

**Files:**
- Modify: `metro-site/components/sections/Hero.tsx:69-83`

- [ ] **Step 1: Add an eyebrow label above the headline and italicize the yellow phrase**

Replace lines 69-83 (the `<h1>` and the `<p>` subhead) with:

```tsx
            <div
              className="font-accent text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-brand-yellow mb-4 sm:mb-5 not-italic"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              Bakersfield &middot; Fully Mobile
            </div>

            <h1
              className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[1] tracking-tight uppercase mb-4 sm:mb-6"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              <span className="text-brand-white">Bakersfield&apos;s Premier</span><br />
              <span className="font-accent normal-case text-brand-yellow">{" "}Mobile Detailing</span>
              <span className="text-brand-white"> Service</span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg text-brand-white/70 max-w-md mx-auto mb-6 sm:mb-10 leading-relaxed"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              Professional detailing at your door because your time is worth it.
            </p>
```

Notes on this diff: the eyebrow label is new markup, not new copy — it states the same "Bakersfield, fully mobile" facts already established elsewhere on the page (stat bar, footer). The `<h1>` text itself is byte-for-byte unchanged; only the yellow span gains `font-accent normal-case` so "Mobile Detailing" renders in italic Fraunces instead of uppercase Montserrat, matching the approved mockup's accent-word treatment. `not-italic` on the eyebrow label keeps that specific line upright since `.font-accent` sets italic by default and small-caps labels read better upright.

- [ ] **Step 2: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add metro-site/components/sections/Hero.tsx
git commit -m "feat: hero eyebrow label and italic accent word"
```

---

### Task 4: Hero stat bar → full-bleed trust strip

**Files:**
- Modify: `metro-site/components/sections/Hero.tsx:120-183`

- [ ] **Step 1: Replace the 4-column bordered stat grid with a 3-stat full-bleed yellow band**

Per the spec, the trust strip is one full-bleed yellow band with the emphasized numbers in Fraunces italic. Operator's call on which 3: keep Years Experience, drop 24/7 Free Estimates. Replace lines 120-183 (the whole "Stat bar" block, from `{/* Stat bar */}` through its closing `</div>`) with:

```tsx
      {/* Trust strip — full-bleed yellow band */}
      <div className="relative z-10 bg-brand-yellow py-10 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-3 gap-6 text-center">

          <div className="flex flex-col items-center gap-1">
            <span className="font-accent text-4xl sm:text-5xl text-brand-black leading-none">5+</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/70">Years Experience</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="font-accent text-4xl sm:text-5xl text-brand-black leading-none">5.0</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/70">Google Rating</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="font-accent text-4xl sm:text-5xl text-brand-black leading-none">100%</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/70">Mobile Service</span>
          </div>

        </div>
      </div>
```

Resolved 2026-09-10: operator chose to drop "24/7 Free Estimates" and keep "5+ Years Experience," staying at 3 stats rather than merging to 4 (a 4-column band wasn't in any approved mockup and risks reintroducing the bordered-box look this plan replaces).

- [ ] **Step 2: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add metro-site/components/sections/Hero.tsx
git commit -m "feat: hero stat bar becomes full-bleed yellow trust strip"
```

---

### Task 5: ServicesPreview — services band with accent-serif prices

**Files:**
- Modify: `metro-site/components/sections/ServicesPreview.tsx:52-69, 100-124`

- [ ] **Step 1: Add a section label above the existing "Services" heading**

Replace lines 52-69 (the `{/* Header */}` block) with:

```tsx
        {/* Header */}
        <div className="mb-12">
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-yellow mb-3 not-italic">
            What We Do
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-brand-white leading-tight">
              Services
            </h2>
            <Link
              href="/services#essentials"
              className="text-xs font-bold uppercase tracking-widest text-brand-white/40 hover:text-brand-yellow transition-colors flex items-center gap-2"
            >
              Full pricing &amp; add-ons
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="mt-4 h-px bg-white/[0.07]" />
        </div>
```

- [ ] **Step 2: Switch the price text from `font-dm-sans` to `font-accent`**

At line 121, change:

```tsx
                <p className="text-2xl font-black text-brand-yellow font-dm-sans" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 16px rgba(0,0,0,0.8)" }}>
```

to:

```tsx
                <p className="text-2xl font-accent text-brand-yellow" style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 16px rgba(0,0,0,0.8)" }}>
```

(`font-black` is dropped here because Fraunces italic at weight 500-600 is the accent look — pairing it with `font-black` would force a heavier weight than the font family offers cleanly.)

At line 150, change the add-on price span:

```tsx
                    <span className="text-sm font-black text-brand-yellow font-dm-sans">{addon.price}</span>
```

to:

```tsx
                    <span className="text-sm font-accent text-brand-yellow">{addon.price}</span>
```

- [ ] **Step 3: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add metro-site/components/sections/ServicesPreview.tsx
git commit -m "feat: services section label and accent-serif pricing"
```

---

### Task 6: WhyMetro — band separation, section label, rounded corners

**Files:**
- Modify: `metro-site/components/sections/WhyMetro.tsx:49, 52-59`

Gap found in self-review: the spec calls for an alternating `#141414` band so consecutive sections read as distinct instead of blending into one flat background. `ServicesPreview` (Task 5) and `WhyMetro` currently both sit on `bg-site-bg` back to back — exactly the "flat background, no separation" problem this whole plan exists to fix. This task alternates WhyMetro's background.

- [ ] **Step 1: Change the section background to the alternating band color**

Line 49 currently:

```tsx
    <section className="bg-site-bg py-20 px-6 lg:px-8">
```

Change to:

```tsx
    <section className="bg-[#141414] py-20 px-6 lg:px-8">
```

- [ ] **Step 2: Add a section label above the existing headline**

Replace lines 52-57 (the headline block) with:

```tsx
        <div className="text-center mb-14">
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-yellow mb-4 not-italic">
            Why Metro
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-white tracking-tight">
            A Car Wash Rinses.<br />
            <span className="font-accent normal-case text-brand-yellow">A Detail Cleans.</span>
          </h2>
        </div>
```

Note: `"A Detail Cleans."` gains `font-accent normal-case` (italic Fraunces, not all-caps) as this section's one accent phrase, same pattern as the Hero headline. The text itself is unchanged.

- [ ] **Step 3: Round the card grid corners to match the new pill/band language**

Line 59 currently reads:

```tsx
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
```

Change `rounded-xl` to `rounded-2xl`:

```tsx
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
```

- [ ] **Step 4: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add metro-site/components/sections/WhyMetro.tsx
git commit -m "feat: WhyMetro band separation, section label, rounder corners"
```

---

### Task 7: Testimonials — banded background, accent-serif quote glyph

**Files:**
- Modify: `metro-site/components/sections/Testimonials.tsx:48-75`

Deviation from the mockup, noted up front: the approved mockups showed a single full-bleed yellow pull-quote. The live site has 3 real Google reviews in a grid; this task adds a 4th (Mary Grigoryan, provided 2026-09-10) and adapts the yellow-band idea to a section background instead of forcing everything down to a single quote. Real client reviews don't get cut to fit a mockup built before they existed.

- [ ] **Step 1: Add Mary's review to the `reviews` array**

At the top of the file, the `reviews` array (currently lines 5-21) ends with the Braden Baptista entry. Add a 4th entry after it:

```tsx
  {
    name: "Mary Grigoryan",
    body: "I wish I had taken a before and after picture! My car looks BRAND NEW!! I heard about Damian through word of mouth and I'll be doing the same! I'll be sending him to everyone I know 🙌🏻 🙌🏻",
    time: "",
  },
```

`time` is left as an empty string to match the existing field shape — it's declared on every review object but never actually rendered anywhere in this component's JSX, same as the other three.

- [ ] **Step 2: Change the section background to the yellow band and update the header label**

Replace line 48:

```tsx
    <section className="bg-site-bg py-20 px-6 lg:px-8">
```

with:

```tsx
    <section className="bg-brand-yellow py-20 px-6 lg:px-8">
```

Replace lines 52-56 (the heading) with:

```tsx
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-brand-black leading-tight">
              Straight From Our Clients
            </h2>
```

- [ ] **Step 3: Update the "See all on Google" link and divider for readability on yellow**

Line 61 currently:

```tsx
              className="text-xs font-bold uppercase tracking-widest text-brand-white/40 hover:text-brand-yellow transition-colors flex items-center gap-2"
```

Change to:

```tsx
              className="text-xs font-bold uppercase tracking-widest text-brand-black/50 hover:text-brand-black transition-colors flex items-center gap-2"
```

Line 69 currently:

```tsx
          <div className="mt-4 h-px bg-white/[0.07]" />
```

Change to:

```tsx
          <div className="mt-4 h-px bg-black/[0.12]" />
```

- [ ] **Step 4: Update the review cards for the new background and 4-card grid**

Replace lines 72-91 (the cards grid) with:

```tsx
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review.name} className="bg-brand-black rounded-2xl p-8 flex flex-col gap-4">
              <div className="font-accent text-5xl text-brand-yellow leading-none -mb-2">&ldquo;</div>
              <div className="flex items-center justify-between">
                <Stars />
                <div className="flex items-center gap-1.5 text-white/30">
                  <GoogleIcon />
                  <span className="text-xs font-medium">Google</span>
                </div>
              </div>
              <p className="text-base text-brand-white/70 leading-relaxed flex-1">
                &ldquo;{review.body}&rdquo;
              </p>
              <div className="pt-2 border-t border-white/[0.06]">
                <span className="text-sm font-black text-brand-white">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
```

This flips the cards to solid black on the new yellow section background (was translucent-white-on-dark before), moves from a 3-across grid to 2x2 to fit the new 4th review, and swaps the oversized quote mark to `font-accent` (Fraunces italic) instead of plain `font-black`. Existing review names, bodies, and star ratings are unchanged.

- [ ] **Step 5: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors.

- [ ] **Step 6: Commit**

```bash
git add metro-site/components/sections/Testimonials.tsx
git commit -m "feat: testimonials section becomes full-bleed yellow band, add Mary's review"
```

---

### Task 8: CTABanner — pill button already inherited, add italic accent word

**Files:**
- Modify: `metro-site/components/sections/CTABanner.tsx:37-42`

- [ ] **Step 1: Italicize the accent phrase in the CTA headline**

Replace lines 37-42:

```tsx
          <h2
            className="text-2xl sm:text-4xl font-black uppercase text-brand-white tracking-tight"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
          >
            Book online. We come to you.
          </h2>
```

with:

```tsx
          <h2
            className="text-2xl sm:text-4xl font-black uppercase text-brand-white tracking-tight"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
          >
            Book online. <span className="font-accent normal-case text-brand-yellow">We come to you.</span>
          </h2>
```

The button itself needs no changes here — it already renders through `ShinyButton`, which became a pill in Task 2.

- [ ] **Step 2: Verify**

Run: `cd metro-site && npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add metro-site/components/sections/CTABanner.tsx
git commit -m "feat: CTA banner italic accent phrase"
```

---

### Task 9: Full homepage visual check

- [ ] **Step 1: Operator starts the dev server**

The operator runs `npm run dev` in `metro-site/` (not the agent — standing preference from `feedback-dev-server.md`).

- [ ] **Step 2: Screenshot and review**

Once the server is confirmed running, use `mcp__chrome-devtools__navigate_page` to `http://localhost:3000` and `mcp__chrome-devtools__take_screenshot` to capture the homepage top-to-bottom (Hero, trust strip, Services, WhyMetro, Testimonials, CTABanner). Compare against the approved Black & Yellow mockup (`metro-site/.superpowers/brainstorm/1473-1789097864/content/black-yellow-elevated.html`).

- [ ] **Step 3: Final commit (if any fixes were needed from visual review)**

```bash
git add -A
git commit -m "fix: visual QA adjustments after homepage refresh screenshot review"
```

(Skip this commit if no fixes were needed.)
