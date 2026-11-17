/**
 * Parser-blocking inline script for pre-hydration DOM fixes (e.g. theme class).
 * Rendered as `text/plain` on the client so React doesn't warn about <script>.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
