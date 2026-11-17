import Image from "next/image";
import { PinterestIcon } from "@/components/icons";
import { ProductPhoto } from "@/components/landing/ProductPhoto";
import { PREVIEW_SHADOW } from "@/components/landing/toolkit/shared";
import { productAssets, sceneAssets } from "@/lib/assets";
import { toolkitContent } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

function ScenePin({ position, className }: { position: string; className?: string }) {
  return (
    <figure className={cn("absolute overflow-hidden rounded-xl bg-card p-1", PREVIEW_SHADOW, className)}>
      <span className="relative block size-full overflow-hidden rounded-lg">
        <Image
          src={sceneAssets.studioSetup}
          alt=""
          fill
          sizes="120px"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </span>
    </figure>
  );
}

export function PinterestPreview() {
  const { title } = toolkitContent.pinPreview;

  return (
    <div aria-hidden className="relative isolate flex min-h-[16.5rem] items-center justify-center @md:min-h-0">
      <div className="absolute -right-[12%] -bottom-[52%] -z-10 h-[95%] w-[80%] rounded-[48%] bg-hero-glow/55" />

      <div className="relative h-[15rem] w-full max-w-[22.5rem]">
        <ScenePin position="8% 72%" className="top-[14%] left-0 z-0 aspect-[3/4] w-[32%] -rotate-[12deg]" />
        <ScenePin position="14% 58%" className="top-[8%] right-[16%] z-0 aspect-[3/4] w-[31%] rotate-[7deg]" />
        <ScenePin position="72% 82%" className="top-[20%] -right-[2%] z-[1] aspect-[3/4] w-[29%] rotate-[15deg]" />

        <figure
          className={cn(
            "absolute top-1/2 left-[47%] z-10 aspect-[3/4] w-[50%] -translate-x-1/2 -translate-y-1/2 -rotate-2 rounded-xl bg-card p-1.5",
            PREVIEW_SHADOW,
          )}
        >
          <div className="relative size-full overflow-hidden rounded-lg">
            <ProductPhoto
              src={productAssets.mug}
              tone="blush"
              sizes="180px"
              imageClassName="inset-x-[12%] bottom-[8%] w-[76%]"
            />
            <p className="absolute inset-x-[8%] top-[10%] text-center font-hand text-[clamp(1.15rem,5.2cqi,1.55rem)] leading-[1.05] text-foreground">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </figure>

        <span className="absolute top-[2%] left-[18%] z-20 flex size-[19%] items-center justify-center rounded-full bg-card p-[3px] shadow-[0_8px_18px_-8px_rgba(36,16,47,0.45)]">
          <PinterestIcon className="size-full text-[#E60023]" />
        </span>
      </div>
    </div>
  );
}
