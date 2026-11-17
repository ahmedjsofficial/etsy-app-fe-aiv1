import Image from "next/image";
import { Play } from "lucide-react";
import { ProductPhoto } from "@/components/landing/ProductPhoto";
import { PREVIEW_SHADOW } from "@/components/landing/toolkit/shared";
import { productAssets, sceneAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function StudioPreview() {
  return (
    <div aria-hidden className="relative grid min-h-[16rem] grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] grid-rows-2 gap-2 py-1 @md:min-h-0">
      <figure className={cn("relative row-span-2 overflow-hidden rounded-2xl", PREVIEW_SHADOW)}>
        <div className="absolute inset-0 bg-[linear-gradient(165deg,color-mix(in_oklab,var(--secondary),white_22%)_0%,var(--secondary)_100%)]" />
        <Image
          src={productAssets.poppies}
          alt=""
          sizes="120px"
          className="absolute -top-[10%] -right-[16%] w-[58%] rotate-[16deg]"
        />
        <span className="absolute -inset-x-[28%] bottom-[-20%] h-[52%] rounded-[50%] bg-[color-mix(in_oklab,var(--card),var(--secondary)_40%)]" />
        <span className="absolute -left-[16%] bottom-[-14%] h-[40%] w-[78%] -rotate-[14deg] rounded-[46%] bg-[color-mix(in_oklab,var(--card),var(--secondary)_18%)]" />
        <Image
          src={productAssets.mug}
          alt=""
          sizes="(min-width: 1024px) 240px, 58vw"
          className="absolute inset-x-[6%] bottom-[16%] w-[88%] object-contain"
        />
      </figure>

      <figure className={cn("relative overflow-hidden rounded-xl", PREVIEW_SHADOW)}>
        <ProductPhoto
          src={productAssets.mug}
          tone="lavender"
          sizes="(min-width: 1024px) 180px, 42vw"
          imageClassName="inset-x-[10%] bottom-[8%] w-[80%]"
        />
        <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-28deg,transparent_0_13px,color-mix(in_oklab,var(--hero-via),transparent_78%)_13px_19px)]" />
      </figure>

      <figure className={cn("relative overflow-hidden rounded-xl", PREVIEW_SHADOW)}>
        <Image
          src={sceneAssets.studioSetup}
          alt=""
          sizes="(min-width: 1024px) 180px, 42vw"
          className="absolute inset-0 size-full object-cover object-[12%_78%]"
        />
        <span className="absolute inset-0 m-auto flex size-9 items-center justify-center rounded-full bg-foreground/70 text-background backdrop-blur-sm">
          <Play className="ml-0.5 size-3.5 fill-current" />
        </span>
      </figure>
    </div>
  );
}
