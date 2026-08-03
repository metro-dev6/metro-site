# Gallery Carousel — Design Spec
**Date:** 2026-07-05
**Status:** Approved

## Summary

Replace the static bento grid gallery with a 2-slide bento carousel. Each slide has a hero tile and 5 supporting tiles. Slide 1 leads with the before/after comparison slider. Slide 2 leads with the paint correction video.

---

## Slides

### Slide 1 — Before/After hero
| Tile | Asset | Span (lg) |
|------|-------|-----------|
| Hero | Before/After slider (IMG_6170 → IMG_6195) | col-span-3, row-span-5 |
| 2 | the best 2.JPEG | col-span-3, row-span-3 |
| 3 | IMG_6214.JPEG | col-span-2, row-span-2 |
| 4 | IMG_6026.JPEG | col-span-1, row-span-2 |
| 5 | IMG_5804.JPEG | col-span-3, row-span-3 |
| 6 | IMG_6158.JPEG | col-span-3, row-span-3 |

### Slide 2 — Video hero
| Tile | Asset | Span (lg) |
|------|-------|-----------|
| Hero | gallery-video.mp4 | col-span-3, row-span-5 |
| 2 | IMG_6214.JPEG | col-span-3, row-span-3 |
| 3 | IMG_6026.JPEG | col-span-2, row-span-2 |
| 4 | the best 2.JPEG | col-span-1, row-span-2 |
| 5 | IMG_5804.JPEG | col-span-3, row-span-3 |
| 6 | IMG_6158.JPEG | col-span-3, row-span-3 |

---

## Navigation

- Arrows overlaid on left/right edges of the bento grid (frosted glass circles)
- Arrows and dots hidden when only 1 slide exists; visible at 2+ slides
- Auto-advances every 5s on 2+ slides; resets timer on manual click
- Pauses on hover
- Slide position dots below the grid

---

## Component Changes

### `interactive-bento-gallery.tsx`
- Remove drag-reorder entirely (conflicts with comparison slider drag)
- Add `type: "comparison"` to `MediaItemType` with `beforeUrl: string` and `afterUrl: string`
- Render `image-comparison.tsx` when `item.type === "comparison"`

### `Gallery.tsx`
- Replace flat `GALLERY_ITEMS` array with `SLIDES` array of arrays
- Add carousel container with overflow-hidden
- Add prev/next arrow buttons (overlaid on grid edges)
- Add slide dot indicators
- Auto-advance logic (useEffect, 5s interval, clears on manual nav or hover)
- Pass current slide's items to `InteractiveBentoGallery`

### `image-comparison.tsx`
- No changes. Already built, used as-is inside the gallery.

---

## Mobile

CSS snap scroll — horizontal swipe between individual tiles, one per swipe. No carousel controls on mobile.

---

## File Assets (all in `public/gallery/`)

- `gallery-video.mp4` — compressed, 4.6MB
- `the best 2.JPEG`
- `IMG_6214.JPEG`
- `IMG_6026.JPEG`
- `IMG_5804.JPEG`
- `IMG_6158.JPEG`
- `IMG_6170.JPEG` — before (comparison)
- `IMG_6195.JPEG` — after (comparison)

---

## Out of Scope

- Swipe gesture support on desktop
- Keyboard navigation
- Thumbnail strip
- Per-tile captions on mobile
