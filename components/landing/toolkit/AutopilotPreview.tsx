import { ArrowRight, Check } from "lucide-react";
import { SparkleMarkIcon } from "@/components/icons";
import { FitPreview, PREVIEW_SHADOW } from "@/components/landing/toolkit/shared";
import { toolkitContent } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

export function AutopilotPreview() {
  const { prompt, heading, tasks } = toolkitContent.autopilotPreview;

  return (
    <div aria-hidden className="relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden py-1 @md:min-h-0">
      <div className="absolute top-1/2 left-1/2 size-[88%] max-w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-glow/60" />

      <FitPreview width={280} height={230} maxWidth={300}>
        <div className={cn("flex h-full flex-col rounded-[1.15rem] bg-card p-3", PREVIEW_SHADOW)}>
          <div className="flex items-center gap-2 rounded-xl bg-background px-2.5 py-2 ring-1 ring-border/80">
            <p className="min-w-0 flex-1 truncate text-[0.68rem] font-semibold text-foreground">{prompt}</p>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-foreground text-card">
              <ArrowRight className="size-3" />
            </span>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[0.78rem] font-bold text-foreground">
            <SparkleMarkIcon className="size-3 text-accent-foreground" />
            {heading}
          </p>

          <ul className="mt-2 flex flex-1 flex-col justify-between pb-0.5">
            {tasks.map((task) => (
              <li key={task.label} className="flex items-center gap-2 text-[0.72rem] text-foreground">
                <span
                  className={cn(
                    "flex size-3.5 shrink-0 items-center justify-center rounded-[4px] border",
                    task.done
                      ? "border-accent-foreground bg-accent-foreground text-card"
                      : "border-border bg-card",
                  )}
                >
                  {task.done && <Check className="size-2 stroke-[3]" />}
                </span>
                <span className={cn(!task.done && "text-muted-foreground")}>{task.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </FitPreview>
    </div>
  );
}
