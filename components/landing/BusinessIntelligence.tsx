"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { productAssets } from "@/lib/assets";
import { insightsContent } from "@/lib/content/landing";
import { fadeUp } from "@/lib/motion";

const TITLE_ID = "insights-title";

/** Three soft peaks, rising to a high finish on the right. */
const LINE_PATH =
  "M0 118 C36 116 58 108 86 92 C118 72 138 78 168 64 C198 50 218 58 248 44 C278 30 298 36 328 24 C350 16 368 20 400 28";
const AREA_PATH = `${LINE_PATH} L400 148 L0 148 Z`;

function InsightsChart() {
  return (
    <div aria-hidden className="relative h-[7.5rem] w-full sm:h-[8.75rem] lg:h-[9.5rem]">
      <svg viewBox="0 0 400 148" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="insights-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--hero-to)" stopOpacity="0.7" />
            <stop offset="45%" stopColor="var(--hero-glow)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--hero-from)" stopOpacity="0" />
          </linearGradient>
          <filter id="insights-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={AREA_PATH} fill="url(#insights-area)" />
        <path
          d={LINE_PATH}
          fill="none"
          stroke="var(--hero-to)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="400" cy="28" r="11" fill="var(--highlight)" filter="url(#insights-glow)" opacity="0.5" />
        <circle cx="400" cy="28" r="5" fill="var(--highlight)" />
      </svg>
    </div>
  );
}

export function BusinessIntelligence() {
  const { id, index, name, title, description, cta, stats } = insightsContent;
  const { revenue, orders, conversion } = stats;

  return (
    <section id={id} aria-labelledby={TITLE_ID} className="relative bg-background">
      <div className="app-container">
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(105deg,var(--hero-from)_0%,var(--hero-via)_55%,color-mix(in_oklab,var(--hero-from),var(--hero-via)_70%)_100%)] px-6 py-8 text-hero-foreground sm:rounded-[2.5rem] sm:px-8 sm:py-9 lg:min-h-[17.5rem] lg:px-10 lg:py-9"
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(16rem,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-10">
            <div className="flex flex-col items-start">
              <p className="flex items-center gap-2.5">
                <span className="rounded-md bg-primary px-1.5 py-0.5 text-[0.6875rem] font-bold text-primary-foreground tabular-nums">
                  {index}
                </span>
                <span className="text-[1.0625rem] font-extrabold tracking-[-0.01em] text-hero-foreground">
                  {name}
                </span>
              </p>

              <h2
                id={TITLE_ID}
                className="mt-4 text-[clamp(1.85rem,4.2vw,2.65rem)] leading-[1.08] font-extrabold tracking-[-0.035em] text-hero-foreground"
              >
                {title.join(" ")}
              </h2>

              <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed text-hero-muted">
                {description}
              </p>

              <ButtonLink
                href={cta.href}
                variant="arrow-link"
                size="inline"
                className="mt-5 text-hero-foreground hover:text-hero-foreground"
              >
                {cta.label}
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>

            <div className="relative min-w-0">
              <dl className="relative z-10 flex flex-wrap items-end gap-x-6 gap-y-5 sm:gap-x-0">
                <div className="min-w-[10rem] sm:pr-7">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <dt className="sr-only">{revenue.label}</dt>
                    <dd className="text-[clamp(2.6rem,5.5vw,3.5rem)] leading-none font-extrabold tracking-[-0.045em] text-hero-foreground">
                      {revenue.value}
                    </dd>
                    <span className="rounded-full bg-highlight px-2.5 py-1 text-[0.72rem] font-bold text-highlight-foreground">
                      {revenue.change}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.8125rem] text-hero-muted">{revenue.label}</p>
                </div>

                <div className="flex items-end gap-5 sm:border-l sm:border-hero-border sm:pl-7">
                  <div>
                    <dt className="sr-only">{orders.label}</dt>
                    <dd className="text-[clamp(1.7rem,3.2vw,2.15rem)] leading-none font-extrabold tracking-[-0.03em] text-hero-foreground">
                      {orders.value}
                    </dd>
                    <p className="mt-1.5 text-[0.8125rem] text-hero-muted">{orders.label}</p>
                    <p className="mt-1 text-[0.75rem] font-semibold text-hero-muted">{orders.change}</p>
                  </div>

                  <span aria-hidden className="mb-1 hidden h-12 w-px bg-hero-border sm:block" />

                  <div>
                    <dt className="sr-only">{conversion.label}</dt>
                    <dd className="text-[clamp(1.7rem,3.2vw,2.15rem)] leading-none font-extrabold tracking-[-0.03em] text-hero-foreground">
                      {conversion.value}
                    </dd>
                    <p className="mt-1.5 text-[0.8125rem] text-hero-muted">{conversion.label}</p>
                    <p className="mt-1 text-[0.75rem] font-semibold text-hero-muted">{conversion.change}</p>
                  </div>
                </div>
              </dl>

              <div className="relative mt-5 -mr-6 sm:-mr-8 lg:-mr-10">
                <InsightsChart />
              </div>
            </div>
          </div>

          <figure
            aria-hidden
            className="pointer-events-none absolute top-1/2 -right-[4.5rem] size-[13rem] -translate-y-1/2 overflow-hidden rounded-full bg-hero-stone sm:-right-[5.5rem] sm:size-[15rem] lg:-right-[6rem] lg:size-[17rem]"
          >
            <Image
              src={productAssets.vase}
              alt=""
              fill
              sizes="280px"
              className="object-cover object-[42%_38%] scale-110"
            />
          </figure>
        </motion.article>
      </div>
    </section>
  );
}
