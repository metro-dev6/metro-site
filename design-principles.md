# Metro Site — Design Principles

> Standing design guardrail. Read in Site mode alongside brand.md.
> Source: a "distilled aesthetics" prompt from an article on better web design. Shared by the operator 2026-10-03. Adapted to Metro's locked brand.
> brand.md holds the concrete tokens (color, font, spacing). This file holds the thinking behind them.

## The standard: no generic "AI slop"

Design converges toward safe, on-distribution defaults. The result reads as generic. Metro's site should not. Make deliberate choices that fit a mobile detailing business in Bakersfield, not a template someone dropped content into.

## Five guardrails

1. **Typography.** Skip the default sans crowd (Arial, Roboto, Inter, system). Pick type with character. Distinctiveness lives in the headlines. Readability rules the body. Font direction is being reselected, see below.

2. **Color and theme.** Commit to one cohesive look. A dominant color with sharp accents beats a timid, even spread. Metro already does this: black ground, one hard yellow accent. Hold that line. Drive all color through CSS variables.

3. **Motion.** Spend motion where it lands. One orchestrated page load with staggered reveals beats scattered micro-animations. CSS-first for plain HTML, the Motion library for React. Always respect reduced-motion.

4. **Backgrounds.** Build depth, not flat fills. Layer gradients, texture, or contextual effects that fit the dark automotive feel. The dark gallery rhythm is the direction to extend.

5. **Context over cookie-cutter.** No predictable template layouts. Every section should feel built for Metro, not borrowed.

## What stays LOCKED (brand.md wins)

- Black #000000 ground, yellow #fac205 accent, white text. Not up for reinterpretation.
- The palette stays controlled. Distinctiveness comes from type, motion, depth, and layout, not from adding colors.
- DM Sans for numbers and pricing.

## Active change: primary font

Montserrat is the current primary (brand.md line 18). It is one of the most common web fonts, the exact kind this standard says to avoid. The operator is reselecting it: distinctive, but not eye-straining.

Strategy: a distinctive display font for headlines, a clean readable font for body. brand.md gets updated only when the pick is locked.

## How to apply

- This guides design decisions inside the brand lock. It does not reopen the palette.
- When a choice could read as generic, flag it and offer the more deliberate version. See improve-dont-fix.
