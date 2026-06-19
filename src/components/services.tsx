import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { brand } from "@/lib/brand";

/**
 * "Послуги" (Figma 14:1130) — wide dark panel. Border-divided rows, each:
 * orange arrow icon + title/desc + larger interactive tag pills. Each row
 * fades up on scroll (Reveal). Tags brighten to accent on hover.
 */
export function Services() {
  return (
    <section
      id="services"
      className="overflow-hidden rounded-frame bg-ink text-white"
    >
      <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-[52px] lg:py-28">
        {/* header */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <Eyebrow label="Послуги" tone="dark" />
          <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            Що я роблю
          </h2>
        </div>

        {/* rows */}
        <div className="mt-12 border-t border-white/10 sm:mt-14">
          {brand.services.map((s) => (
            <Reveal
              key={s.title}
              className="grid grid-cols-1 gap-y-5 border-b border-white/10 py-8 lg:grid-cols-[133px_1fr_1fr] lg:items-start lg:gap-x-4 lg:gap-y-0 lg:py-9"
            >
              {/* icon (↘) — user asset, already accent-orange */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/arrow.svg" alt="" className="size-8 shrink-0" />

              {/* title + desc */}
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[30px] lg:text-[36px]">
                  {s.title}
                </h3>
                <p className="max-w-[448px] text-[14px] leading-[1.62] text-muted">
                  {s.desc}
                </p>
              </div>

              {/* tags */}
              <ul className="flex flex-wrap content-start gap-2">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="cursor-default rounded-full border border-white/40 px-4 py-3 text-[14px] text-white/90 transition-colors duration-200 hover:border-accent hover:text-accent sm:px-5 sm:py-3.5 sm:text-[16px]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
