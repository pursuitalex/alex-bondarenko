"use client";

import { useEffect, useRef } from "react";
import { OPENER_MAX_WAIT_MS, OPENER_SPEED } from "@/lib/hero-opener";

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

export function HeroScrubVideo({
  src,
  opener = false,
  onOpenerStart,
  onOpenerDone,
}: {
  src: string;
  opener?: boolean;
  /** Fired with how long the sweep will take, once it actually begins. */
  onOpenerStart?: (sweepMs: number) => void;
  /** Fired when the backwards sweep lands on frame 0, so the zoom can start. */
  onOpenerDone?: () => void;
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
    openerDone: false,
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
      // During the sweep the rAF loop alone decides the next frame. Chaining
      // here as well meant two drivers racing, and a seek could land out of
      // order — seen as a single blink partway through the opener.
      if (s.sweeping) return;
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

    /** Sweep over (or impossible): hand the playhead to scroll and cue the zoom. */
    const finishOpener = () => {
      if (s.openerDone) return;
      s.openerDone = true;
      handOverToScroll();
      onOpenerDone?.();
    };

    /** Last frame → first. The zoom waits on this, so it gets its full run. */
    const sweepBackwards = () => {
      const d = s.duration;
      if (!d) return finishOpener();
      s.sweeping = true;
      // The clip's own length, taken faster: slow enough to read the gesture,
      // quick enough not to hold the reader. A fixed budget made it race.
      const budget = (d * 1000) / OPENER_SPEED;
      onOpenerStart?.(budget);
      const from = performance.now();
      // A hair short of the end: seeking exactly to duration lands past the
      // last frame in some browsers and paints nothing.
      const last = Math.max(0, d - 0.04);
      s.rendered = last;
      s.target = last;
      seek(last);
      const step = () => {
        const p = Math.min(1, (performance.now() - from) / budget);
        const t = last * (1 - p);
        s.rendered = t;
        s.target = t;
        seek(t);
        if (p < 1) {
          s.raf = requestAnimationFrame(step);
          return;
        }
        finishOpener();
      };
      s.raf = requestAnimationFrame(step);
    };

    const init = () => {
      if (s.started) return;
      s.started = true;
      s.duration = video.duration || 0;
      video.pause();
      handOverToScroll();
    };

    // The sweep seeks hard and backwards, so it waits for decodable data rather
    // than just metadata — starting on metadata alone meant seeking against a
    // file the browser had barely begun fetching, and most frames never drew.
    const startSweepWhenReady = () => {
      if (s.started || s.openerDone) return;
      clearTimeout(giveUp);
      s.started = true;
      s.duration = video.duration || 0;
      video.pause();
      sweepBackwards();
    };

    const onScroll = () => {
      if (s.sweeping) return; // the opener owns the playhead until it is done
      computeTarget();
      runLoop();
    };

    // If the file never becomes seekable, give up waiting and let the panel
    // open — handled here because this is the only place that knows.
    const giveUp = opener
      ? setTimeout(finishOpener, OPENER_MAX_WAIT_MS)
      : undefined;

    const onReady = opener ? startSweepWhenReady : init;
    // HAVE_FUTURE_DATA: enough buffered to decode around the playhead.
    const readyEvent = opener ? "canplay" : "loadedmetadata";
    const readyState = opener ? 3 : 1;

    video.addEventListener(readyEvent, onReady);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (video.readyState >= readyState) onReady();

    return () => {
      clearTimeout(giveUp);
      cancelAnimationFrame(s.raf);
      video.removeEventListener(readyEvent, onReady);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
    };
  }, [opener, onOpenerDone, onOpenerStart]);

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
