# Gallery Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 5-tile bento gallery with a 2-slide carousel where each slide is a full bento grid with its own hero tile, prev/next arrows overlaid on the grid edges, and auto-advance on a 5s timer.

**Architecture:** Gallery.tsx owns carousel state (currentSlide, isHovered, interval). It passes the active slide's items to InteractiveBentoGallery, which renders the bento grid. A new `type: "comparison"` in MediaItemType renders ImageComparison inside a bento tile. Drag-reorder is removed from the gallery to prevent gesture conflict with the comparison slider.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Framer Motion (already installed), TypeScript

---

## File Map

| File | Change |
|------|--------|
| `components/ui/image-comparison.tsx` | Add `fillContainer` prop — removes hardcoded `aspectRatio: "16/9"` when embedded in bento |
| `components/ui/interactive-bento-gallery.tsx` | Extend `MediaItemType` with `beforeUrl/afterUrl`, add comparison render case, remove drag-reorder |
| `components/sections/Gallery.tsx` | Replace flat `GALLERY_ITEMS` with `SLIDES`, add carousel state + controls + auto-advance |

---

## Task 1: Add `fillContainer` prop to ImageComparison

**Files:**
- Modify: `components/ui/image-comparison.tsx`

The component currently hardcodes `style={{ aspectRatio: "16/9" }}` on its root div. When embedded inside a bento tile (which uses `absolute inset-0`), this overrides the tile's height. Adding `fillContainer` removes the ratio and lets the component fill its parent.

- [ ] **Open** `components/ui/image-comparison.tsx`

- [ ] **Update the interface and component signature**

Replace:
```tsx
interface ImageComparisonProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  initialPosition?: number;
}

export function ImageComparison({
  before,
  after,
  initialPosition = 50,
}: ImageComparisonProps) {
```

With:
```tsx
interface ImageComparisonProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  initialPosition?: number;
  fillContainer?: boolean;
}

export function ImageComparison({
  before,
  after,
  initialPosition = 50,
  fillContainer = false,
}: ImageComparisonProps) {
```

- [ ] **Update the root div style**

Replace:
```tsx
      className="relative w-full overflow-hidden rounded-2xl select-none cursor-col-resize"
      style={{ aspectRatio: "16/9" }}
```

With:
```tsx
      className="relative w-full overflow-hidden rounded-2xl select-none cursor-col-resize"
      style={fillContainer ? { height: "100%" } : { aspectRatio: "16/9" }}
```

- [ ] **Type-check**

Run: `npx tsc --noEmit` from `metro-site/`
Expected: no errors

---

## Task 2: Extend InteractiveBentoGallery — add comparison type, remove drag-reorder

**Files:**
- Modify: `components/ui/interactive-bento-gallery.tsx`

Two changes: (1) extend `MediaItemType` and `MediaItem` to handle `type: "comparison"`, (2) strip the drag-reorder state and handlers from `InteractiveBentoGallery`.

- [ ] **Update `MediaItemType` interface** (top of file)

Replace:
```tsx
interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}
```

With:
```tsx
interface MediaItemType {
    id: number;
    type: "image" | "video" | "comparison";
    title: string;
    desc: string;
    url: string;
    span: string;
    beforeUrl?: string;
    afterUrl?: string;
}
```

- [ ] **Add comparison import** at the top of the file (after `"use client"`)

```tsx
import { ImageComparison } from "@/components/ui/image-comparison";
```

- [ ] **Add comparison case to `MediaItem`**

In `MediaItem`, after the `if (item.type === 'video') { ... }` block and before the `return` for images, add:

```tsx
    if (item.type === 'comparison') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <ImageComparison
                    before={{ src: item.beforeUrl!, alt: `${item.title} before` }}
                    after={{ src: item.afterUrl!, alt: `${item.title} after` }}
                    fillContainer
                />
            </div>
        );
    }
```

- [ ] **Remove drag-reorder from `InteractiveBentoGallery`**

Replace the full `InteractiveBentoGallery` component body with this cleaned version (removes `items` state, `isDragging` state, drag handlers, and drag props from motion.div):

```tsx
const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

    return (
        <div className="w-full py-8">
            {(title || description) && <div className="mb-8 text-center">
                <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="mt-2 text-sm sm:text-base text-white/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>}
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={mediaItems}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[60px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
                                onClick={() => setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            delay: index * 0.05
                                        }
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full"
                                    onClick={() => setSelectedItem(item)}
                                />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
```

- [ ] **Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

---

## Task 3: Rebuild Gallery.tsx with carousel

**Files:**
- Modify: `components/sections/Gallery.tsx`

Replace the entire file. The carousel owns slide state and passes the active slide's items down to `InteractiveBentoGallery`.

- [ ] **Replace the full file contents**

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

const SLIDES = [
  // Slide 1 — Before/After hero
  [
    {
      id: 1,
      type: "comparison" as const,
      title: "Paint Correction — Before & After",
      desc: "2018 Silverado, Bakersfield CA",
      url: "",
      beforeUrl: "/gallery/IMG_6170.JPEG",
      afterUrl: "/gallery/IMG_6195.JPEG",
      span: "col-span-1 row-span-4 md:col-span-2 md:row-span-5 lg:col-span-3 lg:row-span-5",
    },
    {
      id: 2,
      type: "image" as const,
      title: "After — Paint Correction",
      desc: "2018 Silverado, Bakersfield CA",
      url: "/gallery/the best 2.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-3 lg:row-span-3",
    },
    {
      id: 3,
      type: "image" as const,
      title: "Exterior Detail",
      desc: "Iron remover, clay bar, ceramic sealant",
      url: "/gallery/IMG_6214.JPEG",
      span: "col-span-1 row-span-3 md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2",
    },
    {
      id: 4,
      type: "image" as const,
      title: "After",
      desc: "We come to you",
      url: "/gallery/IMG_6026.JPEG",
      span: "col-span-1 row-span-3 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
    },
    {
      id: 5,
      type: "image" as const,
      title: "The Work",
      desc: "Mobile detail — Bakersfield, CA",
      url: "/gallery/IMG_5804.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-3 lg:row-span-3",
    },
    {
      id: 6,
      type: "image" as const,
      title: "Detail",
      desc: "Bakersfield, CA",
      url: "/gallery/IMG_6158.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-3 lg:row-span-3",
    },
  ],
  // Slide 2 — Video hero
  [
    {
      id: 1,
      type: "video" as const,
      title: "Correction Light",
      desc: "2018 Silverado — 2-step paint correction",
      url: "/gallery/gallery-video.mp4",
      span: "col-span-1 row-span-6 md:col-span-2 md:row-span-7 lg:col-span-3 lg:row-span-8",
    },
    {
      id: 2,
      type: "image" as const,
      title: "Exterior Detail",
      desc: "Iron remover, clay bar, ceramic sealant",
      url: "/gallery/IMG_6214.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-3 lg:row-span-3",
    },
    {
      id: 3,
      type: "image" as const,
      title: "After",
      desc: "We come to you",
      url: "/gallery/IMG_6026.JPEG",
      span: "col-span-1 row-span-3 md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2",
    },
    {
      id: 4,
      type: "image" as const,
      title: "After — Paint Correction",
      desc: "2018 Silverado, Bakersfield CA",
      url: "/gallery/the best 2.JPEG",
      span: "col-span-1 row-span-3 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
    },
    {
      id: 5,
      type: "image" as const,
      title: "The Work",
      desc: "Mobile detail — Bakersfield, CA",
      url: "/gallery/IMG_5804.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-3 lg:row-span-3",
    },
    {
      id: 6,
      type: "image" as const,
      title: "Detail",
      desc: "Bakersfield, CA",
      url: "/gallery/IMG_6158.JPEG",
      span: "col-span-1 row-span-3 md:col-span-2 md:row-span-3 lg:col-span-3 lg:row-span-3",
    },
  ],
];

export function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const multiSlide = SLIDES.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (!multiSlide || isHovered) return;
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, nextSlide, multiSlide]);

  const handleManualNav = useCallback((fn: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    fn();
  }, []);

  return (
    <section className="py-24 px-6 lg:px-8 bg-site-bg">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-normal leading-tight">
            The Work
          </h2>
          <p className="text-white/50 text-sm mt-2 max-w-md">
            No filters. No stock. Every shot is from a real job in Bakersfield.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left arrow */}
          {multiSlide && (
            <button
              onClick={() => handleManualNav(prevSlide)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Bento grid — fades between slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InteractiveBentoGallery mediaItems={SLIDES[currentSlide]} />
            </motion.div>
          </AnimatePresence>

          {/* Right arrow */}
          {multiSlide && (
            <button
              onClick={() => handleManualNav(nextSlide)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Slide dots */}
        {multiSlide && (
          <div className="flex justify-center gap-2 mt-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualNav(() => goToSlide(i))}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-6 bg-yellow-400" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
```

- [ ] **Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Visual check — browser**

Navigate to `localhost:3000`, scroll to "The Work" section. Confirm:
- Slide 1 shows: comparison slider hero (left), 5 photos (right/bottom)
- Slide 2 shows: video hero (left), 5 photos (right/bottom)
- Arrows visible on left and right edges, overlaid on grid
- Clicking arrow advances the slide
- Dots at bottom highlight active slide
- Auto-advances every 5s when not hovering
- Hovering pauses the timer

- [ ] **Commit**

```bash
git add components/ui/image-comparison.tsx components/ui/interactive-bento-gallery.tsx components/sections/Gallery.tsx
git commit -m "feat: gallery carousel with before/after slider and video hero slides"
```

---

## Self-Review

**Spec coverage:**
- ✅ 2-slide carousel with full bento per slide
- ✅ Slide 1 hero: comparison slider (IMG_6170 → IMG_6195)
- ✅ Slide 2 hero: video (gallery-video.mp4)
- ✅ All 8 assets assigned across both slides
- ✅ Arrows on left/right edges, overlaid on grid
- ✅ Arrows + dots hidden when 1 slide
- ✅ Auto-advance 5s, pauses on hover, resets on manual click
- ✅ Drag-reorder removed
- ✅ `fillContainer` prop on ImageComparison for bento embedding
- ⚠️ Mobile CSS snap scroll: not implemented. The carousel arrows work on mobile. Per-tile snap scroll requires a separate mobile layout and is deferred.

**Placeholder scan:** None found. All code blocks are complete.

**Type consistency:** `MediaItemType` extended in Task 2, used in Task 3 (`type: "comparison" as const`, `beforeUrl`, `afterUrl`). The `fillContainer` prop added in Task 1 is consumed in Task 2 (`fillContainer` with no value = `true`). Consistent.
