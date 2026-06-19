"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { X, ArrowUpRight, Check } from "@phosphor-icons/react";
import { brand } from "@/lib/brand";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type FormState = {
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = { name: "", email: "", type: "", budget: "", message: "" };

const chip = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
    active
      ? "border-accent bg-accent text-white"
      : "border-white/15 text-muted hover:border-white/40 hover:text-paper"
  }`;

const field =
  "rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-paper outline-none transition-colors placeholder:text-muted focus:border-accent";

const label = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted";

export function ContactMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lenis = useLenis();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.type) {
      setError("Заповніть ім'я, email і тип проєкту.");
      return;
    }
    // TODO: wire to Resend / Formspree backend. For now confirm locally.
    setSent(true);
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setSent(false);
        setForm(EMPTY);
        setError("");
      }}
    >
      {open && (
        <div key="contact-menu" className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.aside
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Заявка на проєкт"
            className="absolute right-0 top-0 flex h-[100dvh] w-full flex-col overflow-y-auto bg-ink-soft p-5 text-paper sm:bottom-2 sm:right-2 sm:top-2 sm:h-auto sm:max-h-[calc(100dvh-1rem)] sm:w-[460px] sm:rounded-frame sm:p-7"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className={label}>(Заявка)</span>
              <button
                onClick={onClose}
                aria-label="Закрити"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent"
              >
                <X weight="bold" className="size-4" />
              </button>
            </div>

            {sent ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-4 py-16">
                <span className="flex size-12 items-center justify-center rounded-full bg-accent text-white">
                  <Check weight="bold" className="size-6" />
                </span>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Дякую, {form.name.split(" ")[0]}!
                </h2>
                <p className="max-w-xs text-paper/70">
                  Заявку отримав. Відповім на {form.email} протягом 24 годин.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-white"
                >
                  Закрити
                </button>
              </div>
            ) : (
              <>
                <div className="mt-8">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {brand.brief.heading}
                  </h2>
                  <p className="mt-2 text-sm text-paper/60">{brand.brief.sub}</p>
                </div>

                <form onSubmit={submit} className="mt-7 flex flex-col gap-5">
                  <label className="flex flex-col gap-2">
                    <span className={label}>Ім&apos;я</span>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Як до вас звертатися"
                      className={field}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={label}>Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@company.com"
                      className={field}
                    />
                  </label>

                  <div className="flex flex-col gap-2">
                    <span className={label}>Тип проєкту</span>
                    <div className="flex flex-wrap gap-2">
                      {brand.brief.projectTypes.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => set("type", t)}
                          className={chip(form.type === t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className={label}>
                      Бюджет{" "}
                      <span className="normal-case text-muted/60">(необов&apos;язково)</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {brand.brief.budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => set("budget", form.budget === b ? "" : b)}
                          className={chip(form.budget === b)}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className={label}>Про проєкт</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={3}
                      placeholder="Кілька речень про задачу, дедлайн, посилання…"
                      className={`${field} resize-none`}
                    />
                  </label>

                  {error && <p className="text-sm text-accent">{error}</p>}

                  <button
                    type="submit"
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-white active:scale-[0.98]"
                  >
                    Надіслати заявку
                    <ArrowUpRight
                      weight="bold"
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </form>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className={label}>Або напряму</p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1 inline-block underline-offset-4 hover:text-accent hover:underline"
                  >
                    {brand.email}
                  </a>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
