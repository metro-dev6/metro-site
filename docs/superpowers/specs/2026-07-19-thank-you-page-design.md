# Design Spec — Thank-You Page Rebuild
> Date: 2026-07-19
> Status: Approved for implementation
> Source briefs: thank-you-page-brief.md, loyalty-program-brief2.md (Downloads)

---

## Goal

Stop price shopping in the 2-hour window between form submission and Damian's follow-up text. Make the client feel the process is already in motion and give them a concrete reason to wait.

---

## What Changed

**Removed:**
- Referral section ($20/$20) — premature before the first job is done. Move to post-job follow-up text.
- "Back to Home" button — gives them somewhere to leave.

**Added:**
- "What Happens Next" roadmap — kills the limbo feeling
- "Why Metro" contrast statements — anchors value before the price lands
- Kris C. Google review — real social proof from a first-time client
- Metro Loyalty section — converts a first-time client into a recurring one

**Kept:**
- Confirmation header with CheckCircle
- 2-hour text promise + phone number
- Satisfaction guarantee (tightened)

---

## Page Structure (top to bottom)

### Section 1 — Confirmation (keep, no copy changes)
```
✓  [CheckCircle icon, yellow]

REQUEST
RECEIVED.

I'll text you within 2 hours to confirm.
Need it sooner? Call or text (661) 368-5165
```

### Section 2 — What Happens Next (new)
Label: `WHAT HAPPENS NEXT`

```
① I text you within 2 hours
   Confirm your vehicle and what you need. If you have questions, I can call.

② We lock in a price and date
   You know the total before I show up. No surprises.

③ I come to your location
   Home, work, wherever your car is. You don't go anywhere.
```

Step numbers: yellow filled circles, black text, font-black.
Step title: white, font-bold, 13px.
Step description: white/60, 12px.

### Section 3 — Why Metro (new, trimmed)
Label: `WHY METRO`

Three contrast lines, separated by thin dividers:

```
Most detailers charge extra for decontamination.
Metro includes it in every full detail.

A car wash rinses the surface.
A detail removes what the wash leaves behind.

No shop. No drop-off. No waiting.
Metro comes to you.
```

First line of each pair: white/70, 12px.
Second line: white, font-semibold, 12px.
Thin horizontal dividers between pairs (white/10).

### Section 4 — From a Client (new)
Label: `FROM A CLIENT`

```
"I scheduled Metro to come to me while I was at work. The carpet?
Spotless. The vents? Free of dust. Even the tiny cracks where dust
and dirt accumulate were cleaned. I couldn't be happier."

— Kris C., Bakersfield          ★★★★★
```

Container: bg-[#0f0f0f], left border 3px yellow, padding 14px 16px, rounded.
Quote: white/80, 12px, italic, line-height 1.7.
Attribution: white/55, 11px, left-aligned.
Stars: yellow, 12px, right-aligned, same row as attribution.

### Section 5 — Metro Loyalty (new, replaces referral)
Label: `METRO LOYALTY`

```
Book a qualifying detail. Start a maintenance plan.
Every 3 visits, pick a free add-on.

Engine bay. Hand wax. Headlight restoration. Your pick.

No expiration. No code. I keep track.
```

Heading line: white, font-bold, 13px.
Add-on options line: yellow, font-bold, 13px. (Makes the reward feel tangible.)
Fine print: white/60, 12px.

### Section 6 — Our Guarantee (keep, tightened)
Label: `OUR GUARANTEE`

```
Anything off after the job? Text within 24 hours.
I come back and fix it. No charge.
```

---

## Design System

Colors: background `#050606`, yellow `#fac205`, text white, muted white/60-70.
Dividers: `linear-gradient(to right, transparent, #fac205, transparent)` — full-width, 1px.
Section labels: `text-[10px] font-black tracking-[0.15em] uppercase text-brand-yellow text-center`.
Layout: `max-w-lg mx-auto`, centered column, `gap-10` between sections, `px-4 pt-14 pb-24`.
No "Back to Home" button.

---

## Voice Notes

- "I" not "We" throughout — this is a direct client communication moment.
- No banned words. No em dashes.
- Contrast pattern: first line sets the problem or common alternative, second line states Metro's position.
- Review text is verbatim from Kris C.'s Google review. Do not alter it.
- Loyalty copy uses short declarative sentences. No exclamation points.

---

## Component Notes

- `CheckCircle` from lucide-react — already imported in current page.
- No new components needed. All sections use inline JSX with Tailwind.
- `Divider` component already exists in current `page.tsx` — reuse it between all sections.
- Step numbers: `div` with `rounded-full bg-brand-yellow text-brand-black`.

---

## Files to Change

- `metro-site/app/thank-you/page.tsx` — full rewrite of page body
- No other files. Loyalty program badge on services page is a separate task.

---

## Out of Scope (separate tasks)

- Hand wax added to service menu and pricing
- "Loyalty Eligible" badge on services page
- Loyalty count field in Notion client records
- Referral program (future, separate brief)
- Paint enhancement services (future Ops session)
