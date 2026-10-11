# Homepage Restructure — Order, Dark Gallery Wall, Testimonials

**Date:** 2026-09-26
**Status:** Approved (brainstorm complete, spec locked)
**Scope:** Home page only (`app/page.tsx`, `components/sections/Gallery.tsx`, `components/sections/Testimonials.tsx`, `components/ui/google-rating.tsx`, and the gallery's sub-components). No changes to Services, Estimate, or other routes.

Reference: SHWASH's "Our Work" section (`shwash.co`) — full-bleed dark masonry with review badges and a Show all/Show less toggle. Confirmed live via chrome-devtools: their wall is a 3-column Webflow grid (`uui-blog04_list-3col`), badge is an overlay (`gallery-overlay_badge`), control is `is--int_show-all` / `is--int_show-less`. Metro adapts this, it does not copy it.

---

## Goal

Three connected changes to the home page:
1. Reorder sections so the "why us" story groups up top, without burying the offer.
2. Rebuild the Gallery as a full-bleed dark work wall (SHWASH "Our Work" style) while keeping Metro's before/after sliders, which SHWASH has no equivalent for.
3. Keep Testimonials as the single home for reviews, built so it can level up to a two-column scroll once review count grows.

---

## 1. Section order

One block moves: **Why Metro above Services.** Everything else already sits in the target order.

**Current:** Hero → We Come To You → Services → Why Metro → Gallery → Testimonials → CTA → FAQ
**Target:** Hero → We Come To You → **Why Metro** → **Services** → Gallery → Testimonials → CTA → FAQ

Implementation: swap the `<WhyMetro />` and `<ServicesPreview />` lines in `app/page.tsx`. No other file changes for the reorder.

Rationale: leads with differentiator (We Come To You) + reasons (Why Metro) grouped, keeps Services at #4 so a hot visitor still hits the offer fast, then Gallery (dark) into Testimonials (light) as back-to-back proof before the CTA.

---

## 2. Gallery — dark work wall

Replaces the current light rounded-card gallery. Keeps the modular bento feel and the existing comparison-slider tech; changes theme, layout width, before/after format, and control.

**Theme + container**
- Full-bleed **dark** band (edge-to-edge dark background), replacing `bg-brand-white` and the rounded-card treatment. Content grid sits inside a wide max-width; the dark background spans the full viewport width.
- Section heading flips to light-on-dark: "Recent Jobs" label (yellow), "The Work" title (white).
- Note: this is a deliberate break from the site's rounded-card rhythm (Hero card, WhyMetro tiles). Verify the dark/light flow still reads well in sequence: Hero (dark) → We Come To You → Why Metro → Services (light) → **Gallery (dark)** → Testimonials (light) → CTA (dark) → FAQ (light).

**Layout**
- **4-column masonry** maximum on desktop. Modular bento with varied tile heights, same spirit as the current grid.
- Responsive step-down: 4 cols desktop → 2 cols tablet → 1 col mobile (or reuse the existing `MobileGalleryStack` for the mobile case).

**Before/after tiles**
- Stay **interactive drag comparison sliders** (existing `type: "comparison"` tech with `beforeUrl` / `afterUrl`).
- Reformatted **wide, side-by-side**: before on the left, after on the right, draggable divider between them. Each spans **2 columns**, so its band reads as 3-across while the rest of the wall is 4.

**Review badges**
- **None.** No customer name/stars pinned to photos. All reviews live in the Testimonials section (see below) to avoid showing the same 5 reviews twice.

**Data source (manifest hook for the future upload pipeline)**
- Gallery items move out of the hardcoded `SLIDES` array in `Gallery.tsx` into a data file: `data/gallery.json`, imported at build time.
- The current two `SLIDES` become one flat list of items in the manifest (the wall is one masonry grid now, not two slides).
- Each manifest item carries pipeline-friendly fields: `id`, `type` (`"image" | "comparison"`), `title`, `desc`, `url`, `size` (`"sm" | "md" | "lg"` → mapped to grid row-spans in the component, replacing raw Tailwind `span` strings), and for comparisons `beforeUrl` / `afterUrl` / optional `*ObjectPosition`. Comparison items always render wide (2-col span) regardless of `size`.
- This is the hook that makes the future photo-upload pipeline a matter of appending an entry to `gallery.json` and dropping the image into `public/gallery/`, with no component edits. Building the pipeline itself is out of scope (see below).

**Control**
- **Show all / Show less** toggle at the bottom of the wall (SHWASH pattern). Initial state shows a first batch; "Show all" expands the full grid; "Show less" collapses it.
- **Not** numbered pagination. When the wall eventually grows too large, overflow moves to a **slide carousel** using the existing arrows + dots pattern already in `Gallery.tsx` (slide to the next set, not URL pages). Build the toggle now; the carousel-for-overflow is a later step, not part of this build.

---

## 3. Testimonials — keep A, build B-ready

The current section already is "A": light theme, left text/CTA column, right single vertical auto-scroll column with a top/bottom gradient mask. Keep it. Two refactors:

- **B-ready structure:** factor the review-card rendering so switching from one scrolling column (A) to two opposite-scrolling columns (B) is a small, contained change. Do not build B now.
  - Trigger to flip: ~8+ written reviews. Today there are **5** (`GOOGLE_REVIEW_COUNT = 5`), only 4 with text — not enough to fill two columns without obvious looping.
- **Real Google links** (replace the `TODO` placeholder in `google-rating.tsx`):
  - Leave-a-review CTA → `https://g.page/r/CXgXx7o5mCLrEBM/review`
  - "See all on Google" / profile → `https://g.page/r/CXgXx7o5mCLrEBM` (the same link without `/review`; verify it resolves to the profile during implementation).

Division of labor: gallery = the work (photos + before/after). Testimonials = the words (full review quotes + Google rating + review CTA).

---

## Out of scope

- **Photo upload pipeline** — the operator wants to drop photos into a vault session and have them auto-added to the gallery (no manual editing). This is a separate subsystem with its own unknowns (source location, caption/size/before-after tagging, auto-commit-and-deploy vs. review-first, image optimization). It gets its own brainstorm and plan. Tonight's build only lays the groundwork by making the gallery read from `data/gallery.json`.
- Building the two-column testimonials layout (B) — deferred until review count reaches ~8.
- Gathering more reviews — a separate operator action; the review CTA link above enables it.
- Any change to Services, Estimate, Header, Footer, or the announcement bar.
- The numbered-pagination idea — rejected in favor of the Show all/less toggle plus the existing slide carousel.

---

## Verification

No test runner in this repo (no `test` script, no jest/vitest). Verification per existing session pattern:
- `npm run build` (type-check + compile) after each change.
- Live check via chrome-devtools MCP against the dev server — **operator starts `npm run dev`, never the implementer.**
  - Home page top: confirm new section order (We Come To You → Why Metro → Services).
  - Gallery: dark full-bleed, 4-col masonry, wide side-by-side before/after slider drags correctly, Show all/less toggle expands and collapses.
  - Testimonials: still light, single column scrolls with gradient fade, real Google links resolve.
  - Mobile (375px): gallery steps down to 1-2 cols cleanly, before/after slider still usable, no horizontal overflow.

---

## Open items / prerequisites (not blocking this build)

- Real Google profile URL confirmation (derived link resolves to the profile).
- Reaching ~8 reviews to justify the B flip; needs the review CTA live and the operator asking recent clients.
