# Homepage Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder the home page (Why Metro above Services), rebuild the Gallery as a full-bleed dark masonry work wall reading from a `data/gallery.json` manifest, and refactor Testimonials to be two-column-ready while wiring in the real Google links.

**Architecture:** `page.tsx` swaps two section lines. Gallery item data moves out of the hardcoded `SLIDES` array into `data/gallery.json`, wrapped by a typed `lib/gallery-data.ts`. `Gallery.tsx` is rewritten to render a dark 4-column CSS-grid masonry from that data with a Show all/less toggle, keeping the existing `ImageComparison` drag slider for before/after tiles (rendered wide, 2-col span) and `MobileGalleryStack` for mobile. `Testimonials.tsx` is refactored into `ReviewCard` + `ReviewColumn` units so flipping A→B later is small; it renders one column now.

**Tech Stack:** Next.js App Router, React client components, Tailwind CSS, framer-motion, existing `ImageComparison` / `MobileGalleryStack` / `useIsDesktop` / `fadeUp`.

**Verification:** No test runner in this repo. Each task ends with `npm run build` (type-check + compile). Live visual verification (Task 5) uses chrome-devtools MCP against the dev server — **operator starts `npm run dev`, never the implementer.**

**Commits:** Deferred to session end per the operator's no-mid-session-commit rule. Per-task commit steps are intentionally omitted; verification is the build.

---

### Task 1: Reorder sections in `page.tsx`

**Files:**
- Modify: `app/page.tsx:124-131`

- [ ] **Step 1: Swap Why Metro above Services**

Find:

```tsx
      <Hero />
      <WeComeToYou />
      <ServicesPreview />
      <WhyMetro />
      <Gallery />
      <Testimonials />
      <CTABanner />
      <FAQ theme="light" />
```

Replace with:

```tsx
      <Hero />
      <WeComeToYou />
      <WhyMetro />
      <ServicesPreview />
      <Gallery />
      <Testimonials />
      <CTABanner />
      <FAQ theme="light" />
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds, no type errors.

---

### Task 2: Create the gallery manifest + typed loader

**Files:**
- Create: `data/gallery.json`
- Create: `lib/gallery-data.ts`

- [ ] **Step 1: Create `data/gallery.json`**

Flattens the current two `SLIDES` into one list. `size` replaces raw Tailwind span strings. Comparisons render wide regardless of size. Note: the old "$80" caption on the third comparison is dropped (headlight restoration is $50 now — avoid stale pricing in the wall).

```json
{
  "items": [
    { "id": 1, "type": "image", "size": "lg", "title": "Exterior Detail", "desc": "Decontaminated & Protected", "url": "/gallery/Slide%201/IMG_5804.JPEG" },
    { "id": 2, "type": "image", "size": "md", "title": "Maintenance Detail", "desc": "Back to New Every Month", "url": "/gallery/Slide%201/IMG_6214.JPEG" },
    { "id": 3, "type": "image", "size": "sm", "title": "Deep Cleaned Wheel", "desc": "Brake Dust Safely Removed", "url": "/gallery/Slide%201/IMG_6026.JPEG" },
    { "id": 4, "type": "image", "size": "md", "title": "Mirror Finish", "desc": "2018 Silverado — 2-Step Paint Correction", "url": "/gallery/Slide%201/IMG_6297.JPEG" },
    { "id": 5, "type": "comparison", "size": "lg", "title": "Headlight Restoration", "desc": "", "beforeUrl": "/gallery/Slide%201/IMG_6170.JPEG", "afterUrl": "/gallery/Slide%201/IMG_6195.JPEG" },
    { "id": 6, "type": "comparison", "size": "lg", "title": "Seat Shampoo", "desc": "Deep extracted, not wiped", "beforeUrl": "/gallery/Slide%202/IMG_6321.JPEG", "afterUrl": "/gallery/Slide%202/IMG_6348.JPEG" },
    { "id": 7, "type": "comparison", "size": "lg", "title": "Headlight Restoration", "desc": "Book it on its own", "beforeUrl": "/gallery/Slide%202/IMG_6346.JPEG", "afterUrl": "/gallery/Slide%202/IMG_6367.JPEG", "afterObjectPosition": "center calc(50% + 25px)" },
    { "id": 8, "type": "image", "size": "md", "title": "Interior Detail", "desc": "Upholstery Stain Treatment", "url": "/gallery/Slide%202/toyota-corolla-interior-detail-bakersfield.JPEG" },
    { "id": 9, "type": "image", "size": "sm", "title": "Exterior Detail", "desc": "Decontaminated, 1-Step Paint Enhancement, Protected", "url": "/gallery/Slide%202/IMG_6158.JPEG" },
    { "id": 10, "type": "image", "size": "md", "title": "Full Detail", "desc": "Large 3-Row SUV Received The Works, Inside & Out", "url": "/gallery/Slide%202/IMG_5922.JPEG" }
  ]
}
```

- [ ] **Step 2: Create `lib/gallery-data.ts`**

```ts
import galleryData from "@/data/gallery.json";

export type GallerySize = "sm" | "md" | "lg";

export interface GalleryItem {
  id: number;
  type: "image" | "comparison";
  size: GallerySize;
  title: string;
  desc: string;
  url?: string;
  beforeUrl?: string;
  afterUrl?: string;
  objectPosition?: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

// Row-span units for the desktop masonry grid (auto-rows are 10px + 12px gap).
export const ROW_SPAN: Record<GallerySize, number> = { sm: 18, md: 24, lg: 30 };
export const COMPARISON_ROW_SPAN = 26;

export const GALLERY_ITEMS = galleryData.items as GalleryItem[];
```

- [ ] **Step 3: Confirm JSON import is allowed**

Run: `npm run build`
Expected: succeeds. If it fails on the JSON import, ensure `tsconfig.json` `compilerOptions` has `"resolveJsonModule": true` (Next.js default) and rebuild.

---

### Task 3: Rewrite `Gallery.tsx` as the dark masonry wall

**Files:**
- Modify: `components/sections/Gallery.tsx` (full rewrite)
- Modify: `components/ui/mobile-gallery-stack.tsx:97` (footer to dark, to match the section)

- [ ] **Step 1: Replace `Gallery.tsx` entirely**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageComparison } from "@/components/ui/image-comparison";
import { MobileGalleryStack, type MobileGalleryItem } from "@/components/ui/mobile-gallery-stack";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { fadeUp } from "@/lib/motion";
import { GALLERY_ITEMS, ROW_SPAN, COMPARISON_ROW_SPAN, type GalleryItem } from "@/lib/gallery-data";

const INITIAL_COUNT = 8;

const MOBILE_ITEMS: MobileGalleryItem[] = GALLERY_ITEMS.map((item) => ({
  id: item.id,
  type: item.type,
  title: item.title,
  desc: item.desc,
  url: item.url ?? "",
  beforeUrl: item.beforeUrl,
  afterUrl: item.afterUrl,
  objectPosition: item.objectPosition,
  beforeObjectPosition: item.beforeObjectPosition,
  afterObjectPosition: item.afterObjectPosition,
}));

export function Gallery() {
  const isDesktop = useIsDesktop();
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const canToggle = GALLERY_ITEMS.length > INITIAL_COUNT;
  const visible = expanded ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, INITIAL_COUNT);

  return (
    <section className="bg-brand-black py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">

        <motion.div {...fadeUp} className="mb-12">
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-yellow mb-3 not-italic">
            Recent Jobs
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-white tracking-tight">
            The Work
          </h2>
          <p className="text-white/60 text-sm mt-2 max-w-md">
            No filters. No stock. Every shot is from a real job in Bakersfield.
          </p>
          <div className="mt-4 h-px bg-white/10" />
        </motion.div>

        {isDesktop ? (
          <>
            <div className="grid grid-cols-4 auto-rows-[10px] grid-flow-row-dense gap-3">
              {visible.map((item) =>
                item.type === "comparison" ? (
                  <div
                    key={item.id}
                    className="col-span-2 rounded-2xl overflow-hidden relative"
                    style={{ gridRow: `span ${COMPARISON_ROW_SPAN}` }}
                  >
                    <ImageComparison
                      before={{ src: item.beforeUrl!, alt: `${item.title} before` }}
                      after={{ src: item.afterUrl!, alt: `${item.title} after` }}
                      initialPosition={75}
                      fillContainer
                      beforeObjectPosition={item.beforeObjectPosition}
                      afterObjectPosition={item.afterObjectPosition}
                    />
                  </div>
                ) : (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl overflow-hidden cursor-zoom-in"
                    style={{ gridRow: `span ${ROW_SPAN[item.size]}` }}
                    onClick={() => setLightbox(item)}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <h3 className="text-white text-sm font-medium line-clamp-1">{item.title}</h3>
                      {item.desc && <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{item.desc}</p>}
                    </div>
                  </div>
                )
              )}
            </div>

            {canToggle && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="bg-brand-yellow text-brand-black font-black tracking-widest text-sm px-7 h-11 rounded-full hover:shadow-[0_0_20px_5px_rgba(250,194,5,0.35)] transition-shadow"
                >
                  {expanded ? "Show less" : "Show all"}
                </button>
              </div>
            )}
          </>
        ) : (
          <MobileGalleryStack items={MOBILE_ITEMS} />
        )}

      </div>

      <AnimatePresence>
        {lightbox && lightbox.type !== "comparison" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <img
              src={lightbox.url}
              alt={lightbox.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Match the mobile stack footer to the dark section**

In `components/ui/mobile-gallery-stack.tsx`, find:

```tsx
        <div className="px-4 py-3 bg-brand-white">
          <h3 className="text-brand-black text-sm font-medium">{item.title}</h3>
          {item.desc && (
            <p className="text-black/60 text-xs mt-0.5">{item.desc}</p>
          )}
        </div>
```

Replace with:

```tsx
        <div className="px-4 py-3 bg-[#141517]">
          <h3 className="text-brand-white text-sm font-medium">{item.title}</h3>
          {item.desc && (
            <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
          )}
        </div>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds, no type errors. `InteractiveBentoGallery` becomes unused — that is expected; leave the file in place (no import references it now).

---

### Task 4: Testimonials B-ready refactor + real Google links

**Files:**
- Modify: `components/ui/google-rating.tsx:1-3`
- Modify: `components/sections/Testimonials.tsx` (full rewrite)

- [ ] **Step 1: Wire the real Google links**

In `components/ui/google-rating.tsx`, find:

```tsx
export const GOOGLE_PROFILE_URL = "https://share.google/ggiBdFRwhkILjiw87"; // TODO: replace with real URL
export const GOOGLE_RATING_VALUE = "5.0";
export const GOOGLE_REVIEW_COUNT = 5;
```

Replace with:

```tsx
export const GOOGLE_PROFILE_URL = "https://g.page/r/CXgXx7o5mCLrEBM";
export const GOOGLE_REVIEW_URL = "https://g.page/r/CXgXx7o5mCLrEBM/review";
export const GOOGLE_RATING_VALUE = "5.0";
export const GOOGLE_REVIEW_COUNT = 5;
```

- [ ] **Step 2: Rewrite `Testimonials.tsx` into ReviewCard + ReviewColumn (render one column now)**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_REVIEW_URL,
  GOOGLE_RATING_VALUE,
  GOOGLE_REVIEW_COUNT,
  GoogleIcon,
  Stars,
} from "@/components/ui/google-rating";

type Review = { name: string; body: string; time: string };

const reviews: Review[] = [
  {
    name: "Dennis Hannum",
    body: "Devin was really great. He is very knowledgeable about detailing cars. He was punctual as well as polite. I will be using him again in the future.",
    time: "1 week ago",
  },
  {
    name: "Kris Chav",
    body: "I recommend Metro to anyone looking for an honest company to perform quality work. I scheduled Metro to come to me while I was at work to do a refresh detail with sand removal on my 15 year old car. This was my first professional detail and wow — I was impressed with the attention given to every crevice. The carpet? Spotless. The vents? Free of dust. Even the tiny cracks where dust and dirt accumulate were cleaned. I couldn't be happier with the results!",
    time: "4 weeks ago",
  },
  {
    name: "Braden Baptista",
    body: "Damian did an incredible job on my Mazda. He was very professional and I am very satisfied with his services. There is no doubt in my mind that I will go Metro Auto again for any detailing needs!",
    time: "11 weeks ago",
  },
  {
    name: "Mary Grigoryan",
    body: "I wish I had taken a before and after picture! My car looks BRAND NEW!! I heard about Damian through word of mouth and I'll be doing the same! I'll be sending him to everyone I know 🙌🏻 🙌🏻",
    time: "",
  },
  {
    name: "Jimmy Wilson",
    body: "",
    time: "",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="hover-lift bg-black/[0.02] border border-black/10 rounded-2xl p-8 flex flex-col gap-4">
      {review.body && (
        <div className="font-accent text-5xl text-brand-yellow leading-none -mb-2">&ldquo;</div>
      )}
      <div className="flex items-center justify-between">
        <Stars />
        <div className="flex items-center gap-1.5 text-black/30">
          <GoogleIcon />
          <span className="text-xs font-medium">Google</span>
        </div>
      </div>
      {review.body ? (
        <p className="text-base text-black/65 leading-relaxed flex-1">&ldquo;{review.body}&rdquo;</p>
      ) : (
        <p className="text-sm text-black/40 italic flex-1">5-star rating, no written review.</p>
      )}
      <div className="pt-2 border-t border-black/[0.08]">
        <span className="text-sm font-black text-brand-black">{review.name}</span>
      </div>
    </div>
  );
}

// direction "down" is wired for the future two-column (B) layout; only "up" is used today.
// Flipping to B: render two ReviewColumns with sliced arrays and opposite directions,
// and add an `animate-scroll-vertical-reverse` keyframe in globals.css.
function ReviewColumn({ items, direction = "up" }: { items: Review[]; direction?: "up" | "down" }) {
  const doubled = [...items, ...items];
  const anim = direction === "up" ? "animate-scroll-vertical" : "animate-scroll-vertical-reverse";
  return (
    <div
      className="relative h-[500px] lg:h-[640px] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className={`${anim} flex flex-col gap-4`}>
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="bg-brand-white py-24 px-6 lg:px-10 scroll-mt-[100px]">
      <div className="mx-auto max-w-[1600px] grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">

        <motion.div {...fadeUp}>
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-black mb-3 not-italic">
            Reviews
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-brand-black tracking-tight mb-4">
            Straight From Our Clients
          </h2>
          <p className="text-black/65 text-base leading-relaxed max-w-sm mb-6">
            No paid actors, no stock quotes. Every review here came from a real job in Bakersfield.
          </p>

          <div className="inline-flex items-center gap-2.5 border border-black/10 rounded-full pl-3 pr-4 py-2 mb-6">
            <GoogleIcon className="w-4 h-4" />
            <Stars className="w-3.5 h-3.5" />
            <span className="text-sm font-bold text-brand-black">{GOOGLE_RATING_VALUE}</span>
            <span className="text-sm text-black/50">({GOOGLE_REVIEW_COUNT} reviews)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-brand-yellow hover:text-brand-black transition-colors inline-flex items-center gap-2"
              style={{ textShadow: "0 1px 1px rgba(0,0,0,0.2)" }}
            >
              See all on Google
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-brand-black bg-brand-yellow rounded-full px-4 py-2 hover:bg-brand-black hover:text-brand-yellow transition-colors"
            >
              Leave a review
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp}>
          <ReviewColumn items={reviews} direction="up" />
        </motion.div>

      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds, no type errors.

---

### Task 5: Final end-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: clean build, no type or lint errors.

- [ ] **Step 2: Ask the operator to start the dev server**

Tell the operator: "Run `npm run dev`, then tell me when it's up." Do not start it.

- [ ] **Step 3: Live checks via chrome-devtools MCP against `http://localhost:3000`**

1. `/` top: section order reads Hero → We Come To You → Why Metro → Services.
2. Gallery: dark full-bleed band, 4-col masonry, tiles varied heights. Before/after tiles are wide (2-col) and the divider drags. "Show all" reveals the rest; "Show less" collapses.
3. Testimonials: light, single column scrolls up with the top/bottom gradient fade. "See all on Google" and "Leave a review" both open the right Google URLs.
4. Mobile (375px): gallery switches to the swipe stack, before/after still draggable, no horizontal page overflow. Reset viewport to desktop after.

- [ ] **Step 4: Report results**

Summarize what rendered correctly and anything that needed adjusting (e.g., row-span tuning for the masonry rhythm). If a tile's height looks wrong, adjust its `size` in `data/gallery.json` or the `ROW_SPAN` map and re-verify. Do not mark done until the operator confirms it looks right.

---

## Self-Review Notes

- **Spec coverage:** Order (Task 1), dark gallery + 4-col + wide before/after + Show all/less + no badges + manifest (Tasks 2-3), Testimonials A-now/B-ready + real links (Task 4), verification incl. operator-run dev server (Task 5). All spec sections covered.
- **Types:** `GalleryItem`, `ROW_SPAN`, `COMPARISON_ROW_SPAN` defined once in `lib/gallery-data.ts` and used with those exact names in `Gallery.tsx`. `MobileGalleryItem` mapped explicitly (its `url` is required, so nullish-coalesced from the optional manifest `url`).
- **No placeholders:** every step has literal code or an exact command.
- **Flagged content (not changed unilaterally, raise with operator):** gallery captions "2-Step Paint Correction" (item 4) and "1-Step Paint Enhancement" (item 9) may conflict with `anti-misclassification.md` (Metro is not a paint-correction specialist). Migrated as-is; operator decides whether to reword. The stale "$80" caption was dropped since it is a factual pricing error (now $50).
