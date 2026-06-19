import type { CSSProperties } from "react";

/**
 * Seamless infinite text marquee (pure CSS, transform-based).
 * One animated track holds the items duplicated twice and translates -50%,
 * so the second copy seamlessly takes over as the first scrolls out.
 */
export function Marquee({
  items,
  duration = 34,
}: {
  items: readonly string[];
  duration?: number;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className="marquee relative w-full overflow-hidden border-y border-white/10 py-4"
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-7 inline-flex items-center gap-7 font-mono text-xs uppercase tracking-[0.22em] text-muted"
          >
            {item}
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
