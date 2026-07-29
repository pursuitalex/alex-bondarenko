import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { brand } from "@/lib/brand";
import { contentWide } from "@/lib/layout";
import { projects } from "@/content/projects";

/**
 * Selected projects (Figma 14:1825). Labels come from src/content/projects.ts
 * (easy-edit file); photo/logo are matched by position — entry i → /projects/{i+1}.webp
 * and /projects/logos/{i+1}.svg. Card: white label bar (name /year + type) +
 * image (photo + dark gradient + 250px logo) with hover zoom/lift. Wide width.
 */
export function Projects() {
  return (
    <section id="work" className="py-16 sm:py-20 lg:py-28">
      <div className={contentWide}>
        {/* header */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <Reveal>
            <Eyebrow label="Портфоліо" />
          </Reveal>
          <Reveal>
            <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              Вибрані проєкти
            </h2>
          </Reveal>
        </div>

        {/* 2-col project grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:mt-12 sm:grid-cols-2 sm:gap-y-10">
          {projects.map((p, i) => {
            const n = i + 1;
            return (
              <Reveal key={n} delay={(i % 2) * 0.08}>
                <a
                  href={brand.contacts.behance.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  {/* label bar */}
                  <div className="flex items-center justify-between rounded-[16px] bg-paper-pure px-5 py-3.5">
                    <p className="text-[15px] font-medium tracking-[-0.4px] text-ink transition-colors duration-300 group-hover:text-accent sm:text-[16px]">
                      {p.name}
                      <span className="text-muted-ink"> /{p.year}</span>
                    </p>
                    <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted-ink">
                      {p.type}
                    </span>
                  </div>

                  {/* image + gradient + logo */}
                  <div className="relative h-[260px] overflow-hidden rounded-[16px] bg-ink/5 sm:h-[340px] lg:h-[390px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/projects/${n}.webp`}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.07)] to-[rgba(0,0,0,0.35)]" />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/projects/logos/${n}.svg`}
                      alt={`${p.name} logo`}
                      className="absolute bottom-[14%] left-1/2 w-[125px] max-w-[40%] -translate-x-1/2 object-contain lg:w-[250px] lg:max-w-[80%]"
                    />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
