# Session Brief — Services Page (/services) v3

## Objective
Build the /services page with services grouped by buyer intent. Five sections, each targeting a different reason someone needs a detail. Feature lists are accurate to the actual process — do not genericize or add services not listed.

## Route
`app/services/page.tsx`

## Brand
- Background: #000000
- Accent: #fac205 (yellow)
- Text: white
- Headings: Montserrat
- Prices: DM Sans
- No em dashes anywhere in the page

---

## Pricing (source of truth for this session)

**Packages:**
| Service | Standard | Larger Vehicle |
|---------|----------|---------------|
| Signature Wash | $80 | $100 |
| Exterior Detail | $150 | $170 |
| Interior Detail | $200 | $240 |
| Refresh Detail | $250 | $290 |
| Full Detail | $400 | $440 |

**Add-ons (flat rate, no larger vehicle pricing):**
| Add-On | Price |
|--------|-------|
| Engine Bay Detail | $50 |
| Leather Conditioning | $40 |
| Pet Hair & Sand Removal | $80 |
| Carpet & Seat Extraction | $70 |
| Trim Restoration | $100 |
| Headlight Restoration | $100 |

**Fleet:**
| Service | Rate |
|---------|------|
| Exterior Wash | $7/ft |
| + Roof Wash | +$3/ft |
| + Interior Detail | +$4/ft |
| Wash & Wax | $10/ft |

---

## Page Structure

### Page Header
- Headline: "Services"
- Subheadline: "Mobile detailing in Bakersfield, CA. We come to you."
- Black background, no image

---

### Section 1 — The Essentials
**Label:** "The Essentials" (yellow, small caps, wide tracking)
**Subheadline:** "Clean, refreshed, or completely reset."

Three cards. Full Detail gets yellow border and "Best Value" badge.

**Signature Wash — $80 / +$20 larger vehicles**
Tagline: "Routine maintenance. In and out."
Includes:
- Hand wash & dry
- Wheel & rim clean
- Tire dressing
- Window clean (exterior)
- Door jambs wiped
- Interior vacuum (quick)

**Refresh Detail — $250 / +$40 larger vehicles**
Tagline: "Deep clean without the full package price."
Includes:
- Hand wash & dry
- Wheel & rim clean
- Tire dressing
- Full interior vacuum (thorough)
- Dashboard, console & door panels wiped down
- Carpet & seat shampoo with extraction
- UV interior dressing
- Windows (interior & exterior)
- Door jambs cleaned

**Full Detail — $400 / +$40 larger vehicles** ← yellow border, "Best Value" badge
Tagline: "Complete reset. Inside and out."
Includes:
- Everything in Exterior Detail
- Full interior vacuum (thorough)
- Dashboard, console & door panels wiped down
- Carpet & seat shampoo with extraction
- UV interior dressing
- Windows (interior & exterior)
- Door jambs cleaned
- Complete vehicle reset

---

### Section 2 — Protection
**Label:** "Protection" (yellow, small caps, wide tracking)
**Subheadline:** "Keep the paint looking right longer."

Intro paragraph below subheadline (render as body text, not a card):
"If your paint feels rough or looks dull despite being clean, it needs more than a wash. Hard water minerals, brake dust, and industrial fallout bond to paint and can't be removed with soap and water. These services break down and remove that contamination, then seal the surface so it lasts."

Two cards. Full Detail gets yellow border — same treatment as Section 1.

**Exterior Detail — $150 / +$20 larger vehicles**
Tagline: "Decon, clay bar, and ceramic protection. Built for paint that needs real work."
Includes:
- Hand wash & dry
- Decontamination treatment (iron or acid wash — selected based on paint condition)
- Clay bar — removes bonded contamination, leaves paint smooth to the touch
- Koch Chemie S003 Hydro Foam — hydrophobic wash topper applied during rinse
- Stinger 918 Ceramic Spray Sealant — ceramic protection layer bonded to dry paint
- Wheel & fender well deep clean
- Bug & tar removal
- Tire dressing
- Door jambs cleaned
- Windows (interior & exterior)

**Full Detail — $400 / +$40 larger vehicles** ← yellow border, "Best Value" badge
Tagline: "Full exterior protection plus a complete interior clean."
Includes:
- Complete exterior decontamination (iron or acid wash)
- Clay bar treatment
- Koch Chemie S003 + Stinger 918 ceramic protection
- Full interior vacuum, shampoo & extraction
- UV interior dressing
- Everything protected inside and out

Add a small note below the Full Detail card in Section 2:
"The same ceramic protection as the Exterior Detail, combined with a full interior reset."

---

### Section 3 — Restoration
**Label:** "Restoration" (yellow, small caps, wide tracking)
**Subheadline:** "Bring back what faded or wore down."

Three smaller cards in a row (desktop), stacked (mobile). Flat rate — no larger vehicle pricing.

**Headlight Restoration — $100**
"Cloudy or yellowed lenses sanded progressively, prepped with IPA, and coated with Cerakote ceramic clear coat. Restores clarity and protects against UV."

**Trim Restoration — $100**
"Faded black plastic trim restored. Color and UV protection brought back."

**Leather Conditioning — $40**
"Leather surfaces cleaned, conditioned, and protected. Prevents cracking and fading."

CTA on each card: "Add to your detail — text (661) 368-5165"

---

### Section 4 — Deep Clean
**Label:** "Deep Clean" (yellow, small caps, wide tracking)
**Subheadline:** "For the tough stuff that needs more than a standard detail."

Three smaller cards. Flat rate — no larger vehicle pricing.

**Pet Hair & Sand Removal — $80**
"Full extraction of embedded pet hair and sand from carpet and seats. Priced separately because it takes significantly longer than a standard vacuum."

**Carpet & Seat Extraction — $70**
"Hot water extraction for deep-seated stains, odors, and ground-in dirt."

**Engine Bay Detail — $50**
"Degreased, cleaned, and dressed. Removes oil buildup and road grime."

CTA on each card: "Add to your detail — text (661) 368-5165"

---

### Section 5 — Fleet & Commercial
**Label:** "Fleet & Commercial" (yellow, small caps, wide tracking)
**Subheadline:** "We come to your lot. No drop-off. No scheduling around your operations."

Single full-width callout block. Use #111 or #0a0a0a background to distinguish from the rest of the page.

**Left side — pricing table:**
| Service | Rate |
|---------|------|
| Exterior Wash | $7/ft |
| + Roof Wash | +$3/ft |
| + Interior Detail | +$4/ft |
| Wash & Wax | $10/ft |

Example below table:
"A 20 ft vehicle exterior wash = $140. A 5-vehicle fleet = from $700 per cycle."

**Right side — pitch:**
"Metro handles fleet detailing at your location on weekends. We work around your schedule, price per linear foot, and start with one vehicle so you can see the work before committing to the full fleet."

CTA button: "Get a Fleet Quote" → /contact

---

### CTA Banner
Reuse the homepage CTA banner component.
- Headline: "Book Online. Get 10% Off Your First Detail."
- Subheadline: "Serving Bakersfield, CA. Available every weekend."
- Button: "Build Your Estimate" → /estimate

---

## Visual Hierarchy Rules
- Section labels: yellow, small caps, wide tracking — category marker, not a heading
- Section subheadlines: white/60, medium size
- Intro paragraph for Section 2: white/70, slightly smaller than body
- Package names: white, bold, Montserrat
- Prices: yellow, DM Sans, large
- Larger vehicle subtext: white/40, small — "+$X larger vehicles"
- Full Detail card: yellow border in BOTH Section 1 and Section 2
- Restoration and Deep Clean cards: smaller and lighter than package cards
- No heavy dividers between sections — whitespace does the work

## Spacing
- py-24 between sections minimum
- Section label sits directly above section subheadline with tight spacing
- Intro paragraph (Section 2 only) sits between subheadline and cards

## Mobile
- All card grids stack to single column
- Section labels remain visible and readable
- Prices stay large
- CTA buttons full width on mobile
- Fleet block stacks (pricing table on top, pitch below)

## Files to Touch
- `app/services/page.tsx` — create
- `app/page.tsx` — confirm Services nav link points to /services

## Do Not
- Do not add services or features not listed in this brief
- Do not use em dashes anywhere
- Do not genericize the product descriptions — use the exact language in this brief
- Do not invent add-ons or pricing
- Do not combine Section 1 and Section 2 into one section

## Done When
- [ ] All 5 sections render correctly
- [ ] Feature lists match this brief exactly
- [ ] Full Detail card has yellow border in Section 1 AND Section 2
- [ ] Protection section has intro paragraph above cards
- [ ] Fleet callout block visually distinct from other sections
- [ ] CTA banner at bottom
- [ ] Mobile responsive — all grids stack cleanly
- [ ] No em dashes anywhere
- [ ] Page metadata: title "Services | Metro Auto Detailing", description "Professional mobile detailing services in Bakersfield, CA. View packages, add-ons, fleet pricing, and book online."
- [ ] Linked in nav
