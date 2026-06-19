"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { Eyebrow } from "@/components/eyebrow";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { brand } from "@/lib/brand";
import { contentWide } from "@/lib/layout";

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

/**
 * Approach intro (Figma 19:53): eyebrow + large scroll-revealed heading on the
 * left; a short note + orange CTA bottom-right. Wide content width.
 */
export function Approach() {
  const a = brand.approach;

  return (
    <section id="approach" className="pb-14 sm:pb-20 lg:pb-28">
      <div className={contentWide}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8">
          {/* left — eyebrow + heading (heading colours in on scroll) */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:w-[60%]">
            <Reveal>
              <Eyebrow label={a.eyebrow} />
            </Reveal>
            <ScrollRevealText
              text={a.heading}
              className="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
            />
          </div>

          {/* right — note + CTA, bottom-right on desktop */}
          <div className="flex flex-1 flex-col items-start gap-8 lg:items-end lg:justify-end">
            <Reveal>
              <p className="max-w-[283px] text-[15px] leading-[1.4] tracking-[-0.3px] text-ink sm:text-[16px] lg:text-right lg:text-[18px]">
                {a.note}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Magnetic>
                <button
                  onClick={openContact}
                  className="inline-flex h-[52px] items-center gap-3 rounded-full bg-accent px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90 lg:h-[60px] lg:px-7 lg:text-[18px]"
                >
                  {brand.cta}
                  <ArrowUpRight size={18} weight="bold" />
                </button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
