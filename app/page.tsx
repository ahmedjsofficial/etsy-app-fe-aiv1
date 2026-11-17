import { BusinessIntelligence } from "@/components/landing/BusinessIntelligence";
import { Faq } from "@/components/landing/Faq";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Storyline } from "@/components/landing/Storyline";
import { Toolkit } from "@/components/landing/Toolkit";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <Storyline />
        <Toolkit />
        <BusinessIntelligence />
        <HowItWorks />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
