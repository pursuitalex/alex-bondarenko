/**
 * Timings for the hero opener, shared by the CSS in globals.css and the JS that
 * sweeps the video backwards through it.
 *
 * The sweep is driven off the clip's own length rather than a fixed budget —
 * an early version crushed a seven-second gesture into about a second, and the
 * glasses going on were over before the eye caught them.
 */

/** Run the clip back this many times faster than it was shot. */
export const OPENER_SPEED = 2;

/**
 * Zoom to full size. MUST match the transition duration in globals.css.
 *
 * It is also the LEAD: the zoom starts this long before the sweep ends, so the
 * panel is already drifting toward the reader while the last of the gesture
 * plays, and the two land together. Starting it only after the sweep made the
 * move read as a jolt rather than an approach.
 */
export const OPENER_ZOOM_MS = 1600;

/**
 * Slack for the safety net: how long to wait for the video to become seekable
 * before opening regardless, and how much grace the sweep gets on top of its
 * own length. Without it a failed video would strand the panel at 30%.
 */
export const OPENER_MAX_WAIT_MS = 2500;
