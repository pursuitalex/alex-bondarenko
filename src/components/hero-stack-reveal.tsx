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
 * Hero → TechStack scroll choreography (parallax reveal-from-under):
 * the tech-stack sits TUCKED UNDER the Hero (negative margin + lower z, so it's
 * hidden behind the Hero at rest). As you scroll, the Hero translates UP faster
 * than the page (heroY) and uncovers the stack from beneath it. The stack also
 * scales 0.94 → 1, finishing when it's centered on screen.
 * heroY (≈14vh) is matched by the stack's -mt so the seam stays gapless.
 * Reduced-motion renders both statically.
 */
export function HeroStackReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Hero recedes upward, revealing the stack tucked beneath it.
  const { scrollYProgress: heroProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "-16%"]);

  // Stack scale — gradual: starts as it enters from the bottom, completes when
  // the section's top reaches the middle of the screen (not at the very top).
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start end", "start center"],
  });
  const stackScale = useTransform(stackProgress, [0, 1], [0.94, 1]);

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
    <div ref={ref} className="relative">
      <motion.div
        style={{ y: heroY }}
        className="relative z-20 origin-top will-change-transform"
      >
        <Hero />
      </motion.div>

      {/* tucked UNDER the hero (negative margin + lower z) → revealed from beneath as the hero recedes */}
      <div ref={stackRef} className="relative z-10 -mt-[14vh]">
        <motion.div
          style={{ scale: stackScale }}
          className="origin-top will-change-transform"
        >
          <TechStack />
        </motion.div>
      </div>
    </div>
  );
}
