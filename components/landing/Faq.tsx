"use client";

import { Accordion } from "@base-ui/react/accordion";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { ScribbleUnderlineIcon } from "@/components/icons";
import { faqContent } from "@/lib/content/landing";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADING_ID = "faq-heading";

const LEFT = faqContent.items.slice(0, 3);
const RIGHT = faqContent.items.slice(3);

function FaqItem({
  item,
}: {
  item: (typeof faqContent.items)[number];
}) {
  return (
    <Accordion.Item
      value={item.id}
      className="rounded-2xl bg-card shadow-[0_10px_28px_-20px_rgba(36,16,47,0.45)] ring-1 ring-border/80"
    >
      <Accordion.Header>
        <Accordion.Trigger
          className={cn(
            "group flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5",
            "text-[0.9375rem] leading-snug font-semibold text-foreground",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
          )}
        >
          <span className="min-w-0 flex-1">{item.question}</span>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition-colors group-hover:text-foreground">
            <Plus className="size-3.5 group-data-[panel-open]:hidden" strokeWidth={2.5} />
            <Minus className="hidden size-3.5 group-data-[panel-open]:block" strokeWidth={2.5} />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-[ending-style]:h-0 data-[starting-style]:h-0">
        <p className="px-4 pt-0 pb-4 text-[0.875rem] leading-relaxed text-muted-foreground sm:px-5">
          {item.answer}
        </p>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export function Faq() {
  const { id, heading } = faqContent;

  return (
    <section id={id} aria-labelledby={HEADING_ID} className="relative bg-background">
      <div className="app-container pt-10 pb-20 lg:pt-14 lg:pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.1, 0.05)}
          className="relative grid gap-10 lg:grid-cols-[minmax(13rem,0.72fr)_minmax(0,1.4fr)] lg:items-start lg:gap-12"
        >
          <motion.div variants={fadeUp} className="relative z-10 max-w-[18rem]">
            <h2
              id={HEADING_ID}
              className="font-heading text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-foreground"
            >
              <span className="block">{heading.line1}</span>
              <span className="block">
                <span className="relative inline-block">
                  {heading.line2Before}
                  <ScribbleUnderlineIcon className="absolute -bottom-[0.08em] left-0 h-[0.28em] w-full text-primary" />
                </span>
                {heading.line2After}
              </span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="relative z-10 min-w-0">
            <Accordion.Root className="grid gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
              <div className="flex flex-col gap-3">
                {LEFT.map((item) => (
                  <FaqItem key={item.id} item={item} />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {RIGHT.map((item) => (
                  <FaqItem key={item.id} item={item} />
                ))}
              </div>
            </Accordion.Root>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
