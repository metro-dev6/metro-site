# metro-site — Current Session State

> Updated by /handoff. Read this at the start of every Site session.
> Last updated: 2026-07-02

## Live on metroautodetailing.pro

All changes pushed and deployed.

### What's Built and Live

| Section | Status | Notes |
|---------|--------|-------|
| Hero | Live | Mobile: exterior-bg.JPEG, contain/top, separate flex zones, eyebrow removed |
| ServicesPreview | Live | Exterior detail card uses IMG_6184.JPEG, header pattern (h2 + link + divider) |
| WhyMetro | Live | Eyebrow removed |
| Testimonials | Live | "Straight From Our Clients" header, ServicesPreview header pattern, flat bg |
| CTABanner | Live | — |
| FAQ | Live | Eyebrow removed |
| Footer | Live | Facebook URL fixed |
| AnnouncementBar | Live | Facebook URL fixed |
| Blog listing /blog | Live, noindex | Hidden from nav — not ready |
| Blog post /blog/[slug] | Live, noindex | TOC, 1 post |
| Location pages /locations/[slug] | Live | 6 locations, explicit index:true |
| Service sub-pages /services/[slug] | Live | 5 pages, blank bodies — no content yet |
| Estimate /estimate | Live | Multi-vehicle form, redirects to /thank-you on submit |
| /thank-you | Live | Confirmation + guarantee + referral sections |
| Gallery | Built, not rendered | SocialFeed same |

### Background

All sections and pages use `bg-site-bg` → `--color-site-bg: #050606` in `globals.css`. One line to change the entire site background. No dot/grid/stripe patterns anywhere.

### Facebook URL

Correct URL: `https://www.facebook.com/profile.php?id=61586613950253`
Set in: `app/layout.tsx`, `AnnouncementBar.tsx`, `Footer.tsx`, `SocialFeed.tsx`, `llms.txt`

## Immediate Next Step

Check mobile hero on real phone. Hero was reworked on 7/1 (separate flex zones for text + CTA) but never confirmed on device. Adjust positioning if needed.

## Pending Work

1. Verify mobile hero on real phone
2. Service sub-page content — keyword research first, then write body for each of 5 slug pages
3. Blog articles — 17 topics in cluster plan, noindex until 3+ ready
4. Gallery + SocialFeed — hold until photos ready
5. aggregateRating — needs real GBP review count
6. OG image for homepage and services
7. GSC check — location pages indexed 7/1, check coverage report in a few days

## Key Files

| File | Purpose |
|------|---------|
| `app/globals.css` | `--color-site-bg` token — change here to update all backgrounds |
| `components/sections/Hero.tsx` | Mobile layout, flex zones, CTA |
| `app/thank-you/page.tsx` | Post-estimate confirmation page |
| `app/estimate/EstimateForm.tsx` | Multi-vehicle form, redirects to /thank-you |
| `components/sections/Testimonials.tsx` | Reviews section — header pattern |
| `app/locations/[slug]/page.tsx` | Location pages with index:true |
| `app/services/[slug]/page.tsx` | Service sub-pages — blank bodies |
| `public/llms.txt` | AI crawler info file |
| `app/layout.tsx` | Schema, Facebook URL, AI crawler rules |
