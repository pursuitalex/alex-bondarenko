"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { TechStack } from "@/components/tech-stack";
import type { Dict } from "@/lib/dict";

/**
 * Scroll-reveal wrapper for the tech-stack section: as it scrolls up from
 * under the Hero, it scales 0.8 → 1 (origin-top) with a light parallax —
 * the "emerge from under the Hero" effect. Disabled under reduced-motion.
 */
export function StackReveal({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["7%", "0%"]);

  if (reduce) return <TechStack dict={dict} />;

  return (
    <motion.div
      ref={ref}
      style={{ scale, y }}
      className="relative z-10 origin-top will-change-transform"
    >
      <TechStack dict={dict} />
    </motion.div>
  );
}
