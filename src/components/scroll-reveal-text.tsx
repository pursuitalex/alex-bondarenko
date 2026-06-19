"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const BASE = "#9b9b9b"; // not yet revealed (grey)
const SWEEP = "#ff4d00"; // the orange front
const DONE = "#0a0a0a"; // revealed (dark)

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const color = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [BASE, SWEEP, DONE],
  );
  return (
    <>
      <motion.span style={{ color }}>{word}</motion.span>{" "}
    </>
  );
}

/**
 * Scroll-linked text reveal: the text starts grey (#9b9b9b); as the user scrolls
 * an orange (#ff4d00) front sweeps word-by-word, leaving the text dark (#0a0a0a)
 * behind it. Reduced-motion renders the final (dark) state statically.
 */
export function ScrollRevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const n = words.length;
  const span = 1.8; // transition window (in word units) → adjacent words overlap = soft front

  if (reduce) {
    return (
      <h2 ref={ref} className={className} style={{ color: DONE }}>
        {text}
      </h2>
    );
  }

  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={`${i}-${w}`}
          word={w}
          progress={scrollYProgress}
          start={i / n}
          end={Math.min(1, (i + span) / n)}
        />
      ))}
    </h2>
  );
}
