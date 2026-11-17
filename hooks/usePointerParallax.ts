"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue, type SpringOptions } from "motion/react";
import { clamp } from "@/utils/math";

export interface PointerParallax {
  /** Normalized pointer position in [-1, 1], spring-smoothed. */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const DEFAULT_SPRING: SpringOptions = { stiffness: 60, damping: 18, mass: 0.8 };

export function usePointerParallax(
  target: RefObject<HTMLElement | null>,
  enabled: boolean,
  spring: SpringOptions = DEFAULT_SPRING,
): PointerParallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  useEffect(() => {
    const el = target.current;
    if (!el || !enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let rect = el.getBoundingClientRect();
    const updateRect = () => (rect = el.getBoundingClientRect());

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      rawX.set(clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1));
      rawY.set(clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1));
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointerenter", updateRect);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", updateRect);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [target, enabled, rawX, rawY]);

  return { x, y };
}
