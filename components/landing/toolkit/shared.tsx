import type { ReactNode } from "react";

export const PREVIEW_SHADOW = "shadow-[0_24px_44px_-24px_rgba(36,16,47,0.5),0_2px_8px_rgba(36,16,47,0.08)]";

/** Scales a fixed design into whatever width the parent gives it. Parent should be `min-w-0`. */
export function FitPreview({
  width,
  height,
  maxWidth,
  children,
}: {
  width: number;
  height: number;
  maxWidth?: number;
  children: ReactNode;
}) {
  return (
    <div
      className="relative w-full min-w-0 overflow-hidden"
      style={{
        containerType: "inline-size",
        width: maxWidth ? `min(100%, ${maxWidth}px)` : "100%",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width,
          height,
          transform: `scale(calc(100cqi / ${width}px))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function PreviewField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[0.6875rem] font-bold text-foreground">{label}</p>
      {children}
    </div>
  );
}
