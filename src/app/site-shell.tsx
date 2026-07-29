import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteChrome } from "@/components/site-chrome";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { localeHref, type Dict, type Lang } from "@/lib/dict";

/**
 * The <html>/<body> shell, shared by both language roots.
 *
 * Each language needs its own root layout so `<html lang>` is actually correct
 * — a nested layout cannot change it. Route groups give us that: `(uk)` serves
 * `/`, `(en)` serves `/en`. The only cost is that switching language is a full
 * page load, which for a language switch is the honest behaviour anyway.
 */
export function SiteShell({
  dict,
  children,
}: {
  dict: Dict;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={dict.meta.htmlLang}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-[100dvh] bg-paper text-ink antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <SiteChrome dict={dict} />
          {children}
        </SmoothScroll>
        <ProgressiveBlur />
        <div aria-hidden className="grain-overlay" />
      </body>
    </html>
  );
}

/**
 * Per-language metadata. `alternates` tells crawlers the two pages are the same
 * content in different languages, which is what stops them being read as
 * duplicates.
 */
export function buildMetadata(dict: Dict): Metadata {
  const lang = dict.lang as Lang;
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL("https://bondarenko.studio"),
    alternates: {
      canonical: localeHref[lang],
      languages: {
        uk: localeHref.uk,
        en: localeHref.en,
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale: lang === "uk" ? "uk_UA" : "en_US",
    },
  };
}
