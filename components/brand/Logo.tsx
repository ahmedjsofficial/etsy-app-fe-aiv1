import Link from "next/link";
import { brand } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7 text-primary", className)}>
      <g fill="currentColor">
        <circle cx="10.5" cy="10.5" r="7" />
        <circle cx="21.5" cy="10.5" r="7" />
        <circle cx="10.5" cy="21.5" r="7" />
        <circle cx="21.5" cy="21.5" r="7" />
      </g>
      <path d="M16 6.5v19M6.5 16h19" stroke="var(--hero-from)" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={brand.href}
      aria-label={`${brand.name} home`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full text-[1.375rem] font-extrabold tracking-[-0.03em] outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        className,
      )}
    >
      <LogoMark />
      <span>{brand.name}</span>
    </Link>
  );
}
