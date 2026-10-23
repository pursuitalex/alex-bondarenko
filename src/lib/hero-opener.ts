/**
 * Timings for the hero opener, shared by the CSS in globals.css and the JS that
 * sweeps the video backwards through it.
 *
 * The sweep runs for the video's OWN length, so the gesture plays at the speed
 * it was shot at; the zoom then waits for it to finish. Earlier versions gave
 * the sweep a fixed budget and it raced — the glasses going on were over before
 * they could be read.
 */

/** Zoom to full size. MUST match the transition duration in globals.css. */
export const OPENER_ZOOM_MS = 600;

/**
 * Slack for the safety net: how long to wait for the video to become seekable
 * before opening regardless, and how much grace the sweep gets on top of its
 * own length. Without it a failed video would strand the panel at 30%.
 */
export const OPENER_MAX_WAIT_MS = 2500;
