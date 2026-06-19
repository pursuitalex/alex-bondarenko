import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteChrome } from "@/components/site-chrome";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.wordmark} — ${brand.fullName} · UI/UX, дизайн і фронтенд`,
  description:
    "Alex Bondarenko — UI/UX і графічний дизайн, фронтенд та full-stack розробка сайтів, що підвищують конверсію та продажі. Figma, сучасні AI-інструменти та чистий код.",
  metadataBase: new URL("https://bondarenko.studio"),
  openGraph: {
    title: `${brand.wordmark} — ${brand.fullName}`,
    description:
      "Сайти, що продають. Дизайн, фронтенд і AI в одних руках — від ескізу до релізу.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-[100dvh] bg-paper text-ink antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <SiteChrome />
          {children}
        </SmoothScroll>
        <ProgressiveBlur />
        <div aria-hidden className="grain-overlay" />
      </body>
    </html>
  );
}
