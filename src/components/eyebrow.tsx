/**
 * Reusable section eyebrow (Figma 19:180): circle-plus icon + mono uppercase
 * label. Used across many sections. `tone="dark"` inverts the icon (→ white)
 * and lightens the label for use on dark panels.
 */
export function Eyebrow({
  label,
  tone = "light",
  className = "",
}: {
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/circle-plus.svg"
        alt=""
        className={`size-5 shrink-0 sm:size-6 ${tone === "dark" ? "invert" : ""}`}
      />
      <span
        className={`font-mono text-[10px] uppercase leading-[16.5px] tracking-[1.2px] sm:text-[12px] ${
          tone === "dark" ? "text-white/70" : "text-muted-ink"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
