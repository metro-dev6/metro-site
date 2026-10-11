# Announcement Bar Coupon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fixed, transparent, hard-to-read `AnnouncementBar` with a plain static bar that sits above the hero (not over it) and carries an evergreen 10%-off-first-detail email-capture coupon.

**Architecture:** `AnnouncementBar` stops being `position: fixed` and stops overlaying `Hero.tsx`'s photo. It becomes a normal, non-fixed block at the very top of the page (solid background, black text) that reserves its own real space in document flow. `Header.tsx` (still fixed) shifts its "unscrolled" top offset down to sit just below the real bar instead of below the old fixed bar. `app/layout.tsx`'s spacer div shrinks to cover only `Header`'s own height, since the bar now reserves its own space automatically. `Hero.tsx`'s negative top margin is recalculated for the new spacer math. `canonical/decisions.md` gets a new rule superseding the old 15% first-time-discount rule.

**Tech Stack:** Next.js App Router, React client components, Tailwind CSS, Formspree (existing `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, same one `EstimateForm.tsx` already posts to).

**No test runner is configured in this repo** (confirmed: no `test` script, no jest/vitest/@testing-library in `package.json`). Verification in every task below is `npm run build` (type-checks + compiles) plus a live check via chrome-devtools MCP against the dev server — the same pattern every other session in `sessions/current-state.md` has used. **The dev server must be started by the operator, not by whoever executes this plan** — ask them to run `npm run dev` before any live-check step, never run it yourself.

---

### Task 1: Rewrite `AnnouncementBar.tsx` into a static coupon bar

**Files:**
- Modify: `components/layout/AnnouncementBar.tsx` (full rewrite — the entire file changes)

- [ ] **Step 1: Replace the full file contents**

```tsx
"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";
const COUPON_CODE = "WELCOME10";

type FormState = "idle" | "submitting" | "success" | "error";

export function AnnouncementBar() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || formState === "submitting") return;
    setFormState("submitting");

    const formData = new FormData();
    formData.set("email", email);
    formData.set("source", "announcement-bar-coupon");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="w-full h-11 flex items-center justify-center bg-brand-white border-b border-black/10 px-4">
        <p className="text-xs sm:text-sm font-bold text-brand-black text-center">
          Your code:{" "}
          <span className="text-brand-black bg-brand-yellow px-2 py-0.5 rounded">
            {COUPON_CODE}
          </span>
          . Mention it when you book.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-11 flex items-center justify-center gap-2 bg-brand-white border-b border-black/10 px-3 sm:px-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
        <p className="hidden sm:block text-sm font-bold text-brand-black whitespace-nowrap">
          New clients: 10% off your first detail
        </p>
        <p className="sm:hidden text-xs font-bold text-brand-black whitespace-nowrap">
          10% off first detail
        </p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={formState === "submitting"}
          className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-black/20 text-brand-black bg-brand-white focus:outline-none focus:border-brand-black w-24 sm:w-56"
        />
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="text-xs sm:text-sm font-bold text-brand-white bg-brand-black px-3 sm:px-4 py-1 rounded-full hover:bg-black/80 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {formState === "submitting" ? "..." : "Get Code"}
        </button>
      </form>
      {formState === "error" && (
        <span className="text-xs text-red-600 whitespace-nowrap">Try again</span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Build to confirm it compiles**

Run: `npm run build`
Expected: build succeeds. It will render, but will look visually wrong (doubled-up / overlapping with the still-unmodified `Header`) until Task 2 is done — that's expected at this point, don't chase it yet.

- [ ] **Step 3: Commit**

```bash
git add components/layout/AnnouncementBar.tsx
git commit -m "feat: rewrite AnnouncementBar as static coupon capture bar

Removes the fixed/transparent-over-hero treatment (root cause of the
'impossible to see' legibility bug — text-shadow was doing contrast
work the hero overlay gradient couldn't finish, since that gradient
fades to 6% opacity by the bar's right edge). Bar is now plain,
static, black-on-white, and carries an email-gated 10% first-time
coupon instead of the old tagline/phone/socials (both already live
in Header/Footer)."
```

---

### Task 2: Shift `Header.tsx`, `app/layout.tsx`'s spacer, and `Hero.tsx`'s offset to match

**Files:**
- Modify: `components/layout/Header.tsx:42` (scroll threshold)
- Modify: `components/layout/Header.tsx:47-58` (top offset in hero mode)
- Modify: `app/layout.tsx:122-125` (spacer height + comment)
- Modify: `components/sections/Hero.tsx:19` (negative top margin)

**Why these four numbers move together:** The old bar was `fixed` (44px tall) and contributed nothing to document flow — `app/layout.tsx`'s spacer (`100px`, real reason: `Header`'s 64px plus a stale/wrong 36px guess for the bar, which is actually 44px) reserved room for both fixed elements at once, and `Hero.tsx`'s `-mt-[60px]` pulled the hero card up into that reserved space so `Header` floats over its top edge. Now that the bar is real, in-flow content (44px), it reserves its own space automatically — the spacer only needs to cover `Header`'s own 64px, and `Header`'s unscrolled top offset needs to sit right below the real bar (44px) instead of the old, larger offset tuned for the fixed-bar era.

- [ ] **Step 1: Fix Header's scroll threshold so it doesn't overlap the still-visible real bar**

In `components/layout/Header.tsx`, find:

```tsx
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
```

Replace with:

```tsx
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 44);
```

(44 is the bar's real height in pixels — `h-11`. `Header` must not switch to its `top-0` scrolled state until the real bar has fully scrolled out of view, or `Header` will render on top of the still-visible tail end of the bar.)

- [ ] **Step 2: Fix Header's unscrolled top offset**

In the same file, find:

```tsx
        heroMode
          ? "top-16 inset-x-4 sm:inset-x-10 bg-transparent"
          : scrolled
          ? "top-0 inset-x-0 bg-site-bg"
          : "top-11 inset-x-0 bg-site-bg",
```

Replace with:

```tsx
        heroMode
          ? "top-11 inset-x-4 sm:inset-x-10 bg-transparent"
          : scrolled
          ? "top-0 inset-x-0 bg-site-bg"
          : "top-11 inset-x-0 bg-site-bg",
```

(Only `top-16` → `top-11` changes. The hero-mode and non-hero-mode unscrolled cases now use the identical offset, since the real bar's height is the same everywhere — there's no more special "fixed bar is taller" case to account for.)

- [ ] **Step 3: Shrink the layout spacer**

In `app/layout.tsx`, find:

```tsx
          <AnnouncementBar />
          <Header />
          {/* AnnouncementBar h-9 (36px) + Header h-16 (64px) = 100px */}
          <div className="h-[100px]" aria-hidden="true" />
```

Replace with:

```tsx
          <AnnouncementBar />
          <Header />
          {/* AnnouncementBar is real in-flow content now (h-11, 44px) and reserves
              its own space automatically. This spacer only needs to cover Header's
              own fixed height (h-16, 64px). */}
          <div className="h-16" aria-hidden="true" />
```

- [ ] **Step 4: Adjust Hero's negative margin**

In `components/sections/Hero.tsx`, find:

```tsx
    <section className="relative min-h-[90vh] flex flex-col bg-brand-black overflow-hidden -mt-[60px] mb-4 sm:mb-10 mx-4 sm:mx-10 rounded-[50px]">
```

Replace with:

```tsx
    <section className="relative min-h-[90vh] flex flex-col bg-brand-black overflow-hidden -mt-[68px] mb-4 sm:mb-10 mx-4 sm:mx-10 rounded-[50px]">
```

This is a computed first-pass value, not a guess to leave as-is: old flow position before Hero was `100px` (spacer only, since both fixed elements contributed 0 to flow) minus `60px` margin = Hero rendered at absolute `y=40px`. New flow position before Hero is `44px` (real bar) + `64px` (new spacer) = `108px`, minus margin `M`. Solving `108 - M = 40` gives `M = 68`. **This preserves Hero's exact previous rendered position** — it does not change how deep `Header` sits inside the rounded card, only keeps Hero itself from jumping up or down on screen. Step 5 below verifies this lands correctly; adjust the constant if it doesn't.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: succeeds, no type errors.

- [ ] **Step 6: Live visual verification — ask the operator to start the dev server first**

Tell the operator: "Run `npm run dev`, then let me know when it's up." Do not start it yourself.

Once confirmed running, use chrome-devtools MCP against `http://localhost:3000`:
1. Navigate to `/`, take a screenshot at the top of the page (unscrolled). Confirm: the coupon bar renders as a plain white/black strip above everything, `Header` renders below it (not overlapping), and `Hero`'s rounded card looks the same as it did before this change (same amount of `Header` overlap into the card's top edge).
2. Scroll down past 44px, screenshot again. Confirm: the coupon bar has scrolled out of view, `Header` has transitioned to its solid `top-0` state with no gap or overlap where the bar used to be.
3. Navigate to `/services` (a non-home page), screenshot top of page. Confirm: bar renders identically, `Header` sits solid (`bg-site-bg`) directly below it.
4. Resize to a mobile viewport (375px wide), screenshot `/` top of page. Confirm: the bar's mobile copy ("10% off first detail") + compact email field + button all fit on one line without wrapping or overflowing.

If Hero's card looks shifted from step 1's "before" comparison, adjust the `-mt-[Npx]` value from Step 4 by the observed pixel difference and re-run Steps 5-6.

- [ ] **Step 7: Commit**

```bash
git add components/layout/Header.tsx app/layout.tsx components/sections/Hero.tsx
git commit -m "fix: realign Header/spacer/Hero offsets for the non-fixed announcement bar

AnnouncementBar is no longer fixed/transparent (see prior commit), so
it now reserves its own space in document flow instead of relying on
a hardcoded spacer guess. Header's unscrolled top offset, the layout
spacer, and Hero's negative margin are recalculated to match, and the
scroll threshold that triggers Header's solid state now matches the
bar's real height (44px) so there's no overlap gap during the
transition."
```

---

### Task 3: Update `canonical/decisions.md`

**Files:**
- Modify: `canonical/decisions.md` (RULE-015 gets a Superseded line; new RULE-030 added after RULE-029)

- [ ] **Step 1: Add a Superseded line to RULE-015**

Find:

```markdown
### RULE-015: First-Time Discount is 15%
- **Origin:** [USER-DIRECTED]
- **Decision:** New client first-time discount is 15%. Used on door hangers and website (AnnouncementBar, CTABanner).
- **Reason:** Matches door hanger promo. All channels must be consistent.
- **Date:** 2026-06-27
- **Revisit:** After door hanger results are in — if conversion is low, revisit offer
```

Replace with:

```markdown
### RULE-015: First-Time Discount is 15%
- **Origin:** [USER-DIRECTED]
- **Decision:** New client first-time discount is 15%. Used on door hangers and website (AnnouncementBar, CTABanner).
- **Reason:** Matches door hanger promo. All channels must be consistent.
- **Date:** 2026-06-27
- **Revisit:** After door hanger results are in — if conversion is low, revisit offer
- **Superseded:** 2026-09-20 — RULE-030 lowers this to 10% and changes the delivery mechanism to an email-gated coupon in AnnouncementBar only (CTABanner deferred, not part of RULE-030).
```

- [ ] **Step 2: Add RULE-030 after RULE-029**

Find the end of RULE-029 (its `- **Date:** 2026-09-13` line, followed by a blank line and then the next `###` heading), and insert this new entry immediately after it:

```markdown
### RULE-030: First-Time Discount Lowered to 10%, Delivered via Email-Capture Coupon
- **Origin:** [USER-DIRECTED]
- **Decision:** New client first-time discount changed from 15% (RULE-015) to 10%, effective 2026-09-20. Delivery mechanism also changed: instead of a flat claim printed on AnnouncementBar/CTABanner, the code is now gated behind an email signup in AnnouncementBar (modeled on retail first-purchase coupons) — a visitor enters their email, sees a static code (WELCOME10) on screen immediately, and the email lands in the operator's inbox via the same Formspree endpoint `/estimate` already uses. Applies to all services, no exclusions. First-time eligibility is checked manually by the operator at booking (Square/`relationships.md` history), no system enforcement yet. CTABanner's own discount display (also named in RULE-015) is explicitly not part of this change — operator flagged its current execution as not landing, deferred to a separate pass.
- **Reason:** Session opened as a banner-legibility fix (text was unreadable over the hero photo); root cause traced to AnnouncementBar being transparent over Hero's photo with a text-shadow doing all the contrast work, while Hero's own overlay gradient fades to 6% opacity by the right edge where the banner's content sat. Operator redirected the fix away from tuning that overlay/shadow and toward removing the banner from the hero entirely — sitting above it as a plain bar instead, matching how SHWASH's real promo bar actually works (verified live: sits on plain white page background above their hero, not over any photo). From there the operator asked for the bar to carry an evergreen "sign up for a coupon" mechanism like large retail sites use, discovering along the way that RULE-015 already committed to a first-time discount for this exact spot but had never actually been built into the site at any percentage.
- **Alternatives considered:** A SHWASH-style interrupting popup modal was presented as an option — operator chose an inline field built into the bar instead, no page interruption. Excluding Full Detail from the discount was presented as an option — operator chose to apply it to every service instead.
- **Challenge raised:** Pressure-tested live during brainstorming, per pressure-testing.md. (1) *Exit & continuity/reuse* — a single static code with no automated enforcement means nothing stops a repeat client from reusing it; operator accepted this, resolving it the same way any other one-off discount is handled today (manual check against known client history at booking), not a system-level gate. (2) *Commitment & pricing stability* — no other gap found; a flat percentage off with no payment-method or scheduling interaction.
- **Date:** 2026-09-20
- **Superseded:** none
```

- [ ] **Step 3: Commit**

```bash
git add canonical/decisions.md
git commit -m "docs: RULE-030 supersedes RULE-015, first-time discount 15% -> 10%

Mechanism also changes from a flat claim to an email-gated coupon in
AnnouncementBar only; CTABanner deferred to a separate pass."
```

Note: this commit is in the Metro-Vault repo (`canonical/` lives there, not in `metro-site`), separate from the `metro-site` commits in Tasks 1-2.

---

### Task 4: Final end-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Confirm dev server is running**

Ask the operator to confirm `npm run dev` is still up (or start it) before this task. Do not start it yourself.

- [ ] **Step 2: Exercise the actual signup flow**

Before submitting anything, tell the operator: "About to submit a test email through the coupon form to verify it reaches your inbox — the real Formspree endpoint will fire, so you'll get a real notification. OK to proceed?" Wait for their go-ahead (this matches the spec's verification plan — don't fire a real submission silently).

Once confirmed, via chrome-devtools MCP on `http://localhost:3000/`:
1. Type a test email (e.g. `test+coupon-verify@example.com`) into the bar's email field.
2. Click "Get Code."
3. Confirm the bar's content swaps to show `WELCOME10` with no page reload.
4. Ask the operator to confirm the test email actually landed in their inbox/Formspree dashboard tagged `source: announcement-bar-coupon`.

- [ ] **Step 3: Confirm the error path doesn't break layout**

Via chrome-devtools, temporarily block the Formspree request (devtools network throttling/blocking) and submit again. Confirm "Try again" renders without pushing the bar to a second line or overflowing on a 375px mobile viewport.

- [ ] **Step 4: Report results**

Summarize to the operator: what rendered correctly, what (if anything) needed a pixel adjustment in Task 2 Step 4, and confirm the email actually arrived. If anything is still off, do not mark this done — fix and re-verify.

---

## Self-Review Notes

- **Spec coverage:** All four "ships tonight" items from the design spec have a task (AnnouncementBar rewrite → Task 1; Header/layout/Hero offset math → Task 2; RULE-015/RULE-030 → Task 3; end-to-end + real-submission verification → Task 4). CTABanner and email automation are confirmed out of scope in the Goal/Architecture and not referenced in any task.
- **Type consistency:** `FormState` type (`"idle" | "submitting" | "success" | "error"`) is defined once in Task 1 and not redeclared elsewhere. `COUPON_CODE` constant (`WELCOME10`) is defined once and referenced by that exact name in Task 1's success-state JSX and in RULE-030's text (Task 3) — matches.
- **No placeholders:** every step has literal code, exact file paths, exact before/after snippets, or an exact verification procedure (screenshot + specific things to check) rather than a vague "verify it works."
