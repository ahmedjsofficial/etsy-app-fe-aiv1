"use client";

import { createContext, useContext, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePointerParallax, type PointerParallax } from "@/hooks/usePointerParallax";
import { cn } from "@/lib/utils";

interface ParallaxContextValue {
  pointer: PointerParallax;
  /** 0 when the stage top meets the viewport top, 1 when its bottom leaves it. */
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
  inView: boolean;
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

const SCROLL_EFFECTS_QUERY = "(min-width: 1024px)";
const POINTER_RANGE_X = 22;
const POINTER_RANGE_Y = 14;

export function useParallax() {
  const ctx = useContext(ParallaxContext);
  if (!ctx) throw new Error("useParallax must be used inside <ParallaxStage>");
  return ctx;
}

interface ParallaxStageProps {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

export function ParallaxStage({ children, className, ...rest }: ParallaxStageProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  // Stacked (small-screen) layouts are taller than the viewport, so scroll-linked
  // drift would fade/shift content the user is still reading.
  const sideBySide = useMediaQuery(SCROLL_EFFECTS_QUERY);
  const pointer = usePointerParallax(ref, finePointer && !reducedMotion);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const staticProgress = useMotionValue(0);
  const inView = useInView(ref);
  const scrollEffects = sideBySide && !reducedMotion;

  const value = useMemo(
    () => ({
      pointer,
      scrollProgress: scrollEffects ? scrollYProgress : staticProgress,
      reducedMotion,
      inView,
    }),
    [pointer, scrollEffects, staticProgress, scrollYProgress, reducedMotion, inView],
  );

  return (
    <ParallaxContext.Provider value={value}>
      <section ref={ref} className={cn("relative", className)} {...rest}>
        {children}
      </section>
    </ParallaxContext.Provider>
  );
}

interface ParallaxLayerProps extends HTMLMotionProps<"div"> {
  /** Pointer travel multiplier. Higher values feel closer to the viewer. */
  depth?: number;
  /** Vertical drift (px) applied across the stage's scroll progress. */
  scrollShift?: number;
}

export function ParallaxLayer({ depth = 1, scrollShift = 0, style, ...props }: ParallaxLayerProps) {
  const { pointer, scrollProgress, reducedMotion } = useParallax();
  const strength = reducedMotion ? 0 : depth;

  const x = useTransform(pointer.x, (v) => v * strength * POINTER_RANGE_X);
  const y = useTransform(
    [pointer.y, scrollProgress],
    ([py, progress]: number[]) => py * strength * POINTER_RANGE_Y - progress * scrollShift,
  );

  return <motion.div style={{ ...style, x, y }} {...props} />;
}

interface FloatProps {
  children: ReactNode;
  className?: string;
  /** Peak vertical offset in px (negative floats upward). */
  distance?: number;
  /** Peak rotation in degrees. */
  rotate?: number;
  duration?: number;
  delay?: number;
}

/**
 * Compositor-only idle float driven by the `float` keyframes in globals.css.
 * Animates `translate`/`rotate` so it composes with Motion's `transform`.
 */
export function Float({ children, className, distance = -10, rotate = 0, duration = 7, delay = 0 }: FloatProps) {
  const style = {
    "--float-distance": `${distance}px`,
    "--float-rotate": `${rotate}deg`,
    "--float-duration": `${duration}s`,
    "--float-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div className={cn("animate-float will-change-transform motion-reduce:animate-none", className)} style={style}>
      {children}
    </div>
  );
}
