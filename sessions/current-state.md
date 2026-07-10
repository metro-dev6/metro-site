# metro-site — Current Session State

> Updated by /handoff. Read this at the start of every Site session.
> Last updated: 2026-07-09

## What's Live on metroautodetailing.pro

| Section | Status | Notes |
|---------|--------|-------|
| Hero | Live | hero-bg.mp4 (4.2MB). hero-poster.jpg replaced 2026-07-09 — frame from actual truck video, no more Jaguar ghost. |
| ServicesPreview | Live | Exterior card = IMG_6184.JPEG |
| WhyMetro | Live | — |
| Gallery | **Live** | 2-slide bento carousel. Heading fixed 2026-07-09 — text-brand-white, divider line added. |
| Testimonials | Live | — |
| CTABanner | Live | — |
| FAQ | Live | — |
| Footer | Live | Facebook URL correct |
| AnnouncementBar | Live | — |
| Blog /blog | Live, noindex | Hidden from nav |
| Location pages | Live | 6 locations, explicit index:true |
| Service sub-pages | Live but BLANK | 6 pages — no content. Brainstorm done, layout pending approval. |
| Estimate /estimate | Live | Multi-vehicle form → /thank-you |
| /thank-you | Live | Confirmation + guarantee + referral |
| SocialFeed | Not rendered | Hold until social content built up |

---

## Immediate Next Step

**Service sub-pages** — 6 blank pages. Layout brainstormed (v3). Operator needs to approve layout before spec is written.

To restart visual companion and review v3 mockup:
```
bash "C:/Users/Damian/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/brainstorming/scripts/start-server.sh" --project-dir "C:/Users/Damian/Metro-Vault/metro-site"
```
Then open the URL and the server will serve `full-content-layout-v3.html`.

---

## Service Sub-Pages — Brainstorm State (2026-07-09)

**6 pages:**
- `/services/signature-wash` — Signature Wash ($80)
- `/services/exterior-detail` — Exterior Detail ($150)
- `/services/interior-detail` — Interior Detail ($200)
- `/services/refresh-detail` — Refresh Detail ($250)
- `/services/full-detail` — Full Detail ($400)
- `/services/headlight-restoration` — Headlight Restoration ($80) — **own page, not an add-on**

**SEO target:** 800+ words per page. Bakersfield-specific language required.

**Approved content sections (v3 layout — pending final operator sign-off):**
1. ServiceHero — full-bleed photo + overlay (price, duration, mobile pill) [NEW]
2. ServiceQualifier — "Right for you if..." yellow left-border block [NEW]
3. ServiceStats — 3 stats: duration / protection / $0 drop-off [NEW]
4. Problem context — 2 paragraphs, local context [NEW inline]
5. ProcessTimeline — numbered steps with product badges + photo [NEW]
6. What's Included — WhyMetro icon card grid (4 cards) [REUSE WhyMetro.tsx pattern]
7. ProductSpotlight — 2x2 product name + description cards [NEW]
8. Before/After — image-comparison.tsx drag slider [REUSE]
9. What to Expect — logistics + photo [NEW inline]
10. FAQ — FAQ.tsx details/summary accordion [REUSE]
11. Pair It With — AddonCard.tsx with estimate cart [REUSE]
12. CTABanner.tsx [REUSE]

**Photos mapped per service:**
- Signature Wash hero: `wash-bg.JPEG` or `wash-bg-1.JPEG`
- Exterior Detail hero: `exterior-bg.JPEG` / result: `IMG_6297.JPEG` / wheel: `IMG_6026.JPEG`
- Interior Detail hero: `interior-bg.JPEG` / seats: `IMG_6321→IMG_6348` (slider)
- Refresh Detail hero: `refresh-bg.JPEG`
- Full Detail hero: `full-detail-bg.JPEG` / full result: `IMG_5922.JPEG`
- Headlight Restoration: before/after slider `IMG_6170→IMG_6195`

**Headlight Restoration page** — no exterior photo currently. Either use a gallery shot or shoot one. The before/after slider is the hero interaction.

---

## Gallery — Current State (Live as of 2026-07-07, heading fixed 2026-07-09)

**Architecture:** 2-slide bento carousel. No auto-scroll. Manual prev/next arrows + dots.

**Slide 1 (exterior focus):**
- id:1 — IMG_5804.JPEG "Exterior Detail" / "Decontaminated & Protected" (lg:col-span-2 lg:row-span-4)
- id:2 — IMG_6214.JPEG "Maintenance Detail"
- id:3 — IMG_6026.JPEG "Deep Cleaned Wheel"
- id:5 — IMG_6297.JPEG "Mirror Finish / 2018 Silverado" (lg:col-span-3 lg:row-span-5)
- id:6 — comparison IMG_6170→IMG_6195 "Headlight Restoration" (lg:col-span-3 lg:row-span-5)

**Slide 2 (interior/before-after focus):**
- id:1 — comparison IMG_6321→IMG_6348 "Seat Shampoo"
- id:2 — comparison IMG_6346→IMG_6367 "Headlight Restoration"
- id:3 — toyota-corolla-interior-detail-bakersfield.JPEG "Interior Detail"
- id:4 — IMG_6158.JPEG "Exterior Detail"
- id:5 — IMG_5922.JPEG "Full Detail"

---

## Pending Work (Priority Order)

1. **Service sub-pages** — approve v3 layout → spec → implementation plan → build. 6 pages.
2. **Mobile hero swap** — swap hero to truck photo on mobile. Low priority.
3. **Gallery mobile layout refinement** — functional, needs polish at small breakpoints.
4. **GSC check location pages** — overdue
5. **aggregateRating** — needs real GBP review count
6. **OG image** — homepage and services pages
7. **Blog articles** — 17 topics, noindex until 3+ ready

---

## Key Files

| File | Purpose |
|------|---------|
| `app/services/[slug]/page.tsx` | Service sub-pages — blank bodies, SERVICES record has 5 entries (headlight-restoration needs adding) |
| `components/sections/Gallery.tsx` | SLIDES array, carousel state |
| `components/ui/interactive-bento-gallery.tsx` | Bento grid renderer |
| `components/ui/image-comparison.tsx` | Before/after slider |
| `components/sections/Hero.tsx` | Hero section — video bg + poster |
| `components/sections/FAQ.tsx` | Accordion — reuse pattern for sub-page FAQs |
| `components/sections/AddonCard.tsx` | Service cards — reuse for "Pair It With" |
| `components/sections/WhyMetro.tsx` | Icon grid — reuse pattern for "What's Included" |
| `components/sections/CTABanner.tsx` | Bottom CTA — reuse on all sub-pages |
| `app/locations/[slug]/page.tsx` | Location pages with index:true |
| `app/globals.css` | `--color-site-bg: #050606` |
| `next.config.ts` | Redirects, security headers |

---

## Background

All sections use `bg-site-bg` → `--color-site-bg: #050606` in `globals.css`.
Facebook URL: `https://www.facebook.com/profile.php?id=61586613950253`
Set in: `app/layout.tsx`, `AnnouncementBar.tsx`, `Footer.tsx`, `SocialFeed.tsx`, `llms.txt`
