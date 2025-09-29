# Changelog

All notable changes to this project will be documented in this file.

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
