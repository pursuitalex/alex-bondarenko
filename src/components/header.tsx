"use client";

import type { Dict } from "@/lib/dict";

const swapEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * One nav cell: a hover text-swap label + a conceptual superscript index.
 * Lives as a direct, equidistant child of the header's justify-between row.
 */
function NavItem({
  label,
  index,
  href,
  onClick,
}: {
  label: string;
  index: string;
  href?: string;
  onClick?: () => void;
}) {
  const cls =
    "group hidden items-start gap-0.5 text-[16px] leading-none text-ink md:inline-flex";
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span
          className={`block transition-transform duration-300 ${swapEase} group-hover:-translate-y-full`}
        >
          {label}
        </span>
        <span
          aria-hidden
          className={`absolute inset-0 block translate-y-full text-accent transition-transform duration-300 ${swapEase} group-hover:translate-y-0`}
        >
          {label}
        </span>
      </span>
      <span className="mt-px font-mono text-[9px] leading-none text-muted-ink/60 transition-colors duration-300 group-hover:text-accent">
        {index}
      </span>
    </>
  );

  return onClick ? (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

export function Header({
  menuOpen,
  onToggleMenu,
  onOpenMenu,
  dict,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onOpenMenu: () => void;
  dict: Dict;
}) {
  return (
    <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md">
      {/* every element is an equidistant sibling — no centred group */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8">
        <a
          href="#top"
          className="text-[16px] font-semibold tracking-tight sm:text-[18px]"
        >
          {dict.wordmark}
          <span className="text-accent">®</span>
        </a>

        {dict.nav.map((item, i) => {
          const index = String(i + 1).padStart(2, "0");
          return item.href === "#contact" ? (
            <NavItem
              key={item.href}
              label={item.label}
              index={index}
              onClick={onOpenMenu}
            />
          ) : (
            <NavItem
              key={item.href}
              label={item.label}
              index={index}
              href={item.href}
            />
          );
        })}

        <button
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? dict.ui.closeMenu : dict.ui.openMenu}
          className="-m-2 flex items-center p-2 transition-opacity hover:opacity-60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/burger-menu.svg" alt="" className="w-8" />
        </button>
      </div>
    </header>
  );
}
