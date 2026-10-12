# metro-site — Current State

> Site-mode state file. Updated at handoff. Read at the start of a Site session.
> Last updated: 2026-10-11

## Where the site is

Close to launch-ready. This session: all license plates blurred, real photos wired, the service ladder renamed + repriced, and the service copy rewritten to sell the ceramic sealant value.

## Git

- **Last commit: `4ef7725`** (140 files, multi-session backup). Commit only, never pushed.
- **Everything after 4ef7725 is uncommitted** on master: the plate redactions, photo swaps/rename, the Who-Does-Work hide, and the full content/rename/price sweep. A large unbacked-up diff. Awaiting explicit go to commit. Push = instantly live.
- metro-site is a separate repo, gitignored at the vault root. Auto-commit never touches it. Use Bash (not Glob/Grep) to inspect it.

## What changed this session (all uncommitted)

**License plates — redacted on 11 photos, irreversible.**
Method lives in scratchpad scripts (`redact-v3.js`): shrink the plate region to ~6px (destroys the digits), upscale, blur, feather the edges. Verified unreadable at full res via montage + full-res crops. Photos: `public/services/` signature-detail, exterior-refresh, full-detail; `public/gallery/` mazda3, exterior-detail-decon (Golf), hyundai-elantra, mercedes-c-class, ram-1500, mazda-miata, chevy-silverado; `public/hero/` silverado (rear plate). Left as-is: the OVER EZ vanity plate on the Clay n Seal gallery/clay photo, and no-plate shots (CX-5, Jeep, Accord, Versa, CTA, OG, process close-ups). Clean originals + all scripts are in the session scratchpad.

**Photos swapped/renamed.**
- Signature Detail photo = red Elantra, converted from `C:/Users/Damian/Pictures/iCloud Photos/Photos/good pictures/IMG_0305.DNG` (sharp read the embedded JPEG). File renamed `signature-wash-bakersfield.webp` → `signature-detail-bakersfield.webp`.
- Exterior Refresh photo = white Ram (`jobs/.../IMG_6157.JPEG`).
- Hero background = black Silverado (`jobs/.../IMG_6310.JPEG`), via `Hero.tsx` `FALLBACK_IMG` → `/hero/silverado-mobile-detailing-bakersfield.webp`.
- /services card crops: added `imagePosition` to the Service type + `service-package-card.tsx`. Exterior Refresh + Interior Detail at `center 40%` / `center 30%`.

**Who Does The Work section hidden** (`app/services/page.tsx`): render + import commented out. Removed a live `{{UNVALIDATED}}` years leak and a photo placeholder. Operator = 5 years exp (in the code comment). Re-enable when the operator photo is ready.

**Rename: Signature Wash → Signature Detail** (RULE-034). Name, slug, photo filename, estimate-form matching (`EstimateForm.tsx`), FAQ, FAQ data, llms.txt, locations, dormant `[slug]` page. Price/scope unchanged ($150/$180/$210, 3-month ceramic + full interior).

**Price: Clay n Seal $200→$150 / $180 / $210** (RULE-035), all tiers, all spots. Ladder is now $80 / $150 / $150 / $200 / $350 (Exterior Refresh / Signature Detail / Clay n Seal / Interior Detail / Full Detail). Operator accepted the Signature-vs-Clay tie (different services, market anchor $150).

**Copy:** all 5 service descriptions rewritten to sell the ceramic sealant value (beads water, slick/glossy, bonds to the clear coat vs wax that melts in Bakersfield heat), value line added to Full Detail. Applied to /services (`services-data.ts`) and the homepage one-liners (`ServicesPreview.tsx`).

## Open items

1. **Homepage preview layout not eyeballed.** Screenshot `scratchpad/home-preview-sweep.jpeg` was taken, not read. The new one-liners are longer; Clay n Seal and Full Detail cards may crowd. Confirm, trim if needed.
2. **Ram crop** at `center 40%` — confirm "slightly lower" landed right (change the % in `services-data.ts` if not).
3. **metro-site commit** — awaiting go.
4. Full both-viewport (mobile) QA not run.
5. Glass/windshield coating still parked (needs price/scope/product/warranty).
6. Homepage ServicesPreview keeps its own `imageStyle` objectPositions (e.g. signature "75% center") — not matched to /services, low priority.
7. thank-you page offers "Spray wax" as a free loyalty pick but it isn't a listed add-on — confirm intended (carried).

## Notes

- Dev server is operator-run (localhost:3000). Never start it.
- next/image caches by filename. Reusing a filename after swapping a photo needs a dev restart (or a new filename) before the browser/server shows it. The Signature Detail rename sidestepped this. Plain `<img>` on /services cards refreshes immediately.
