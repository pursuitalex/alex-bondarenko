/**
 * Timings for the hero opener, shared by the CSS in globals.css and the JS that
 * sweeps the video backwards through it.
 *
 * The sweep owns the clock: the zoom waits for it to finish rather than running
 * on its own schedule. An earlier version gave the sweep whatever was LEFT of a
 * fixed deadline, so hydration and video loading ate it — on a real load it got
 * ~200ms, far too little for seeking to render more than a couple of frames,
 * and the reverse playback was never actually seen.
 */

/** How long the video takes to run from its last frame back to its first. */
export const OPENER_SWEEP_MS = 1200;

/** Zoom to full size. MUST match the transition duration in globals.css. */
export const OPENER_ZOOM_MS = 600;

/**
 * If the video has not become seekable by now, open anyway. Without this a
 * failed or very slow video would leave the panel stuck at 30% forever.
 */
export const OPENER_MAX_WAIT_MS = 2500;
