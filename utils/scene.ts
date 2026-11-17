/** Canvas overflow beyond the showcase box on every side, in percent of the box. */
export const SCENE_BLEED = 10;

export interface Viewport2D {
  width: number;
  height: number;
}

/**
 * Converts a point expressed in showcase-box percentages (the same coordinate
 * space as `showcase.config.ts`) into Three.js world units on the z=0 plane.
 */
export function boxToWorld(left: number, top: number, viewport: Viewport2D, bleed = SCENE_BLEED) {
  const span = 100 + bleed * 2;
  return [
    ((left + bleed) / span - 0.5) * viewport.width,
    (0.5 - (top + bleed) / span) * viewport.height,
  ] as const;
}
