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
import type { Dict } from "@/lib/dict";

/**
 * The whole landing page, in one language. Both routes render this — `/` with
 * the Ukrainian dictionary, `/en` with the English one — so the composition
 * lives in exactly one place and cannot drift between the two versions.
 */
export function SitePage({ dict }: { dict: Dict }) {
  return (
    <main className="flex flex-col gap-3 overflow-x-clip px-2.5 pt-2.5 pb-2.5 sm:gap-4 sm:px-3 sm:pt-3 sm:pb-3">
      {/* hero + tech-stack scroll choreography (hero recedes, stack emerges from under) */}
      <HeroStackReveal dict={dict} />

      {/* approach intro (Figma 19:53) */}
      <Approach dict={dict} />

      {/* wide accent */}
      <Reveal>
        <About dict={dict} />
      </Reveal>

      {/* for whom — wide content (Figma 14:998) */}
      <ForWhom dict={dict} />

      {/* projects — wide content (Figma 14:1825) */}
      <Projects dict={dict} />

      {/* wide accent */}
      <Reveal>
        <Services dict={dict} />
      </Reveal>

      {/* process — wide content (Figma 14:1215) */}
      <Process dict={dict} />

      {/* orange CTA banner — wide content (Figma 49:19186) */}
      <OfferBanner dict={dict} />

      {/* faq — wide content (Figma 49:19079) */}
      <Faq dict={dict} />

      {/* closing CTA + footer — full-bleed dark panel (Figma 14:1291) */}
      <Contact dict={dict} />
    </main>
  );
}
