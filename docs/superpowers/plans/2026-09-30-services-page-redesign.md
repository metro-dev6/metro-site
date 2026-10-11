# Services Page Redesign — Implementation Plan

> **For agentic workers:** execute task-by-task. Steps use checkbox (`- [ ]`) syntax.
> **Verification (project-adapted):** this repo has no unit tests. Each task verifies with `npx tsc --noEmit` (type safety) and, where behavior is visible, a chrome-devtools check on `localhost:3000/services`. **Commits are deferred to `/handoff`** per Metro's no-mid-session-commit rule; task boundaries are verification checkpoints, not commit points.
> **Reference:** spec `docs/superpowers/specs/2026-09-30-services-page-redesign-design.md` + the approved interactive mockup. Pull exact tokens/classes from the spec's design-system section.

**Goal:** Rebuild `/services` in the homepage's off-white + dark-card system with a vehicle-size selector that drives every price, plus the approved content (FAQ, who-does-the-work, time-to-complete, on-page proof) and motion.

**Architecture:** A `SizeProvider` React context holds the selected vehicle class; the selector sets it and every price cell reads it. The page shell stays a server component (keeps metadata + JSON-LD); interactive sections (selector, Essentials, Maintenance) are wrapped in the client provider. Service/pricing data moves to one shared module both the page and the client cards import.

**Tech Stack:** Next.js App Router, Tailwind, Framer Motion (`lib/motion.ts` `EASE_OUT`, global `MotionConfig reducedMotion="user"`).

**Asset policy:** reuse a real gallery photo where it fits a tier; otherwise a clearly-labeled placeholder (`/services/_placeholder` styled block) the operator swaps. Operator photo in "who does the work" is a placeholder. Per-tier times beyond Exterior Refresh (30-45 min) ship as `{{UNVALIDATED}}` until confirmed.

---

### Task 1: Extract services data to a shared module

**Files:**
- Create: `components/services/services-data.ts`
- Reference: current `app/services/page.tsx` (`essentialsPlans`, maintenance array, add-ons)

- [ ] Move `essentialsPlans` (5 services: name, description, `vehicleClassPrices`, features, excludedFeatures), the maintenance-plan array (3 cadences), the add-ons list, and a `VEHICLE_CLASSES` constant into `services-data.ts` as typed exports. Add a `timeEstimate` field per service (Exterior Refresh `"30-45 min"`; others `"{{UNVALIDATED}}"`). Add `mostPopular: true` on Signature Wash; remove `featured` from Clay n Seal.
- [ ] Type: `type VehicleClass = "sedan" | "suv5" | "suv7" | "oversized"`. Prices keyed `sedan|suv5|suv7` (oversized renders "Custom").
- [ ] Verify: `npx tsc --noEmit` → exit 0.

### Task 2: Vehicle-size context + hook

**Files:**
- Create: `components/services/size-context.tsx` (`"use client"`)

- [ ] Implement:
```tsx
"use client";
import { createContext, useContext, useState } from "react";
import type { VehicleClass } from "./services-data";
const SizeCtx = createContext<{ size: VehicleClass; setSize: (s: VehicleClass) => void } | null>(null);
export function SizeProvider({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState<VehicleClass>("sedan");
  return <SizeCtx.Provider value={{ size, setSize }}>{children}</SizeCtx.Provider>;
}
export function useVehicleSize() {
  const c = useContext(SizeCtx);
  if (!c) throw new Error("useVehicleSize must be used within SizeProvider");
  return c;
}
```
- [ ] Verify: `npx tsc --noEmit` → exit 0.

### Task 3: ServicePrice component (reactive price + Motion #1)

**Files:**
- Create: `components/services/service-price.tsx` (`"use client"`)

- [ ] Reads `useVehicleSize()`. Props: `prices: {sedan:number;suv5:number;suv7:number}`, optional `className`. Oversized → render `"Custom"` (smaller size). Animate on size change: Framer `motion.span` keyed by `size`, `initial={{opacity:0.5,y:4}} animate={{opacity:1,y:0}} transition={{duration:0.16, ease:EASE_OUT}}`. Global `MotionConfig` handles reduced-motion.
- [ ] Verify: `npx tsc --noEmit` → exit 0.

### Task 4: VehicleSizeSelector (UI + Motion #2 press, #3 sliding indicator)

**Files:**
- Create: `components/services/vehicle-size-selector.tsx` (`"use client"`)

- [ ] Four buttons from `VEHICLE_CLASSES`, reads/sets `useVehicleSize()`. Sticky top. Selected: yellow border; a single highlight via Framer `layoutId="size-active"`, `transition={{type:"spring", bounce:0, duration:0.4}}`. Press feedback `active:scale-[0.97] transition-transform duration-150`. Oversized caption "Quoted separately." `aria-pressed` on each. Default visual = sedan active.
- [ ] Verify: `npx tsc --noEmit` → exit 0.

### Task 5: ServicePackageCard (light card)

**Files:**
- Create: `components/services/service-package-card.tsx`
- Check first: `grep -rn "PackageCardGrid" app components` — if only used on `/services`, this replaces it there; leave the component file in place.

- [ ] Light card (`rounded-2xl`, hairline `black/15`, `shadow-[0_12px_30px_rgba(0,0,0,0.13)]`, off-white): proof image slot (prop `image?`, else labeled placeholder), name, `timeEstimate` chip, description, `<ServicePrice prices={...} />` with "From" label, checkmark feature list (reuse the mockup's `.feat` checkmark pattern), excluded features struck through, `Most Popular` yellow ribbon when `mostPopular`, "Add to Estimate" button with `active:scale-[0.97]`. Yellow border + ribbon on the Most Popular card.
- [ ] Verify: `npx tsc --noEmit` → exit 0.

### Task 6: WhoDoesTheWork block

**Files:**
- Create: `components/services/who-does-the-work.tsx`

- [ ] Operator-run trust block: placeholder operator photo (labeled, swap later), heading, 2-3 lines in Metro voice (owner-operated, fully mobile, years detailing — NOT the dealership angle), key trust points (insured if confirmed — else omit, do not invent). Light card on off-white.
- [ ] Verify: `npx tsc --noEmit` → exit 0.

### Task 7: Services FAQ + FAQPage schema

**Files:**
- Create: `components/services/services-faq-data.ts`
- Check: `components/sections/FAQ.tsx` API — if it accepts a `questions` + `theme` prop, reuse it (light). If it hardcodes questions, pass the services list in (small refactor to accept a prop).

- [ ] FAQ Q&A (answer-first): "What is clay bar treatment?", "How long does the ceramic sealant last?", "How long does a detail take?", "Do you come to me?", "How is the final price set?" Use real Metro answers (walk-around pricing, mobile, sealant 3/6-month). Render on `/services` (light), emit `FAQPage` JSON-LD built from the same data.
- [ ] Verify: `npx tsc --noEmit` → exit 0; FAQ renders on the page (Task 8+).

### Task 8: Rewrite the page shell + Essentials

**Files:**
- Modify: `app/services/page.tsx` (full rewrite of the render; keep `generateMetadata`/metadata + schema exports)

- [ ] `<main className="bg-site-surface text-...">` off-white. Header (keep h1 copy, Fraunces accent on one word). Wrap selector + Essentials + Maintenance in `<SizeProvider>`. Render `<VehicleSizeSelector/>`, then Essentials grid: `motion.div {...staggerContainer}` + cards as `staggerItem` (Motion #4), each `<ServicePackageCard>` from `services-data`. Keep `SectionLabel` eyebrow pattern (light variant).
- [ ] Verify: `npx tsc --noEmit` → exit 0, then chrome-devtools on `localhost:3000/services`: selector renders, clicking a size updates all Essentials prices, Oversized shows "Custom", Most Popular ribbon on Signature Wash, no console errors.

### Task 9: Add-Ons dark card

**Files:** Modify `app/services/page.tsx`
- [ ] Dark floating card (`#141414 rounded-[40px] mx-4 sm:mx-10`), yellow prices, grid of add-ons from `services-data`. Matches homepage Add-Ons card.
- [ ] Verify: `npx tsc --noEmit`; renders on page.

### Task 10: Maintenance Plans (reactive)

**Files:** Modify `app/services/page.tsx`
- [ ] 3 cadence cards inside the provider; prices via `<ServicePrice>` so they react to the selector. Keep scope labels + "no contracts, cancel anytime." Most Common badge stays on Monthly.
- [ ] Verify: `tsc`; selecting a size updates maintenance prices too.

### Task 11: Trust strip + Who-does-the-work placement

**Files:** Modify `app/services/page.tsx`
- [ ] Dark trust card: "Final price is confirmed at the walk-around. Not sure which fits? Send a couple photos and I'll build a quote." + Book/Call CTAs. Place `<WhoDoesTheWork/>` above or below Essentials.
- [ ] Verify: `tsc`; renders.

### Task 12: Schema — Service + LocalBusiness/Organization

**Files:** Modify `app/services/page.tsx`
- [ ] Keep `ItemList`/`Offer`; add a `Service` entity per service and a `LocalBusiness`/`Organization` entity (name, url, telephone +16613685165, areaServed Bakersfield, sameAs socials). Keep prices in sync with `services-data`. Keep `FAQPage` from Task 7.
- [ ] Verify: `tsc`; extract JSON-LD in chrome-devtools and confirm it parses + types present.

### Task 13: Final verification pass

- [ ] `npx tsc --noEmit` → exit 0.
- [ ] chrome-devtools on `localhost:3000/services`: (a) all four sizes update every price incl. maintenance; (b) Oversized → "Custom" everywhere; (c) Most Popular on Signature Wash; (d) press feedback on selector + CTAs; (e) FAQ renders + FAQPage schema valid; (f) Essentials stagger on scroll-in; (g) no console errors; (h) off-white theme consistent, dark cards floating.
- [ ] Report WIRING REPORT (changed / connected / tested / remaining). Note placeholders left for the operator (proof photos, operator photo, unvalidated per-tier times).

---

## Self-review

- **Spec coverage:** off-white system (T8), selector A + default sedan + Oversized=Custom (T2/T4), Most Popular Signature Wash (T1/T5), pricing matrix (T1), add-ons (T9), maintenance reactive (T10), trust strip (T11), FAQ (T7), 4 animations (#1 T3, #2 T4/T5, #3 T4, #4 T8), who-does-the-work (T6), time-to-complete (T1/T5), on-page proof (T5), schema Service+LocalBusiness+FAQPage (T7/T12). All mapped.
- **Placeholders:** asset placeholders are intentional (operator policy), flagged for swap. No logic placeholders.
- **Type consistency:** `VehicleClass`, `useVehicleSize`, `ServicePrice` prices shape consistent across tasks.
