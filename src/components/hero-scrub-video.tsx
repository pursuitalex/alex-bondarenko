"use client";

import { useEffect, useRef } from "react";

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
 */
const EASE = 0.1; // how fast `rendered` catches `target` per frame (lower = more lag/smoother)

export function HeroScrubVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const st = useRef({ target: 0, rendered: 0, isSeeking: false, duration: 0, raf: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const s = st.current;
    const track = video.closest("[data-scrub-track]") as HTMLElement | null;
    const pin = track?.querySelector("[data-pin]") as HTMLElement | null;

    const init = () => {
      s.duration = video.duration || 0;
      video.pause();
    };

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
      const scrubDist =
        track.offsetHeight - (pin?.offsetHeight || window.innerHeight);
      if (scrubDist <= 0) return;
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - trackTop) / scrubDist),
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

    const onScroll = () => {
      computeTarget();
      runLoop();
    };

    video.addEventListener("loadedmetadata", init);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (video.readyState >= 1) init();
    computeTarget();
    s.rendered = s.target; // start in sync (no ease-in on load)
    seek(s.rendered);

    return () => {
      cancelAnimationFrame(s.raf);
      video.removeEventListener("loadedmetadata", init);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
