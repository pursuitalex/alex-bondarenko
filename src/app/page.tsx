import { HeroStackReveal } from "@/components/hero-stack-reveal";
import { Approach } from "@/components/approach";
import { About } from "@/components/about";
import { ForWhom } from "@/components/for-whom";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { OfferBanner } from "@/components/offer-banner";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <main className="flex flex-col gap-3 px-2.5 pt-2.5 pb-2.5 sm:gap-4 sm:px-3 sm:pt-3 sm:pb-3">
      {/* hero + tech-stack scroll choreography (hero recedes, stack emerges from under) */}
      <HeroStackReveal />

      {/* approach intro (Figma 19:53) */}
      <Approach />

      {/* wide accent */}
      <Reveal>
        <About />
      </Reveal>

      {/* for whom — wide content (Figma 14:998) */}
      <ForWhom />

      {/* projects — wide content (Figma 14:1825) */}
      <Projects />

      {/* wide accent */}
      <Reveal>
        <Services />
      </Reveal>

      {/* process — wide content (Figma 14:1215) */}
      <Process />

      {/* orange CTA banner — wide content (Figma 49:19186) */}
      <OfferBanner />

      {/* faq — wide content (Figma 49:19079) */}
      <Faq />

      {/* closing CTA + footer — full-bleed dark panel (Figma 14:1291) */}
      <Contact />
    </main>
  );
}
