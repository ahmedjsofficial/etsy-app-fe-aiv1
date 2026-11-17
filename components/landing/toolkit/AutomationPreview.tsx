import type { ReactNode } from "react";
import { Check, Zap } from "lucide-react";
import { PinterestIcon, SparkleMarkIcon, StackedPhotosIcon } from "@/components/icons";
import { FitPreview, PREVIEW_SHADOW } from "@/components/landing/toolkit/shared";
import { toolkitContent } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

const ACTION_ICONS: Record<string, ReactNode> = {
  optimize: <SparkleMarkIcon className="size-3.5 shrink-0 text-accent-foreground" />,
  images: <StackedPhotosIcon className="size-3.5 shrink-0 text-primary" />,
  pinterest: <PinterestIcon className="size-3.5 shrink-0 text-[#E60023]" />,
};

function Rail() {
  return (
    <div aria-hidden className="flex h-4 flex-col items-center justify-center gap-0.5">
      <span className="h-1.5 w-px bg-foreground/25" />
      <span className="size-1 rounded-full bg-foreground/35" />
      <span className="h-1.5 w-px bg-foreground/25" />
    </div>
  );
}

export function AutomationPreview() {
  const { trigger, actionsLabel, actions, done } = toolkitContent.workflowPreview;

  return (
    <div aria-hidden className="relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden py-1 @md:min-h-0">
      <span className="pointer-events-none absolute top-1/2 left-1/2 size-[90%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-foreground/14" />

      <FitPreview width={260} height={248} maxWidth={280}>
        <div className="relative flex h-full flex-col justify-center px-0.5">
          <div
            className={cn(
              "flex items-start gap-2 rounded-[0.95rem] bg-[color-mix(in_oklab,var(--hero-glow),var(--accent)_22%)] px-2.5 py-2",
              PREVIEW_SHADOW,
            )}
          >
            <Zap className="mt-0.5 size-3.5 shrink-0 text-accent-foreground" strokeWidth={2.25} />
            <div className="min-w-0">
              <p className="text-[0.78rem] leading-none font-bold text-accent-foreground">{trigger.label}</p>
              <p className="mt-1 text-[0.68rem] leading-tight text-accent-foreground/70">{trigger.detail}</p>
            </div>
          </div>

          <Rail />

          <div
            className={cn(
              "rounded-[1.05rem] bg-[color-mix(in_oklab,var(--card),var(--foreground)_4%)] p-2 ring-1 ring-foreground/6",
              PREVIEW_SHADOW,
            )}
          >
            <p className="mb-1.5 px-1 text-[0.68rem] leading-none font-semibold text-muted-foreground">
              {actionsLabel}
            </p>
            <ul className="flex flex-col gap-1">
              {actions.map((action) => (
                <li
                  key={action.id}
                  className="flex items-center gap-2 rounded-full bg-card px-2.5 py-[0.45rem] text-[0.7rem] leading-none font-semibold text-foreground shadow-[0_6px_12px_-8px_rgba(36,16,47,0.4)]"
                >
                  {ACTION_ICONS[action.id]}
                  <span>{action.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <Rail />

          <div className="flex justify-center">
            <div className="flex h-8 items-center gap-1.5 rounded-full bg-highlight px-3.5 text-[0.8125rem] font-extrabold text-highlight-foreground shadow-[0_10px_18px_-10px_rgba(36,16,47,0.35)]">
              {done}
              <Check className="size-3.5 stroke-[2.75]" />
            </div>
          </div>
        </div>
      </FitPreview>
    </div>
  );
}
