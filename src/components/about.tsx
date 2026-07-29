import { CountUp } from "@/components/count-up";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { brand } from "@/lib/brand";

/**
 * About / Experience (Figma 14:924) — dark rounded panel.
 * Row 1: 50/50 split — left half holds the photo at 50% of that half;
 *        right half holds the eyebrow + intro paragraph. Gutter 16px.
 * Row 2: 4 credibility stats with count-up.
 * Row 3: "Досвід" label (1 col) + experience timeline (3 cols), each item
 *        fading up on scroll.
 */
export function About() {
  return (
    <section
      id="about"
      className="overflow-hidden rounded-frame bg-ink text-white"
    >
      <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-[52px] lg:py-28">
        {/* Row 1 — photo (50% of left half) + intro */}
        <div className="flex flex-col gap-8 pb-10 sm:pb-14 lg:flex-row lg:items-stretch lg:gap-4 lg:pb-[72px]">
          <div className="lg:flex lg:flex-1 lg:items-stretch">
            <div className="relative h-[300px] w-full shrink-0 overflow-hidden rounded-[20px] bg-[#ba6c6c] sm:h-[400px] lg:h-auto lg:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/walking.webp"
                alt="Олександр Бондаренко"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 sm:gap-8">
            <Eyebrow label="Про мене" tone="dark" />
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.27] tracking-[-0.025em] text-white">
                {brand.about}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Row 2 — stats (count-up) */}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-10 border-t border-white/20 pt-10 lg:grid-cols-4">
          {brand.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-3">
              <dd className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-none tracking-[-0.025em] text-white">
                <CountUp value={s.value} />
              </dd>
              <dt className="font-mono text-[10px] uppercase leading-[16.5px] tracking-[2.2px] text-muted sm:text-[12px]">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Row 3 — experience (each item fades up) */}
        <div className="grid grid-cols-1 gap-4 pt-14 lg:grid-cols-4">
          <p className="font-mono text-[10px] uppercase leading-[16.5px] tracking-[1.2px] text-white/70 sm:text-[12px]">
            Досвід
          </p>
          <div className="lg:col-span-3">
            {brand.experience.map((job) => (
              <Reveal
                key={`${job.period}-${job.company}`}
                className="grid grid-cols-1 gap-2 border-t border-white/10 py-6 sm:grid-cols-[136px_1fr] sm:gap-10"
              >
                <span className="text-[15px] font-medium tracking-[-0.5px] text-accent">
                  {job.period}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[20px] font-medium tracking-[-0.5px] text-white sm:text-[24px]">
                    {job.role}
                    <span className="text-white/55"> · {job.company}</span>
                  </h3>
                  <p className="max-w-[672px] text-[14px] leading-[1.62] text-muted">
                    {job.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
