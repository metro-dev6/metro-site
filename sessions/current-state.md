# metro-site — Current Session State

> Updated by /handoff. Read this at the start of every Site session.
> Last updated: 2026-09-12

## 2026-09-12 Session 7 — Background unified to Steel Graphite, header/footer matched, NOT PUSHED

**Root cause found for operator's "3 separate colors, no flow" complaint from reviewing Session 6's build:** Hero used `bg-zinc-950`, most sections used `bg-site-bg` (`#050606`), WhyMetro used `bg-[#141414]` — three different near-black shades creating visible seams while scrolling. Not a new bug, just never named until the operator actually ran the build.

**Competitive research before picking a fix:** WebSearch + chrome-devtools screenshots of Hyer Quality Detail (Tempe, AZ — dark PPF/ceramic studio, closest real comparable to Metro's dark theme) and SHWASH (Dallas mobile detailing, light theme but far better engagement stats per operator's SimilarWeb pull — 1:45 avg visit vs. HQD's 16 sec). Both confirmed the same pattern: one consistent base background color, contrast reserved for genuinely different accent colors used sparingly or at specific deliberate moments — never several near-identical shades distributed for "separation." That ruled out adding more bands and pointed straight at unification.

**Color selection, two rounds of Artifact tools:**
- Round 1 — static 5-card comparison page (warm dark options: Soft Charcoal, Warm Espresso, Warm Graphite, Olive Ink) with a mini hero mockup per candidate.
- Round 2 — operator asked for something interactive: built an HSL color-wheel lab with a live-updating mockup, then rebuilt the mockup to use the actual real homepage copy/structure (real headline, real 5 service cards with real prices, real Why Metro copy, real gallery titles, all 4 real client reviews, real FAQ, real footer) after the operator asked for "a real mockup" instead of simplified placeholder sections.
- Operator floated pure white as an option too; flagged that as a full rebrand reversal (breaks the "same brand, no rebrand" call locked into `visual-design-spec-2026-09.md`) versus a quick fix — operator agreed white wasn't landing and asked to narrow to graphite-family options only, static-card format, no wheel.
- Final picks presented: Graphite Black `#18191B`, Steel Graphite `#1D2126`, Graphite `#202224`, Warm Graphite `#211F1D`, Soft Graphite `#26282A`. **Operator chose Steel Graphite `#1D2126`.**

**Contrast verified with real math before implementing, not assumed:** headline (white 100%) 16.2:1, subtext/body (white/70, white/50) 8.5:1 and 5.1:1, yellow eyebrow/accent 9.9:1 — all clear WCAG AA. The one borderline case, de-emphasized secondary labels at `white/40` (~3.7:1), was already at ~3.8:1 against the old `#050606` — not a regression from this change, left as-is.

**Implemented (build-verified clean, twice):**
- `app/globals.css` — `--color-site-bg` changed from `#050606` to `#1D2126`.
- `components/sections/Hero.tsx` — `bg-zinc-950` → `bg-site-bg`.
- `components/sections/WhyMetro.tsx` — `bg-[#141414]` → `bg-site-bg`.
- Operator then asked for header/footer to match too: `components/layout/AnnouncementBar.tsx`, `components/layout/Header.tsx` (desktop bar + mobile dropdown), `components/layout/Footer.tsx` — all `bg-brand-black`/`bg-zinc-950` → `bg-site-bg`.

**Left alone on purpose:** card-level `zinc-950` inside ServicesPreview's Add-Ons cell and WhyMetro's 4 reason tiles — those now read as recessed cards against the lighter section color (real depth, not a clash), and text inside them has even higher contrast on the darker card color, not lower.

**Not pushed** — same standing pattern as Session 6, operator hasn't run `npm run dev` to eyeball the actual render yet this cycle. 6 files committed locally in the metro-site repo, no push.

**New, separate from the vault:** a taskbar-pinnable desktop shortcut ("Metro Site Dev Server") that opens PowerShell, `cd`s into `metro-site/`, and runs `npm run dev` — lives outside any repo (`C:\Users\Damian\Desktop\`), not tracked here beyond this note.

**Floated, not built:** redesigning ServicesPreview's flush/touching card grid (cards share 1px gap lines, no individual rounding) into separated rounded bento-style cards, plus tags/badges on service cards. Real precedent already exists and was never built: `04-services-page-v3.md` specs a "Best Value" yellow-border badge on the Full Detail card. Offered to run this through a design pass (mockup + spec, same process the homepage refresh went through) before touching the component — operator deferred to next session.

**Next session opens with:** operator runs `npm run dev`, verifies the Steel Graphite background renders as expected across every section including header/footer, decides push. If it looks right, move to the card-redesign discussion (brainstorm first, per standing practice for layout/component changes) or the location-page build, both still unblocked by the Session 6 spec.

## 2026-09-10 Session 6 — Visual direction locked and built (Black & Yellow, Elevated), NOT PUSHED

**21st.dev MCP confirmed live** (blocked once by the auto-mode permission classifier, approved, retested with a real search — works).

**Direction locked: same brand colors, new layout system.** After stress-testing Burgundy & Sand at full page length (not just a hero card), the operator reconsidered the whole rebrand premise — black+yellow is already live everywhere except this exploration (GBP, social, the vehicle) — and chose "same brand, better layout" over a new palette. Spec written and approved: `sessions/visual-design-spec-2026-09.md`. New italic accent typeface confirmed (Fraunces). Scope locked to presentation only, zero copy changes.

**Implementation plan written and fully executed**, all inline this session: `sessions/visual-implementation-plan-2026-09.md`, 9 tasks. 8 code tasks done, build-verified clean after each, 8 separate commits in this repo. **None pushed** — operator wants to verify locally via `npm run dev` in a new session first.

**What actually changed (local only, not live):**
- Fraunces font added (`app/layout.tsx`, `app/globals.css`) — new `.font-accent` utility
- All CTA buttons site-wide: `rounded-lg`/`rounded-md` → `rounded-full` (`shiny-button.tsx`, `Header.tsx`)
- `Hero.tsx` — new eyebrow label, "Mobile Detailing" now italic Fraunces (headline text otherwise unchanged), 4-stat bordered grid replaced with a 3-stat full-bleed yellow trust strip (5+ Years / 5.0 Rating / 100% Mobile — dropped 24/7 Free Estimates per operator's explicit choice, not merged to 4 columns since that layout was never mocked up)
- `ServicesPreview.tsx` — new "What We Do" label, all prices switched from DM Sans to Fraunces italic
- `WhyMetro.tsx` — background changed to `#141414` so it doesn't blend into ServicesPreview above it (real gap caught in plan self-review before execution), new "Why Metro" label, `rounded-2xl` cards
- `Testimonials.tsx` — background flipped to full-bleed yellow, cards flipped to solid black, added a 4th real review (Mary Grigoryan, Mazda CX-5, referred by Sherrise) instead of cutting one of the existing 3 named reviews, grid went 3-across → 2x2
- `CTABanner.tsx` — "We come to you." now italic Fraunces yellow

**Not touched, on purpose:** Gallery, FAQ, SocialFeed, Footer — none had an approved mockup behind them. Restyling them now would be guessing, not building to spec.

**Deferred, not this session:** scroll-reveal and count-up-number animations (operator-flagged, correctly scoped as post-layout work). Real component found for the count-up piece when that phase starts: `danielpetho/basic-number-ticker` on 21st.dev (ref-triggered tween, logic reusable even though its default styling isn't).

**Also this session:** generated `marketing/metro-brand-identity-guide.pdf` (colors, fonts, voice, platform rules, boilerplate, pricing) — surfaced that `marketing/brand-kit.html` (meant to be the canonical visual reference) is still the unfilled starter template with a placeholder accent color and no logo. Not fixed yet.

**Next session opens with:** `npm run dev`, visual check against the approved mockup, then a push decision.

---

## 2026-09-10 Session 5 — Reconnected the 21st.dev "magic" MCP, no design work yet

Operator wanted to keep exploring visual directions (still unlocked from 9/8) with the dev server up and the 21st.dev "magic" MCP pulling real components — explicitly overriding the standing brainstorming-skill gate for this specific thread. Before touching that: caught my own session-start error (the Downloads scan re-flagged `metro-seo-audit-2026-09.md` as new; it was already fully processed 2026-09-07, nothing further to file) and flagged the standing blocker once (visual direction not locked) — operator acknowledged and chose to proceed anyway.

**Magic MCP was never actually wired up.** `metro-site/CLAUDE.md` documents it as available ("magic: 21st.dev component library"), but no `.mcp.json` existed anywhere in the project and `components.json`'s `registries` was empty — only the `@shadcn` registry MCP was live. Operator chose to reconnect it. Correct current CLI is `21st init --client claude --write --api-key <key>` (not `install`, which the operator tried first and got "Unknown command"). Ran it successfully: wrote `.mcp.json` at the **Metro-Vault root** (not inside `metro-site/`) with a `21st` HTTP MCP server (`https://21st.dev/api/mcp`), authenticated via `${API_KEY_21ST}` env-var reference — no literal key in the file itself.

**Live security incident, not fully closed.** The operator's 21st.dev API key got pasted in plaintext into the chat transcript twice. Flagged immediately; operator regenerated the key at 21st.dev/mcp. Attempted to set the new key as a persistent Windows env var via `setx` — blocked by the permission classifier (system registry writes need the operator directly). **Operator still needs to**: run `setx API_KEY_21ST "<new-key>"` in a real OS terminal (PowerShell app opened normally — not this session's in-chat `!` prefix, which would echo the key into the transcript a third time), then fully restart Claude Code so the new `.mcp.json` server can authenticate.

**No design work happened this session.** Dev server was never started, no mockup rounds run, magic MCP never actually called (blocked on the env var). Next session should open by confirming the `21st` MCP tool is live before anything else.

## 2026-09-08 Session — Location strategy finalized, visual redesign kicked off

Location-page strategy finalized (see the "Location page strategy" section below) — Terra Vista dropped from the build list (confirmed twice against live code, no fix exists), Stockdale Estates will be retitled with a redirect, Stone Meadows anchor filled in.

Planning the actual page build surfaced a real blocker: `app/locations/[slug]/page.tsx` can't support the new content template — no Character, Services (tailored), Service Commitment, Nearby Areas, or Local FAQ sections exist, just a thin generic intro + one-size-fits-all services list. Building those sections is a real layout/component decision, not a content-fill task, so `superpowers:brainstorming` got invoked before touching the component.

Operator redirected the goal significantly: wants a new visual design system, not a copy of the `/services/exterior-detail` page's modular pattern, possibly rolled out site-wide with new brand colors. This is the same thread as the stale "Visual design direction concepts" item below (2026-08-13) — now active again.

Ran the visual companion (browser mockup tool) across 4 rounds:
- **Round 1** — 5 directions (Industrial, Motorsport, Studio Editorial, Warm Craftsman, Modern App-Like), default system fonts. Rejected: fonts too generic.
- **Round 2** — 5 louder/neon directions (Neon Garage, Sunset Chrome, Retro Flag, Electric Citrus, Iridescent Ceramic) with real Google Fonts. Still rejected.
- **Reference pivot** — operator supplied 3 real sites instead of more guessing: Imperial Shinez (detailing, "not the best but not terrible"), Prime Wellness Chiropractic, Free the Qi. Screenshotted via chrome-devtools. Shared DNA found: elegant serif (often italic) mixed with clean sans, rich muted color as the dominant background (forest green / maroon / navy — not neon), rounded pill buttons and tags, banded full-bleed color sections, calm editorial tone, real photography.
- **Round 3** — 4 directions built from that DNA (Forest & Ivory, Burgundy & Sand, Navy & Steel, Charcoal & Copper). Read as "going in the right direction," but small swatch cards weren't enough to judge.
- **Round 4** — same 4 rebuilt as full hero mockups at real scale, with real Metro-voice headline copy (Seven Oaks' existing Full Detail/Refresh Detail anchor) instead of placeholder text.

**Selected (tentative, not locked):** Forest & Ivory (deep forest green + warm tan/gold) and Burgundy & Sand (warm cream background + maroon accent) — both move away from the current dark theme entirely. Operator explicitly wants more directions explored before committing to either. Location-page build and the 5 remaining service sub-pages both stay blocked until a direction locks.

**Also this session:** operator ran `npx skills add emilkowalski/skill`, installing 12 third-party design/animation skills (`.agents/skills/`, `.claude/skills/`, `skills-lock.json`) with full agent permissions per the installer's own warning. No decision made on keep/remove/commit — temporarily gitignored in the vault root as a safe default, not resolved.

---

## 2026-09-07 Session — Bug fixes, SEO audit fixes, location strategy review

**Pushed 2026-09-07** in 3 commits (`cb4fa06..74f092a`): `a750913` (estimate cart fix), `a2b193c` (phone_click tracking), `74f092a` (copy fix + SEO audit fixes). Build verified clean before push. Vercel deploys from `master` automatically.

**Fixed:**
- Interior Detail falsely claimed exterior windows were cleaned (`app/services/page.tsx:48`, `public/llms.txt:33`) — now says "Interior windows cleaned."
- Real estimate-cart bug from a Downloads brief (`estimate-cart-bug.md`): selections made via "Add to Estimate" on `/services` only carried to `/estimate` through the cart bar's own "Start Estimate" button — every other CTA on the site (header, Hero, CTABanner, location/blog/service pages) dropped the cart silently. Fixed with a mount-effect fallback that reads `localStorage` directly when no `?services=` param is present (`app/estimate/EstimateForm.tsx:89-98`, exported `readEstimateCart` from `hooks/use-estimate-cart.ts`). Verified live via chrome-devtools: seeded cart, loaded bare `/estimate`, confirmed checkbox pre-checked.
- New `phone_click` gtag event wired to all 4 `tel:` links site-wide via a new `components/PhoneLink.tsx` client component (`AnnouncementBar.tsx`, `Footer.tsx`, `thank-you/page.tsx`, `services/[slug]/page.tsx`). GA4's `click` event was an undifferentiated bucket covering phone clicks and social-icon clicks together — this splits phone-call intent out. Not yet showing real data (needs a push + real clicks first); do not mark it a GA4 key event until confirmed firing.
- SEO audit (`knowledge/sources/research/metro-seo-audit-2026-09.md`, spot-verified accurate against 3 concrete claims before trusting the rest): H1 missing-space bug on `/` and `/estimate` (adjacent `<span>`s with no space character — matters for AI crawlers, since `robots.txt` invites them in), `sitemap.ts` hardcoded to `www` while every canonical tag is non-www (now fixed, plus every ServicesPreview card got real descriptive alt text), homepage meta description trimmed 175→139 chars, `/services` title shortened 67→43 chars and its description expanded 99→155 chars with a price/CTA anchor. Two of the audit's "missing alt" findings (Hero and CTABanner background images) were false positives — both are correctly decorative (`alt=""` + `aria-hidden="true"`), not bugs.

**Also filed** (per document-ingestion.md): SEO audit findings added to `canonical/market-intelligence.md` ("SEO Content/Technical Audit (2026-09-07)" subsection) and `my-project/active-commitments.md` (corrected a stale "sitemap needs no work" claim, added the quick-win list and a pricing-transparency FAQ/blog opportunity). Ceramic coating, paint correction, and fleet-landing-page recommendations from the audit were explicitly rejected by the operator — not filed as open items.

**Location page strategy — finalized 2026-09-09, ready to build.** Source docs filed: `sessions/location-strategy-2026-09.md`, `sessions/location-page-template-2026-09.md`, `sessions/stone-meadows-anchor-2026-09.md`.

14 total location pages (up from current 6), two geographic clusters:
- **Southwest** (zip 93311/93309/93313): Southwest Bakersfield catch-all (live, no change) + Seven Oaks (live, no change) + Stockdale Estates (re-scope + retitle, decided 2026-09-09 — old "Stockdale" page gets renamed to match the specific pocket, needs a redirect from the old URL) + Southern Oaks, Tevis Ranch, The Oaks, Stone Meadows, Haggin Oaks (all new)
- **Northwest** (zip 93312/93314, new territory): Rosedale catch-all (full rewrite, currently ~80-90 word placeholder) + Riverlakes, Shiloh Estates, Brimhall Estates, Nottingham Estates (all new)

Net build: 8 new pages, 1 re-scope+retitle (Stockdale Estates), 1 rewrite (Rosedale catch-all).

**Terra Vista dropped from the build list, confirmed 2026-09-09.** The strategy doc (still, even in its "final" 2026-09-08 revision) claims Terra Vista's copy frames it as "a different part of town" and calls that a needed fix. Verified against live code twice now (`app/locations/[slug]/page.tsx:71`): the actual copy reads "Terra Vista is a residential neighborhood in southwest Bakersfield" — already correct, already in the right cluster. No fix exists to make. This is a stale claim that survived two doc revisions from the separate Claude chat; not re-flagging a third time if it resurfaces, just noting the page needs zero work.

Every named page now has a real anchor to write from — Stone Meadows was the last gap (no character research), filled 2026-09-09: 37.5% of households own 4+ vehicles (highest of any page in either cluster) against a standard two-car garage on short cul-de-sac streets, so cars sit outside more than almost anywhere else Metro covers. That's the page's hook.

**Sequencing still the operator's call:** this is 8 new pages + 1 rewrite + 1 re-scope stacked on top of the 5 remaining service sub-pages (already the standing priority). Not a one-evening job either way.


## What's Live on metroautodetailing.pro

**Note:** Hero, ServicesPreview, WhyMetro, Testimonials, and CTABanner have local commits from the 2026-09-10 Session 6 visual refresh (Black & Yellow, Elevated) that are **not pushed yet**. The "Live" status below reflects what's actually deployed at metroautodetailing.pro right now, not the local working tree.

| Section | Status | Notes |
|---------|--------|-------|
| Hero | Live (refresh pending push) | hero-bg.mp4 (4.2MB). hero-poster.jpg = frame from truck video. Local: eyebrow label, italic accent word, 3-stat yellow trust strip replacing the 4-stat bordered grid. |
| ServicesPreview | Live (refresh pending push) | Exterior card = IMG_6184.JPEG. Water Spot Removal now $60. Local: "What We Do" label, Fraunces italic pricing. |
| WhyMetro | Live (refresh pending push) | Local: `#141414` band background, "Why Metro" label, rounder cards. |
| Gallery | **Live — mobile rebuilt 2026-08-02, pushed and deployed same day** | Desktop: unchanged 2-slide bento carousel. Mobile: new single-column letterboxed swipe stack (`MobileGalleryStack`), flattened to all 10 photos in one sequence, captions always visible (fixed hover-only bug). Only one tree ever mounts (`useIsDesktop` hook via `matchMedia`) — CSS-only hiding was tried first and found to still let hidden images download, so it was replaced with real conditional mounting. |
| Testimonials | Live (refresh pending push) | Local: full-bleed yellow band, black cards, 4th review added (Mary Grigoryan), grid now 2x2. |
| CTABanner | Live (refresh pending push) | "Book online. We come to you." — 15% off removed commit ef644dd. Local: accent phrase now italic Fraunces. |
| FAQ | Live | Accepts optional faqs/heading props. Deposit answer now $30 (was $20, fixed 2026-08-02). |
| Footer | Live | Facebook URL correct. |
| AnnouncementBar | Live | "Mobile Detailing in Bakersfield / Book Online" |
| Blog /blog | Live, noindex | Hidden from nav. |
| Location pages | Live | 6 locations, explicit index:true. Interior Detail already listed correctly at $200. |
| /services | **Live — Interior Detail added 2026-08-02, Service/Offer schema added 2026-08-23** | Essentials tier now has 4 cards (Signature Wash, Interior Detail, Refresh Detail, Full Detail) — was missing Interior Detail entirely despite it being sold on the homepage and estimate form. $200, +$20 larger vehicle. Card layout itself is clean; page is 11,744px tall on mobile (~14 screens of scroll) — flagged, not fixed. `SERVICES_SCHEMA` OfferCatalog (12 Service+Offer entries covering all 6 core services + 6 add-ons) added 2026-08-23. |
| /services/exterior-detail | Live — handled by `app/services/[slug]/page.tsx`, no separate local-only file | Copy revision still pending (operator to send brief). Water Spot Removal addon corrected to $60. |
| Other service sub-pages | Redirect to /services | No blank indexed pages. |
| Estimate /estimate | Live | Multi-vehicle form → /thank-you. Water Spot Removal addon now $60, 42px tap targets confirmed clean on mobile. |
| /thank-you | Live | 6 sections: confirmation, roadmap, contrast, review, loyalty, guarantee. Fires `estimate_submitted` gtag event on load. Confirmed clean on mobile audit — no overflow, no clutter issues. |
| GA4 | Live | G-LM507WTMXH. `estimate_submitted` event — still not confirmed showing in GA4 Realtime/Admin, carried multiple sessions. |
| GSC | Linked to GA4 | Linked 2026-07-18. Data flowing. |
| SocialFeed | Not rendered | Hold until social content built up. |
| Favicon | Live | Metro emblem (1.png). |
| Meta Pixel | **Not installed** | Operator understands what it does (free, works on all traffic, needs ads running to pay off). Needs Pixel ID from Facebook Events Manager (Business Settings → Data Sources → Pixels) before it can be wired in. |
| /maintenance-terms | **Live — pushed and deployed 2026-08-17** | Static terms page, content from `canonical/pricing-framework.md` (24-hour cancellation notice — RULE-021, briefly 12 hours under RULE-025, reverted 2026-08-17 via RULE-027). Linked from the site footer as of this session (was live but orphaned — no page linked to it). Unblocks Template 2/4 email links. `npm run build` verified clean 2026-08-17. |

---

## Immediate Next Steps (Priority Order)

0. **Visual design direction — LOCKED 2026-09-10 (Black & Yellow, Elevated), homepage built, not pushed.** Spec: `sessions/visual-design-spec-2026-09.md`. Plan: `sessions/visual-implementation-plan-2026-09.md`, all 8 code tasks executed and committed locally. Next session: `npm run dev`, verify the render against the approved mockup, then decide push. Once pushed, this unblocks the location-page build (8 new, 1 rewrite, 1 retitle) and the 5 remaining service sub-pages — both should follow the same spec/component pattern established on the homepage.
1. **Estimate form total should repeat at the bottom, near Send Request.** Currently the running total (`grandTotal`, `app/estimate/EstimateForm.tsx:276`) only shows once, below the services checklist near the top of the form. On a long scroll (vehicle fields, info fields, condition photos) a visitor loses sight of the number before hitting submit. Add a second total display near the "Send Request" button. Flagged 2026-08-02, not built.
2. **Meta Pixel install** — get the Pixel ID, wire into `layout.tsx` next to the existing GA4 script, fire a "Lead" event on estimate submit (same pattern as `estimate_submitted`).
3. **Finish gallery verification** — full interactive browser check (swipe through all 10 photos, drag a comparison slider, confirm desktop bento renders correctly) was interrupted by an MCP disconnect. Network-level fix (image count) was confirmed; the visual/interaction pass was not re-run after reconnecting.
4. **Loyalty Eligible badge** — add to qualifying service cards on /services page (Refresh, Exterior, Full Detail). Carried from prior session.
5. **Exterior detail content revision** — operator sends Claude Desktop brief, swap copy in, push.
6. **5 remaining sub-pages** — after exterior detail content approved.
7. **`/services` page length** — 11,744px on mobile, ~14 screens of scroll because every tier prints its full feature checklist inline. Flagged during 2026-08-02 audit, not addressed. Worth a future pass (accordion collapse per tier, or trim the checklist) if bounce data on that page supports it.
8. **Mobile nav backdrop scrim** — the mobile menu dropdown is opaque itself but has no dimming layer behind it, so the page content directly abuts the open menu. Flagged 2026-08-02, not fixed.
9. ~~**aggregateRating**~~ — done 2026-08-23, hardcoded 5.0/4 reviews in `layout.tsx`. Fast-decay: update whenever review count changes or it goes stale vs. GBP.
10. **OG image** — homepage and services pages.
11. **"Premier" headline** — `components/sections/Hero.tsx:72` reads "Bakersfield's Premier Mobile Detailing Service," conflicts with `anti-misclassification.md`'s guardrail against premium/bougie positioning. Flagged 2026-08-23, not fixed — needs operator decision (change copy or carve a rule exception).
12. **Review-request push** — `skills/review-request/SKILL.md` is stale (wrong greeting format, wrong SMS sign-off rule), needs go-ahead to fix, then push after every job. Confirmed 2026-08-23 as the top lever on two fronts: AI/LLM visibility (Metro absent from ChatGPT/Claude answers where every competitor surfaced has 55-361 reviews vs. Metro's 4) and organic CTR (Metro ranks #1 for "mobile detailing"/"auto detailing"/"car detailing near me" with near-zero clicks — no star rich-snippet without more review volume behind the new `aggregateRating`).
13. **Check TopDetailers directory listing** — ChatGPT cited "TopDetailers" by name twice as a source for competitor recommendations during the 2026-08-23 AI-visibility test. Unconfirmed whether Metro has a listing there.
14. **Homepage + service copy rewrite** — compact "who/what/where" format for AI extractability, per 2026-08-23 scoped AI-SEO plan. Site already has the specificity (Koch Chemie S003, Stinger 918) this format needs — copy pass, not new research.
15. **FAQ expansion** — add more direct Q&A pairs (parking/access, pet hair, water-hookup questions) to the existing FAQ, per 2026-08-23 scoped AI-SEO plan.
16. **NAP consistency check** — GBP, Yelp, Facebook, Bing Places should all match name/phone/address/service-area exactly.
17. **Bing Webmaster Tools + AI Performance report** — set up to actually measure whether AI-citation work is moving anything, since Bing's AI Performance report shows which pages get cited by Copilot/Bing AI summaries.
18. **Build out 5 stub service pages** — `signature-wash`, `interior-detail`, `refresh-detail`, `full-detail`, `headlight-restoration` currently `redirect("/services")` instead of rendering (see Service Sub-Pages table below). `exterior-detail` is a working template to copy — hero, what's included, products, comparison, FAQ, CTA, all sourced from content already in `pricing-framework.md` and `services/page.tsx`'s plan arrays. Flagged 2026-08-23, deferred as too large for one evening session.

---

## Recent Pushes

**2026-09-07** — Estimate cart bug fix (selections dropped unless the cart bar's own button was used, now falls back to reading localStorage on any entry point), `phone_click` tracking on all 4 `tel:` links, Interior Detail exterior-windows copy bug fixed, SEO audit quick wins (H1 spacing, sitemap www mismatch, meta description/title lengths, real alt text on 5 homepage images). 3 commits: `a750913`, `a2b193c`, `74f092a`.

**2026-08-23** — canonical/redirect conflict fixed (7 files had `alternates.canonical` pointing at `www.metroautodetailing.pro` while `next.config.ts` 301-redirects that exact URL to non-www — real cause of duplicate indexing found in a live GSC Pages.csv export, where the homepage was indexed 3 separate ways and every location page indexed twice). Also added Service/Offer OfferCatalog schema to `/services` and `aggregateRating` to the site-wide LocalBusiness schema in `layout.tsx`. Pushed as `cb4fa06`.

**Corrected 2026-08-17** — prior entries here claiming "10 commits unpushed since 2026-07-26" were stale. Verified against both `git log origin/master..HEAD` and Vercel's deployment history: the 8/2 gallery batch was pushed and deployed same day, and production tracked GitHub exactly through commit `3a2fa1c` (8/2) until tonight. Only the 8/13 maintenance-terms commit was ever actually sitting local-only — now resolved.

| Commit | Date | What |
|--------|------|------|
| cceafc5 | 2026-08-17 | Link maintenance-terms page from footer |
| 3e2cca8 | 2026-08-17 | Fix maintenance-terms cancellation window, 12hr to 24hr (RULE-027) |
| 138f104 | 2026-08-13 | Add /maintenance-terms page |
| 3a2fa1c | 2026-08-02 | docs: update session state for 2026-08-02 handoff |
| 307f699 | 2026-08-02 | Interior Detail added to /services, stale Water Spot/deposit pricing fixed |
| 914fcb7 | 2026-08-02 | Gallery rebuild spec and plan docs added |
| 9439f33 | 2026-08-02 | .gitignore: ignore .vercel and .env* |
| 64ec791 | 2026-08-02 | Gallery: matchMedia-based conditional mount, fixes mobile double image-load |
| dfb99fe | 2026-08-02 | Gallery: dedupe item ids in flattened array |
| 7cea104 | 2026-08-02 | Gallery: render mobile as letterboxed swipe stack, desktop unchanged |
| 156d502 | 2026-08-02 | Gallery: fix swipe fighting comparison slider drag, add scroll-direction lock |
| d0d3de5 | 2026-08-02 | Gallery: add mobile letterboxed gallery stack component |
| b1bd279 | 2026-07-26 | Thank-you text sizing round 2 |
| ef644dd | 2026-07-19 | Thank-you page rebuild (6 sections), CTABanner promo removed |

---

## Mobile Gallery Rebuild — Architecture (2026-08-02)

**Files:**
- `components/ui/mobile-gallery-stack.tsx` — new. Single-column swipeable stack, `object-contain` letterboxing (no crop), captions as normal below-image text (not hover-gated). Swipe disabled on comparison-slider items specifically (prevents fighting the slider's own drag) — those items still reachable via prev/next buttons.
- `components/sections/Gallery.tsx` — `SLIDES.flat()` produces `ALL_ITEMS` (all 10 photos, unique ids 1-10). `{isDesktop ? (...desktop bento...) : (<MobileGalleryStack items={ALL_ITEMS} />)}` — only one tree ever mounts, no CSS-hiding.
- `hooks/use-is-desktop.ts` — new. `useIsDesktop(breakpointPx = 768)`, defaults `false` (SSR-safe, no hydration mismatch, and guarantees the image-heavy desktop tree never mounts on mobile even momentarily). Corrects via `matchMedia` after mount. Known accepted tradeoff: real desktop users see a brief flash of the mobile stack before the swap.
- `components/ui/interactive-bento-gallery.tsx`, `components/ui/image-comparison.tsx` — untouched, desktop-only now.

**Latent note (not a live bug):** if the first item in `ALL_ITEMS` (currently `id:1`, "Exterior Detail", `type: "image"`) is ever reordered to a `type: "comparison"` item, the brief desktop-load flash would eagerly load two full comparison images instead of one lazy one, since `ImageComparison`'s `<img>` tags don't have `loading="lazy"`. Worth a comment or a follow-up if the gallery data order changes.

---

## Service Sub-Pages — All 6

| Service | Slug | Price | Status |
|---------|------|-------|--------|
| Signature Wash | /services/signature-wash | $80 / $100 | Redirects to /services |
| Exterior Detail | /services/exterior-detail | $150 / $170 | Built locally, content pending |
| Interior Detail | /services/interior-detail | $200 / $240 | Redirects to /services |
| Refresh Detail | /services/refresh-detail | $250 / $290 | Redirects to /services |
| Full Detail | /services/full-detail | $400 / $440 | Redirects to /services |
| Headlight Restoration | /services/headlight-restoration | $80 | Redirects to /services |

---

## Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout. LocalBusiness/AutomotiveBusiness JSON-LD schema (now with `aggregateRating`, 2026-08-23), metadataBase, GA4 scripts. Meta Pixel not yet added here. |
| `app/thank-you/page.tsx` | Thank-you page. |
| `app/thank-you/ConversionEvent.tsx` | Fires `estimate_submitted` gtag event on mount. |
| `components/sections/CTABanner.tsx` | CTA section. |
| `next.config.ts` | Redirects (www → non-www 301, matches canonical tags as of 2026-08-23), security headers. |
| `app/services/page.tsx` | Essentials/Protection/Restoration/Deep Clean/Maintenance sections — Interior Detail included. `SERVICES_SCHEMA` OfferCatalog added 2026-08-23. |
| `app/services/[slug]/page.tsx` | Exterior-detail local build + redirect logic for other slugs. |
| `app/maintenance-terms/page.tsx` | Maintenance Plan terms, static page, built 2026-08-13, pushed 2026-08-17. |
| `components/layout/Footer.tsx` | Site footer, used on every page. Now links to /maintenance-terms next to the copyright line. |
| `components/sections/FAQ.tsx` | Accordion, deposit answer $30. |
| `components/sections/Gallery.tsx` | `SLIDES`/`ALL_ITEMS`, desktop/mobile split via `useIsDesktop`. |
| `components/ui/mobile-gallery-stack.tsx` | Mobile-only gallery renderer. |
| `hooks/use-is-desktop.ts` | Breakpoint-detection hook, SSR-safe. |
| `app/globals.css` | `--color-site-bg: #1D2126` (Steel Graphite, changed 2026-09-12 — was `#050606`) |
| `docs/superpowers/specs/2026-08-02-mobile-gallery-rebuild.md` | Gallery rebuild spec. |
| `docs/superpowers/plans/2026-08-02-mobile-gallery-rebuild.md` | Gallery rebuild implementation plan. |

---

## Background

All sections plus header/footer/announcement bar use `bg-site-bg` → `--color-site-bg: #1D2126` (Steel Graphite, unified 2026-09-12 — previously three mismatched shades: `bg-zinc-950` on Hero/chrome, `#050606` on most sections, `#141414` on WhyMetro).
Facebook URL: `https://www.facebook.com/profile.php?id=61586613950253`
Canonical domain: `https://metroautodetailing.pro` (non-www).
GA4 Measurement ID: G-LM507WTMXH
