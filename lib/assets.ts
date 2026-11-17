import type { StaticImageData } from "next/image";
import bracelet from "@/public/assets/Golden Gemstone Charm Cuff Bracelet-15.png";
import candle from "@/public/assets/Lit Ivory Wavy-Top Pillar Candle-14.png";
import mug from "@/public/assets/Speckled Ceramic Mug with Sandy Base-10.png";
import poppies from "@/public/assets/Vivid Orange-Red Poppy Bouquet-13.png";
import tote from "@/public/assets/Cream Canvas Tote Handbag Render-1.png";
import vase from "@/public/assets/Speckled Cream and Terracotta Wave Vase-12.png";
import studioSetup from "@/public/assets/Warm Studio Camera and Shipping Boxes.png";

export const productAssets = {
  bracelet,
  candle,
  mug,
  poppies,
  tote,
  vase,
} satisfies Record<string, StaticImageData>;

export type ProductAssetKey = keyof typeof productAssets;

/** Full-bleed lifestyle scenes (opaque backgrounds, use with `object-cover`). */
export const sceneAssets = {
  studioSetup,
} satisfies Record<string, StaticImageData>;
