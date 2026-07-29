"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { contentWide } from "@/lib/layout";
import { faq, faqHeading, faqSub } from "@/content/faq";

/**
 * "Часті запитання та Відповіді" (Figma 49:19079). Two columns at wide width:
 * left = eyebrow + heading + subtitle; right = accordion of white rounded cards
 * (question + animated +/− toggle, smooth height reveal). Single-open accordion;
 * answers stay in the DOM (height-collapsed) for SEO/a11y.
 *
 * Copy (heading, subtitle, Q&A) is edited in src/content/faq.ts.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-28">
      <div className={contentWide}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-4">
          {/* left — intro */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <Eyebrow label="Часті запитання" />
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal>
                <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                  {faqHeading}
                </h2>
              </Reveal>
              <Reveal>
                <p className="max-w-[432px] text-[16px] leading-[1.5] tracking-[-0.3px] text-muted-ink sm:text-[18px] sm:leading-[1.4]">
                  {faqSub}
                </p>
              </Reveal>
            </div>
          </div>

          {/* right — accordion */}
          <div className="flex flex-col gap-2">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 0.05}>
                  <div className="rounded-[16px] bg-paper-pure px-6 py-5 sm:px-8 sm:py-6">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-[17px] font-medium leading-[1.4] tracking-[-0.45px] text-ink sm:text-[20px]">
                        {item.q}
                      </span>
                      {/* +/− toggle: vertical bar rotates flat to become a minus */}
                      <span className="relative size-6 shrink-0" aria-hidden>
                        <span className="absolute left-[5px] top-1/2 h-px w-[14px] -translate-y-1/2 bg-ink" />
                        <span
                          className={`absolute left-1/2 top-[5px] h-[14px] w-px -translate-x-1/2 bg-ink transition-transform duration-300 ease-out ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] pt-4 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[520px] text-[15px] leading-[1.6] text-muted-ink">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
