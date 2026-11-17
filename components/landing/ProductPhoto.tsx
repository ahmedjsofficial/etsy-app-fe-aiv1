import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

const TONES = {
  studio:
    "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--secondary),white_35%)_0%,var(--secondary)_64%,color-mix(in_oklab,var(--secondary),var(--foreground)_7%)_64%,color-mix(in_oklab,var(--secondary),var(--foreground)_3%)_100%)]",
  cream: "bg-secondary",
  cool: "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--secondary),var(--foreground)_10%)_0%,color-mix(in_oklab,var(--secondary),var(--foreground)_16%)_64%,color-mix(in_oklab,var(--secondary),var(--foreground)_20%)_64%,color-mix(in_oklab,var(--secondary),var(--foreground)_14%)_100%)]",
  warm: "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--highlight),white_42%)_0%,color-mix(in_oklab,var(--highlight),var(--secondary)_18%)_64%,color-mix(in_oklab,var(--highlight),var(--secondary)_50%)_64%,color-mix(in_oklab,var(--secondary),var(--highlight)_40%)_100%)]",
  lavender:
    "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--hero-glow),var(--hero-to)_35%)_0%,color-mix(in_oklab,var(--hero-glow),var(--hero-to)_55%)_62%,color-mix(in_oklab,var(--hero-to),var(--hero-via)_18%)_62%,color-mix(in_oklab,var(--hero-to),var(--hero-glow)_40%)_100%)]",
  blush: "bg-[linear-gradient(180deg,var(--accent)_0%,color-mix(in_oklab,var(--accent),var(--hero-glow)_55%)_100%)]",
} as const;

/** Transparent product PNG staged on a wall-and-tabletop backdrop with a contact shadow. */
export function ProductPhoto({
  src,
  sizes,
  tone = "studio",
  className,
  imageClassName,
}: {
  src: StaticImageData;
  sizes: string;
  tone?: keyof typeof TONES;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("relative size-full", TONES[tone], className)}>
      <span className="absolute bottom-[14%] left-1/2 h-[7%] w-[58%] -translate-x-1/2 rounded-[50%] bg-foreground/20 blur-[3px]" />
      <Image
        src={src}
        alt=""
        sizes={sizes}
        className={cn("absolute inset-x-[10%] bottom-[10%] w-[80%] object-contain", imageClassName)}
      />
    </div>
  );
}
