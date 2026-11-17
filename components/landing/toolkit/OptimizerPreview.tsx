import { Sparkle } from "lucide-react";
import { CurvedArrowIcon } from "@/components/icons";
import { ProductPhoto } from "@/components/landing/ProductPhoto";
import { PREVIEW_SHADOW } from "@/components/landing/toolkit/shared";
import { productAssets } from "@/lib/assets";
import { toolkitContent } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

export function OptimizerPreview() {
  const { before, after } = toolkitContent.optimizerPreview;

  return (
    <div aria-hidden className="relative isolate flex min-h-[16.5rem] items-center justify-center py-5 @md:min-h-0 @md:justify-end @md:py-2 @md:pr-1">
      <div className="absolute -top-[38%] -right-[16%] size-[88%] rounded-full bg-highlight" />

      <div className="relative z-10 flex w-full max-w-[22rem] items-end justify-center gap-[6%] @md:max-w-none">
        <figure className={cn("relative aspect-[4/5] w-[44%] overflow-hidden rounded-2xl", PREVIEW_SHADOW)}>
          <ProductPhoto
            src={productAssets.mug}
            tone="cool"
            sizes="(min-width: 640px) 200px, 42vw"
            imageClassName="inset-x-[4%] bottom-[14%] w-[92%] brightness-[0.96] saturate-[0.65]"
          />
          <figcaption className="absolute inset-x-0 bottom-[8%] flex justify-center">
            <span className="rounded-full bg-foreground/55 px-3.5 py-1 text-xs font-semibold text-background backdrop-blur-sm">
              {before}
            </span>
          </figcaption>
        </figure>

        <CurvedArrowIcon className="absolute bottom-[26%] left-1/2 z-20 w-[14%] max-w-11 -translate-x-[30%] -rotate-[16deg] text-card drop-shadow-[0_2px_6px_rgba(36,16,47,0.35)]" />

        <figure className={cn("relative aspect-[4/5] w-[50%] -translate-y-1 overflow-hidden rounded-2xl ring-4 ring-card", PREVIEW_SHADOW)}>
          <ProductPhoto
            src={productAssets.mug}
            tone="warm"
            sizes="(min-width: 640px) 220px, 46vw"
            imageClassName="inset-x-[4%] bottom-[14%] w-[92%] saturate-[1.18]"
          />
          <figcaption className="absolute inset-x-0 bottom-[8%] flex justify-center">
            <span className="flex items-center gap-1.5 rounded-full bg-highlight px-3.5 py-1 text-xs font-bold text-highlight-foreground shadow-sm">
              <Sparkle className="size-3.5 fill-current" />
              {after}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
