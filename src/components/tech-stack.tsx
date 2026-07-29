import type { Dict } from "@/lib/dict";
import { contentWide } from "@/lib/layout";

/**
 * Tech-stack grid (Figma 14:1362): aligns to the wide content width
 * (contentWide — central 10 of 12 cols). 4×3 white borderless cards on the
 * #f5f5f5 page; name (responsive, vertically centered) + 40px icon @ 60%.
 */
export function TechStack({ dict }: { dict: Dict }) {
  return (
    <section
      id="stack"
      className="pt-[84px] pb-14 sm:pt-[120px] sm:pb-20 lg:pt-[168px] lg:pb-28"
    >
      <div
        className={`${contentWide} grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4`}
      >
        {dict.stack.map((t) => (
          <article
            key={t.name}
            className="flex items-center gap-3 rounded-[20px] bg-paper-pure px-5 py-7 sm:px-9 sm:py-11"
          >
            <h3 className="flex-1 text-[15px] font-semibold leading-[20px] tracking-[-0.6px] text-ink sm:text-[17px] sm:leading-[24px] lg:text-[20px] lg:leading-[32px]">
              {t.name}
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/tech-icons/${t.icon}.svg`}
              alt={t.name}
              className="size-8 shrink-0 opacity-60 sm:size-10"
              loading="lazy"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
