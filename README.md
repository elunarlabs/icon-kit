<div align="center">

# @elunarlabs/icon-kit

[![npm version](https://img.shields.io/npm/v/@elunarlabs/icon-kit.svg)](https://www.npmjs.com/package/@elunarlabs/icon-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Lightweight unified React Icon component for **Lucide Core**, optional **Lucide Lab**, and **Font Awesome Brands** – with animated circle variants (pure SVG ring) & Framer Motion effects.

</div>

## Features
- Single API for multiple icon sources
- Variants: `default`, `circle`, `circleFilled`
- Animations: `spin`, `pulse`, `bounce`, `wiggle`, `float`, `scale`, `lift`, `draw`
- Separate hover animations via `hoverAnimation`
- External trigger system (`triggerId` + `[data-icon-trigger]`)
- Auto‑included CSS (side effect) – nothing extra to import
- Accessibility friendly (`ariaLabel`, `decorative`, `fallback`)
- Tree‑shakeable & minimal runtime

## Install
```bash
npm install @elunarlabs/icon-kit
```
Optional peers (only if you actually use them):
```bash
npm install @lucide/lab @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
```

## Quick Start
```tsx
import { Icon } from '@elunarlabs/icon-kit';

export function Demo() {
  return (
    <div style={{ display:'flex', gap:16 }}>
      <Icon name="camera" />
      <Icon name="alarm-clock" variant="circle" color="#6366f1" />
      <Icon name="heart" animation="pulse" color="#e11d48" />
      <Icon kit="lucide-lab" name="pumpkin" variant="circleFilled" circleFilledColor="#16a34a" />
      <Icon kit="fa-brands" name="github" variant="circle" circleColor="#000" />
    </div>
  );
}
```

## Core Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Icon name (kebab, snake, lower, Pascal all normalized) e.g. `alarm-clock` / `alarmClock` |
| `kit` | `'lucide' \| 'lucide-lab' \| 'fa-brands'` | `'lucide'` | Icon source set |
| `variant` | `'default' \| 'circle' \| 'circleFilled'` | `'default'` | Visual style; circle variants render an SVG ring (not a CSS border) |
| `size` | `number` | `20` | Outer square size in px (circle diameter) |
| `strokeWidth` | `number` | `2` | Lucide stroke width (clamped 1–3 for consistency) |
| `circleBorderWidth` | `number` | auto | Explicit ring thickness in px (bypasses adaptive calc) |
| `color` | `string` | inherits | Primary stroke / icon color (and outline if no specific circle colors) |
| `circleColor` | `string` | `color` | Outline ring color for `circle` variant |
| `circleFilledColor` | `string` | `color` | Fill color for `circleFilled` interior (auto contrast text) |
| `className` | `string` | — | Class on outer wrapper span |
| `iconClassName` | `string` | — | Class on inner icon container (before the actual svg) |
| `ariaLabel` | `string` | — | Adds `role="img"` + `aria-label`; overrides `decorative` |
| `decorative` | `boolean` | `false` | Marks icon as purely visual (`aria-hidden`) if no `ariaLabel` |
| `fallback` | `ReactNode` | `null` | Rendered when icon lookup fails (otherwise returns `null`) |
| `animation` | `'spin' \| 'pulse' \| 'bounce' \| 'wiggle' \| 'float' \| 'scale' \| 'lift' \| 'draw'` | — | Continuous / base animation (use `draw` to stroke‑reveal) |
| `hoverAnimation` | `'scale' \| 'lift' \| 'rotate' \| 'wiggle' \| 'pulse'` | — | Hover-only motion overlay (independent of base) |
| `repeat` | `number \| 'infinite'` | `'infinite'` | Iterations for base animation (ignored for hover) |
| `animationDuration` | `number` | `1.5` | Seconds for one base animation loop |
| `animationDelay` | `number` | `0` | Initial delay (s) before base animation starts |
| `ease` | `any` | internal | Custom easing for supported animations (falls back to sensible defaults) |
| `draw` | `boolean` | `false` | Alternate way to enable stroke drawing (equivalent to `animation="draw"`) |
| `drawDuration` | `number` | `1.2` | Total stroke reveal time (s) |
| `drawDelay` | `number` | `0` | Delay (s) before draw starts |
| `drawEasing` | `string` | `'ease'` | CSS easing name used for stroke dashoffset animation |
| `disableAnimations` | `boolean` | `false` | Hard disable all motion (overrides base + hover + draw) |
| `respectReducedMotion` | `boolean` | `true` | If user prefers reduced motion, suppress unless `forceAnimations` |
| `forceAnimations` | `boolean` | `false` | Force animations even when reduced motion is set |
| `debugAnimations` | `boolean` | `false` | Console log diagnostic animation info (dev only) |
| `triggerId` | `string` | — | Tie animation start to any element(s) with `data-icon-trigger` attr |
| `style` | `React.CSSProperties` | — | Inline styles merged last |
| `...rest` | HTML attrs | — | Spread onto wrapper span (except `color`) |

Notes:
- Font Awesome Brand icons ignore `strokeWidth` (they are font-based glyphs rendered via `<FontAwesomeIcon>`).
- Circle ring thickness auto-scales with stroke & size unless overridden by `circleBorderWidth`.

### Animation Details
Base animations loop using Framer Motion; hover animations apply only while hovered (or while external trigger active if `triggerId` is set). The `draw` animation manipulates stroke dash arrays manually — it's not a Framer transform, so timing is controlled by `draw*` props.

### External Trigger Usage
Attach `data-icon-trigger="some-id"` to any number of elements. Any `Icon` with `triggerId="some-id"` only animates while at least one trigger element is hovered or focused.

```tsx
<button data-icon-trigger="nav-main">Hover / focus me</button>
<Icon name="compass" variant="circle" animation="pulse" triggerId="nav-main" />
```

### Reduced Motion Behavior
If the OS / browser indicates prefers-reduced-motion:
- All animations are disabled when `respectReducedMotion` (default) is true.
- Override globally per-icon via `forceAnimations`.
- You can still manually set `disableAnimations` to stop everything regardless.

### Styling & Theming
The component injects minimal structural classes:
- `.elunar-icon` (wrapper)
- `.elunar-icon__inner`
- `.elunar-icon__svg`

You can theme via these classes or provide your own `className` / `iconClassName`. For circle variants, background/foreground contrast is auto-adjusted for filled circles (white vs dark text based on luminance of `circleFilledColor`).

### Fallback Handling
When an icon name cannot be resolved the component:
1. Logs a dev warning (non-production only)
2. Renders `fallback` node if provided
3. Else returns `null`

### Optional Peer Dependencies
Only install what you actually use:
```bash
npm install @lucide/lab @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
```
If a peer isn't installed, related icons simply won't resolve (no crash).

### TypeScript
All props are typed via `IconProps`. Tree-shaking works because each source library handles its own side effects and we only import the icon modules.

### Performance
Lucide Lab icons are wrapped and memoized on first use. Repeated lookups are cached (`Map`). The ring is a simple masked SVG (no layout thrash). Draw animation computes path lengths once per play.

### Accessibility Tips
- Use `ariaLabel` for meaningful icons.
- Use `decorative` for purely visual ones so they are hidden from screen readers.
- Provide a short `fallback` when dynamic icon names might fail.

### Common Pitfalls
| Issue | Cause | Fix |
|-------|-------|-----|
| Icon not showing | Name mismatch | Check case/format; kebab/snake/pascal all supported |
| Draw animation no effect | Using Font Awesome | Draw only affects stroke-based SVG (Lucide/Lab) |
| Motion disabled unexpectedly | OS reduced motion | Set `forceAnimations` or `respectReducedMotion={false}` |
| Ring too thick/thin | Auto scaling result | Use `circleBorderWidth` to force explicit px |

---
Let me know via issues if another animation or variant would help your workflow.

## External Trigger
```tsx
<button data-icon-trigger="nav-main">Hover me</button>
<Icon name="home" variant="circle" animation="pulse" triggerId="nav-main" />
```
Animation runs only while the trigger is hovered or focused.

## Draw Animation
```tsx
<Icon name="activity" animation="draw" drawDuration={1.4} />
```
The stroke is revealed and can replay via a trigger.

## Accessibility
```tsx
<Icon name="search" ariaLabel="Search" />
<Icon name="sparkles" decorative />
<Icon name="unknown-icon" fallback={<span style={{fontSize:12}}>?</span>} />
```

## Contributing
Welcome to issues & PRs.

1. Fork & branch (`feat/...`, `fix/...`)
2. `npm install` then `npm test` & `npm run build`
3. Open PR with concise description

## Release (maintainers)
```bash
# bump version (semver)
npm run clean
npm run build
npm publish --access public
```

## License
MIT © Elunar Labs
