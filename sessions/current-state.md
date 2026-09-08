# metro-site — Current Session State

> Updated by /handoff. Read this at the start of every Site session.
> Last updated: 2026-09-07

## 2026-09-07 Session — Bug fixes, SEO audit fixes, location strategy review

All changes below are **local only, build-verified, not pushed** — per standing subpage-push rule.

**Fixed:**
- Interior Detail falsely claimed exterior windows were cleaned (`app/services/page.tsx:48`, `public/llms.txt:33`) — now says "Interior windows cleaned."
- Real estimate-cart bug from a Downloads brief (`estimate-cart-bug.md`): selections made via "Add to Estimate" on `/services` only carried to `/estimate` through the cart bar's own "Start Estimate" button — every other CTA on the site (header, Hero, CTABanner, location/blog/service pages) dropped the cart silently. Fixed with a mount-effect fallback that reads `localStorage` directly when no `?services=` param is present (`app/estimate/EstimateForm.tsx:89-98`, exported `readEstimateCart` from `hooks/use-estimate-cart.ts`). Verified live via chrome-devtools: seeded cart, loaded bare `/estimate`, confirmed checkbox pre-checked.
- New `phone_click` gtag event wired to all 4 `tel:` links site-wide via a new `components/PhoneLink.tsx` client component (`AnnouncementBar.tsx`, `Footer.tsx`, `thank-you/page.tsx`, `services/[slug]/page.tsx`). GA4's `click` event was an undifferentiated bucket covering phone clicks and social-icon clicks together — this splits phone-call intent out. Not yet showing real data (needs a push + real clicks first); do not mark it a GA4 key event until confirmed firing.
- SEO audit (`knowledge/sources/research/metro-seo-audit-2026-09.md`, spot-verified accurate against 3 concrete claims before trusting the rest): H1 missing-space bug on `/` and `/estimate` (adjacent `<span>`s with no space character — matters for AI crawlers, since `robots.txt` invites them in), `sitemap.ts` hardcoded to `www` while every canonical tag is non-www (now fixed, plus every ServicesPreview card got real descriptive alt text), homepage meta description trimmed 175→139 chars, `/services` title shortened 67→43 chars and its description expanded 99→155 chars with a price/CTA anchor. Two of the audit's "missing alt" findings (Hero and CTABanner background images) were false positives — both are correctly decorative (`alt=""` + `aria-hidden="true"`), not bugs.

**Also filed** (per document-ingestion.md): SEO audit findings added to `canonical/market-intelligence.md` ("SEO Content/Technical Audit (2026-09-07)" subsection) and `my-project/active-commitments.md` (corrected a stale "sitemap needs no work" claim, added the quick-win list and a pricing-transparency FAQ/blog opportunity). Ceramic coating, paint correction, and fleet-landing-page recommendations from the audit were explicitly rejected by the operator — not filed as open items.

**Reviewed, not yet actioned — location page strategy:** operator is working a location-page rebuild plan with a separate Claude chat (2 drafts reviewed tonight, both from Downloads/uploads, not this vault). Final version: 14 total location pages (up from the current 6), two geographic clusters. Southwest cluster (9 pages: Southwest Bakersfield catch-all + Seven Oaks, Terra Vista, Stockdale Estates, Southern Oaks, Tevis Ranch, The Oaks, Stone Meadows, Haggin Oaks). Northwest cluster (5 pages, new territory: Rosedale catch-all + Riverlakes, Shiloh Estates, Brimhall Estates, Nottingham Estates). Net new work: 9 new pages, plus rewrites on Stockdale (re-scope) and Rosedale (full rewrite from an 80-90 word placeholder). Southwest Bakersfield and Rosedale are being kept as catch-all pages linking to the named ones, not dropped — resolves an SEO-equity/redirect risk flagged on an earlier draft of the plan. **Caught one factual error in the plan doc:** it claims Terra Vista's live copy frames it as "a different part of town" from the other neighborhoods — checked `app/locations/[slug]/page.tsx:71`, this isn't true, the copy already correctly says "southwest Bakersfield." That "fix" item doesn't apply; likely bled over from an earlier draft's own data-table mistake, not an actual site bug. **Flagged, not decided:** this is 9 new pages + 2 rewrites stacked on top of the 6 service sub-pages that are already the standing priority — real sequencing question for a solo evening/weekend schedule, operator's call.


## What's Live on metroautodetailing.pro

| Section | Status | Notes |
|---------|--------|-------|
| Hero | Live | hero-bg.mp4 (4.2MB). hero-poster.jpg = frame from truck video. |
| ServicesPreview | Live | Exterior card = IMG_6184.JPEG. Water Spot Removal now $60. |
| WhyMetro | Live | — |
| Gallery | **Live — mobile rebuilt 2026-08-02, pushed and deployed same day** | Desktop: unchanged 2-slide bento carousel. Mobile: new single-column letterboxed swipe stack (`MobileGalleryStack`), flattened to all 10 photos in one sequence, captions always visible (fixed hover-only bug). Only one tree ever mounts (`useIsDesktop` hook via `matchMedia`) — CSS-only hiding was tried first and found to still let hidden images download, so it was replaced with real conditional mounting. |
| Testimonials | Live | — |
| CTABanner | Live | "Book online. We come to you." — 15% off removed commit ef644dd. |
| FAQ | Live | Accepts optional faqs/heading props. Deposit answer now $30 (was $20, fixed 2026-08-02). |
| Footer | Live | Facebook URL correct. |
| AnnouncementBar | Live | "Mobile Detailing in Bakersfield / Book Online" |
| Blog /blog | Live, noindex | Hidden from nav. |
| Location pages | Live | 6 locations, explicit index:true. Interior Detail already listed correctly at $200. |
| /services | **Live — Interior Detail added 2026-08-02, Service/Offer schema added 2026-08-23** | Essentials tier now has 4 cards (Signature Wash, Interior Detail, Refresh Detail, Full Detail) — was missing Interior Detail entirely despite it being sold on the homepage and estimate form. $200, +$20 larger vehicle. Card layout itself is clean; page is 11,744px tall on mobile (~14 screens of scroll) — flagged, not fixed. `SERVICES_SCHEMA` OfferCatalog (12 Service+Offer entries covering all 6 core services + 6 add-ons) added 2026-08-23. |
| /services/exterior-detail | Live — handled by `app/services/[slug]/page.tsx`, no separate local-only file | Copy revision still pending (operator to send brief). Water Spot Removal addon corrected to $60. |
| Other service sub-pages | Redirect to /services | No blank indexed pages. |
| Estimate /estimate | Live | Multi-vehicle form → /thank-you. Water Spot Removal addon now $60, 42px tap targets confirmed clean on mobile. |
| /thank-you | Live | 6 sections: confirmation, roadmap, contrast, review, loyalty, guarantee. Fires `estimate_submitted` gtag event on load. Confirmed clean on mobile audit — no overflow, no clutter issues. |
| GA4 | Live | G-LM507WTMXH. `estimate_submitted` event — still not confirmed showing in GA4 Realtime/Admin, carried multiple sessions. |
| GSC | Linked to GA4 | Linked 2026-07-18. Data flowing. |
| SocialFeed | Not rendered | Hold until social content built up. |
| Favicon | Live | Metro emblem (1.png). |
| Meta Pixel | **Not installed** | Operator understands what it does (free, works on all traffic, needs ads running to pay off). Needs Pixel ID from Facebook Events Manager (Business Settings → Data Sources → Pixels) before it can be wired in. |
| /maintenance-terms | **Live — pushed and deployed 2026-08-17** | Static terms page, content from `canonical/pricing-framework.md` (24-hour cancellation notice — RULE-021, briefly 12 hours under RULE-025, reverted 2026-08-17 via RULE-027). Linked from the site footer as of this session (was live but orphaned — no page linked to it). Unblocks Template 2/4 email links. `npm run build` verified clean 2026-08-17. |

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
9. ~~**aggregateRating**~~ — done 2026-08-23, hardcoded 5.0/4 reviews in `layout.tsx`. Fast-decay: update whenever review count changes or it goes stale vs. GBP.
10. **OG image** — homepage and services pages.
11. **"Premier" headline** — `components/sections/Hero.tsx:72` reads "Bakersfield's Premier Mobile Detailing Service," conflicts with `anti-misclassification.md`'s guardrail against premium/bougie positioning. Flagged 2026-08-23, not fixed — needs operator decision (change copy or carve a rule exception).
12. **Review-request push** — `skills/review-request/SKILL.md` is stale (wrong greeting format, wrong SMS sign-off rule), needs go-ahead to fix, then push after every job. Confirmed 2026-08-23 as the top lever on two fronts: AI/LLM visibility (Metro absent from ChatGPT/Claude answers where every competitor surfaced has 55-361 reviews vs. Metro's 4) and organic CTR (Metro ranks #1 for "mobile detailing"/"auto detailing"/"car detailing near me" with near-zero clicks — no star rich-snippet without more review volume behind the new `aggregateRating`).
13. **Check TopDetailers directory listing** — ChatGPT cited "TopDetailers" by name twice as a source for competitor recommendations during the 2026-08-23 AI-visibility test. Unconfirmed whether Metro has a listing there.
14. **Homepage + service copy rewrite** — compact "who/what/where" format for AI extractability, per 2026-08-23 scoped AI-SEO plan. Site already has the specificity (Koch Chemie S003, Stinger 918) this format needs — copy pass, not new research.
15. **FAQ expansion** — add more direct Q&A pairs (parking/access, pet hair, water-hookup questions) to the existing FAQ, per 2026-08-23 scoped AI-SEO plan.
16. **NAP consistency check** — GBP, Yelp, Facebook, Bing Places should all match name/phone/address/service-area exactly.
17. **Bing Webmaster Tools + AI Performance report** — set up to actually measure whether AI-citation work is moving anything, since Bing's AI Performance report shows which pages get cited by Copilot/Bing AI summaries.
18. **Build out 5 stub service pages** — `signature-wash`, `interior-detail`, `refresh-detail`, `full-detail`, `headlight-restoration` currently `redirect("/services")` instead of rendering (see Service Sub-Pages table below). `exterior-detail` is a working template to copy — hero, what's included, products, comparison, FAQ, CTA, all sourced from content already in `pricing-framework.md` and `services/page.tsx`'s plan arrays. Flagged 2026-08-23, deferred as too large for one evening session.

---

## Recent Pushes

**2026-08-23** — canonical/redirect conflict fixed (7 files had `alternates.canonical` pointing at `www.metroautodetailing.pro` while `next.config.ts` 301-redirects that exact URL to non-www — real cause of duplicate indexing found in a live GSC Pages.csv export, where the homepage was indexed 3 separate ways and every location page indexed twice). Also added Service/Offer OfferCatalog schema to `/services` and `aggregateRating` to the site-wide LocalBusiness schema in `layout.tsx`. Pushed as `cb4fa06`.

**Corrected 2026-08-17** — prior entries here claiming "10 commits unpushed since 2026-07-26" were stale. Verified against both `git log origin/master..HEAD` and Vercel's deployment history: the 8/2 gallery batch was pushed and deployed same day, and production tracked GitHub exactly through commit `3a2fa1c` (8/2) until tonight. Only the 8/13 maintenance-terms commit was ever actually sitting local-only — now resolved.

| Commit | Date | What |
|--------|------|------|
| cceafc5 | 2026-08-17 | Link maintenance-terms page from footer |
| 3e2cca8 | 2026-08-17 | Fix maintenance-terms cancellation window, 12hr to 24hr (RULE-027) |
| 138f104 | 2026-08-13 | Add /maintenance-terms page |
| 3a2fa1c | 2026-08-02 | docs: update session state for 2026-08-02 handoff |
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
| `app/layout.tsx` | Root layout. LocalBusiness/AutomotiveBusiness JSON-LD schema (now with `aggregateRating`, 2026-08-23), metadataBase, GA4 scripts. Meta Pixel not yet added here. |
| `app/thank-you/page.tsx` | Thank-you page. |
| `app/thank-you/ConversionEvent.tsx` | Fires `estimate_submitted` gtag event on mount. |
| `components/sections/CTABanner.tsx` | CTA section. |
| `next.config.ts` | Redirects (www → non-www 301, matches canonical tags as of 2026-08-23), security headers. |
| `app/services/page.tsx` | Essentials/Protection/Restoration/Deep Clean/Maintenance sections — Interior Detail included. `SERVICES_SCHEMA` OfferCatalog added 2026-08-23. |
| `app/services/[slug]/page.tsx` | Exterior-detail local build + redirect logic for other slugs. |
| `app/maintenance-terms/page.tsx` | Maintenance Plan terms, static page, built 2026-08-13, pushed 2026-08-17. |
| `components/layout/Footer.tsx` | Site footer, used on every page. Now links to /maintenance-terms next to the copyright line. |
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
