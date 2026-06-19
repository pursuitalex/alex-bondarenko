/**
 * Progressive blur pinned to the bottom of the viewport: content softens
 * as it nears the bottom edge. Built by stacking layers of increasing
 * backdrop-blur, each masked to a taller band so blur intensifies downward.
 */
const LAYERS = 6;

export function ProgressiveBlur() {
  return (
    <div className="progressive-blur" aria-hidden>
      {Array.from({ length: LAYERS }).map((_, i) => {
        const blur = 0.5 * 2 ** i; // 0.5 → 16px
        const solid = ((LAYERS - i - 1) / LAYERS) * 100;
        const fade = ((LAYERS - i) / LAYERS) * 100;
        const mask = `linear-gradient(to top, #000 0%, #000 ${solid}%, transparent ${fade}%)`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
