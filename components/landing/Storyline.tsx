"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BurstIcon, CurvedArrowIcon, HandArrowIcon, PinterestIcon } from "@/components/icons";
import { ProductPhoto } from "@/components/landing/ProductPhoto";
import { productAssets } from "@/lib/assets";
import { storylineContent } from "@/lib/content/landing";
import { easeOutExpo, fadeUp, staggerContainer } from "@/lib/motion";

const HEADING_ID = "storyline-heading";

const STEPS = [
  { ...storylineContent.steps[0], rotate: -7, face: "product" },
  { ...storylineContent.steps[1], rotate: 2.8, face: "listing" },
  { ...storylineContent.steps[2], rotate: -4.5, face: "content" },
  { ...storylineContent.steps[3], rotate: 3.2, face: "marketing" },
  { ...storylineContent.steps[4], rotate: 6.5, face: "growth" },
] as const;

const polaroid = {
  hidden: (rotate: number) => ({ opacity: 0, y: 32, rotate: rotate * 2.2, scale: 0.94 }),
  visible: (rotate: number) => ({
    opacity: 1,
    y: 0,
    rotate,
    scale: 1,
    transition: { duration: 0.95, ease: easeOutExpo },
  }),
};

function MugPhoto({ className }: { className?: string }) {
  return <ProductPhoto src={productAssets.mug} sizes="(min-width: 1024px) 11vw, 148px" className={className} />;
}

function ListingFace() {
  return (
    <div className="flex size-full flex-col justify-center gap-[11%] bg-card px-[14%]">
      <span className="w-fit rounded-[0.28rem] bg-primary px-[0.5em] pt-[0.04em] pb-[0.1em] font-heading text-[clamp(0.8rem,1.15vw,1.15rem)] leading-none text-primary-foreground">
        Etsy
      </span>
      <span className="h-[6%] w-[90%] rounded-full bg-muted-foreground/30" />
      <span className="h-[6%] w-[74%] rounded-full bg-muted-foreground/30" />
      <span className="h-[6%] w-[82%] rounded-full bg-muted-foreground/30" />
    </div>
  );
}

function ContentFace() {
  return (
    <div className="relative size-full">
      <MugPhoto className="w-[66%]" />
      <span className="absolute top-[6%] right-[4%] flex h-[88%] w-[38%] rotate-[5deg] flex-col gap-[5%] rounded-[4px] bg-card p-[4%] shadow-[0_8px_16px_-8px_rgba(36,16,47,0.5)]">
        <span className="relative flex-1 overflow-hidden rounded-[2px] bg-secondary">
          <Image src={productAssets.poppies} alt="" sizes="64px" className="absolute inset-0 size-full object-cover" />
        </span>
        <span className="relative flex-1 overflow-hidden rounded-[2px] bg-secondary">
          <Image src={productAssets.candle} alt="" sizes="64px" className="absolute inset-0 size-full object-contain p-[8%]" />
        </span>
      </span>
    </div>
  );
}

function MarketingFace() {
  return (
    <div className="relative size-full">
      <MugPhoto />
      <PinterestIcon className="absolute top-[7%] left-[7%] size-[30%] text-[#E60023] drop-shadow-sm" />
    </div>
  );
}

function GrowthFace() {
  return (
    <div className="flex size-full items-end justify-center gap-[8%] bg-[linear-gradient(165deg,color-mix(in_oklab,var(--primary),white_86%)_0%,color-mix(in_oklab,var(--primary),white_72%)_100%)] px-[15%] pt-[16%] pb-[12%]">
      {[32, 50, 70, 94].map((height) => (
        <span key={height} className="w-[17%] rounded-t-[3px] bg-primary" style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

const FACES = {
  product: MugPhoto,
  listing: ListingFace,
  content: ContentFace,
  marketing: MarketingFace,
  growth: GrowthFace,
} as const;

function Polaroid({
  caption,
  rotate,
  accent,
  children,
}: {
  caption: string;
  rotate: number;
  accent?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.figure
      custom={rotate}
      variants={polaroid}
      className="relative w-[9.25rem] shrink-0 rounded-[12px] bg-card p-[0.4rem] pb-[0.35rem] shadow-[0_16px_28px_-14px_rgba(36,16,47,0.42),0_2px_6px_rgba(36,16,47,0.08)] sm:w-[9.75rem] lg:w-[9.25rem] xl:w-[9.75rem]"
    >
      <div aria-hidden className="relative aspect-square overflow-hidden rounded-[6px] bg-secondary">
        {children}
      </div>
      <figcaption className="pt-[0.45rem] pb-[0.15rem] text-center font-hand text-[1.2rem] leading-none text-foreground lg:text-[1.3rem]">
        {caption}
      </figcaption>
      {accent}
    </motion.figure>
  );
}

export function Storyline() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="story" aria-labelledby={HEADING_ID} className="relative z-20 -mt-4 overflow-x-clip bg-background sm:-mt-6 lg:-mt-10">
      <div className="app-container flex flex-col gap-5 pt-6 pb-6 lg:flex-row lg:items-center lg:gap-8 lg:pt-4 lg:pb-8 xl:gap-10">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={staggerContainer(0.08, 0.05)}
          className="shrink-0"
        >
          <motion.p variants={fadeUp} className="text-[0.7rem] font-extrabold tracking-[0.12em] text-foreground uppercase">
            {storylineContent.eyebrow}
          </motion.p>
          <h2 id={HEADING_ID} className="text-foreground">
            <motion.span
              variants={fadeUp}
              className="mt-1 block font-display text-[clamp(2.75rem,5.1vw,4.5rem)] leading-[0.92] tracking-[-0.015em] whitespace-nowrap uppercase"
            >
              {storylineContent.title}
            </motion.span>
            <motion.span
              variants={fadeUp}
              className="mt-1 block font-heading text-[clamp(1.45rem,2.5vw,2.15rem)] leading-[1.15] whitespace-nowrap italic"
            >
              {storylineContent.subtitle}
            </motion.span>
          </h2>
          <motion.div variants={fadeUp}>
            <HandArrowIcon className="mt-2 w-[clamp(9.5rem,14vw,13.5rem)] text-primary" />
          </motion.div>
        </motion.header>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1, 0.12)}
          className="-mx-5 flex snap-x snap-mandatory items-center gap-1.5 overflow-x-auto px-5 pt-6 pb-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:min-w-0 lg:flex-1 lg:justify-end lg:gap-2 lg:overflow-visible lg:px-0 lg:pt-4 lg:pb-6 [&::-webkit-scrollbar]:hidden"
        >
          {STEPS.map((step, index) => {
            const Face = FACES[step.face];
            return (
              <li key={step.id} className="flex shrink-0 snap-center items-center gap-1.5 lg:gap-2">
                <Polaroid
                  caption={step.caption}
                  rotate={reducedMotion ? 0 : step.rotate}
                  accent={
                    step.face === "growth" && (
                      <BurstIcon className="absolute -top-[18%] -right-[16%] w-[36%] text-primary" />
                    )
                  }
                >
                  <Face />
                </Polaroid>
                {index < STEPS.length - 1 && (
                  <motion.span variants={fadeUp} className="flex">
                    <CurvedArrowIcon className="w-5 shrink-0 text-foreground/70" />
                  </motion.span>
                )}
              </li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
