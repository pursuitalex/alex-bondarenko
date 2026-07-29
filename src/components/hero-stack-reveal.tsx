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
 */
export function HeroStackReveal() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(LG);

  // Two components rather than an early return: the animated branch owns
  // `useScroll({ target })`, and that hook must not run where its target is
  // never rendered — framer-motion throws "target ref is not hydrated".
  return reduce || !isDesktop ? <PlainStack /> : <PinnedReveal />;
}

function PlainStack() {
  return (
    <>
      <Hero />
      <div className="mt-3">
        <TechStack />
      </div>
    </>
  );
}

/**
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
 * Knobs: the track's `h-[250dvh]` (pin/scrub length), the tuck `-mt-[35vh]`
 * = `heroY` recede (keep equal), and the reveal offset below.
 */
function PinnedReveal() {
  const stackRef = useRef<HTMLDivElement>(null);

  // Progresses only once the stack starts entering (i.e. after the pin releases),
  // so heroY/scale stay at their start values through the whole pinned scrub.
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start center", "center center"],
  });
  const stackScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0vh", "-35vh"]);

  return (
    <>
      {/* PHASE 1 — pinned hero + video scrub */}
      <div data-scrub-track className="relative z-20 h-[250dvh]">
        <div data-pin className="sticky top-0 h-[100dvh]">
          {/* heroY recede lives INSIDE the sticky → 0 while pinned, recedes after */}
          <motion.div
            style={{ y: heroY }}
            className="h-full origin-top will-change-transform [&>section]:h-full"
          >
            <Hero />
          </motion.div>
        </div>
      </div>

      {/* PHASE 2 — logos revealed from under the receding hero */}
      <div ref={stackRef} className="relative z-10 -mt-[35vh]">
        <motion.div
          style={{ scale: stackScale }}
          className="origin-top will-change-transform"
        >
          <TechStack />
        </motion.div>
      </div>
    </>
  );
}
