"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { pricingContent } from "@/lib/content/landing";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADING_ID = "pricing-heading";

type Billing = "monthly" | "annual";

function formatPrice(amount: number) {
  return amount === 0 ? "$0" : `$${amount}`;
}

function ComparisonValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="mx-auto size-4 text-[color-mix(in_oklab,#2F9E6F,var(--foreground)_12%)]" strokeWidth={2.75} />;
  }
  if (value === false) {
    return <span className="text-muted-foreground/55">—</span>;
  }
  return <span className="text-[0.8125rem] font-semibold text-foreground">{value}</span>;
}

export function Pricing() {
  const { id, badge, title, description, billing, plans, comparison } = pricingContent;
  const [cycle, setCycle] = useState<Billing>("monthly");

  return (
    <section id={id} aria-labelledby={HEADING_ID} className="relative bg-background">
      <div className="app-container pt-6 pb-16 lg:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.1, 0.04)}
          className="flex w-full flex-col items-center gap-10"
        >
          <motion.div variants={fadeUp} className="flex w-full max-w-2xl flex-col items-center text-center">
            <span className="inline-flex rounded-md bg-primary/12 px-2 py-0.5 text-[0.75rem] font-bold text-primary">
              {badge}
            </span>
            <h2
              id={HEADING_ID}
              className="mt-4 text-[clamp(2rem,4.8vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-foreground"
            >
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-muted-foreground">{description}</p>

            <div
              role="group"
              aria-label="Billing cycle"
              className="mt-6 inline-flex items-center rounded-full bg-card p-1 shadow-[0_8px_24px_-16px_rgba(36,16,47,0.45)] ring-1 ring-border/70"
            >
              <button
                type="button"
                onClick={() => setCycle("monthly")}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.8125rem] font-bold transition-colors",
                  cycle === "monthly"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {billing.monthly}
              </button>
              <button
                type="button"
                onClick={() => setCycle("annual")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-bold transition-colors",
                  cycle === "annual"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {billing.annual}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.65rem] font-extrabold",
                    cycle === "annual"
                      ? "bg-highlight text-highlight-foreground"
                      : "bg-highlight text-highlight-foreground",
                  )}
                >
                  {billing.save}
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0)}
            className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
          >
            {plans.map((plan) => {
              const amount = plan.price[cycle];
              return (
                <motion.article
                  key={plan.id}
                  variants={fadeUp}
                  className={cn(
                    "relative flex h-full flex-col rounded-[1.75rem] p-6 sm:p-7",
                    plan.featured
                      ? "bg-[color-mix(in_oklab,var(--primary),white_88%)] shadow-[0_20px_40px_-24px_rgba(255,104,30,0.55)] ring-2 ring-primary/55"
                      : "bg-card ring-1 ring-border/80",
                  )}
                >
                  {plan.featured && plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[0.6875rem] font-bold text-primary-foreground">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-[0.875rem] text-muted-foreground">{plan.blurb}</p>

                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-[clamp(2.4rem,5vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-foreground">
                      {formatPrice(amount)}
                    </span>
                    <span className="text-[0.875rem] text-muted-foreground">/month</span>
                  </p>
                  {cycle === "annual" && plan.price.monthly > 0 && (
                    <p className="mt-1.5 text-[0.75rem] text-muted-foreground">
                      Billed annually · was ${plan.price.monthly}/mo
                    </p>
                  )}

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[0.9rem] text-foreground">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-[color-mix(in_oklab,#2F9E6F,var(--foreground)_12%)]"
                          strokeWidth={2.75}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <ButtonLink
                      href={plan.cta.href}
                      variant={plan.cta.variant === "brand" ? "brand" : "outline"}
                      size="pill"
                      className="w-full"
                    >
                      {plan.cta.label}
                    </ButtonLink>
                  </div>
                </motion.article>
              );
            })}

            <motion.aside
              variants={fadeUp}
              className="flex h-full flex-col rounded-[1.75rem] bg-card p-6 ring-1 ring-border/80 sm:p-7 md:col-span-2 lg:col-span-1"
            >
              <h3 className="text-[1.05rem] font-extrabold tracking-[-0.015em] text-foreground">
                {comparison.heading}
              </h3>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[16rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border/70 text-[0.7rem] font-bold tracking-wide text-muted-foreground uppercase">
                      <th className="pb-2.5 pr-3 font-bold">Feature</th>
                      <th className="pb-2.5 px-2 text-center font-bold">Free</th>
                      <th className="pb-2.5 pl-2 text-center font-bold">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row) => (
                      <tr key={row.label} className="border-b border-border/50 last:border-b-0">
                        <th className="py-3 pr-3 text-[0.8rem] font-medium text-foreground">
                          {row.label}
                        </th>
                        <td className="px-2 py-3 text-center">
                          <ComparisonValue value={row.free} />
                        </td>
                        <td className="py-3 pl-2 text-center">
                          <ComparisonValue value={row.growth} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto pt-5">
                <ButtonLink href={comparison.cta.href} variant="arrow-link" size="inline">
                  {comparison.cta.label}
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </motion.aside>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
