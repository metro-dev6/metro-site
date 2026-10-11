# Metro-Site — Launch Plan (live-ready)

> Created 2026-10-06. The plan we check against every session until the site is live.
> Goal: metro-site live-ready on mobile AND desktop, pushed to production.

## How going live works (the hard constraint)
- Domain `metroautodetailing.pro` already points to Vercel. Vercel auto-deploys from GitHub `master`.
- **Commit + push to master = instantly live.** No DNS cutover needed.
- Current live site is the old dark theme, over a month stale (local master is 15 commits ahead of origin, plus a full uncommitted working tree).
- One repo, one master, one deploy. You cannot push just one page. **Everything committed ships together**, so every page with changes must be at least "not broken" before the push.

## The launch bar (not perfection)
Ship-now, polish-live. The site already looks pretty good. Keeping the stale version up another month is the worse outcome. Launch when:
1. Nothing broken on mobile or desktop: no sideways scroll, no overflowing text, images load, forms submit
2. Looks consistent page to page
3. **Customer-facing content is accurate** (operator's hard requirement):
   - Service descriptions specific and accurate (from operator's Word doc, not invented)
   - Prices on the site match canonical pricing
   - Reviews verbatim (Mary's new one included)
   - No overclaiming: no ceramic coatings, no wet sanding, nothing Metro has not proven
   - Contact info and location-page claims correct
4. `npm run build` passes

**Non-negotiable:** both-viewport QA on every page before the push. Push is instantly live to real customers.

## Launch blockers (must clear before push)
- [x] 1. Gitignore `public/_unused/` (623MB) — DONE 2026-10-06
- [x] 2. Lock the homepage headline font — DONE 2026-10-06: Oswald via next/font, hero headline tracking 0.03em (`Hero.tsx:79`). Archivo removed. Verified live.
- [ ] 3. Services page: finish the redesign AND lock the descriptions. Content comes from operator's Word doc of package inclusions. Prices checked against canonical.
- [ ] 4. Fix known mobile breaks: size-card title overflow at 360px, sub-44px tap targets, hero `100vh` vs mobile chrome, dated hamburger dropdown, gallery height jump (CLS)
- [ ] 5. `npm run build` green
- [ ] 6. Both-viewport QA on every page (home, services, service detail, locations, estimate, blog) + content-accuracy pass
- [ ] 7. Commit in chunks (`git add -p`), push, verify live together

## Deferred to post-launch (live first, improve after)
Finer gallery/CLS tuning, deeper polish, SEO compare, dead-code cleanup (EstimateCartBar, use-estimate-cart, orphaned WeComeToYou.tsx), Testimonials B-flip (waits on ~8 reviews).

## Session sequence (speedrun where we can)
- **Session 1 (tonight, 2026-10-06):** blocker 1 (done) + blocker 2 (font) + build green
- **Session 2:** blocker 3 (services content from Word doc + finish page)
- **Session 3:** blocker 4 (mobile breaks: homepage, estimate, services)
- **Session 4:** mobile + desktop QA across locations, blog + content-accuracy pass
- **Session 5:** full both-viewport QA, commit, push, verify live

Compress sessions where a window allows. Target live: ~end of next weekend (Oct 17-18), later only if services copy needs real back-and-forth.

## Notes
- Dev server is operator-run (localhost:3000 and 192.168.50.6:3000). Never started in-session.
- metro-site never pushed by auto-commit (separate repo). No push without explicit go.
