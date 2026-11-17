"use client";

import { Component, useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { Float, ParallaxLayer, useParallax } from "@/components/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { productAssets, type ProductAssetKey } from "@/lib/assets";
import { heroContent } from "@/lib/content/landing";
import { easeOutExpo, popIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SCENE_BLEED } from "@/utils/scene";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

/**
 * Composition for the hero still-life, traced from the 1024×544 art-direction
 * frame. Placement values are percentages of the showcase box, so the
 * arrangement scales as one unit across breakpoints.
 *
 * Grounded objects share close parallax depths so they stay seated on the
 * plinth/stone. The poppies sit in front of the vase, share its depth/timing,
 * and are masked out where the stems cross the vase mouth, so they sink into
 * it. Moving either one requires re-aligning the poppies' mask with the opening.
 */
const SHOWCASE_ASPECT = 1024 / 544;
const SHOWCASE_VIEWPORT_SHARE = { desktop: 0.6, mobile: 1 } as const;
const LAYERS = { sun: 0, plinth: 1, scene: 2, stone: 6, note: 8 } as const;

interface ShowcaseProduct {
  id: string;
  asset: ProductAssetKey;
  alt: string;
  left: number;
  bottom: number;
  width: number;
  z: number;
  depth: number;
  scrollShift: number;
  delay: number;
  float?: { distance: number; rotate?: number; duration: number; delay?: number };
  mask?: string;
  shadow?: number;
  priority?: boolean;
}

const PRODUCTS: ShowcaseProduct[] = [
  {
    id: "poppies",
    z: 4,
    asset: "poppies",
    alt: "Orange-red poppies arranged in the vase",
    left: 4.6,
    bottom: 43.4,
    width: 29,
    depth: 0.9,
    scrollShift: 60,
    delay: 0.45,
    mask: "linear-gradient(to bottom, #000 70%, transparent 73%)",
  },
  {
    id: "vase",
    z: 3,
    asset: "vase",
    alt: "Speckled cream and terracotta ceramic vase",
    left: 1.5,
    bottom: 7.1,
    width: 33.2,
    depth: 0.9,
    scrollShift: 60,
    delay: 0.45,
    shadow: 0.58,
  },
  {
    id: "tote",
    z: 5,
    asset: "tote",
    alt: "Cream canvas tote bag",
    left: 28.1,
    bottom: 13.8,
    width: 50.9,
    depth: 0.7,
    scrollShift: 50,
    delay: 0.35,
    shadow: 0.66,
    priority: true,
  },
  {
    id: "candle",
    z: 7,
    asset: "candle",
    alt: "Lit ivory pillar candle",
    left: 23.7,
    bottom: 5.7,
    width: 20.7,
    depth: 1,
    scrollShift: 70,
    delay: 0.65,
    shadow: 0.62,
  },
  {
    id: "bracelet",
    z: 7,
    asset: "bracelet",
    alt: "Gold gemstone charm cuff bracelet",
    left: 46.3,
    bottom: 10.5,
    width: 17.6,
    depth: 1.1,
    scrollShift: 80,
    delay: 0.85,
    shadow: 0.66,
  },
  {
    id: "mug",
    z: 7,
    asset: "mug",
    alt: "Speckled ceramic mug",
    left: 55.9,
    bottom: 10.8,
    width: 31,
    depth: 1.1,
    scrollShift: 80,
    delay: 0.75,
    shadow: 0.6,
  },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay, ease: easeOutExpo },
});

const STONE_TOP =
  "M16 7c40-4.6 110-6 190-5.4 78 .6 150 1.6 182 4.6 6 .6 9 3.6 9.6 8.4L398 37c-55-1.2-125 0-195 2.5S63 43 3 40l5.6-27.6C9.6 9.4 12 7.4 16 7Z";
const STONE_FRONT =
  "M3 40c60 3 130 2 200-.5 70-2.5 140-3.6 195-2.5l-1.6 40c-.4 5-4 8.4-12 8.8-80 2.8-180 3.2-270 2.4-58-.4-104-1.6-104-1.6-5-.8-7.6-4.2-7.6-8.6Z";

function toSizes(width: number) {
  const desktop = Math.ceil(width * SHOWCASE_VIEWPORT_SHARE.desktop);
  const mobile = Math.ceil(width * SHOWCASE_VIEWPORT_SHARE.mobile);
  return `(min-width: 1024px) ${desktop}vw, ${mobile}vw`;
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function SunDisc({ className, style }: { className?: string; style?: CSSProperties }) {
  const { scrollProgress } = useParallax();
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.12]);

  return (
    <ParallaxLayer depth={0.3} scrollShift={20} className={cn("absolute aspect-square", className)} style={style}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.1 }}
        className="size-full"
      >
        <motion.div style={{ scale }} className="relative size-full">
          <div className="absolute -inset-[10%] rounded-full bg-hero-sun/25 blur-3xl" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,var(--hero-sun-highlight)_0%,var(--hero-sun)_55%,color-mix(in_oklab,var(--hero-sun),var(--hero-via)_12%)_100%)]" />
        </motion.div>
      </motion.div>
    </ParallaxLayer>
  );
}

function Plinth({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <ParallaxLayer depth={0.8} scrollShift={50} className={cn("absolute", className)} style={style}>
      <motion.div {...rise(0.2)} className="relative size-full">
        <div className="absolute inset-0 rounded-sm bg-[linear-gradient(180deg,color-mix(in_oklab,var(--hero-stage),white_72%)_0%,var(--hero-stage)_58%,var(--hero-stage-edge)_100%)] shadow-[0_16px_28px_-16px_rgba(36,16,47,0.4)]" />
        <div className="absolute inset-x-[1.5%] top-[10%] h-[38%] rounded-sm bg-[linear-gradient(180deg,rgba(255,255,255,0.7),transparent)]" />
      </motion.div>
    </ParallaxLayer>
  );
}

function StoneSlab({ className, style }: { className?: string; style?: CSSProperties }) {
  const id = useId();
  const top = `${id}-top`;
  const front = `${id}-front`;
  const pits = `${id}-pits`;
  const clip = `${id}-clip`;

  return (
    <ParallaxLayer depth={1.1} scrollShift={80} className={cn("absolute", className)} style={style}>
      <motion.div {...rise(0.4)} className="relative size-full">
        <div className="absolute inset-x-[5%] -bottom-[16%] h-[40%] rounded-[50%] bg-hero-from/50 blur-xl" />
        <svg viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden className="relative size-full overflow-visible">
          <defs>
            <clipPath id={clip}>
              <path d={STONE_FRONT} />
              <path d={STONE_TOP} />
            </clipPath>
            <linearGradient id={top} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "color-mix(in oklab, var(--hero-stone), white 40%)" }} />
              <stop offset="1" style={{ stopColor: "var(--hero-stone)" }} />
            </linearGradient>
            <linearGradient id={front} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "color-mix(in oklab, var(--hero-stone), black 10%)" }} />
              <stop offset="1" style={{ stopColor: "color-mix(in oklab, var(--hero-stone), black 28%)" }} />
            </linearGradient>
            <filter id={pits} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.55 0.9" numOctaves="2" seed="7" />
              <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.33  0 0 0 0 0.22  0 0 0 -22 8.6" />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
          <path fill={`url(#${front})`} d={STONE_FRONT} />
          <path fill={`url(#${top})`} d={STONE_TOP} />
          <g clipPath={`url(#${clip})`} opacity="0.45">
            <rect x="0" y="0" width="400" height="90" style={{ fill: "var(--hero-stone)" }} filter={`url(#${pits})`} />
          </g>
        </svg>
      </motion.div>
    </ParallaxLayer>
  );
}

function Product({ product }: { product: ShowcaseProduct }) {
  const { asset, alt, left, bottom, width, z, depth, scrollShift, delay, float, shadow, mask, priority } = product;

  const image = (
    <div className="relative" style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}>
      {shadow && (
        <span
          aria-hidden
          className="absolute bottom-[3%] left-1/2 h-[9%] -translate-x-1/2 rounded-[50%] bg-hero-from/45 blur-md"
          style={{ width: `${shadow * 100}%` }}
        />
      )}
      <Image
        src={productAssets[asset]}
        alt={alt}
        sizes={toSizes(width)}
        loading="eager"
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
        className="relative h-auto w-full select-none"
      />
    </div>
  );

  return (
    <ParallaxLayer
      depth={depth}
      scrollShift={scrollShift}
      className="absolute"
      style={{ left: `${left}%`, bottom: `${bottom}%`, width: `${width}%`, zIndex: z }}
    >
      <motion.div variants={popIn(delay)} initial="hidden" animate="visible">
        {float ? (
          <Float distance={float.distance} rotate={float.rotate} duration={float.duration} delay={float.delay}>
            {image}
          </Float>
        ) : (
          image
        )}
      </motion.div>
    </ParallaxLayer>
  );
}

function StickyNote({ items, className, style }: { items: readonly string[]; className?: string; style?: CSSProperties }) {
  return (
    <ParallaxLayer depth={1.6} scrollShift={140} className={cn("absolute @container", className)} style={style}>
      <motion.div
        initial={{ opacity: 0, y: -40, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 1.3, delay: 1, ease: easeOutExpo }}
        className="origin-top"
      >
        <Float distance={-6} rotate={-1.5} duration={8} delay={1.4}>
          <figure
            aria-label={items.join(", ")}
            className="relative aspect-[0.84] w-full rounded-[3px] bg-hero-note px-[13%] pt-[14%] pb-[10%] text-hero-note-ink shadow-[0_28px_50px_-18px_rgba(36,16,47,0.55),0_2px_4px_rgba(36,16,47,0.12)]"
          >
            <span aria-hidden className="absolute -top-[7%] left-1/2 z-10 h-[16%] w-[11%] -translate-x-1/2 rotate-[8deg]">
              <span className="absolute inset-x-[20%] top-0 h-[78%] rounded-[2px] bg-[linear-gradient(90deg,#B98A5E_0%,#E2BC8F_45%,#A8794D_100%)] shadow-[0_3px_6px_rgba(36,16,47,0.35)]" />
              <span className="absolute inset-x-0 bottom-0 h-[30%] rounded-[2px] bg-[linear-gradient(90deg,#9D6E44_0%,#D2A979_50%,#8F6038_100%)]" />
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[3px] bg-[linear-gradient(160deg,rgba(255,255,255,0.55)_0%,transparent_40%,rgba(36,16,47,0.06)_100%)]"
            />
            <ul aria-hidden className="font-hand text-[13cqw] leading-[1.08]">
              {items.map((item, index) => (
                <li key={item} style={{ paddingLeft: `${Math.min(index, 3) * 6}%` }}>
                  {item}
                  {index === items.length - 1 && (
                    <svg viewBox="0 0 24 24" aria-hidden className="ml-[0.2em] inline-block h-[0.8em] w-[0.8em] align-baseline">
                      <motion.path
                        d="M3 13.5 9 19 21 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 2, ease: easeOutExpo }}
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </figure>
        </Float>
      </motion.div>
    </ParallaxLayer>
  );
}

export function HeroShowcase({ className }: { className?: string }) {
  const { pointer, scrollProgress, inView, reducedMotion } = useParallax();
  const detailed = useMediaQuery("(min-width: 1024px)");
  const [loadScene, setLoadScene] = useState(false);

  useEffect(() => {
    // Three.js parses and compiles on the main thread. Wait until the hero
    // entrance has the compositor, then mount so the page does not hitch.
    const start = () => setLoadScene(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      role="presentation"
      className={cn("relative w-full select-none", className)}
      style={{ aspectRatio: SHOWCASE_ASPECT }}
    >
      <SunDisc
        className="top-[7.4%] left-[2.1%] w-[55.9%] [clip-path:inset(-40%_-40%_12%_-40%)]"
        style={{ zIndex: LAYERS.sun }}
      />
      <Plinth className="right-[1%] -bottom-[2%] left-0 h-[15%]" style={{ zIndex: LAYERS.plinth }} />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ inset: `-${SCENE_BLEED}%`, zIndex: LAYERS.scene }}
      >
        <SceneErrorBoundary>
          {loadScene && (
            <HeroScene
              pointerX={pointer.x}
              pointerY={pointer.y}
              scroll={scrollProgress}
              active={inView}
              reducedMotion={reducedMotion}
              detailed={detailed}
            />
          )}
        </SceneErrorBoundary>
      </div>
      {PRODUCTS.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <StoneSlab className="right-[5.5%] bottom-[2.6%] left-[41%] h-[16.5%]" style={{ zIndex: LAYERS.stone }} />
      <StickyNote
        items={heroContent.note}
        className="top-[1.5%] right-[2%] w-[25%]"
        style={{ zIndex: LAYERS.note }}
      />
    </div>
  );
}
