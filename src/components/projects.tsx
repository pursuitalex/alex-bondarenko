import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { ProjectsGrid } from "@/components/projects-grid";
import type { Dict } from "@/lib/dict";
import { contentWide } from "@/lib/layout";

/**
 * Selected projects (Figma 14:1825). Labels come from the dictionary
 * (src/content/uk.ts, en.ts); photo/logo are matched by position — entry i →
 * /projects/{i+1}.webp and /projects/logos/{i+1}.svg. The grid itself lives in
 * ProjectsGrid, which is a client component because clicking a card opens the
 * full-size viewer.
 */
export function Projects({ dict }: { dict: Dict }) {
  return (
    <section id="work" className="py-16 sm:py-20 lg:py-28">
      <div className={contentWide}>
        {/* header */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <Reveal>
            <Eyebrow label={dict.eyebrows.work} />
          </Reveal>
          <Reveal>
            <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              {dict.worksHeading}
            </h2>
          </Reveal>
        </div>

        <ProjectsGrid dict={dict} />
      </div>
    </section>
  );
}
