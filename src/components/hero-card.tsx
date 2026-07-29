"use client";

import type { Dict } from "@/lib/dict";

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

/**
 * Contact card — Figma 14:808 / 14:810: white-framed portrait + white content
 * panel with THREE justify-between groups (role+name / email / pill).
 * Height is flexible (min-h-[160px]) so it adapts when the column narrows
 * (e.g. at 1440 the right column is 25% / 3-of-12 cols). Plain <img>.
 */
export function HeroCard({ dict }: { dict: Dict }) {
  return (
    <div className="flex w-full items-stretch text-ink">
      {/* photo block — white frame, stretches to card height */}
      <div className="w-[130px] shrink-0 overflow-hidden rounded-[20px] border-[6px] border-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pic-photo.webp"
          alt={dict.fullName}
          className="h-full w-full object-cover"
        />
      </div>

      {/* content block — 3 groups distributed top/middle/bottom */}
      <div className="flex min-h-[160px] flex-1 flex-col justify-between gap-3 rounded-[20px] bg-white p-5">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-semibold leading-[15px] tracking-[-0.22px] text-[#5b5b5b]">
            {dict.tagline}
          </p>
          <p className="text-xl font-semibold leading-[1.05] tracking-[-0.45px] text-[#0a0a0a]">
            {dict.fullName}
          </p>
        </div>

        <p className="font-mono text-[11px] font-semibold leading-[15px] tracking-[-0.22px] text-[#5b5b5b]">
          {dict.contacts.email}
        </p>

        <button
          onClick={openContact}
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent"
        >
          {dict.ui.letsTalk}
          <span className="size-1.5 rounded-full bg-accent transition-colors duration-300 group-hover:bg-white" />
        </button>
      </div>
    </div>
  );
}
