import { Eyebrow } from "@/components/eyebrow";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import type { Dict } from "@/lib/dict";
import { contentWide } from "@/lib/layout";

/**
 * "Для кого" (Figma 14:998) — eyebrow + big scroll-revealed heading, then a
 * 2×2 grid of segment cards (title + pain + orange-dot outcome + icon).
 * Wide content width; each piece appears with the shared animation helpers.
 */
export function ForWhom({ dict }: { dict: Dict }) {
  return (
    <section id="for-whom" className="relative py-16 sm:py-20 lg:py-28">
      {/* diagonal running ticker (Figma 52:12026) — absolute, full-bleed (w-screen),
          centred on the section's BOTTOM edge so it fills the gap before Projects.
          Takes no layout space; <main> has overflow-x-clip so the rotated stripe
          spans edge-to-edge with no side gaps and is never cut off vertically. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[110vw] -translate-x-1/2 translate-y-1/2 -rotate-[4deg]"
      >
        <Marquee items={dict.ticker} />
      </div>

      <div className={contentWide}>
        {/* header */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <Reveal>
            <Eyebrow label={dict.eyebrows.forWhom} />
          </Reveal>
          <ScrollRevealText
            text={dict.forWhomSub}
            className="max-w-[881px] text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
          />
        </div>

        {/* 2×2 segment cards */}
        <div className="mt-10 grid grid-cols-1 gap-2 sm:mt-12 sm:grid-cols-2">
          {dict.segments.map((s, i) => (
            <Reveal
              key={s.title}
              delay={(i % 2) * 0.08}
              className="flex items-start gap-4 rounded-[20px] bg-paper-pure px-6 py-8 sm:px-9 sm:py-10"
            >
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[30px] lg:text-[36px]">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-[1.62] text-muted-ink">
                  {s.pain}
                </p>
                <p className="flex items-start gap-2.5 text-[14px] font-medium leading-[1.62] text-ink">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                  {s.outcome}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/seg-${i + 1}.svg`} alt="" className="size-10 shrink-0" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
