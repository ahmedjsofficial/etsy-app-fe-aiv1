import type { Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const staggerContainer = (stagger = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

export const maskUp: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: easeOutExpo } },
};

export const popIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, delay, ease: easeOutExpo },
  },
});
