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

/**
 * Two-phase hero → TechStack sequence:
 *
 *  PHASE 1 — pinned video scrub (unchanged): the hero is stuck inside a tall
 *  `[data-scrub-track]`; scrolling it keeps the page put while the background
 *  video scrubs 0 → end (see HeroScrubVideo). The pin releases as the video ends.
 *
 *  PHASE 2 — logos reveal from under: once the pin releases and the stack starts
 *  entering, the hero recedes upward (`heroY`, applied to a wrapper INSIDE the
 *  sticky so it stays 0 while pinned) by exactly the stack's tuck amount, and the
 *  stack scales 0.94 → 1 — so the logos emerge from beneath the hero as before.
 *  Both driven by the stack's own scroll progress, so nothing moves during the pin.
 *
 * Knobs: SCRUB_VH (pin/scrub length), the tuck `-mt-[35vh]` = `heroY` recede
 * (keep equal), and the reveal offset below.
 */
const SCRUB_VH = 150;

export function HeroStackReveal() {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progresses only once the stack starts entering (i.e. after the pin releases),
  // so heroY/scale stay at their start values through the whole pinned scrub.
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start center", "center center"],
  });
  const stackScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0vh", "-35vh"]);

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
      {/* PHASE 1 — pinned hero + video scrub */}
      <div
        data-scrub-track
        className="relative z-20"
        style={{ height: `${100 + SCRUB_VH}dvh` }}
      >
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
