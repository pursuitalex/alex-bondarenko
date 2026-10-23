"use client";

import { useEffect, useRef } from "react";
import { OPENER_SWEEP_MS } from "@/lib/hero-opener";

/**
 * Scroll-scrubbed background video for a PINNED hero (see HeroStackReveal).
 * The hero is stuck inside a tall `[data-scrub-track]`; scrolling it keeps the
 * page put while this video scrubs 0 → end, finishing as the pin releases.
 *
 * SMOOTHING: scroll sets a `target` time, but the video seeks to a `rendered`
 * time that EASES toward the target every rAF frame (inertia). So fast/jittery
 * scrolls don't snap the video — it glides after them with a slight delay.
 * Seeks are chained via the `seeked` event (one seek at a time; re-seek if it
 * drifts) so no seek is dropped. All state lives in a ref → no re-renders.
 *
 * OPENER: with `opener`, the video first runs BACKWARDS from its last frame to
 * its first, under the zoom in globals.css, and only then hands over to scroll.
 * Reverse is done by walking `currentTime` down, because no browser plays a
 * video backwards reliably — `playbackRate = -1` is not supported. This file
 * was already encoded with a keyframe every 8 frames, which is what makes
 * seeking that dense survivable.
 */
const EASE = 0.1; // how fast `rendered` catches `target` per frame (lower = more lag/smoother)

/** Never sweep shorter than this, however late hydration was. */
const MIN_SWEEP_MS = 200;

export function HeroScrubVideo({
  src,
  opener = false,
}: {
  src: string;
  opener?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const st = useRef({
    target: 0,
    rendered: 0,
    isSeeking: false,
    duration: 0,
    raf: 0,
    sweeping: false,
    started: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const s = st.current;
    const track = video.closest("[data-scrub-track]") as HTMLElement | null;
    const pin = track?.querySelector("[data-pin]") as HTMLElement | null;

    const seek = (t: number) => {
      if (s.isSeeking) return;
      if (Math.abs(t - video.currentTime) <= 0.01) return;
      s.isSeeking = true;
      try {
        video.currentTime = t;
      } catch {
        /* seeking before ready throws in some browsers — ignored */
      }
    };

    // One seek finished — chain to wherever `rendered` is now.
    const onSeeked = () => {
      s.isSeeking = false;
      if (Math.abs(s.rendered - video.currentTime) > 0.01) {
        s.isSeeking = true;
        video.currentTime = s.rendered;
      }
    };

    const computeTarget = () => {
      const duration = s.duration || video.duration || 0;
      if (!duration || !track) return;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const pinH = pin?.offsetHeight || window.innerHeight;
      const scrubDist = track.offsetHeight - pinH;
      if (scrubDist <= 0) return;
      // The pin is stuck BELOW the sticky header, not at the viewport top, so
      // it latches while the page is still at scroll 0. Measuring from the
      // track's own top would waste that offset: the video would sit on frame
      // one until the reader had scrolled the header's height.
      const stickyTop = pin ? parseFloat(getComputedStyle(pin).top) || 0 : 0;
      const start = trackTop - stickyTop;
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / scrubDist),
      );
      s.target = progress * duration;
    };

    const tick = () => {
      s.rendered += (s.target - s.rendered) * EASE;
      if (Math.abs(s.target - s.rendered) < 0.008) {
        s.rendered = s.target; // settled → final seek and stop the loop
        seek(s.rendered);
        s.raf = 0;
        return;
      }
      seek(s.rendered);
      s.raf = requestAnimationFrame(tick);
    };
    const runLoop = () => {
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };

    const handOverToScroll = () => {
      s.sweeping = false;
      s.raf = 0;
      computeTarget();
      s.rendered = s.target;
      seek(s.rendered);
    };

    /** Last frame → first, finishing as the CSS zoom begins. */
    const sweepBackwards = () => {
      const d = s.duration;
      if (!d) return handOverToScroll();
      s.sweeping = true;
      // Budget is whatever is LEFT of the opener's first beat, so however long
      // hydration and metadata took, the sweep still lands on the zoom.
      const budget = Math.max(MIN_SWEEP_MS, OPENER_SWEEP_MS - performance.now());
      const from = performance.now();
      s.rendered = d;
      s.target = d;
      seek(d);
      const step = () => {
        const p = Math.min(1, (performance.now() - from) / budget);
        const t = d * (1 - p);
        s.rendered = t;
        s.target = t;
        seek(t);
        if (p < 1) {
          s.raf = requestAnimationFrame(step);
          return;
        }
        handOverToScroll();
      };
      s.raf = requestAnimationFrame(step);
    };

    const init = () => {
      if (s.started) return;
      s.started = true;
      s.duration = video.duration || 0;
      video.pause();
      if (opener) sweepBackwards();
      else handOverToScroll();
    };

    const onScroll = () => {
      if (s.sweeping) return; // the opener owns the playhead until it is done
      computeTarget();
      runLoop();
    };

    video.addEventListener("loadedmetadata", init);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (video.readyState >= 1) init();

    return () => {
      cancelAnimationFrame(s.raf);
      video.removeEventListener("loadedmetadata", init);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
    };
  }, [opener]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
