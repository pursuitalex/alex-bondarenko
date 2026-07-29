import type { CSSProperties } from "react";

/** × separator from Figma 52:12026. */
function Cross() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="size-4 shrink-0"
    >
      <path
        d="M5 15L15 5M5 5L15 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Seamless infinite orange ticker stripe (Figma 52:12026). Pure-CSS marquee:
 * the track holds the items TWICE and the `.marquee-track` keyframe translates
 * it -50%, so the second copy seamlessly takes over (loops "по колу").
 *
 * Spacing lives inside each unit (gap + trailing `pr-*`), NOT as flex `gap` on
 * the track — a flex gap would offset the -50% seam by half a gap and stutter.
 * The duplicate copy is aria-hidden so it isn't read twice. Designed to be
 * dropped in as an absolute, rotated overlay (it owns no vertical layout space
 * beyond its own slim height).
 */
export function Marquee({
  items,
  duration = 56,
  tone = "accent",
}: {
  items: readonly string[];
  duration?: number;
  tone?: "accent" | "light";
}) {
  // Each half of the track repeats the items enough times to be wider than the
  // full-bleed stripe (≈3.4k px), so translating -50% never reveals an empty
  // gap — the text runs continuously, and the two identical halves make the
  // wrap seamless.
  const half = Array.from({ length: 3 }, () => items).flat();

  return (
    <div
      className={`marquee relative w-full overflow-hidden py-1.5 shadow-[0_3px_5px_rgba(0,0,0,0.1)] sm:py-2 lg:py-2.5 ${
        tone === "light" ? "bg-white text-ink" : "bg-accent text-white"
      }`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {half.map((label, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-3 pr-3 whitespace-nowrap text-[18px] font-semibold tracking-[-0.72px] sm:gap-4 sm:pr-4 lg:gap-6 lg:pr-6"
              >
                <Cross />
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
