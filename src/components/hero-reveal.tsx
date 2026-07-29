"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Reveal mask = a main blob + 3 trailing droplets, unioned (the default
 * `mask-composite: add`). Each circle's centre/radius is a CSS var driven by the
 * rAF loop, so the cluster strings out into a "water drop" tail as the cursor
 * moves and pools back into one blob when it stops.
 */
const MASK = [
  "radial-gradient(circle var(--mr,0px) at var(--mx,-99px) var(--my,-99px), #000 0%, #000 52%, transparent 100%)",
  "radial-gradient(circle var(--r1,0px) at var(--x1,-99px) var(--y1,-99px), #000 0%, #000 48%, transparent 100%)",
  "radial-gradient(circle var(--r2,0px) at var(--x2,-99px) var(--y2,-99px), #000 0%, #000 44%, transparent 100%)",
  "radial-gradient(circle var(--r3,0px) at var(--x3,-99px) var(--y3,-99px), #000 0%, #000 40%, transparent 100%)",
].join(", ");

/**
 * Hero background with a cursor-driven "water drops" reveal (à la
 * landonorris.com). Base photo (hero-bg.png) underneath; hero-bg2.png on top,
 * revealed through a trailing-droplet mask and warped by a turbulence
 * displacement filter so the drops have wobbly, liquid edges. Mouse-only
 * (pointer: fine) and disabled under prefers-reduced-motion — both fall back to
 * just the base photo, and the heavy second image isn't downloaded on touch.
 */
export function HeroReveal() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reduce && window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const host = hostRef.current;
    const mask = maskRef.current;
    if (!host || !mask) return;
    const root = host.parentElement ?? host; // <section> — track moves over hero content too

    const R = 230; // main blob radius on hover
    let tx = 0;
    let ty = 0;
    let tr = 0; // pointer target + target radius
    // main blob + 3 droplets, chained so each follows the previous → a tail
    let mx = 0, my = 0, mr = 0;
    let x1 = 0, y1 = 0, r1 = 0;
    let x2 = 0, y2 = 0, r2 = 0;
    let x3 = 0, y3 = 0, r3 = 0;
    let raf = 0;

    const move = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      tx = e.clientX - b.left;
      ty = e.clientY - b.top;
    };
    const enter = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      tx = e.clientX - b.left;
      ty = e.clientY - b.top;
      // pool all drops at the entry point so the tail grows out from there
      mx = x1 = x2 = x3 = tx;
      my = y1 = y2 = y3 = ty;
      tr = R;
    };
    const leave = () => {
      tr = 0;
    };

    const tick = () => {
      mx += (tx - mx) * 0.3; // head chases the cursor
      my += (ty - my) * 0.3;
      x1 += (mx - x1) * 0.22; // each droplet chases the one ahead of it
      y1 += (my - y1) * 0.22;
      x2 += (x1 - x2) * 0.18;
      y2 += (y1 - y2) * 0.18;
      x3 += (x2 - x3) * 0.15;
      y3 += (y2 - y3) * 0.15;
      mr += (tr - mr) * 0.12; // radii ease in on enter / out on leave, tapering down the tail
      r1 += (tr * 0.7 - r1) * 0.12;
      r2 += (tr * 0.52 - r2) * 0.12;
      r3 += (tr * 0.36 - r3) * 0.12;
      const s = mask.style;
      s.setProperty("--mx", `${mx.toFixed(1)}px`);
      s.setProperty("--my", `${my.toFixed(1)}px`);
      s.setProperty("--mr", `${mr.toFixed(1)}px`);
      s.setProperty("--x1", `${x1.toFixed(1)}px`);
      s.setProperty("--y1", `${y1.toFixed(1)}px`);
      s.setProperty("--r1", `${r1.toFixed(1)}px`);
      s.setProperty("--x2", `${x2.toFixed(1)}px`);
      s.setProperty("--y2", `${y2.toFixed(1)}px`);
      s.setProperty("--r2", `${r2.toFixed(1)}px`);
      s.setProperty("--x3", `${x3.toFixed(1)}px`);
      s.setProperty("--y3", `${y3.toFixed(1)}px`);
      s.setProperty("--r3", `${r3.toFixed(1)}px`);
      // Hide the layer when there's no blob — a 0px radial-gradient renders as
      // OPAQUE in Chrome, which would otherwise show the whole distorted photo.
      mask.style.opacity = mr > 0.5 ? "1" : "0";
      raf = requestAnimationFrame(tick);
    };

    root.addEventListener("pointermove", move);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  return (
    <div ref={hostRef} aria-hidden className="absolute inset-0">
      {/* base photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {enabled && (
        <>
          {/* turbulence → displacement: gives the drops wobbly, liquid edges
              and a faint underwater refraction of the revealed photo */}
          <svg
            aria-hidden
            width="0"
            height="0"
            className="pointer-events-none absolute"
          >
            <filter
              id="hero-water"
              x="-15%"
              y="-15%"
              width="130%"
              height="130%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.016 0.024"
                numOctaves={2}
                seed={7}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={18}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>

          {/* outer: water filter applied AFTER the mask so the drop edges warp */}
          <div className="absolute inset-0" style={{ filter: "url(#hero-water)" }}>
            {/* inner: hero-bg2 revealed through the trailing-droplet mask */}
            <div
              ref={maskRef}
              className="absolute inset-0"
              style={{ maskImage: MASK, WebkitMaskImage: MASK, opacity: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-bg2.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </>
      )}

      {/* subtle darkening over both photos */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
