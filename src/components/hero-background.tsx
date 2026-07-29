"use client";

import { HeroScrubVideo } from "@/components/hero-scrub-video";
import { useMediaQuery, MD, LG } from "@/lib/use-media-query";

/**
 * Hero backdrop, one per tier (Figma 126:34 for the phone frame).
 *
 *  DESKTOP (lg+) — the scroll-scrubbed video, unchanged.
 *  TABLET / PHONE — a still frame each, shot for its own aspect: the phone
 *  source is near-square, the tablet one much wider. The photo is anchored to
 *  the top and a gradient fades it into #2d0705 so its bottom edge never
 *  shows; below the fade the panel is just flat colour.
 *
 * The video is gated on a real media query rather than `hidden lg:block`,
 * because a mounted <video preload="auto"> still downloads its ~2.2 MB even
 * while hidden — the whole point of the still frame is to avoid that on a
 * phone connection.
 */

/** Photo runs to 72%, safely past the 66% where the fade turns solid. */
const PHOTO_H = "h-[72%]";

export function HeroBackground() {
  const isDesktop = useMediaQuery(LG);
  const isTablet = useMediaQuery(MD);

  if (isDesktop) {
    return (
      <>
        <HeroScrubVideo src="/hero.mp4" />
        <div aria-hidden className="absolute inset-0 bg-black/10" />
      </>
    );
  }

  return (
    <>
      <div aria-hidden className={`absolute inset-x-0 top-0 ${PHOTO_H}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isTablet ? "/hero-tablet.webp" : "/hero-phone.webp"}
          alt=""
          // Phone: the subject sits right of centre in a narrow panel, so a
          // centred crop clips his face — hence 70%. The tablet frame is
          // already composed for its width and needs no nudge.
          className={`h-full w-full object-cover ${
            isTablet ? "object-center" : "object-[70%_50%]"
          }`}
        />
      </div>
      {/* transparent until 53%, solid by 66% — hides the photo's bottom edge */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[rgba(75,9,6,0)] from-[53%] to-[#2d0705] to-[66%]"
      />
      <div aria-hidden className="absolute inset-0 bg-black/10" />
    </>
  );
}
