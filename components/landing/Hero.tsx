import { ParallaxStage } from "@/components/motion";
import { cn } from "@/lib/utils";
import { HeroShowcase } from "./HeroShowcase";
import { SiteHeader } from "./SiteHeader";
import { HeroText } from "./HeroText";

const HEADING_ID = "hero-heading";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function HeroBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute top-[30%] left-[-10%] size-168 rounded-full bg-hero-via/40 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-10 w-full text-background sm:h-14 lg:h-20"
      >
        <path
          fill="currentColor"
          d="M0 44C160 70 330 78 520 62 720 45 880 18 1080 20c140 1.5 260 18 360 34V80H0Z"
        />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <ParallaxStage aria-labelledby={HEADING_ID} className="isolate overflow-hidden">
      <HeroBackground />
      <SiteHeader />
      <div className="app-container grid items-center gap-12 pt-6 pb-16 sm:pb-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-2 lg:pt-6 lg:pb-28">
        <HeroText headingId={HEADING_ID} />
        <HeroShowcase className="-mx-5 w-[calc(100%+2.5rem)] sm:mx-auto sm:w-full sm:max-w-[48rem] lg:mx-0 lg:w-full lg:max-w-none" />
      </div>
    </ParallaxStage>
  );
}
