# Changelog

All notable changes to this project will be documented in this file.

## 0.1.3 – Entry Client Directive
Fix: Add `"use client"` directive to package entry (`src/index.ts`) so frameworks (e.g. Next.js) correctly treat the module as client when importing `Icon` from the root export. Previously only the inner component file had the directive, which could still trigger a server invocation of `useReducedMotion` in some RSC boundary patterns.

Notes:
- No API changes.
- Safe upgrade for all consumers; recommended for Next.js users seeing the server hook error.

## 0.1.2 – Client + Spacing Tweaks
Changes:
- Add `"use client"` directive to `src/icon.tsx` (fixes Next.js RSC `useReducedMotion` server error).
- Circle spacing adjustments (final values):
	- Base ring thickness constant remains 7% (decided not to raise after evaluation)
	- Gap formula now: `ringPct * 0.25 + stroke * 0.45` (previously used smaller stroke factor)
	- Inner scale factor reduced to 0.75 (smaller glyph for more breathing room)

Notes:
- No breaking API changes.
- Visual refinement + RSC safety.
- Recommend upgrading if using Next.js with RSC warnings.

## 0.1.1 – Documentation Update
Patch release containing README expansion only (no runtime / build output changes):
- Added full `IconProps` reference table (animation timing, draw, accessibility, trigger, theming details)
- Clarified reduced motion behavior & optional peer dependency usage
- Added troubleshooting & performance notes

No code or dependency changes affecting published bundle; consumers can stay on 0.1.0 unless they want the improved docs in their `npm view` metadata.

## 0.1.0 – Initial Release
First public publish of `@elunarlabs/icon-kit` (previously prepared as `@elunar/icon-kit` before organization scope finalization).

### Highlights
- Unified React Icon component for:
	- Lucide Core (default)
	- Lucide Lab (optional peer)
	- Font Awesome Brands (optional peer)
- Variants: `default`, `circle`, `circleFilled` (circle variants rendered as a clean SVG ring / donut)
- Built‑in motion + hover animations:
	- Base: `spin`, `pulse`, `bounce`, `wiggle`, `float`, `scale`, `lift`, `draw` (stroke reveal)
	- Separate `hoverAnimation` prop
- External trigger system (`triggerId` + `[data-icon-trigger]`) to start/stop animation groups
- Stroke draw animation with automatic reset when trigger ends
- Reduced motion awareness (`respectReducedMotion`) + manual override (`forceAnimations`)
- Auto‑included lightweight CSS (no Tailwind requirement)
- Accessible: `ariaLabel`, `decorative`, fallback rendering for unknown icons
- TypeScript types, dual ESM + CJS output, tree‑shake friendly

### Internal / Dev
- Tests cover smoke rendering, CSS class presence, draw & trigger behavior
- Packaging via `tsup`; side effects limited to the stylesheet for minimal bundles

---

Next: feedback, refinements & additional animation presets welcome. Open an issue or PR to contribute.
