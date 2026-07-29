"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { useMediaQuery, LG } from "@/lib/use-media-query";

/**
 * Hero → TechStack. Desktop gets a two-phase scroll sequence; phone and tablet
 * get the two plainly stacked — their backdrop is a still photo, so there is no
 * video to scrub and nothing to pin to, and the scroll-driven recede stutters
 * on real devices.
 *
 *  PHASE 1 — pinned video scrub: the hero is stuck inside a tall
 *  `[data-scrub-track]` (250dvh = one viewport + 150 of scrub); scrolling it
 *  keeps the page put while the background video scrubs 0 → end (see
 *  HeroScrubVideo). The pin releases as the video ends.
 *
 *  PHASE 2 — logos reveal from under: once the stack starts entering, the hero
 *  recedes upward (`heroY`, applied to a wrapper INSIDE the sticky so it stays 0
 *  while pinned) by exactly the stack's tuck amount, and the stack scales
 *  0.94 → 1 — so the logos emerge from beneath it. Both driven by the stack's
 *  own scroll progress, so nothing moves during the pin.
 *
 * WHICH TIER DECIDES WHAT: the layout (track height, sticky, tuck) is chosen by
 * `lg:` classes, NOT by branching in JS — the server has no viewport, so a JS
 * branch would ship the phone layout to every client and visibly re-lay the
 * page out on hydration. Only the motion values are gated in JS, which at worst
 * costs a frame of transform.
 *
 * Knobs: the track's `lg:h-[250dvh]` (pin/scrub length), the tuck `-mt-[35vh]`
 * = `heroY` recede (keep equal), and the reveal offset below.
 */
export function HeroStackReveal() {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(LG);
  const animate = isDesktop && !reduce;

  // Progresses only once the stack starts entering (i.e. after the pin releases),
  // so heroY/scale stay at their start values through the whole pinned scrub.
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start center", "center center"],
  });
  const stackScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0vh", "-35vh"]);

  // Reduced motion still needs the plain stack: the CSS tuck hides the logos
  // under the hero and it is the recede that uncovers them.
  if (reduce) {
    return (
      <>
        <Hero />
        <div className="mt-3">
          <TechStack />
        </div>
      </>
    );
  }

  return (
    <>
      {/* PHASE 1 — pinned hero + video scrub (desktop only, via `lg:`) */}
      <div data-scrub-track className="relative z-20 lg:h-[250dvh]">
        <div data-pin className="lg:sticky lg:top-0 lg:h-[100dvh]">
          {/* heroY recede lives INSIDE the sticky → 0 while pinned, recedes after */}
          <motion.div
            style={animate ? { y: heroY } : undefined}
            className="origin-top will-change-transform lg:h-full lg:[&>section]:h-full"
          >
            <Hero />
          </motion.div>
        </div>
      </div>

      {/* PHASE 2 — logos revealed from under the receding hero. Below lg they
          simply follow the hero with the usual gap, untucked and unscaled. */}
      <div ref={stackRef} className="relative z-10 mt-3 lg:-mt-[35vh]">
        <motion.div
          style={animate ? { scale: stackScale } : undefined}
          className="origin-top will-change-transform"
        >
          <TechStack />
        </motion.div>
      </div>
    </>
  );
}
