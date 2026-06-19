/**
 * Shared layout widths — derived from the Figma 12-col grid (1920 frame, 8px gutter).
 *
 * contentWide — "wide content block". In Figma the block content is 1490px,
 * inset 215px (≈11.2%) on each side of the 1920 frame = the CENTRAL 10 of 12
 * columns (1 empty column + margin on each side). We reproduce that as
 * proportional side padding ramping to ~11% on the design width (no max-width,
 * so it stays proportional). Use for every block that shares this width so they
 * all align to the same left/right edges.
 *
 * contentCol — narrow reading column for long-form text sections.
 */
export const contentWide =
  "mx-auto w-full lg:px-[6%] xl:px-[8%] 2xl:px-[11%]";

export const contentCol = "mx-auto w-full max-w-5xl px-2 sm:px-6";
