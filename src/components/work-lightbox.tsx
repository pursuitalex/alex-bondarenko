"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import type { Dict } from "@/lib/dict";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type Work = { name: string; year: string; type: string; n: number };

/**
 * Full-size work viewer — a Dribbble-style shot page over a dark scrim.
 *
 * The mockups are single tall images (1400px wide, up to ~10 000 tall), so the
 * dialog itself scrolls and the meta bar stays pinned at the top. The image is
 * only mounted while the dialog is open, which is the point: at ~490 KB each,
 * eagerly loading ten of them would cost more than the rest of the page.
 */
export function WorkLightbox({
  work,
  onClose,
  dict,
}: {
  work: Work | null;
  onClose: () => void;
  dict: Dict;
}) {
  const lenis = useLenis();

  // Lenis drives the page scroll; leaving it running would scroll the page
  // behind the dialog. `data-lenis-prevent` below keeps the dialog scrollable.
  useEffect(() => {
    if (work) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [work, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (work) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          key="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${dict.ui.workDialogLabel}: ${work.name}`}
          data-lenis-prevent
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[#0a0a0a]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* meta bar — stays put while the mockup scrolls under it */}
          <div className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="flex min-w-0 items-baseline gap-3 sm:gap-5">
                <h2 className="truncate text-[16px] font-semibold tracking-[-0.4px] text-white sm:text-[20px]">
                  {work.name}
                </h2>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[2px] text-white/45 sm:text-[11px]">
                  {work.year} · {work.type}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label={dict.ui.close}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent"
              >
                <X weight="bold" className="size-4" />
              </button>
            </div>
          </div>

          <motion.div
            className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/works/${work.n}.webp`}
              alt={work.name}
              className="w-full rounded-[14px] sm:rounded-[20px]"
            />

            {/* closing card — author, year, contacts, one CTA */}
            <div className="mt-10 flex flex-col gap-8 rounded-[20px] border border-white/10 bg-white/[0.03] p-6 sm:mt-14 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
                <Meta label={dict.ui.author} value={dict.fullName} />
                <Meta label={dict.ui.year} value={work.year} />
                <Meta
                  label={dict.ui.directly}
                  value={dict.contacts.email}
                  href={`mailto:${dict.contacts.email}`}
                />
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={dict.contacts.behance.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-white/50 transition-colors hover:text-white"
                >
                  {dict.ui.viewOnBehance}
                </a>
                <button
                  onClick={() => {
                    onClose();
                    window.dispatchEvent(new CustomEvent("open-contact"));
                  }}
                  className="group inline-flex h-[52px] items-center gap-2.5 rounded-full bg-white px-6 text-[16px] font-medium text-ink transition-colors hover:bg-accent hover:text-white"
                >
                  {dict.cta}
                  <ArrowUpRight
                    weight="bold"
                    className="size-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[2px] text-white/40">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="text-[15px] text-white transition-colors hover:text-accent"
        >
          {value}
        </a>
      ) : (
        <span className="text-[15px] text-white">{value}</span>
      )}
    </div>
  );
}
