# Mobile Gallery Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mobile rendering of the homepage "THE WORK" gallery with a single-column, letterboxed, swipeable stack — fixing invisible hover-only captions and desktop-tuned crop shapes on mobile, without touching the desktop bento grid.

**Architecture:** Two DOM trees rendered by `Gallery.tsx`, one shown per breakpoint via Tailwind (`hidden md:block` for the existing desktop bento, `md:hidden` for a new mobile component) — the same pattern `Header.tsx` already uses for desktop nav vs. mobile `<details>` nav. A new `MobileGalleryStack` component owns all mobile-only behavior: flattened item list, one-at-a-time swipe/arrow navigation, letterboxed `object-contain` rendering for photos, and the existing `ImageComparison` slider (unchanged) for before/after items.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion (already a dependency, used for the existing crossfade pattern).

**No test framework exists in this repo** (`metro-site/package.json` has no jest/vitest/playwright). Verification for every task is: `npx tsc --noEmit`, `npm run lint`, and a manual check in the browser via chrome-devtools MCP tools at 390×844 (mobile) and 1440×900 (desktop). This is stated per the project's Test-After-Edit rule — no automated test exists for this component type, so manual browser verification is the available substitute.

---

### Task 1: Create `MobileGalleryStack` component

**Files:**
- Create: `metro-site/components/ui/mobile-gallery-stack.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageComparison } from "@/components/ui/image-comparison";

export interface MobileGalleryItem {
  id: number;
  type: "image" | "video" | "comparison";
  title: string;
  desc: string;
  url: string;
  beforeUrl?: string;
  afterUrl?: string;
  objectPosition?: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

const SWIPE_THRESHOLD_PX = 50;

export function MobileGalleryStack({ items }: { items: MobileGalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
      if (deltaX < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const item = items[index];

  return (
    <div>
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[0.07]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.type === "comparison" ? (
              <ImageComparison
                before={{ src: item.beforeUrl!, alt: `${item.title} before` }}
                after={{ src: item.afterUrl!, alt: `${item.title} after` }}
                initialPosition={75}
                beforeObjectPosition={item.beforeObjectPosition}
                afterObjectPosition={item.afterObjectPosition}
              />
            ) : (
              <div className="flex items-center justify-center bg-site-bg max-h-[60vh] min-h-[280px]">
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-h-[60vh] max-w-full object-contain"
                  style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="px-4 py-3 bg-site-bg">
          <h3 className="text-white text-sm font-medium">{item.title}</h3>
          {item.desc && (
            <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="w-8 h-8 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-white"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-white/50 text-xs tracking-wide">
          {index + 1} / {items.length}
        </span>
        <button
          onClick={next}
          aria-label="Next photo"
          className="w-8 h-8 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-white"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type check**

Run: `cd metro-site && npx tsc --noEmit`
Expected: No errors referencing `mobile-gallery-stack.tsx`. (Errors in unrelated files, if any pre-exist, are not this task's concern.)

- [ ] **Step 3: Lint**

Run: `cd metro-site && npm run lint`
Expected: No new errors/warnings for `mobile-gallery-stack.tsx`.

- [ ] **Step 4: Commit**

```bash
cd metro-site
git add components/ui/mobile-gallery-stack.tsx
git commit -m "feat: add mobile letterboxed gallery stack component"
```

---

### Task 2: Wire `MobileGalleryStack` into `Gallery.tsx`

**Files:**
- Modify: `metro-site/components/sections/Gallery.tsx`

- [ ] **Step 1: Add the import and flattened item list**

At the top of the file, after the existing `InteractiveBentoGallery` import, add:

```tsx
import { MobileGalleryStack, type MobileGalleryItem } from "@/components/ui/mobile-gallery-stack";
```

After the `SLIDES` constant (after its closing `];` — currently line 101), add:

```tsx
const ALL_ITEMS: MobileGalleryItem[] = SLIDES.flat();
```

- [ ] **Step 2: Wrap the existing desktop bento block in `hidden md:block`**

Find this block (current lines 133–172):

```tsx
        <div className="relative">
          {/* Left arrow */}
          {multiSlide && (
```

Change the opening tag to:

```tsx
        <div className="hidden md:block relative">
          {/* Left arrow */}
          {multiSlide && (
```

- [ ] **Step 3: Wrap the slide-dots block in the same `hidden md:flex`**

Find (current lines 175–188):

```tsx
        {/* Slide dots */}
        {multiSlide && (
          <div className="flex justify-center gap-2 mt-6">
```

Change to:

```tsx
        {/* Slide dots */}
        {multiSlide && (
          <div className="hidden md:flex justify-center gap-2 mt-6">
```

- [ ] **Step 4: Add the mobile stack as a sibling, after the dots block, before the closing `</div></section>`**

Insert immediately after the slide-dots `)}` and before the final `</div>\n    </section>`:

```tsx
        {/* Mobile — single-column letterboxed swipe stack */}
        <div className="md:hidden">
          <MobileGalleryStack items={ALL_ITEMS} />
        </div>
```

- [ ] **Step 5: Type check**

Run: `cd metro-site && npx tsc --noEmit`
Expected: No errors referencing `Gallery.tsx` or `mobile-gallery-stack.tsx`.

- [ ] **Step 6: Lint**

Run: `cd metro-site && npm run lint`
Expected: No new errors/warnings for `Gallery.tsx`.

- [ ] **Step 7: Commit**

```bash
cd metro-site
git add components/sections/Gallery.tsx
git commit -m "feat: render mobile gallery as letterboxed swipe stack, desktop unchanged"
```

---

### Task 3: Manual verification in browser

**Files:** none (verification only)

- [ ] **Step 1: Confirm dev server is running**

If not already running: `cd metro-site && npm run dev` (the operator starts this per standing session preference — confirm with them before running it).

- [ ] **Step 2: Mobile check — navigate and emulate viewport**

Using chrome-devtools MCP tools: `navigate_page` to `http://localhost:3000/`, then `emulate` with `viewport: "390x844x1,mobile,touch"`.

- [ ] **Step 3: Confirm all 10 items are visible in one swipe sequence**

Click the "Next photo" button (via `take_snapshot` to get its `uid`, then `click`) 9 times. Expected: item counter reads `1 / 10` through `10 / 10` with no repeats or skips, and it wraps back to `1 / 10` after the 10th click.

- [ ] **Step 4: Confirm captions are always visible**

Take a screenshot at 2–3 different index positions. Expected: title + description text is visible under every photo without any tap/hover needed — this is the fix for the original hover-only caption bug.

- [ ] **Step 5: Confirm no cropping on plain photo items**

Screenshot the item with `id: 1` from Slide 1 group ("Exterior Detail", a tall portrait shot) and the item with `id: 5` ("Mirror Finish", a wide landscape shot). Expected: both display full-frame with letterbox bars (not cropped edges) — matches the approved mockup.

- [ ] **Step 6: Confirm comparison sliders still work**

Navigate to a `type: "comparison"` item (e.g. "Headlight Restoration"). Use `mcp__chrome-devtools__drag` (or `click` at two different x-offsets if drag isn't reliable in the emulated environment) on the slider handle. Expected: the before/after divider moves and both images are visible on either side, matching current desktop behavior.

- [ ] **Step 7: Confirm no horizontal overflow**

Run the same overflow-detection script used in the original audit via `evaluate_script`:

```js
() => {
  const vw = document.documentElement.clientWidth;
  let overflowCount = 0;
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 2 || r.left < -2) && r.width > 5 && r.height > 5) overflowCount++;
  });
  return { scrollWidth: document.documentElement.scrollWidth, viewportWidth: vw, overflowCount };
}
```

Expected: `scrollWidth === viewportWidth` and `overflowCount === 0`.

- [ ] **Step 8: Desktop check — confirm bento grid is unchanged**

`emulate` with `viewport: "1440x900x1"` (no mobile/touch flags). Take a screenshot. Expected: the original bento grid renders exactly as before — same tile shapes, hover-only captions still work with a simulated mouse hover if testable, slide-group dots and arrows are present and functional.

- [ ] **Step 9: Reset viewport to desktop**

Per standing preference, leave the browser at the desktop viewport (`1440x900x1`, no mobile/touch flags) when done.

- [ ] **Step 10: Report results to operator**

State plainly what was checked and what passed/failed — no "looks good," report the actual counter values, screenshot findings, and overflow-check output.

---

## Self-Review Notes

- **Spec coverage:** Flattened single sequence (spec requirement) ✓ Task 2 Step 1. Letterbox/no-crop for plain photos (spec requirement) ✓ Task 1 Step 1 (`object-contain`). Comparison items keep fixed 16:9 crop, unchanged (spec requirement) ✓ Task 1 Step 1 (`ImageComparison` called without `fillContainer`, same as its default `aspectRatio: "16/9"` behavior). Counter instead of dot row (spec requirement) ✓ Task 1 Step 1. Desktop untouched (spec requirement) ✓ Task 2 Steps 2–3 (existing JSX only gets a `hidden md:block` / `hidden md:flex` class added, no logic changes). Captions always visible, not hover-gated (spec requirement) ✓ Task 1 Step 1 (caption is normal flow content below the image, no opacity/hover classes).
- **Placeholder scan:** No TBDs; every step has complete code or an exact command.
- **Type consistency:** `MobileGalleryItem` defined once in Task 1, imported (not redefined) in Task 2. `items` prop name and shape match between the component definition and the `<MobileGalleryStack items={ALL_ITEMS} />` call site.
