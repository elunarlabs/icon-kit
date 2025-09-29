<div align="center">

# @elunar/icon-kit

[![npm version](https://img.shields.io/npm/v/@elunar/icon-kit.svg)](https://www.npmjs.com/package/@elunar/icon-kit)
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
npm install @elunar/icon-kit
```
Optional peers (only if you actually use them):
```bash
npm install @lucide/lab @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
```

## Quick Start
```tsx
import { Icon } from '@elunar/icon-kit';

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
| Prop | Type | Description |
|------|------|-------------|
| `name` | string | Icon name (e.g. `camera`) |
| `kit` | 'lucide' \| 'lucide-lab' \| 'fa-brands' | Source set (default `lucide`) |
| `size` | number | Size in px (default 20) |
| `variant` | 'default' \| 'circle' \| 'circleFilled' | Visual style |
| `strokeWidth` | number | Clamped 1–3 (line weight) |
| `circleBorderWidth` | number | Override ring thickness (px) |
| `circleColor` | string | Ring / outline color |
| `circleFilledColor` | string | Fill color for `circleFilled` |
| `animation` | listed above | Base animation |
| `hoverAnimation` | listed above | Hover effect |
| `triggerId` | string | External trigger group id |
| `ariaLabel` | string | Accessible label |
| `decorative` | boolean | Marks icon as purely decorative |
| `fallback` | ReactNode | Fallback content if icon not found |

More: `className`, `iconClassName`, `repeat`, `drawDuration`, `drawDelay`, `respectReducedMotion`, `forceAnimations`.

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
MIT © Elunar
