"use client";

import { useSyncExternalStore } from "react";
import { HeroScrubVideo } from "@/components/hero-scrub-video";

/**
 * Hero backdrop, split by viewport (Figma 126:34 for the phone frame).
 *
 *  DESKTOP (lg+) — the scroll-scrubbed video, unchanged.
 *  PHONE + TABLET — one static frame instead. The photo is anchored to the top
 *  and overflows the panel sideways, then a gradient fades it into #2d0705 so
 *  its bottom edge never shows; below the fade the panel is just flat colour.
 *
 * The video is gated on a real media query rather than `hidden lg:block`,
 * because a mounted <video preload="auto"> still downloads its ~2.2 MB even
 * while hidden — the whole point of the static frame is to avoid that on a
 * phone connection.
 */
const DESKTOP = "(min-width: 1024px)"; // Tailwind `lg` — phone + tablet sit below

// `resize` as well as the media query itself: some environments (and emulated
// viewports) resize across the breakpoint without emitting a `change`, which
// would strand the hero on the wrong backdrop.
function subscribe(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

export function HeroBackground() {
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP).matches,
    () => false, // SSR: assume the light phone frame, upgrade on hydration
  );

  return (
    <>
      {isDesktop ? (
        <HeroScrubVideo src="/hero.mp4" />
      ) : (
        <>
          {/* Photo occupies the top 86% — comfortably past the 66% where the
              fade goes solid, so its bottom edge is always covered.
              object-position 75%: the source frame is landscape and the subject
              sits right of centre, so a centred crop cuts his face off on a
              phone-width panel. Figma's own offsets are not reusable here —
              they are tied to that 1200×2000 frame, not our narrower section. */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-[72%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-phone.webp"
              alt=""
              className="h-full w-full object-cover object-[70%_50%]"
            />
          </div>
          {/* transparent until 53%, solid by 66% — hides the photo's bottom edge */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[rgba(75,9,6,0)] from-[53%] to-[#2d0705] to-[66%]"
          />
        </>
      )}
      <div aria-hidden className="absolute inset-0 bg-black/10" />
    </>
  );
}
