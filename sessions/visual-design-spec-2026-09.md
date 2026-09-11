# Visual Design Spec — Black & Yellow, Elevated

> Locked 2026-09-10. Keeps Metro's existing brand colors and logo. Replaces the current "text and boxes" layout with an editorial system: full-bleed color bands, a serif accent typeface, rounded pill buttons, real content sections instead of stacked cards.

## Why this direction

Four brainstorm rounds explored new palettes (Forest & Ivory, Burgundy & Sand, Olive & Bone, Slate & Rust) built off three reference sites (Imperial Shinez, Prime Wellness Chiropractic, Free the Qi). The shared DNA across those references — serif+sans pairing with an italic accent word, muted full-bleed color bands, rounded pills, calm editorial tone — is what reads as modern. The operator's own diagnosis after seeing Burgundy & Sand at full page length: the site doesn't need a new brand, it needs the current one built with this layout language instead of the current stacked-box template. Confirmed 2026-09-10.

**What stays exactly as-is:** brand colors (#000000 black, #FAC205 yellow, white text), the logo, the tagline ("We Come to You. Driven by Detail."), pricing, and every other Metro touchpoint (GBP, social, vehicle). No mismatch to manage — the website is the only thing changing.

## Typography

| Role | Current | Change |
|------|---------|--------|
| Primary (headings, body, UI) | Montserrat | **Unchanged** |
| Accent (italic display word in headlines/section titles, plus every price and stat number) | none | **New, confirmed:** Fraunces (italic, weight 500-600). Used for: one emphasized word per headline, section title labels, and all price/stat numbers — matches every approved mockup, where DM Sans numerals were replaced by Fraunces italic throughout. |
| Numeric (plain, non-accented — e.g. phone number digits in nav/footer) | DM Sans | **Unchanged**, but scope shrinks — most numeric text on the page becomes accent-serif per above. |

## Color usage (unchanged palette, new application)

- Black (#000000) — primary background for hero and dark bands
- Yellow (#FAC205) — accent, CTA buttons, one full-bleed "yellow band" per page (testimonial or stat section) instead of only small accents
- White/off-white text on black bands
- New: alternating light band (`#141414` dark-gray, not pure black) between sections, so bands read as distinct without introducing a new hue

## Layout patterns (replacing current stacked cards)

1. **Nav** — logo left, links right, no border-box container
2. **Hero** — eyebrow label (small caps, yellow) → headline with one italic accent word → subhead → pill CTA button + phone number, generous padding, no card border
3. **Services band** — full-bleed section, section label + italic section title, 5 price cards in a row (price in accent serif, name in caps sans) instead of the current plain list/grid
4. **Trust strip** — full-bleed dark band, 3-stat row (rating, mobile %, contracts), numbers in accent serif — **this is the band that gets the count-up animation once built** (see Motion below)
5. **Testimonial band** — full-bleed yellow band, italic serif pull-quote, attribution line
6. **Locations band** — pill-shaped chips per neighborhood, replaces current plain link list
7. **Footer** — dark band, business info, no visual change needed beyond matching the new type system

Confirmed via two side-by-side full-length mockups (Burgundy & Sand and Black & Yellow, both built to this same page structure) — the operator judged Black & Yellow at full length before locking, not just a hero card.

## Motion (deferred to implementation, not this round)

Operator flagged two effects seen on the reference sites, correctly scoped as post-lock work:

- **Scroll reveal** — sections fade/slide in as they enter viewport (Intersection Observer + CSS transform/opacity)
- **Count-up numbers** — stat numbers (trust strip: 5.0, 100%, 0) animate from 0 to their real value on scroll into view, instead of appearing static

Both are standard, cheap to implement once components exist. Build after the static layout is working, not before.

**Component found for count-up:** `danielpetho/basic-number-ticker` on 21st.dev — ref-triggered tween from a start value to a target, which is exactly the trigger-on-scroll pattern needed here. Install via `npx shadcn@latest add "https://21st.dev/r/danielpetho/basic-number-ticker?api_key=$API_KEY_21ST"` when the motion phase starts, rather than hand-rolling the tween logic. Checked testimonial-section components too (for the deferred scroll-reveal work) — nothing fit Metro's tone (options were pastel-portrait or sci-fi styled), so that stays hand-coded.

## Rollout scope

Site-wide, not homepage-only. This system replaces the current template everywhere:

1. Homepage (build first — establishes the component set)
2. Location pages (8 new, 1 rewrite, 1 retitle — blocked on this spec since 2026-09-08)
3. 5 remaining service sub-pages (blocked on this spec since before that)

## What this does NOT do

<!-- pin -->
- **No copy changes.** Every headline, service name, price, testimonial, and location name that exists today gets re-presented, not rewritten. This is a component and layout upgrade, not a content pass. Confirmed 2026-09-10.
- Does not require any change to GBP, social profiles, business cards, or the vehicle — brand colors are unchanged
- Does not implement the motion effects yet — static layout ships first

## Next step

Spec is locked (direction, typography, and scope all confirmed). Goes to `superpowers:writing-plans` next for a build-order implementation plan starting with the homepage.
