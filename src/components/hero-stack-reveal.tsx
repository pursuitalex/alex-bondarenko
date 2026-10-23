"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Hero } from "@/components/hero";
import type { Dict } from "@/lib/dict";
import { TechStack } from "@/components/tech-stack";
import { useMediaQuery, LG } from "@/lib/use-media-query";
import { pageMax } from "@/lib/layout";
import { useLenis } from "lenis/react";
import { OPENER_MAX_WAIT_MS, OPENER_ZOOM_MS } from "@/lib/hero-opener";

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
export function HeroStackReveal({ dict }: { dict: Dict }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Decided once, synchronously, from the same conditions the CSS uses — not
  // from the media-query hook below, whose server snapshot would read "mobile"
  // on the first client render and flip the opener off for a frame.
  const [openerRuns] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
      window.scrollY === 0,
  );
  const [opened, setOpened] = useState(false);
  const contentReady = !openerRuns || opened;

  // Cued by the video, not by a timer: the zoom has to wait for the sweep to
  // reach frame 0, otherwise it fires while the reverse playback is still
  // getting going and the playback is never seen.
  const openPanel = useCallback(() => setOpened(true), []);

  // How long the sweep says it will take — the clip's own length, so the
  // backstop below cannot fire in the middle of it.
  const [sweepMs, setSweepMs] = useState<number | null>(null);
  const noteSweep = useCallback((ms: number) => setSweepMs(ms), []);

  useEffect(() => {
    // Loads that get no opener (mobile, reduced motion, a restored scroll
    // position) must not sit at the small state the server painted. Written
    // straight to the DOM rather than through state, so the server and the
    // first client render agree on "closed" and React has nothing to patch.
    if (!openerRuns) {
      openerRef.current?.setAttribute("data-open", "true");
      return;
    }
    lenis?.stop();
    return () => lenis?.start();
  }, [openerRuns, lenis]);

  // Backstop. Before the sweep reports in we are only waiting for it to
  // start; once it has, we wait out its own length too. Either way the panel
  // opens rather than stranding at 30% if the video never cues the zoom.
  useEffect(() => {
    if (!openerRuns || opened) return;
    const t = setTimeout(openPanel, (sweepMs ?? 0) + OPENER_MAX_WAIT_MS);
    return () => clearTimeout(t);
  }, [openerRuns, opened, sweepMs, openPanel]);

  // Let the page go once the zoom has finished.
  useEffect(() => {
    if (!opened || !openerRuns) return;
    const release = setTimeout(() => lenis?.start(), OPENER_ZOOM_MS);
    return () => clearTimeout(release);
  }, [opened, openerRuns, lenis]);
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
        <Hero dict={dict} />
        <div className={`${pageMax} mt-3`}>
          <TechStack dict={dict} />
        </div>
      </>
    );
  }

  return (
    <>
      {/* PHASE 1 — pinned hero + video scrub (desktop only, via `lg:`) */}
      <div data-scrub-track className="relative z-20 lg:h-[250dvh]">
        <div
          data-pin
          className="lg:sticky lg:top-[calc(var(--header-h)+0.75rem)] lg:h-[calc(100dvh-var(--header-h)-1.5rem)]"
        >
          {/* heroY recede lives INSIDE the sticky → 0 while pinned, recedes after */}
          <motion.div
            style={animate ? { y: heroY } : undefined}
            className="origin-top will-change-transform lg:h-full"
          >
            {/* The opener zoom lives on its own element so it cannot fight the
                recede transform above it. Its animation is CSS (globals.css):
                it has to be painted from the server markup, before hydration. */}
            <div
              ref={openerRef}
              data-open={opened ? "true" : "false"}
              className="hero-opener h-full lg:[&>section]:h-full"
            >
              <Hero
                dict={dict}
                opener={openerRuns}
                contentReady={contentReady}
                onOpenerStart={noteSweep}
                onOpenerDone={openPanel}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* PHASE 2 — logos revealed from under the receding hero. Below lg they
          simply follow the hero with the usual gap, untucked and unscaled. */}
      <div
        ref={stackRef}
        className={`${pageMax} relative z-10 mt-3 lg:-mt-[35vh]`}
      >
        <motion.div
          style={animate ? { scale: stackScale } : undefined}
          className="origin-top will-change-transform"
        >
          <TechStack dict={dict} />
        </motion.div>
      </div>
    </>
  );
}
