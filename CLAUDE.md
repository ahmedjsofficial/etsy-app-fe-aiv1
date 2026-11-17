# Threadline — agent guide

Marketing site for Threadline, an AI workspace for Etsy sellers. Read `AGENTS.md` first:
this is Next.js 16 (App Router, Turbopack, `cacheComponents`), so check
`node_modules/next/dist/docs/` before using any Next API. Base UI docs live in
`node_modules/@base-ui/react/docs/`.

## Stack

- Next.js 16.4, React 19.3, TypeScript (strict), Tailwind CSS v4 (CSS-first config).
- UI primitives: Base UI (`@base-ui/react`) + shadcn conventions (`components/ui`), `cva`, `cn`.
- Motion: `motion` (import from `motion/react`). 3D: `three`, `@react-three/fiber` v9, `@react-three/drei`.
- Icons: `lucide-react`. State (when needed): `zustand`.

## Layout

```
app/                    routes, root layout (fonts + ThemeHead), globals.css (Tailwind mapping only)
components/
  ui/                   generic primitives (button, button-link) — no product copy
  icons.tsx             custom SVG icons (size/color/position set at the call site)
  brand/                logo / brand marks
  theme/                ThemeHead, InlineScript (pre-hydration theme)
  motion/               ParallaxStage, ParallaxLayer, Float — reuse on later sections
  three/HeroScene.tsx   dynamically imported WebGL chunk (keep Three.js off the main bundle)
  landing/              page sections
    Hero.tsx            section shell (background + layout)
    HeroText.tsx        text column
    HeroShowcase.tsx    still-life column (placement data lives here)
    Storyline.tsx       product-to-growth polaroid path
    Toolkit.tsx         OnClickLister + Smart Optimizer cards
    ProductPhoto.tsx    staged product PNG (shared by Storyline + Toolkit)
    SiteHeader.tsx      desktop + mobile nav
hooks/                  useMediaQuery, usePointerParallax, useThemeColors
lib/                    theme.ts, motion.ts (variants/easings), assets.ts, content/*
utils/                  pure helpers (math, scene coordinate mapping)
public/assets/          transparent product PNGs — import via lib/assets.ts, never by string path
```

## Theming (light/dark + admin appearance)

- `lib/theme.ts` is the single source of truth for color. Add tokens to `ThemeTokens`,
  set values for **both** `light` and `dark`, then map them in `app/globals.css` `@theme inline`
  as `--color-<token>: var(--<token>)` to get Tailwind utilities (`bg-hero-sun`, `text-hero-muted`).
- Never hardcode brand hex values in components; use Tailwind token utilities or `var(--token)`.
  Three.js reads tokens at runtime with `useThemeColors([...])`.
- Dark mode = `.dark` on `<html>` (`dark:` variant). Preference key: `THEME_STORAGE_KEY`.
- Admin overrides: pass a `ThemeOverrides` object to `<ThemeHead overrides={...} />`.
- Fonts: `font-heading`/`font-serif` = Instrument Serif (editorial headings, weight 400 only),
  `font-sans` = Manrope (body/UI), `font-hand` = Caveat (handwritten accents only),
  `font-display` = Anton (condensed uppercase callouts, e.g. Storyline title).

## Component rules

- Server Components by default; add `"use client"` only to leaves that need hooks/motion.
- Split a file when something is reused, or when the split is a real boundary (client/server,
  `next/dynamic`). Do not extract a one-off visual into its own file.
- Copy and nav data live in `lib/content/*`. Composition/placement data lives next to the
  section that uses it (percentages of the showcase box).
- Links styled as buttons: `ButtonLink` (merges classes with `cn`). Add new looks as `cva`
  variants in `components/ui/button.tsx` instead of one-off class strings.
- Images: `next/image` with static imports from `lib/assets.ts` and accurate `sizes`.
  Use `preload`/`fetchPriority` (the `priority` prop is deprecated in Next 16).

## Motion & 3D rules

- Reuse `lib/motion.ts` variants/easings. Parallax goes through `ParallaxStage` context +
  `ParallaxLayer` (`depth`, `scrollShift`); idle bobbing uses `<Float>` (CSS keyframes on
  `translate`/`rotate`, so it composes with Motion transforms).
- Respect `prefers-reduced-motion` (`useReducedMotion`, `motion-reduce:`); scroll-linked effects
  are desktop-only (`ParallaxStage`).
- WebGL is progressive enhancement: load `HeroScene` via `next/dynamic({ ssr: false })` inside a
  client component after the hero entrance (idle/timeout), wrap in an error boundary, pause the
  frameloop when off-screen, use a fixed DPR, and keep geometry/materials cheap. Do not bake an
  Environment cubemap or use `powerPreference: "high-performance"` — both hitch the page on mount.
  Position scene objects in showcase-box percentages via `boxToWorld`.
- Never allocate objects inside `useFrame`; mutate refs and use `MathUtils.damp`.

## Checks

Run before finishing: `npx tsc --noEmit`, `npm run lint`, `npm run build`
(font downloads need network access).
