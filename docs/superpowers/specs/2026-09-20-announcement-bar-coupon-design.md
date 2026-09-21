# Announcement Bar Coupon — Design Spec

**Date:** 2026-09-20
**Status:** Approved, ready for implementation plan

## Problem

Session 10 flagged the banner "impossible to see" in hero mode. Root cause, confirmed this session: the banner relies on a thin `text-shadow` for contrast against `Hero.tsx`'s photo, but `Hero.tsx`'s dark overlay gradient fades to 6% opacity by the right edge — exactly where the banner's right-aligned content sits. Several banner text elements were also set to 40-60% opacity, undermining contrast independent of the shadow. Pulled SHWASH's live computed CSS as a reference point for their equivalent nav-over-photo text: solid full-opacity color, 14px, normal tracking, zero shadow — contrast comes from image-darkening, not text tricks, on their nav row.

Operator's actual direction diverged from a same-position contrast fix: the bar should not overlay the hero photo at all. It sits above it, in normal document flow, plain background, black text — matching how SHWASH's own promo bar (the "Save up to $100..." strip) actually works: it sits on plain white page background above their hero card entirely, not over any photo.

Scope grew from there: the operator wants the bar to carry an evergreen first-time-customer coupon, modeled on retail email-signup coupons (concrete reference: SHWASH's own popup "Get 10% off your first detail, sign up" — inline-in-bar was chosen here over a popup).

## What ships in this round

1. `AnnouncementBar.tsx` structural rewrite: fixed/transparent-over-hero → static, plain, black-on-light block sitting above `Header.tsx`.
2. Coupon copy + inline email capture in that bar, Formspree-backed, static code shown on success.
3. `canonical/decisions.md` RULE-015 update (15% → 10%, mechanism change).
4. `Hero.tsx` top offset fix (`-mt-[60px]` recalculated now that only `Header.tsx` overlays it in hero mode, not banner+header together).

## Explicitly out of scope this round

- `CTABanner.tsx`'s own discount mention. RULE-015 originally named both AnnouncementBar and CTABanner as display surfaces. Operator flagged CTABanner's current execution as not landing ("doesn't look good, at least it's not being executed well") — deferred to a separate pass, not touched here.
- Any automated code delivery by email. The code displays on-screen after signup; no email is sent by any system. Formspree submission is a lead-capture record only (lands in the operator's inbox + Formspree dashboard, same as `/estimate` submissions today).
- Popup-modal capture style — inline-in-bar was chosen over a SHWASH-style interrupting modal.

## Component design

### `components/layout/AnnouncementBar.tsx`

- Remove: `fixed` positioning, the `heroMode`/`isHome`/`scrolled` transparent-bar logic, the phone-number block, the social-icon block. (Phone/Book Now already lives in `Header.tsx`; socials already live in `Footer.tsx` — neither is lost by removing them here.)
- New: normal-flow block-level element (not fixed), full-width, solid light background, black text, roughly 40-44px tall, centered row.
- Content: static copy ("New clients: 10% off your first detail") plus an inline `<input type="email">` and a submit button in the same row.
- Stays a client component; local state machine `idle → submitting → success | error`.
- On submit: `fetch` POST to `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT` (same env var `EstimateForm.tsx` already uses), body includes the email plus a fixed `source: "announcement-bar-coupon"` field so these submissions are distinguishable from estimate requests in the inbox/dashboard.
- On success: swap the row's content in place to show the code (e.g. `WELCOME10`) plus "Mention this when you book." No reload, no modal.
- On error: inline error message, keep the typed email in the input so the visitor can retry without retyping.
- Renders on every page as today (it's a layout-level component) — it's no longer tied to hero mode or the homepage at all, since it's not sitting on any photo anymore.

### `components/sections/Hero.tsx`

- `-mt-[60px]` was tuned for a fixed banner (44px) + header stack sitting on top of it together. With the banner out of that fixed stack, only `Header.tsx`'s own height needs offsetting for. Confirm the corrected value live against the actual rendered header height in hero mode — do not guess the number blind.

### `canonical/decisions.md`

- New entry superseding RULE-015: 10% first-time discount (was 15%), delivered via `AnnouncementBar`'s email capture (CTABanner explicitly excluded this round). Single static code. First-time eligibility checked manually by the operator at booking against Square/`relationships.md` history — no system enforcement yet, matching the "no automation" scope choice.

## Pressure-test (per `pressure-testing.md`, resolved during brainstorming)

- **Exit & continuity / reuse prevention:** No system enforcement this round. Operator manually verifies first-time status at booking, the same way any other one-off discount is already handled today.
- **Commitment & pricing stability:** Applies to all services, no exclusions (operator's explicit choice over excluding Full Detail).
- Other three fixed categories (financial edge cases, operational edge cases, liability/scope): no new gap introduced beyond what RULE-015 already covered: a flat percentage off, no payment-method or scheduling interaction.

## Verification plan

- `npm run build` clean.
- Live check via chrome-devtools on `/`: bar renders above `Header.tsx` in normal flow; `Header.tsx`'s existing transparent-hero-mode behavior still works correctly against the corrected `Hero.tsx` offset; submit → success code display works end to end.
- Real vs. mocked Formspree submission during testing: flag to the operator before firing a real submission during verification, so a test email doesn't look like a real lead in their inbox.
- Mobile layout: full inline email form may not fit next to the offer copy on small screens. Not decided yet — options are stacking vertically, shortening the copy, or click-to-reveal the field on mobile only. Left open for the implementation plan to resolve.

## Open detail for the implementation plan

- Mobile bar layout (see above) — needs a concrete decision during planning, not deferred past that.
