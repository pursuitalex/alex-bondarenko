"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { Eyebrow } from "@/components/eyebrow";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { brand } from "@/lib/brand";

function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

const [firstName, lastName] = brand.fullNameLatin.split(" ");

/**
 * "Контакт" — closing full-bleed dark panel (Figma 14:1291): final CTA +
 * reassurance pillars + direct contacts + a giant Alex/Bondarenko® footer
 * wordmark with meta and a (visual-only) UA/EN switch. Elements appear with the
 * shared Reveal animation. id="contact" so hero/project CTAs land here.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="overflow-hidden rounded-frame bg-ink text-white"
    >
      <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        {/* top — eyebrow + heading + sub + CTA */}
        <div className="flex flex-col gap-10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-14">
          <div className="flex max-w-[672px] flex-col gap-7 sm:gap-8">
            <Reveal>
              <Eyebrow label="Контакти" tone="dark" />
            </Reveal>
            <div className="flex flex-col gap-5 sm:gap-6">
              <Reveal>
                <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
                  {brand.contact.heading}
                </h2>
              </Reveal>
              <Reveal>
                <p className="max-w-[440px] text-[16px] leading-[1.4] text-white/70 sm:text-[18px]">
                  {brand.contact.sub}
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1} className="shrink-0">
            <Magnetic className="inline-flex">
              <button
                onClick={openContact}
                className="group inline-flex h-[52px] items-center gap-2.5 rounded-full bg-white px-7 text-[16px] font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-white lg:h-[60px] lg:text-[18px]"
              >
                {brand.contact.cta}
                <ArrowUpRight
                  weight="bold"
                  className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </Magnetic>
          </Reveal>
        </div>

        {/* pillars + direct contacts */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {brand.contact.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <h3 className="text-[16px] font-semibold tracking-[-0.4px] text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.62] text-[#8c8c8c]">
                {p.desc}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.12}>
            <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#8c8c8c]">
              Напряму
            </p>
            <a
              href={`mailto:${brand.contacts.email}`}
              className="mt-2 block text-[14px] text-white transition-colors hover:text-accent"
            >
              {brand.contacts.email}
            </a>
            <a
              href={brand.contacts.behance.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-[14px] text-white transition-colors hover:text-accent"
            >
              Behance {brand.contacts.behance.handle}
            </a>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#8c8c8c]">
              Месенджер
            </p>
            <a
              href="https://t.me/pursuit"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-[14px] text-white transition-colors hover:text-accent"
            >
              Telegram {brand.contacts.telegram}
            </a>
            <p className="mt-1 text-[14px] text-[#8c8c8c]">{brand.location}</p>
          </Reveal>
        </div>

        {/* footer wordmark + meta */}
        <div className="mt-16 lg:mt-20">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className="text-[clamp(3.5rem,14vw,160px)] font-semibold leading-[0.8] tracking-[-0.06em] text-accent">
                {firstName}
              </span>
              <span className="text-[clamp(3.5rem,14vw,160px)] font-semibold leading-[0.8] tracking-[-0.06em] text-white">
                {lastName}
                <span className="align-top text-[0.26em] text-accent">®</span>
              </span>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[2.2px] text-[#8c8c8c] lg:flex-row lg:items-center lg:justify-between lg:text-[12px]">
              {/* © + UA/EN share a row from tablet up; nav drops to its own
                  row on phone/tablet, then rejoins inline on desktop (contents) */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:contents">
                <span>© 2026 {brand.fullName}</span>
                <span className="flex items-center gap-2">
                  <span className="text-white">UA</span>
                  <span aria-hidden>/</span>
                  <span className="opacity-40" title="Скоро">
                    EN
                  </span>
                </span>
              </div>
              <nav className="flex flex-wrap gap-x-5 gap-y-1">
                {brand.nav.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
