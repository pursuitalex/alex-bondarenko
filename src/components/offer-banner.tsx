"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { Magnetic } from "@/components/magnetic";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import type { Dict } from "@/lib/dict";
import { contentWide } from "@/lib/layout";

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

/**
 * Orange CTA banner (Figma 49:19186). NOT full-bleed — sits at `contentWide`
 * width (Figma px-203 outer), aligned with Projects/Process. A rounded card
 * with the orange-comps photo, an orange base + two legibility gradients
 * (darken top for the eyebrow, bottom for the offer/CTA), eyebrow top-left,
 * offer copy + white CTA pill + secondary link bottom-left.
 */
export function OfferBanner({ dict }: { dict: Dict }) {
  return (
    <section id="offer" className="relative">
      {/* white running ticker mirrored above the orange block — same stripe,
          light surface (white bg / dark text), tilted the opposite way
          (+4° vs the orange stripe's -4°) */}
      <div
        aria-hidden
        style={{ rotate: "4deg" }}
        className="pointer-events-none absolute left-1/2 top-0 z-10 w-[110vw] -translate-x-1/2 -translate-y-1/2"
      >
        <Marquee items={dict.ticker} tone="light" />
      </div>

      <div className={contentWide}>
        <Reveal>
          <div className="relative flex h-[520px] flex-col justify-between overflow-hidden rounded-[28px] px-6 pb-12 pt-10 sm:h-[600px] sm:px-10 lg:h-[660px] lg:px-[52px] lg:pb-[60px] lg:pt-12">
            {/* background: orange base + photo + legibility gradients */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[#db5400]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/orange-comps.webp"
                alt=""
                className="absolute inset-0 size-full object-cover object-bottom"
              />
              {/* darken the top (under the eyebrow) */}
              <div
                className="absolute inset-0 mix-blend-darken"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(219,66,0,0.8) 0%, rgba(255,77,0,0) 41.858%)",
                }}
              />
              {/* darken the bottom-left (under the offer + buttons) */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(11.6deg, rgba(197,60,0,0.8) 2.96%, rgba(255,77,0,0) 36.587%)",
                }}
              />
            </div>

            {/* top: eyebrow */}
            <p className="relative font-mono text-[12px] uppercase tracking-[1.2px] opacity-90">
              <span className="text-accent">/</span>
              <span className="text-white">{` ${dict.stats[0].value} ${dict.stats[0].label}`}</span>
            </p>

            {/* bottom: offer + CTAs */}
            <div className="relative flex w-full flex-col gap-8 sm:gap-10 lg:w-[432px] lg:gap-12">
              <p className="text-[18px] font-medium leading-[1.3] tracking-[-0.4px] text-white sm:text-[20px] sm:leading-[1.2] sm:tracking-[-0.6px]">
                {dict.offer}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Magnetic>
                  <button
                    onClick={openContact}
                    className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-white px-6 text-[16px] font-medium text-[#0a0a0a] transition-opacity hover:opacity-90 lg:h-[60px] lg:px-7 lg:text-[18px]"
                  >
                    {dict.cta}
                    <ArrowUpRight size={18} weight="bold" />
                  </button>
                </Magnetic>
                <a
                  href="#work"
                  className="text-[16px] text-white/60 transition-colors hover:text-white sm:text-[18px]"
                >
                  {dict.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
