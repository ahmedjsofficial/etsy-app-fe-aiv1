"use client";

import { useEffect, useState } from "react";
import { themes, toCssVarName, type ThemeTokens } from "@/lib/theme";

type ThemeColorMap<K extends keyof ThemeTokens> = Record<K, string>;

function readColors<K extends keyof ThemeTokens>(keys: readonly K[]): ThemeColorMap<K> {
  const styles = getComputedStyle(document.documentElement);
  return Object.fromEntries(
    keys.map((key) => [key, styles.getPropertyValue(toCssVarName(key)).trim() || themes.light[key]]),
  ) as ThemeColorMap<K>;
}

/**
 * Resolves theme tokens from live CSS variables so non-CSS renderers (Three.js)
 * follow light/dark switches and admin overrides.
 */
export function useThemeColors<K extends keyof ThemeTokens>(keys: readonly K[]): ThemeColorMap<K> {
  const [colors, setColors] = useState<ThemeColorMap<K>>(() =>
    typeof document === "undefined"
      ? (Object.fromEntries(keys.map((key) => [key, themes.light[key]])) as ThemeColorMap<K>)
      : readColors(keys),
  );
  const signature = keys.join("|");

  useEffect(() => {
    const tokenKeys = signature.split("|") as K[];
    const sync = () => {
      const next = readColors(tokenKeys);
      setColors((prev) => (tokenKeys.every((key) => prev[key] === next[key]) ? prev : next));
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    const themeStyle = document.getElementById("threadline-theme");
    if (themeStyle) observer.observe(themeStyle, { childList: true, characterData: true, subtree: true });

    return () => observer.disconnect();
  }, [signature]);

  return colors;
}
