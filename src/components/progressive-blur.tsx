"use client";

import { useEffect, useState } from "react";

/**
 * Progressive blur pinned to the bottom of the viewport: content softens
 * as it nears the bottom edge. Built by stacking layers of increasing
 * backdrop-blur, each masked to a taller band so blur intensifies downward.
 *
 * It stays off while the hero is on screen. The band is fixed to the viewport,
 * so on the opener it was softening the hero's own bottom row — the CTA button
 * and the contact card — which is the one place nothing should be veiled. It
 * fades in once the hero has scrolled fully away.
 */
const LAYERS = 6;

export function ProgressiveBlur() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    // While the hero is pinned it fills the viewport, so "not intersecting"
    // only becomes true once the opener is genuinely behind us.
    const io = new IntersectionObserver(([entry]) => setPast(!entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className="progressive-blur" aria-hidden data-past={past}>
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
