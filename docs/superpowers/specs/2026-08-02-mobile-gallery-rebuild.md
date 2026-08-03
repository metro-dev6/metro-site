# Mobile Gallery Rebuild — Design Spec

**Date:** 2026-08-02
**Status:** Approved by operator, ready for implementation plan

## Problem

The homepage "THE WORK" gallery (`components/sections/Gallery.tsx` + `components/ui/interactive-bento-gallery.tsx`) has two real bugs on mobile:

1. **Captions never render on touch devices.** Caption overlay uses `opacity-0 group-hover:opacity-100` (interactive-bento-gallery.tsx:174) — there's no hover state on mobile, so titles/descriptions are permanently invisible to phone visitors.
2. **Photo crops are wrong on mobile.** Each tile has a hardcoded `row-span` tuned for a 4-6 column desktop grid. Forced into 2 mobile columns, `object-cover` crops photos into shapes that don't respect the actual framing of the shot — this is the "irregular, doesn't fit right" problem the operator flagged.

Desktop bento grid is not broken and is out of scope — this fixes mobile only.

## Scope

- **Mobile (below `md` breakpoint, <768px):** New component, single-column swipeable stack, replaces the bento grid entirely.
- **Desktop (`md` and up):** Unchanged. Existing `InteractiveBentoGallery` bento grid stays exactly as-is, hover captions still work fine with a mouse.
- Implementation pattern: two DOM trees, one hidden per breakpoint via Tailwind (`md:hidden` / `hidden md:block`), same pattern already used in `Header.tsx` for desktop nav vs. mobile `<details>` nav. No JS viewport-detection, no layout flicker.

## Mobile Behavior

**Flattened sequence, not two slide-groups.** Currently `SLIDES` is an array of two groups of 5 items each, with dot-navigation to switch groups. On mobile this is replaced by one continuous sequence of all 10 items (both groups concatenated), swiped/arrowed through one at a time. This removes the double-navigation-layer problem (swipe within a group + separate button to switch groups). Desktop keeps the two-group structure unchanged.

**Navigation:** Prev/next arrow buttons (same style as current gallery arrows) plus a text counter ("3 / 10") instead of a 10-dot row — a dot row that long adds visual noise on a narrow screen. Swipe gesture also advances/retreats.

**Card layout, per item:**
- Full-width container, photo on top, caption below as normal (non-overlaid) text — title + description, always visible, no hover gate. This directly fixes bug #1.
- **Plain photo items (7 of 10):** No-crop letterbox treatment. Image renders via `object-contain` inside a max-height container (cap around 60-70vh so tall portrait shots don't dominate the screen), background matches `bg-site-bg` (#050606) so letterbox bars blend into the page rather than reading as empty space. This directly fixes bug #2 — nothing gets cropped into a shape it wasn't shot for.
- **Comparison/slider items (3 of 10 — Headlight Restoration x2, Seat Shampoo):** Keep existing `ImageComparison` component and its current fixed 16:9 `object-cover` behavior unchanged. These are intentional before/after pairs shot in matching framing — cropping is expected here, not "irregular." Making `ImageComparison` support letterboxing would require computing shared intrinsic aspect ratio between before/after images and is out of scope for this fix. They just join the same flattened swipe sequence as everything else.

## Files Touched

- **New:** `components/ui/mobile-gallery-stack.tsx` — the swipeable single-column component.
- **`components/sections/Gallery.tsx`** — flattens `SLIDES[0] + SLIDES[1]` into one array, passes it to the new mobile component (rendered `md:hidden`) alongside the existing desktop bento render (`hidden md:block`, unchanged logic).
- **Unchanged:** `components/ui/interactive-bento-gallery.tsx`, `components/ui/image-comparison.tsx` — desktop behavior and comparison-slider behavior both stay exactly as they are today.

## Verification

- Dev server, 390×844 viewport: swipe/arrow through all 10 items, confirm every caption is visible without any tap/hover, confirm plain photos show full-frame with no odd crop, confirm comparison sliders still drag correctly.
- Resize to desktop width: confirm bento grid renders unchanged, hover captions still work.
- No horizontal overflow at 390px (same DOM-overflow check used in the initial audit).
