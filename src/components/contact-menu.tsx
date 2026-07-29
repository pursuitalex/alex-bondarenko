"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { X, ArrowUpRight, Check } from "@phosphor-icons/react";
import type { Dict } from "@/lib/dict";

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
  dict,
}: {
  open: boolean;
  onClose: () => void;
  dict: Dict;
}) {
  const lenis = useLenis();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  // Honeypot — hidden from people, so anything here means a bot filled it in.
  const [company, setCompany] = useState("");

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

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!form.name.trim() || !form.email.trim() || !form.type) {
      setError(dict.ui.errorRequired);
      return;
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company, lang: dict.lang }),
      });
      // Only claim it was sent once the server says so — the whole point of
      // wiring this up was that the old version confirmed unconditionally.
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setError(data?.error || dict.ui.errorGeneric);
        return;
      }
      setSent(true);
    } catch {
      setError(dict.ui.errorGeneric);
    } finally {
      setSending(false);
    }
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setSent(false);
        setSending(false);
        setForm(EMPTY);
        setCompany("");
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
            aria-label={dict.ui.briefDialogLabel}
            className="absolute right-0 top-0 flex h-[100dvh] w-full flex-col overflow-y-auto bg-ink-soft p-5 text-paper sm:bottom-2 sm:right-2 sm:top-2 sm:h-auto sm:max-h-[calc(100dvh-1rem)] sm:w-[460px] sm:rounded-frame sm:p-7"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className={label}>{dict.ui.briefBadge}</span>
              <button
                onClick={onClose}
                aria-label={dict.ui.close}
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
                  {dict.ui.thanks}, {form.name.split(" ")[0]}!
                </h2>
                <p className="max-w-xs text-paper/70">
                  {dict.ui.thanksBody.replace("{email}", form.email)}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-white"
                >
                  {dict.ui.close}
                </button>
              </div>
            ) : (
              <>
                <div className="mt-8">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {dict.brief.heading}
                  </h2>
                  <p className="mt-2 text-sm text-paper/60">{dict.brief.sub}</p>
                </div>

                <form onSubmit={submit} className="mt-7 flex flex-col gap-5">
                  <label className="flex flex-col gap-2">
                    <span className={label}>{dict.ui.fieldName}</span>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder={dict.ui.namePlaceholder}
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
                    <span className={label}>{dict.ui.fieldType}</span>
                    <div className="flex flex-wrap gap-2">
                      {dict.brief.projectTypes.map((t) => (
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
                      {dict.ui.fieldBudget}{" "}
                      <span className="normal-case text-muted/60">{dict.ui.optional}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {dict.brief.budgets.map((b) => (
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
                    <span className={label}>{dict.ui.fieldMessage}</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={3}
                      placeholder={dict.ui.messagePlaceholder}
                      className={`${field} resize-none`}
                    />
                  </label>

                  {/* honeypot — off-screen, skipped by tab and by screen readers */}
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="pointer-events-none absolute left-[-9999px] size-0 opacity-0"
                  />

                  {error && (
                    <p role="alert" className="text-sm text-accent">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-paper disabled:hover:text-ink"
                  >
                    {sending ? dict.ui.sending : dict.ui.submit}
                    {!sending && (
                      <ArrowUpRight
                        weight="bold"
                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </button>
                </form>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className={label}>{dict.ui.orDirectly}</p>
                  <a
                    href={`mailto:${dict.email}`}
                    className="mt-1 inline-block underline-offset-4 hover:text-accent hover:underline"
                  >
                    {dict.email}
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
