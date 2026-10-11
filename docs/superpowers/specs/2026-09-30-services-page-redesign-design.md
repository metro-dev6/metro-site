# Services Page Redesign — Design Spec

> Date: 2026-09-30
> Status: approved design, pending operator spec review before writing the implementation plan.
> Scope: `/services` (`app/services/page.tsx`) only. The homepage is done; this brings `/services` into the same design system.

## Goal

Rebring `/services` from the old dark theme into the homepage's visual system (off-white ground, dark floating cards, black/yellow brand) and replace the static 3-column price grid with a vehicle-size selector that updates all prices. Grounded in a 6-site reference sweep (SHWASH, Izaguirre, Xentra, Chicago Auto Pros, Mavericks, Sydney Detail Studio); Izaguirre is the closest blueprint, SHWASH set the selector pattern.

## Design system (match the homepage, do not invent)

- **Ground:** `--color-site-surface` `#e7e5e0` (off-white). Page body sits on this.
- **Dark floating cards:** `#141414`, `rounded-[40px]`/`rounded-[50px]`, `mx-4 sm:mx-10`. Used for Add-Ons and the trust/CTA, same as the homepage.
- **Light info cards:** lifted off-white, `rounded-2xl`, hairline border `black/15`, `shadow-[0_12px_30px_rgba(0,0,0,0.13)]` (the ServicesPreview treatment).
- **Brand:** black `#000`, yellow `#fac205`.
- **Type:** Montserrat (headings, uppercase, `font-black`, tight tracking), DM Sans (`.font-numeric`, prices), Fraunces italic (`.font-accent`) for one accent word.
- Single committed brand world (no light/dark toggle), same as the live homepage.

## Page structure (approved)

1. **Header** — h1 "Mobile Detailing Services" + one-line sub, off-white. Keep current copy.
2. **Vehicle-size selector** — pick size once, every price below reacts. (See below.)
3. **The Essentials** — 5 service cards, price for the selected size, feature checklist, Most Popular on Signature Wash, Add to Estimate.
4. **Add-Ons** — dark floating card, chip/list grid.
5. **Maintenance Plans** — 3 cadence cards, prices react to the selector.
6. **Trust strip** — walk-around / send-photos message (dark card).
7. **FAQ** (light) + **CTA** (dark `CTABanner`), matching the homepage.

## Vehicle-size selector (decision: option A, SHWASH pattern)

- Four classes: **Sedan/Coupe, 5-Seat SUV/Truck, 7-Seat SUV/Van, Oversized**.
- **Default-selected: Sedan/Coupe** so a price shows immediately (no click required to see a number).
- On select, every price cell on the page (Essentials + Maintenance Plans) updates to that class.
- **Oversized** shows "Custom" / "Quoted separately" instead of a number (not on the published ladder).
- Selected state: yellow border + subtle lift; a single sliding highlight (see Motion #3).

## Pricing matrix (source of truth: `canonical/pricing-framework.md`)

| Service | Sedan/Coupe | 5-Seat SUV/Truck | 7-Seat SUV/Van |
|---|---|---|---|
| Exterior Refresh | $80 | $100 | $120 |
| Signature Wash (Most Popular) | $150 | $180 | $210 |
| Clay n Seal | $200 | $230 | $260 |
| Interior Detail | $200 | $230 | $260 |
| Full Detail | $350 | $380 | $410 |

Maintenance Plans (per visit): Monthly $110/$140/$170 · Bi-Monthly $140/$170/$200 · Quarterly $170/$200/$230.
Add-Ons (flat): Headlight $100, Trim $100, Water Spot $50, Leather $50, Pet Hair & Sand $50, Engine Bay $50.

Feature lists per service already live in `app/services/page.tsx` (`essentialsPlans`). Reuse them; Exterior Refresh is exterior-only (no interior line) per RULE-031.

## Motion (approved; apple-design lens, extends `lib/motion.ts`)

1. **Price transition on size change** — new value swaps in immediately (no latency), then settles `opacity 0.5→1, translateY 4px→0`, 160ms `EASE_OUT`; cascade cards `index*30ms`. Interruptible on rapid clicks. Reduced-motion: opacity only.
2. **Press feedback** — selector cards + all CTAs: `:active { scale(0.97) }`, `120ms var(--ease-out)`.
3. **Sliding selected indicator** — one highlight behind the active size, Framer `layoutId`, `{type:"spring", bounce:0, duration:0.4}`.
4. **Essentials grid stagger on scroll-in** — reuse `staggerContainer`/`staggerItem` from `lib/motion.ts`. Reduced-motion handled by the global `MotionConfig`.

## Content / E-E-A-T additions (APPROVED 2026-09-30 — all four)

All four confirmed. **Asset policy:** use a real Metro photo where a good match exists (gallery already has Mazda, Jeep, Honda, Mazda 3, headlight before/after); where no fitting asset exists, drop a clearly-labeled placeholder the operator swaps later. Never ship a mismatched photo.

- **Add a FAQ to `/services`** with `FAQPage` schema (the page has none today; biggest content gap). Include definition Q&A: "What is clay bar treatment?", "How long does the ceramic sealant last?", "How long does a detail take?"
- **"Who does the work" block** — owner-operated, fully mobile, years detailing (operator's voice; not the dealership angle). Answers Google's "Who." Operator photo: placeholder until supplied.
- **Time-to-complete per service** (e.g. Exterior Refresh 30-45 min). Sets expectations, matches competitors, feeds AI. Times unconfirmed per tier beyond Exterior Refresh — mark `{{UNVALIDATED}}` and confirm with operator before shipping copy.
- **On-page proof** — a result photo per tier or a compact before/after strip. Reuse gallery photos where they fit the tier; placeholder otherwise.

## SEO / schema

- Keep `ItemList`/`Offer` + add per-service `Service` schema and a `LocalBusiness`/`Organization` entity for AI entity clarity.
- Keep prices in schema in sync with the matrix above.
- Shared site gap (not this page's fault): the homepage has **no `og:image`** detected — fix in metadata separately.

## Implementation notes

- **New component:** `SizeSelector` (client) owning the selected-size state; price cells subscribe. Keep it isolated and reusable.
- **Rewrite** `app/services/page.tsx` from `bg-site-bg`/dark to the off-white system; sections per the structure above.
- **Reuse:** `lib/motion.ts` (stagger, EASE_OUT), `.hover-lift`, `CTABanner`, `FAQ` (light theme prop), `EstimateCartBar`, existing `essentialsPlans` data.
- **Standalone service detail pages stay offline** (redirect to `/services`) until rebuilt — unchanged this pass.
- No commit mid-session (Metro rule); spec + build commit at `/handoff` or on explicit go.

## Out of scope / open

- Rebuilding the per-service detail pages (separate future project).
- Lighthouse/CWV numbers (deferred to the SEO run the operator queued).
- The homepage `og:image` fix (separate, shared gap).
