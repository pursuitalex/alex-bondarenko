/**
 * Approach — a NARROW content block (no panel) that sits in the site's
 * content column, demonstrating the width step-down after the full-width
 * hero. The wide accent panel returns with the About section below.
 */
export function Manifesto() {
  return (
    <section id="approach" className="py-20 sm:py-28 lg:py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">
        (02 — Підхід)
      </p>
      <h2 className="mt-6 max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        Жодних шаблонних сайтів. Тільки дизайн і код, що працюють на{" "}
        <span className="text-accent">конверсію</span> та продажі.
      </h2>
    </section>
  );
}
