"use client";

/**
 * Tilted collage of work previews for the Process section — a window you watch
 * the reel through. Four rows drift at a constant linear speed, alternating
 * direction (top row right, next left, …), looping forever.
 *
 * Images are taken in filename order, five per row: row 0 → tablet-0…4,
 * row 1 → tablet-5…9, and so on.
 *
 * SEAMLESS LOOP: the track holds two identical copies and slides exactly -50%,
 * so the second copy lands where the first began. The spacing therefore has to
 * live on each item (`pr-*`), NOT as a flex `gap` — a gap adds one extra
 * space per copy, which makes -50% land half a gap off and the seam visibly
 * jump every lap.
 *
 * The rotated layer is sized 170% so its corners still cover the window once
 * turned; at 30° the window's own corners need ~137% to stay behind it.
 */
const ROWS = 4;
const PER_ROW = 5;
const TILT = -30; // degrees
const DURATION = 46; // seconds per lap — same for every row, so speeds match

export function WorkCollage() {
  return (
    <div className="relative aspect-[586/553] w-full overflow-hidden rounded-[20px] bg-ink">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 flex h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 lg:gap-[28px]"
        // inline rather than `rotate-[-30deg]`: Tailwind v4 does not always
        // emit a class for an arbitrary positive rotation
        style={{ rotate: `${TILT}deg` }}
      >
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className="relative min-h-0 flex-1 overflow-hidden">
            <div
              className="marquee-track h-full"
              style={{
                "--marquee-duration": `${DURATION}s`,
                // keyframes run 0 → -50% (leftward), so reversing sends it right
                animationDirection: row % 2 === 0 ? "reverse" : "normal",
              } as React.CSSProperties}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex h-full shrink-0">
                  {Array.from({ length: PER_ROW }, (_, i) => {
                    const n = row * PER_ROW + i;
                    return (
                      <div key={n} className="h-full shrink-0 pr-4 lg:pr-[28px]">
                        {/* aspect box, not `w-auto` on the image: inside a flex
                            row the image's intrinsic ratio gets overridden and
                            the frame comes out squashed */}
                        <div className="h-full aspect-[8/5] overflow-hidden rounded-[14px] lg:rounded-[25px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/work-previews/tablet-${n}.webp`}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
