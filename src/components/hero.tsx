"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Magnetic } from "@/components/magnetic";
import { HeroCard } from "@/components/hero-card";
import { HeroBackground } from "@/components/hero-background";
// import { HeroReveal } from "@/components/hero-reveal"; // cursor water-drops reveal — temporarily disabled (keep)
import { brand } from "@/lib/brand";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const clipUp: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

/** Roles list — Geist SemiBold 20px / white 90% / 8px accent dot / 20px gap. */
function RolesList({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-col gap-4 ${className ?? ""}`}>
      {brand.roles.map((role) => (
        <li
          key={role}
          className="flex items-center gap-5 text-[20px] font-medium leading-[18px] text-white/90"
        >
          <span className="size-2 shrink-0 rounded-full bg-accent" />
          {role}
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";

  return (
    <section
      id="top"
      className="relative flex min-h-[88dvh] flex-col justify-between overflow-hidden rounded-frame bg-ink px-5 pb-10 pt-8 text-white sm:px-8 lg:px-[52px] lg:pb-[60px] lg:pt-12"
    >
      {/* background — scrubbed video on desktop, static photo + fade on
          phone/tablet. The cursor water-drops reveal is still kept in
          hero-reveal.tsx if we ever revert. */}
      <HeroBackground />

      {/* eyebrow — Geist Mono 10px (mobile) → 12px / 1.2px / uppercase / 90% */}
      <motion.div
        variants={container}
        initial={initial}
        animate="show"
        className="relative z-10 flex items-start justify-between gap-4 font-mono text-[10px] uppercase leading-[14px] tracking-[1.2px] text-white/90 sm:text-[11px] sm:leading-[15px] lg:text-[12px] lg:leading-[16.5px]"
      >
        <motion.span variants={fadeUp}>
          <span className="text-accent">/</span> {brand.fullName} — {brand.tagline}
        </motion.span>
        <motion.span variants={fadeUp} className="text-right">
          <span className="text-accent">/</span> {brand.availability}
        </motion.span>
      </motion.div>

      {/* wordmark + roles */}
      <motion.div
        variants={container}
        initial={initial}
        animate="show"
        className="relative z-10 flex flex-col gap-10 py-6 xl:flex-row xl:items-end xl:justify-between xl:gap-6"
      >
        <h1
          aria-label={`${brand.wordmark} — Alex — ${brand.fullName}`}
          className="font-semibold leading-[0.9]"
        >
          <span className="block overflow-hidden text-[clamp(2.8rem,10vw,11.25rem)] pt-[0.1em] pr-[0.14em] pb-[0.06em]">
            <motion.span
              variants={clipUp}
              className="block tracking-[-0.08em]"
            >
              {brand.wordmark}
              <span className="align-top text-[0.29em] text-accent">®</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={clipUp}
              className="block pl-2.5 text-[clamp(1.6rem,5.6vw,6.25rem)] tracking-[-0.08em] text-accent"
            >
              Alex
            </motion.span>
          </span>
        </h1>

        <motion.div variants={fadeUp} className="shrink-0 xl:w-1/4 xl:pb-2">
          <RolesList />
        </motion.div>
      </motion.div>

      {/* bottom row */}
      <motion.div
        variants={container}
        initial={initial}
        animate="show"
        className="relative z-10 flex flex-col gap-8 border-t border-white/30 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pt-[49px]"
      >
        <motion.div variants={fadeUp} className="max-w-[432px]">
          <p className="text-[20px] font-medium leading-[1.2] tracking-[-0.6px] text-white">
            {brand.offer}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic className="inline-flex">
              <button
                onClick={openContact}
                className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-white px-7 text-[16px] font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-white active:scale-[0.98] lg:h-[60px] lg:text-[18px]"
              >
                {brand.cta}
                <ArrowUpRight
                  weight="bold"
                  className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </Magnetic>
            <a
              href="#work"
              className="text-[18px] leading-[20px] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {brand.ctaSecondary}
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="w-full lg:w-2/5 xl:w-1/4">
          <HeroCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
