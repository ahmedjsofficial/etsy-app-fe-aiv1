"use client";

import type { ComponentType } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AutomationPreview } from "@/components/landing/toolkit/AutomationPreview";
import { AutopilotPreview } from "@/components/landing/toolkit/AutopilotPreview";
import { ListingPreview } from "@/components/landing/toolkit/ListingPreview";
import { OptimizerPreview } from "@/components/landing/toolkit/OptimizerPreview";
import { PinterestPreview } from "@/components/landing/toolkit/PinterestPreview";
import { StudioPreview } from "@/components/landing/toolkit/StudioPreview";
import { ButtonLink } from "@/components/ui/button-link";
import { toolkitContent, type ToolId } from "@/lib/content/landing";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADING_ID = "toolkit-heading";

const PREVIEWS: Record<ToolId, ComponentType> = {
  listings: ListingPreview,
  optimize: OptimizerPreview,
  create: StudioPreview,
  market: PinterestPreview,
  automate: AutomationPreview,
  autopilot: AutopilotPreview,
};

const CARD_SURFACE: Partial<Record<ToolId, string>> = {
  automate: "bg-[color-mix(in_oklab,var(--highlight),var(--card)_52%)]",
  autopilot: "bg-[color-mix(in_oklab,var(--accent),var(--hero-glow)_38%)]",
};

function ToolCard({ tool }: { tool: (typeof toolkitContent.tools)[number] }) {
  const Preview = PREVIEWS[tool.id];
  const titleId = `${tool.id}-title`;

  return (
    <motion.article
      id={tool.id}
      aria-labelledby={titleId}
      variants={fadeUp}
      className={cn(
        "@container relative scroll-mt-24 overflow-hidden rounded-[1.75rem] bg-secondary/55",
        CARD_SURFACE[tool.id],
      )}
    >
      <div className="grid gap-5 p-6 @md:min-h-[17.5rem] @md:grid-cols-2 @md:items-center @md:gap-4 @md:p-7 lg:min-h-[18.5rem]">
        <div className="relative z-10 flex min-w-0 flex-col items-start justify-center">
          <p className="flex items-center gap-2.5">
            <span className="rounded-md border border-primary/50 bg-primary/10 px-1.5 py-0.5 text-[0.6875rem] font-bold text-primary tabular-nums">
              {tool.index}
            </span>
            <span className="text-[1.0625rem] font-extrabold tracking-[-0.01em] text-foreground">{tool.name}</span>
          </p>
          <h3
            id={titleId}
            className="mt-4 text-[clamp(1.7rem,7.4cqi,2.55rem)] leading-[1.04] font-extrabold tracking-[-0.035em] text-foreground @md:text-[clamp(1.5rem,4.8cqi,2.25rem)]"
          >
            {tool.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed text-muted-foreground">{tool.description}</p>
          <ButtonLink href={tool.cta.href} variant="arrow-link" size="inline" className="mt-5">
            {tool.cta.label}
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div className="min-w-0">
          <Preview />
        </div>
      </div>
    </motion.article>
  );
}

export function Toolkit() {
  return (
    <section id="features" aria-labelledby={HEADING_ID} className="relative bg-background">
      <h2 id={HEADING_ID} className="sr-only">
        {toolkitContent.heading}
      </h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer(0.12, 0.05)}
        className="app-container grid gap-5 pb-5 lg:grid-cols-2 lg:pb-5"
      >
        {toolkitContent.tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </motion.div>
    </section>
  );
}
