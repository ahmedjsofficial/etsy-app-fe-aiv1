"use client";

import Link from "next/link";
import { motion, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { LaurelIcon } from "@/components/icons";
import { useParallax } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { heroContent, type HeroHeadlineLine } from "@/lib/content/landing";
import { easeOutExpo, fadeUp, maskUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

function BrushStroke({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 240 28"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("pointer-events-none text-primary", className)}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
    >
      <path
        fill="currentColor"
        d="M3 15.5c12-4.6 34-7.8 62-9.4 33-1.9 70-1.6 104-.4 26 .9 48 2.4 66 3.6 2.6.2 3.9 1.6 3.7 3.4-.2 1.9-1.8 3-4.4 2.9-24-1.4-55-2.6-86-2.8-35-.2-70 .9-98 3.6-17 1.6-30 3.6-42 6.3-3 .7-5.4-.3-6.1-2.3-.6-1.9.6-3.9 1.2-4.9Z"
      />
      <path
        fill="currentColor"
        opacity="0.55"
        d="M22 21.5c24-3.2 58-5.2 96-5.4 30-.1 58 .8 82 2.2 1.8.1 2.5 1 2.4 2-.1 1.1-1.1 1.6-2.8 1.5-23-1.2-52-1.9-82-1.7-36 .2-68 2-92 4.6-2.2.2-3.5-.5-3.6-1.6-.1-.9.6-1.5 0-1.6Z"
      />
    </motion.svg>
  );
}

function splitUnderline(line: HeroHeadlineLine) {
  if (!("underline" in line) || !line.underline) return { before: line.text, word: null };
  const index = line.text.lastIndexOf(line.underline);
  return { before: line.text.slice(0, index), word: line.underline };
}

export function HeroText({ headingId, className }: { headingId: string; className?: string }) {
  const { scrollProgress } = useParallax();
  const y = useTransform(scrollProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      variants={staggerContainer(0.09, 0.15)}
      initial="hidden"
      animate="visible"
      className={cn("relative z-20 flex flex-col items-start", className)}
    >
      <motion.p
        variants={fadeUp}
        className="mb-5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-hero-foreground/90 sm:text-sm"
      >
        {heroContent.eyebrow}
      </motion.p>

      <h1
        id={headingId}
        className="font-heading text-[clamp(3.6rem,10.5vw,5.75rem)] leading-[0.9] tracking-[-0.025em] text-hero-foreground sm:text-[clamp(4.5rem,11vw,7.25rem)] lg:text-[clamp(5rem,7.4vw,8.25rem)]"
      >
        {heroContent.headline.map((line, index) => {
          const { before, word } = splitUnderline(line);
          return (
            <span key={line.text} className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
              <motion.span variants={maskUp} className="block whitespace-nowrap">
                {before}
                {word && (
                  <span className="relative inline-block">
                    {word}
                    <BrushStroke
                      delay={0.9 + index * 0.15}
                      className="absolute -bottom-[0.12em] -left-[4%] h-[0.2em] w-[112%]"
                    />
                  </span>
                )}
              </motion.span>
            </span>
          );
        })}
      </h1>

      <motion.p
        variants={fadeUp}
        className="mt-7 max-w-[32rem] text-base leading-relaxed text-hero-muted sm:text-[1.0625rem]"
      >
        {heroContent.description}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
        <ButtonLink href={heroContent.primaryCta.href} variant="brand" size="pill-lg" className="group min-w-44">
          {heroContent.primaryCta.label}
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
        <Link
          href={heroContent.secondaryCta.href}
          className="group inline-flex items-center gap-3 rounded-full py-1 pr-2 text-[0.9375rem] font-semibold text-hero-foreground outline-none focus-visible:ring-2 focus-visible:ring-hero-foreground/60"
        >
          <span className="relative inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-hero-foreground/80 transition-all duration-300 group-hover:scale-105 group-hover:border-hero-foreground group-hover:bg-hero-foreground/10">
            <span className="absolute inset-0 rounded-full border border-hero-foreground/40 opacity-0 group-hover:animate-ping group-hover:opacity-100 motion-reduce:hidden" />
            <Play className="ml-0.5 size-3.5 fill-current" />
          </span>
          <span className="underline-offset-4 group-hover:underline">{heroContent.secondaryCta.label}</span>
        </Link>
      </motion.div>

      <motion.ul
        variants={fadeUp}
        className="mt-10 grid w-full max-w-[26rem] grid-cols-3 gap-2 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:gap-x-9 sm:gap-y-4"
      >
        {heroContent.badges.map((badge) => (
          <li key={badge.lines.join(" ")} className="flex items-center justify-center gap-1 text-hero-foreground sm:gap-1.5">
            <LaurelIcon className="h-9 w-4 shrink-0 opacity-80 sm:h-11 sm:w-5" />
            <p className="text-center text-[0.6875rem] font-semibold leading-[1.25] tracking-[0.01em] sm:text-[0.8125rem]">
              {badge.lines.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
            <LaurelIcon className="h-9 w-4 shrink-0 -scale-x-100 opacity-80 sm:h-11 sm:w-5" />
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
