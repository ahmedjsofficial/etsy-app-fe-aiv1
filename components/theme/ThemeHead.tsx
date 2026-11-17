import { buildThemeCss, themeInitScript, type ThemeOverrides } from "@/lib/theme";
import { InlineScript } from "./InlineScript";

interface ThemeHeadProps {
  /** Persisted admin appearance settings. */
  overrides?: ThemeOverrides;
}

export function ThemeHead({ overrides }: ThemeHeadProps) {
  return (
    <>
      <InlineScript html={themeInitScript} />
      <style id="threadline-theme" dangerouslySetInnerHTML={{ __html: buildThemeCss(overrides) }} />
    </>
  );
}
