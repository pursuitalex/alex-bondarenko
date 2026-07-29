"use client";

import { useSyncExternalStore } from "react";

/** Tailwind breakpoints, as media queries — keep in sync with the classes. */
export const MD = "(min-width: 768px)"; // tablet and up
export const LG = "(min-width: 1024px)"; // desktop

/**
 * Subscribes to a media query. Used where a breakpoint has to change what we
 * RENDER, not just how it looks — mounting a <video>, or skipping a
 * scroll-driven animation. Anything purely visual belongs in a Tailwind
 * `lg:` class instead.
 *
 * `resize` is listened to alongside the query itself: some environments cross
 * a breakpoint without emitting `change`, which would strand the component on
 * the wrong branch.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      window.addEventListener("resize", onChange);
      return () => {
        mq.removeEventListener("change", onChange);
        window.removeEventListener("resize", onChange);
      };
    },
    () => window.matchMedia(query).matches,
    () => false, // SSR: assume the smallest tier, upgrade on hydration
  );
}
