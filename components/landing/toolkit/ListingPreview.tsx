import { Sparkle, Sparkles, X } from "lucide-react";
import { ProductPhoto } from "@/components/landing/ProductPhoto";
import { PREVIEW_SHADOW, PreviewField } from "@/components/landing/toolkit/shared";
import { productAssets } from "@/lib/assets";
import { toolkitContent } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

export function ListingPreview() {
  const { heading, title, tags, description, action } = toolkitContent.listingPreview;

  return (
    <div aria-hidden className="relative isolate flex min-h-[16.5rem] items-center justify-center py-4 @md:min-h-0 @md:justify-start @md:py-0 @md:pr-2">
      <div className="absolute -top-[22%] -right-[28%] -bottom-[22%] w-[92%] rounded-full bg-[linear-gradient(155deg,var(--primary)_0%,color-mix(in_oklab,var(--primary),var(--foreground)_14%)_100%)]" />

      <div className={cn("relative z-10 w-[min(100%,19.5rem)] rounded-2xl bg-card p-3.5 @md:ml-0 @md:w-[94%] sm:p-4", PREVIEW_SHADOW)}>
        <p className="flex items-center gap-2 text-[0.9375rem] font-bold text-foreground">
          <Sparkle className="size-4 fill-current text-accent-foreground" />
          {heading}
        </p>

        <div className="mt-3 grid grid-cols-[minmax(0,40%)_minmax(0,1fr)] gap-3">
          <ProductPhoto
            src={productAssets.mug}
            tone="cream"
            sizes="140px"
            className="aspect-[4/5] size-auto self-start overflow-hidden rounded-lg"
            imageClassName="inset-x-[6%] bottom-[12%] w-[88%]"
          />

          <div className="flex min-w-0 flex-col gap-2">
            <PreviewField label={title.label}>
              <p className="truncate rounded-md border border-border bg-background/60 px-2 py-1.5 text-[0.6875rem] text-foreground">
                {title.value}
              </p>
            </PreviewField>
            <PreviewField label={tags.label}>
              <ul className="flex flex-wrap gap-1">
                {tags.values.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center gap-0.5 rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-[0.6rem] text-foreground"
                  >
                    {tag}
                    <X className="size-2.5 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            </PreviewField>
            <PreviewField label={description.label}>
              <p className="truncate rounded-md border border-border bg-background/60 px-2 py-1.5 text-[0.6875rem] text-muted-foreground">
                {description.value}
              </p>
            </PreviewField>
            <span className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-2 py-2 text-[0.6875rem] font-semibold whitespace-nowrap text-background">
              {action}
              <Sparkles className="size-3.5 text-highlight" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
