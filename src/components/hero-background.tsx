"use client";

import { HeroScrubVideo } from "@/components/hero-scrub-video";
import { useMediaQuery, LG } from "@/lib/use-media-query";

/**
 * Hero backdrop, one still per tier (Figma 126:34 for the phone frame).
 *
 * The still is chosen by the BROWSER from media queries, not by JS, so the
 * server's markup is already correct at every width. Deciding it in JS meant
 * the first paint always used the phone crop — on a desktop panel that is a
 * near-square portrait stretched edge to edge, i.e. a giant slice of the face
 * — which then jumped to the video the moment hydration ran.
 *
 * On desktop the still is the video's own first frame, so when the video
 * mounts on top it lands on identical pixels and the swap cannot be seen.
 *
 * Each tier downloads only its own file: a <source> whose media query does not
 * match is never fetched.
 *
 * On load the whole backdrop arrives from slightly too close and settles at
 * 100% (`.hero-intro-zoom`, CSS). The video is NOT part of that — it only ever
 * moves under the scroll scrub.
 */

/** Below lg the still runs to 72%, safely past the 66% where the fade turns solid. */
const STILL_BOX = "absolute inset-x-0 top-0 h-[72%] lg:h-full";

export function HeroBackground() {
  const isDesktop = useMediaQuery(LG);

  return (
    <>
      {/* Still and video share one zooming wrapper. Were the video outside it,
          it would mount at 100% on top of a still mid-zoom and cut the arrival
          short on every desktop. */}
      <div aria-hidden className="hero-intro-zoom absolute inset-0">
        <div className={STILL_BOX}>
          <picture className="block h-full w-full">
            <source media="(min-width: 1024px)" srcSet="/hero-desktop.webp" />
            <source media="(min-width: 768px)" srcSet="/hero-tablet.webp" />
            <img
              src="/hero-phone.webp"
              alt=""
              className="hero-still h-full w-full object-cover"
            />
          </picture>
        </div>

        {/* Still gated in JS rather than hidden with CSS: a mounted
            <video preload="auto"> downloads its ~2.2 MB even while hidden, and a
            phone must not pay for a video it will never see. */}
        {isDesktop && <HeroScrubVideo src="/hero.mp4" />}
      </div>

      {/* Outside the zoom on purpose: the 53%/66% stops are measured against the
          panel, and a fade that scaled with the photo would slide off them.
          Transparent until 53%, solid by 66% — hides the still's bottom edge,
          including where the zoom pushes it to ~75%. Desktop has no fade: the
          video fills the panel. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[rgba(75,9,6,0)] from-[53%] to-[#2d0705] to-[66%] lg:hidden"
      />

      <div aria-hidden className="absolute inset-0 bg-black/10" />
    </>
  );
}
