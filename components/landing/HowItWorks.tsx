"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { howItWorksContent } from "@/lib/content/landing";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADING_ID = "how-it-works-heading";

const STEP_TONE: Record<(typeof howItWorksContent.steps)[number]["tone"], string> = {
  accent: "bg-accent text-accent-foreground",
  highlight: "bg-highlight text-highlight-foreground",
  glow: "bg-[color-mix(in_oklab,var(--card),#9EB0F0_32%)] text-[color-mix(in_oklab,#4F5FA8,var(--foreground)_25%)]",
  primary: "bg-[color-mix(in_oklab,var(--primary),white_72%)] text-primary",
};

export function HowItWorks() {
  const { id, heading, description, steps } = howItWorksContent;

  return (
    <section id={id} aria-labelledby={HEADING_ID} className="relative bg-background">
      <div className="app-container pt-14 pb-16 lg:pt-16 lg:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.08, 0.04)}
          className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10 xl:gap-14"
        >
          <motion.div variants={fadeUp} className="shrink-0 lg:w-[min(100%,17.5rem)] xl:w-[19rem]">
            <h2
              id={HEADING_ID}
              className="font-heading text-[clamp(2.25rem,4.2vw,3.15rem)] leading-[1.05] text-foreground"
            >
              {heading}
            </h2>
            <p className="mt-3 max-w-[18rem] text-[0.9375rem] leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>

          <motion.ol
            variants={staggerContainer(0.07, 0)}
            className="grid min-w-0 flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3 xl:gap-4"
          >
            {steps.map((step, index) => (
              <motion.li key={step.title} variants={fadeUp} className="relative min-w-0">
                <div className="flex gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full text-[0.9375rem] font-extrabold tabular-nums",
                      STEP_TONE[step.tone],
                    )}
                  >
                    {step.index}
                  </span>

                  <div className="min-w-0 pr-5 lg:pr-4">
                    <p className="text-[1.0625rem] font-extrabold tracking-[-0.02em] text-foreground">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[0.875rem] leading-snug text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute top-2.5 -right-1 hidden size-4 text-border lg:block xl:-right-0.5"
                  />
                )}
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
