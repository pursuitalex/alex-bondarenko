import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { brand } from "@/lib/brand";
import { contentWide } from "@/lib/layout";

/**
 * "Процес — Як я веду проєкт" (Figma 14:1215). Two columns at wide width:
 * left = numbered timeline (01–04), each row fades up on enter; right = the
 * media panel. The Figma media is a tilted screenshot collage we'll animate
 * later — for now the right column is a dark placeholder card (see TODO).
 */
export function Process() {
  return (
    <section id="process" className="py-16 sm:py-20 lg:py-28">
      <div className={contentWide}>
        {/* header */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <Reveal>
            <Eyebrow label="Процес" />
          </Reveal>
          <Reveal>
            <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              Як я веду проєкт
            </h2>
          </Reveal>
        </div>

        {/* timeline + media */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:gap-4">
          {/* left: numbered steps */}
          <div className="border-t border-ink/10">
            {brand.process.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.06}
                className="grid grid-cols-[40px_1fr] items-start gap-x-4 border-b border-ink/10 py-8 sm:grid-cols-[134px_1fr] lg:py-9"
              >
                <span className="text-[14px] font-medium tracking-[-0.5px] text-accent">
                  0{i + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[30px] lg:text-[36px]">
                    {step.title}
                  </h3>
                  <p className="max-w-[576px] text-[14px] leading-[1.62] text-muted-ink">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* right: media — TODO replace with animated screenshot collage (Figma 40:4029) */}
          <Reveal delay={0.1}>
            <div className="relative aspect-[586/553] w-full overflow-hidden rounded-[20px] bg-ink">
              {/* soft glow so the panel isn't flat */}
              <div className="absolute -left-1/5 top-0 h-2/3 w-3/4 rounded-full bg-white/[0.05] blur-3xl" />
              {/* placeholder hint */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-white/15">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 text-white/40">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="8.5" cy="9" r="1.6" fill="currentColor" />
                    <path d="M21 15l-5-4-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[2.2px] text-white/35">
                  Анімація — скоро
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
