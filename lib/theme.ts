/**
 * Threadline design tokens — the single source of truth for color.
 *
 * Tokens are emitted as CSS custom properties (see `buildThemeCss`) and mapped to
 * Tailwind utilities in `app/globals.css`. Runtime consumers (e.g. the Three.js
 * scene) read the same variables through `useThemeColors`, so an admin
 * "Appearance" panel only needs to produce a `ThemeOverrides` object.
 */

export const palette = {
  plum: "#24102F",
  purple: "#54245F",
  lavender: "#D9A0D9",
  orange: "#FF681E",
  cream: "#F7F1E8",
  ivory: "#FFF9F1",
  linen: "#EDE2D5",
  gold: "#D4A24C",
  terracotta: "#C8693A",
  night: "#130A19",
  dusk: "#1D1124",
} as const;

export type PaletteColor = keyof typeof palette;

export const THEME_MODES = ["light", "dark"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];
export type ThemePreference = ThemeMode | "system";

export interface ThemeTokens {
  /* shadcn / base-ui semantic tokens */
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  /* brand surfaces */
  surfaceAlt: string;
  highlight: string;
  highlightForeground: string;
  /* hero */
  heroFrom: string;
  heroVia: string;
  heroTo: string;
  heroGlow: string;
  heroForeground: string;
  heroMuted: string;
  heroBorder: string;
  heroSun: string;
  heroSunHighlight: string;
  heroStage: string;
  heroStageEdge: string;
  heroStone: string;
  heroNote: string;
  heroNoteInk: string;
  /* 3D scene materials */
  sceneAccent: string;
  sceneMetal: string;
  sceneGem: string;
}

export type ThemeOverrides = Partial<Record<ThemeMode, Partial<ThemeTokens>>>;

const light: ThemeTokens = {
  background: palette.cream,
  foreground: palette.plum,
  card: palette.ivory,
  cardForeground: palette.plum,
  popover: palette.ivory,
  popoverForeground: palette.plum,
  primary: palette.orange,
  primaryForeground: palette.ivory,
  secondary: palette.linen,
  secondaryForeground: palette.plum,
  muted: palette.linen,
  mutedForeground: "#6E5A72",
  accent: "#F3E3F3",
  accentForeground: palette.purple,
  destructive: "#D92D20",
  border: "#E2D4C6",
  input: "#E2D4C6",
  ring: palette.orange,
  surfaceAlt: palette.linen,
  highlight: "#F7DD72",
  highlightForeground: palette.plum,
  heroFrom: palette.plum,
  heroVia: palette.purple,
  heroTo: palette.lavender,
  heroGlow: "#F1C9EE",
  heroForeground: palette.cream,
  heroMuted: "rgba(247, 241, 232, 0.82)",
  heroBorder: "rgba(247, 241, 232, 0.38)",
  heroSun: palette.orange,
  heroSunHighlight: "#FF9A4D",
  heroStage: "#F4EEF6",
  heroStageEdge: "#DCCFE2",
  heroStone: "#E7D6C1",
  heroNote: "#FBF1E1",
  heroNoteInk: palette.plum,
  sceneAccent: palette.orange,
  sceneMetal: palette.gold,
  sceneGem: "#B57BC9",
};

const dark: ThemeTokens = {
  background: palette.night,
  foreground: palette.cream,
  card: palette.dusk,
  cardForeground: palette.cream,
  popover: palette.dusk,
  popoverForeground: palette.cream,
  primary: palette.orange,
  primaryForeground: palette.ivory,
  secondary: "#2A1A33",
  secondaryForeground: palette.cream,
  muted: "#2A1A33",
  mutedForeground: "#B9A8BD",
  accent: "#3A2245",
  accentForeground: palette.lavender,
  destructive: "#F04438",
  border: "rgba(247, 241, 232, 0.12)",
  input: "rgba(247, 241, 232, 0.16)",
  ring: palette.orange,
  surfaceAlt: palette.dusk,
  highlight: "#E9C85C",
  highlightForeground: palette.plum,
  heroFrom: "#10061A",
  heroVia: "#341540",
  heroTo: "#8C5A99",
  heroGlow: "#B07BB8",
  heroForeground: palette.cream,
  heroMuted: "rgba(247, 241, 232, 0.76)",
  heroBorder: "rgba(247, 241, 232, 0.28)",
  heroSun: "#F25F18",
  heroSunHighlight: "#FF8A3D",
  heroStage: "#2E1E37",
  heroStageEdge: "#21142A",
  heroStone: "#BFA88E",
  heroNote: palette.linen,
  heroNoteInk: palette.plum,
  sceneAccent: "#F25F18",
  sceneMetal: palette.gold,
  sceneGem: "#C08AD2",
};

export const themes: Record<ThemeMode, ThemeTokens> = { light, dark };

export const THEME_STORAGE_KEY = "threadline-theme";

export const toCssVarName = (token: keyof ThemeTokens) =>
  `--${token.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;

export function mergeTheme(overrides: ThemeOverrides = {}): Record<ThemeMode, ThemeTokens> {
  return {
    light: { ...themes.light, ...overrides.light },
    dark: { ...themes.dark, ...overrides.dark },
  };
}

function declarations(tokens: ThemeTokens) {
  return (Object.keys(tokens) as (keyof ThemeTokens)[])
    .map((token) => `${toCssVarName(token)}:${tokens[token]};`)
    .join("");
}

export function buildThemeCss(overrides?: ThemeOverrides) {
  const { light: l, dark: d } = mergeTheme(overrides);
  return `:root{color-scheme:light;${declarations(l)}}.dark{color-scheme:dark;${declarations(d)}}`;
}

/**
 * Runs before hydration to apply the stored preference without a flash.
 * Defaults to `DEFAULT_THEME_PREFERENCE` when nothing is stored.
 * Kept dependency-free because it is inlined into <head>.
 */
export const DEFAULT_THEME_PREFERENCE: ThemePreference = "light";

export const themeInitScript = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}")||"${DEFAULT_THEME_PREFERENCE}";var d=p==="dark"||(p==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
