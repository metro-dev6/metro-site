# metro-site — Current Session State

> Updated by /handoff. Read this at the start of every Site session.
> Last updated: 2026-08-13

## What's Live on metroautodetailing.pro

| Section | Status | Notes |
|---------|--------|-------|
| Hero | Live | hero-bg.mp4 (4.2MB). hero-poster.jpg = frame from truck video. |
| ServicesPreview | Live | Exterior card = IMG_6184.JPEG. Water Spot Removal now $60. |
| WhyMetro | Live | — |
| Gallery | **Live — mobile rebuilt 2026-08-02** | Desktop: unchanged 2-slide bento carousel. Mobile: new single-column letterboxed swipe stack (`MobileGalleryStack`), flattened to all 10 photos in one sequence, captions always visible (fixed hover-only bug). Only one tree ever mounts (`useIsDesktop` hook via `matchMedia`) — CSS-only hiding was tried first and found to still let hidden images download, so it was replaced with real conditional mounting. **Not committed to GitHub yet** — 9 local commits on `master`, not pushed. |
| Testimonials | Live | — |
| CTABanner | Live | "Book online. We come to you." — 15% off removed commit ef644dd. |
| FAQ | Live | Accepts optional faqs/heading props. Deposit answer now $30 (was $20, fixed 2026-08-02). |
| Footer | Live | Facebook URL correct. |
| AnnouncementBar | Live | "Mobile Detailing in Bakersfield / Book Online" |
| Blog /blog | Live, noindex | Hidden from nav. |
| Location pages | Live | 6 locations, explicit index:true. Interior Detail already listed correctly at $200. |
| /services | **Live — Interior Detail added 2026-08-02** | Essentials tier now has 4 cards (Signature Wash, Interior Detail, Refresh Detail, Full Detail) — was missing Interior Detail entirely despite it being sold on the homepage and estimate form. $200, +$20 larger vehicle. Card layout itself is clean; page is 11,744px tall on mobile (~14 screens of scroll) — flagged, not fixed, operator didn't ask for it this session. |
| /services/exterior-detail | Built locally, NOT pushed | Content revision pending. Water Spot Removal addon corrected to $60. |
| Other service sub-pages | Redirect to /services | No blank indexed pages. |
| Estimate /estimate | Live | Multi-vehicle form → /thank-you. Water Spot Removal addon now $60, 42px tap targets confirmed clean on mobile. |
| /thank-you | Live | 6 sections: confirmation, roadmap, contrast, review, loyalty, guarantee. Fires `estimate_submitted` gtag event on load. Confirmed clean on mobile audit — no overflow, no clutter issues. |
| GA4 | Live | G-LM507WTMXH. `estimate_submitted` event — still not confirmed showing in GA4 Realtime/Admin, carried multiple sessions. |
| GSC | Linked to GA4 | Linked 2026-07-18. Data flowing. |
| SocialFeed | Not rendered | Hold until social content built up. |
| Favicon | Live | Metro emblem (1.png). |
| Meta Pixel | **Not installed** | Operator understands what it does (free, works on all traffic, needs ads running to pay off). Needs Pixel ID from Facebook Events Manager (Business Settings → Data Sources → Pixels) before it can be wired in. |
| /maintenance-terms | **Built 2026-08-13, NOT pushed** | Static terms page, content from `canonical/pricing-framework.md` (24-hour cancellation notice — RULE-021, reverted 2026-08-17 via RULE-027 after briefly being 12 hours under RULE-025). Unblocks Template 2/4 email links, which had been pending on this page's existence. `npm run build` verified clean 2026-08-17. |

---

## Immediate Next Steps (Priority Order)

0. **Visual design direction concepts — session interrupted mid-brainstorm 2026-08-13.** Operator wants multiple themed concept directions for the site (current dark-theme + yellow accent flagged as generic/safe, not distinctive). `superpowers:brainstorming` skill was invoked; visual companion tool was offered but operator ended the session before responding. Next session: re-offer the companion, then continue clarifying questions (which pages get concepts — likely start with a lower-stakes page rather than a live one — how many directions, aesthetic starting points e.g. industrial/utilitarian was floated as a fit for a mobile detailing brand).
1. **Estimate form total should repeat at the bottom, near Send Request.** Currently the running total (`grandTotal`, `app/estimate/EstimateForm.tsx:276`) only shows once, below the services checklist near the top of the form. On a long scroll (vehicle fields, info fields, condition photos) a visitor loses sight of the number before hitting submit. Add a second total display near the "Send Request" button. Flagged 2026-08-02, not built.
2. **Meta Pixel install** — get the Pixel ID, wire into `layout.tsx` next to the existing GA4 script, fire a "Lead" event on estimate submit (same pattern as `estimate_submitted`).
3. **Finish gallery verification** — full interactive browser check (swipe through all 10 photos, drag a comparison slider, confirm desktop bento renders correctly) was interrupted by an MCP disconnect. Network-level fix (image count) was confirmed; the visual/interaction pass was not re-run after reconnecting.
4. **Loyalty Eligible badge** — add to qualifying service cards on /services page (Refresh, Exterior, Full Detail). Carried from prior session.
5. **Exterior detail content revision** — operator sends Claude Desktop brief, swap copy in, push.
6. **5 remaining sub-pages** — after exterior detail content approved.
7. **`/services` page length** — 11,744px on mobile, ~14 screens of scroll because every tier prints its full feature checklist inline. Flagged during 2026-08-02 audit, not addressed. Worth a future pass (accordion collapse per tier, or trim the checklist) if bounce data on that page supports it.
8. **Mobile nav backdrop scrim** — the mobile menu dropdown is opaque itself but has no dimming layer behind it, so the page content directly abuts the open menu. Flagged 2026-08-02, not fixed.
9. **aggregateRating** — needs real GBP review count before adding to schema.
10. **OG image** — homepage and services pages.

---

## Recent Pushes

**Nothing pushed since 2026-07-26** — now 10 commits local only (9 from 2026-08-02 + 1 from 2026-08-13), need a push request.

| Commit | Date | What |
|--------|------|------|
| (pending) | 2026-08-13 | Add /maintenance-terms page |
| 307f699 | 2026-08-02 | Interior Detail added to /services, stale Water Spot/deposit pricing fixed |
| 914fcb7 | 2026-08-02 | Gallery rebuild spec and plan docs added |
| 9439f33 | 2026-08-02 | .gitignore: ignore .vercel and .env* |
| 64ec791 | 2026-08-02 | Gallery: matchMedia-based conditional mount, fixes mobile double image-load |
| dfb99fe | 2026-08-02 | Gallery: dedupe item ids in flattened array |
| 7cea104 | 2026-08-02 | Gallery: render mobile as letterboxed swipe stack, desktop unchanged |
| 156d502 | 2026-08-02 | Gallery: fix swipe fighting comparison slider drag, add scroll-direction lock |
| d0d3de5 | 2026-08-02 | Gallery: add mobile letterboxed gallery stack component |
| b1bd279 | 2026-07-26 | Thank-you text sizing round 2 |
| ef644dd | 2026-07-19 | Thank-you page rebuild (6 sections), CTABanner promo removed |

---

## Mobile Gallery Rebuild — Architecture (2026-08-02)

**Files:**
- `components/ui/mobile-gallery-stack.tsx` — new. Single-column swipeable stack, `object-contain` letterboxing (no crop), captions as normal below-image text (not hover-gated). Swipe disabled on comparison-slider items specifically (prevents fighting the slider's own drag) — those items still reachable via prev/next buttons.
- `components/sections/Gallery.tsx` — `SLIDES.flat()` produces `ALL_ITEMS` (all 10 photos, unique ids 1-10). `{isDesktop ? (...desktop bento...) : (<MobileGalleryStack items={ALL_ITEMS} />)}` — only one tree ever mounts, no CSS-hiding.
- `hooks/use-is-desktop.ts` — new. `useIsDesktop(breakpointPx = 768)`, defaults `false` (SSR-safe, no hydration mismatch, and guarantees the image-heavy desktop tree never mounts on mobile even momentarily). Corrects via `matchMedia` after mount. Known accepted tradeoff: real desktop users see a brief flash of the mobile stack before the swap.
- `components/ui/interactive-bento-gallery.tsx`, `components/ui/image-comparison.tsx` — untouched, desktop-only now.

**Latent note (not a live bug):** if the first item in `ALL_ITEMS` (currently `id:1`, "Exterior Detail", `type: "image"`) is ever reordered to a `type: "comparison"` item, the brief desktop-load flash would eagerly load two full comparison images instead of one lazy one, since `ImageComparison`'s `<img>` tags don't have `loading="lazy"`. Worth a comment or a follow-up if the gallery data order changes.

---

## Service Sub-Pages — All 6

| Service | Slug | Price | Status |
|---------|------|-------|--------|
| Signature Wash | /services/signature-wash | $80 / $100 | Redirects to /services |
| Exterior Detail | /services/exterior-detail | $150 / $170 | Built locally, content pending |
| Interior Detail | /services/interior-detail | $200 / $240 | Redirects to /services |
| Refresh Detail | /services/refresh-detail | $250 / $290 | Redirects to /services |
| Full Detail | /services/full-detail | $400 / $440 | Redirects to /services |
| Headlight Restoration | /services/headlight-restoration | $80 | Redirects to /services |

---

## Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout. JSON-LD schema, metadataBase, GA4 scripts. Meta Pixel not yet added here. |
| `app/thank-you/page.tsx` | Thank-you page. |
| `app/thank-you/ConversionEvent.tsx` | Fires `estimate_submitted` gtag event on mount. |
| `components/sections/CTABanner.tsx` | CTA section. |
| `next.config.ts` | Redirects, security headers. |
| `app/services/page.tsx` | Essentials/Protection/Restoration/Deep Clean/Maintenance sections — Interior Detail now included. |
| `app/services/[slug]/page.tsx` | Exterior-detail local build + redirect logic for other slugs. |
| `app/maintenance-terms/page.tsx` | Maintenance Plan terms, static page, built 2026-08-13. |
| `components/sections/FAQ.tsx` | Accordion, deposit answer $30. |
| `components/sections/Gallery.tsx` | `SLIDES`/`ALL_ITEMS`, desktop/mobile split via `useIsDesktop`. |
| `components/ui/mobile-gallery-stack.tsx` | Mobile-only gallery renderer. |
| `hooks/use-is-desktop.ts` | Breakpoint-detection hook, SSR-safe. |
| `app/globals.css` | `--color-site-bg: #050606` |
| `docs/superpowers/specs/2026-08-02-mobile-gallery-rebuild.md` | Gallery rebuild spec. |
| `docs/superpowers/plans/2026-08-02-mobile-gallery-rebuild.md` | Gallery rebuild implementation plan. |

---

## Background

All sections use `bg-site-bg` → `--color-site-bg: #050606`.
Facebook URL: `https://www.facebook.com/profile.php?id=61586613950253`
Canonical domain: `https://metroautodetailing.pro` (non-www).
GA4 Measurement ID: G-LM507WTMXH
