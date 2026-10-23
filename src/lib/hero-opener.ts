/**
 * Timings for the hero opener, shared by the CSS animation and the JS that
 * sweeps the video backwards through it.
 *
 * These MIRROR `.hero-opener` in globals.css — change both together. The CSS
 * owns the zoom because it must be painted from the server markup, before
 * hydration; JS only has to land the video on the same beat.
 */

/** Panel stays small while the video runs backwards. = the CSS animation-delay. */
export const OPENER_SWEEP_MS = 1200;

/** Zoom out to full size. = the CSS animation-duration. */
export const OPENER_ZOOM_MS = 600;

/**
 * The CSS clock starts when styles apply; JS only wakes at hydration. So every
 * JS step is scheduled against page load, not against mount — otherwise a slow
 * hydration would drift the video out of step with the zoom.
 */
export const msUntil = (mark: number) => Math.max(0, mark - performance.now());
