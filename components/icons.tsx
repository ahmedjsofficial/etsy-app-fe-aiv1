import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Long hand-drawn arrow pointing right. */
export function HandArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 220 40" fill="none" aria-hidden {...props}>
      <path d="M4 30C48 12 118 6 198 20" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path
        d="M178 8.5 208 20.5 180 32"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Short curved arrow used between steps. */
export function CurvedArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 20" fill="none" aria-hidden {...props}>
      <path d="M2 12c8-5 16-6 26-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m22 5 7 5-7.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Three-stroke "pop" accent. */
export function BurstIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden {...props}>
      <path d="M10 18 6 6M20 15l4-12M27 23l11-4" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

const LAUREL_LEAVES = [
  { cx: 11.2, cy: 34.5, r: -62 },
  { cx: 7.6, cy: 28.2, r: -38 },
  { cx: 6.2, cy: 21.2, r: -16 },
  { cx: 6.8, cy: 14.2, r: 8 },
  { cx: 9.4, cy: 7.8, r: 30 },
];

/** Four-point sparkle with concave sides — Autopilot heading and optimize action. */
export function SparkleMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M8 0.4c.28 2.7 1.7 4.7 4.55 5.6C9.7 6.9 8.28 8.9 8 11.6 7.72 8.9 6.3 6.9 3.45 6c2.85-.9 4.27-2.9 4.55-5.6Z" />
    </svg>
  );
}

/** Two stacked photo frames — generate-images action in the workflow. */
export function StackedPhotosIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <rect x="1.2" y="3.8" width="10.4" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M4.4 3.8V3.15A1.9 1.9 0 0 1 6.3 1.25h6.55A1.9 1.9 0 0 1 14.75 3.15v6.55a1.9 1.9 0 0 1-1.9 1.9H12"
        stroke="currentColor"
        strokeWidth="1.35"
      />
    </svg>
  );
}

/** Official Pinterest mark. Color via `fill` / `text-*` at the call site. */
export function PinterestIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden role="img" {...props}>
      <path d="M7.54 23.15q-.2-2.05.26-3.93L9 14.04a7 7 0 0 1-.35-2.07c0-1.68.81-2.88 2.09-2.88.88 0 1.53.62 1.53 1.8q0 .57-.23 1.28l-.52 1.72q-.15.5-.15.92c0 1.2.91 1.87 2.08 1.87 2.09 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.12-5.05-5.12-3.36 0-5.49 2.19-5.49 5.24 0 1.22.38 2.36 1.11 3.14-.24.41-.5.48-.88.48-1.2 0-2.34-1.69-2.34-4 0-4 3.2-7.17 7.68-7.17 4.7 0 7.66 3.29 7.66 7.33s-2.88 7.15-5.98 7.15a3.8 3.8 0 0 1-3.06-1.48l-.62 2.5a11 11 0 0 1-1.62 3.67A11.98 11.98 0 0 0 24 12a11.99 11.99 0 1 0-24 0 12 12 0 0 0 7.54 11.15" />
    </svg>
  );
}

/** Left laurel branch; mirror with `-scale-x-100` for the right side. */
export function LaurelIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 44" fill="currentColor" aria-hidden {...props}>
      <path d="M16 41C8 36 4.5 28 5 19.5 5.4 13 8 7.4 12 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {LAUREL_LEAVES.map(({ cx, cy, r }) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="1.9" ry="4.1" transform={`rotate(${r} ${cx} ${cy})`} />
      ))}
    </svg>
  );
}

/** Soft hand-drawn underline for editorial headings. */
export function ScribbleUnderlineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 120 14" fill="currentColor" aria-hidden {...props}>
      <path d="M2 8.2c10-3.2 28-5.4 52-5.8 22-.4 44 .6 62 2.2 1.4.1 2 .8 1.9 1.6-.1.9-.9 1.4-2.2 1.3-18-1.4-40-2.2-62-1.8C34 6 16 7.4 5.2 10.2c-1.4.4-2.6-.2-3-1.2-.3-.9.4-1.8-.2-1.8Z" />
      <path
        opacity="0.55"
        d="M10 11c16-2.2 38-3.4 62-3.2 14 .1 28 .8 40 1.8.9.1 1.3.5 1.2 1-.1.5-.6.8-1.4.7-12-.8-26-1.4-40-1.3-24 .2-46 1.6-62 3.4-.9.1-1.5-.2-1.6-.7 0-.4.4-.7.8-.7Z"
      />
    </svg>
  );
}

/** Five-petal bloom used as a section accent. */
export function BloomIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" fill="currentColor" aria-hidden {...props}>
      <path d="M100 18c14 22 16 42 8 58-10-4-22-6-34-4 4-18 12-36 26-54Z" />
      <path d="M168 58c-8 24-22 38-40 44 2-12 0-24-6-34 16-6 32-10 46-10Z" />
      <path d="M156 148c-24 6-42 2-54-10 10-8 16-18 18-30 16 10 28 24 36 40Z" />
      <path d="M44 148c8 16 20 30 36 40 2-12 8-22 18-30-12 12-30 16-54 10Z" />
      <path d="M32 58c14 0 30 4 46 10-6 10-8 22-6 34-18-6-32-20-40-44Z" />
      <circle cx="100" cy="100" r="18" />
    </svg>
  );
}

/** Social marks — color via `currentColor` at the call site. */
export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.95 10.62 20.4 3h-1.8l-5.5 6.5L8.7 3H3.5l6.85 10.05L3.5 21h1.8l5.9-6.97L15.3 21h5.2l-6.55-10.38ZM12 13.3l-.68-.98L5.9 4.3h2.05l4.35 6.25.68.98 5.7 8.18H16.6L12 13.3Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.5 8.2a3.1 3.1 0 0 0-2.2-2.2C18.4 5.5 12 5.5 12 5.5s-6.4 0-8.3.5A3.1 3.1 0 0 0 1.5 8.2 32 32 0 0 0 1 12a32 32 0 0 0 .5 3.8 3.1 3.1 0 0 0 2.2 2.2c1.9.5 8.3.5 8.3.5s6.4 0 8.3-.5a3.1 3.1 0 0 0 2.2-2.2A32 32 0 0 0 23 12a32 32 0 0 0-.5-3.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.3 9.2H3.6V20h2.7V9.2ZM5 7.7a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM20.4 20h-2.7v-5.6c0-1.55-.55-2.6-1.9-2.6-1.05 0-1.65.7-1.95 1.4-.1.25-.1.6-.1.95V20h-2.7s.05-9.5 0-10.8h2.7v1.55c.35-.55 1-1.35 2.45-1.35 1.8 0 3.15 1.2 3.15 3.75V20Z" />
    </svg>
  );
}
