# metro-site — Current State

> Site-mode state file. Updated at handoff. Read at the start of a Site session.
> Last updated: 2026-10-11 (session 2, full close)

## Where the site is

**Launched** (the full rebuild went live this morning, `adbcd90`). Since then, the homepage service cards were redesigned. That redesign is **localhost only — committed locally, NOT pushed.** Production still shows the old cards.

## Git

- **Pushed (live) HEAD: `adbcd90`** — the full rebuild (plates, photos, rename, Clay n Seal $150, ceramic copy, first scrim fix).
- **Local, unpushed commit(s) on top:** the homepage service-card redesign (see below). `origin/master` does NOT have it yet.
- **Next `git push origin master` deploys the redesign live.** Any push triggers a Vercel production deploy instantly.
- metro-site is a separate repo (github.com/metro-dev6/metro-site), gitignored at the vault root. Use Bash (not Glob/Grep) to inspect it.

## Homepage service-card redesign (LOCAL, not pushed)

In `components/sections/ServicesPreview.tsx`:
- **Name moved to the top-left**, `text-2xl` bold, with a **yellow tick** (`h-[3px] w-8 bg-brand-yellow`) above it — matches the "Services" section header accent.
- **Cards taller:** `min-h-[380px]` → `min-h-[460px]`. Add-ons card matched (taller + `text-2xl` name).
- **Layout:** `flex ... justify-between` — name at top, photo as the hero in the middle, **description + price at the bottom**.
- **Top scrim** added for name legibility: `absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent`.
- **Bottom overlay** lightened: `from-black via-black/35 to-black/0` (hover `via-black/60`).
- **Text shadows lightened** on name/description/price (now ~`rgba(0,0,0,0.85)` first layer).
- **Card images brightened:** `brightness-110` on the `<Image>` className.

Copy: **"Recommended every 2 to 4 weeks." moved from Signature Detail to Exterior Refresh**, synced in both `ServicesPreview.tsx` and `components/services/services-data.ts`. Descriptions otherwise unchanged (operator rewording later).

## Open items

1. **Push the redesign.** It's committed locally, awaiting the operator's final brightness call + a push go. `git push origin master` takes it live.
2. **Brightness `110` not confirmed final.** Knob: `brightness-105` subtler, `115`/`125` more.
3. **/services card images not brightened** to match the homepage. Decide whether to match (different component: `components/services/service-package-card.tsx`).
4. `adbcd90` deploy not re-confirmed READY / live-checked.
5. Full mobile QA not run.
6. Glass/windshield coating parked (needs price/scope/product/warranty).
7. thank-you page offers "Spray wax" as a free loyalty pick but it isn't a listed add-on — confirm intended (carried).

## Notes

- Dev server is operator-run (localhost:3000). Never start it.
- The chrome-devtools **screenshot tool timed out repeatedly** this session (`Page.captureScreenshot timed out`). Fallback that worked: `evaluate_script` DOM reads to confirm structure/classes. The operator eyeballs the actual visuals on their localhost.
- Scroll-reveal sections render at opacity 0 in full-page screenshots until scrolled into view — not a bug. Scroll the element in before capturing a section.
- next/image caches by filename. Reusing a filename after swapping a photo needs a dev restart (or a new filename).
