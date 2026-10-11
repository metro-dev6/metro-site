# Metro-Site — Current State (2026-10-08, evening)

## Where we are
Launch push continuing. See `sessions/launch-plan.md` for the full plan and blocker checklist.
Font LOCKED. Mobile pass complete (5/5). /services polished. **Wax/sealant sitewide sync DONE this session — top pre-launch blocker cleared.** /services card photos now wired to real images. Remaining launch gates: metro-site commit, visual QA, glass-coating price.

## This session (2026-10-08) — wax/sealant sync + /services photos
- **Wax/sealant sitewide sync (RULE-033) — DONE.** The swap was only on /services last session; the rest of the site described the old setup. Synced 8 files so every surface reads one way: **Exterior Refresh = spray wax (shine) + $30 ceramic upgrade; Signature Wash = 3-month ceramic included.** Files touched: `components/sections/ServicesPreview.tsx`, `public/llms.txt`, `components/services/services-faq-data.ts`, `app/locations/[slug]/page.tsx`, `app/services/[slug]/page.tsx` (dormant meta, pages redirect), `components/services/services-data.ts`, plus vault `canonical/pricing-framework.md` and `knowledge/detailing/products.md`. Residual grep clean (0 "protective wax coat" / "hand-applied"). tsc exit 0.
- **Spray-wax correction (operator, mid-task).** The wax is a **spray wax**, not hand-applied paste. /services copy still said "hand-applied" — fixed in description + feature list. "spray wax" used across the whole sync.
- **thank-you loyalty line:** "Hand wax" -> "Spray wax" (`app/thank-you/page.tsx`).
- **/services card photos wired.** The cards (`ServicePackageCard`) render `service.image`, but the 5 objects in `services-data.ts` had no `image` field, so they showed the gray "Photo: (placeholder)" box. The photos were never missing — metro-site is gitignored at the vault root so the Glob tool is blind to it; all 5 webps exist in `public/services/`. Added `image` to all 5 (`exterior-refresh`, `signature-wash`, `clay-n-seal`, `interior-detail`, `full-detail` -bakersfield.webp). Same files the homepage uses, so /services and homepage now match. Stale header comment updated.

## Font (LOCKED 2026-10-06)
- Headlines: **Oswald** via next/font (`--font-oswald`), hero headline tracking `0.03em` (`Hero.tsx:79`). Archivo fully removed.
- Body: Hanken Grotesk. DM Sans (numbers). Fraunces (accent italic). Unchanged.

## Mobile pass (complete 5/5, 2026-10-06)
- FIXED: hero headline overlapping the METRO logo; estimate vehicle-size card title overflow (<=375px); estimate package-row tap targets (46px); gallery height jump / CLS (locked `h-[55vh]`); hamburger redesigned to full-screen dark Oswald menu.
- TODO: QA locations + blog pages at real widths (part of full QA below).

## Still open before live
1. **metro-site commit** — three sessions of work uncommitted on master (separate repo, never auto-pushed). Awaiting explicit go. Push = instantly live. Biggest exposure now.
2. **Visual QA of the 5 /services card photos** — not yet eyeballed in a browser (operator dev server; screenshot tool timed out). If a crop/car is wrong, swap the webp (same filename + folder, auto-picks up).
3. **Full both-viewport QA** on every page not yet run.
4. **Glass / windshield coating** — new add-on upsell, operator offers it but no price set. Needs a pricing brainstorm (price, windshield-only vs all glass, product, duration/warranty, liner) before it goes on the site. Parked in `active-commitments.md`.
5. Ceramic-coating + paint-correction packages (1/3/5-yr): stay OFF the live site until Metro has performed a ceramic coating (anti-misclassification). Parked in `active-commitments.md`.
6. Minor: thank-you offers "Spray wax" as a free loyalty pick, but spray wax isn't a listed add-on — confirm intended. products.md still has dead service names (Exterior Detail, Refresh Detail) beyond the wax line — separate cleanup.

## Gotchas
- **metro-site is gitignored at the Metro-Vault root.** The Glob tool cannot see metro-site files. Use Bash `ls`/`find` to inspect, not Glob.
- CTA card above the footer uses a scroll-reveal and reads empty in from-top screenshots (minor, operator's call, not fixed).

## Dev server
Operator-run. localhost:3000 and 192.168.50.6:3000. Never started in-session.

## Not committed
All metro-site changes uncommitted on master (separate repo). Explicit operator go only. No push without go. Push = instantly live.
