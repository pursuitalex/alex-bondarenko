import type { Metadata } from "next";
import "../globals.css";
import { uk } from "@/content/uk";
import { SiteShell, buildMetadata } from "@/app/site-shell";

export const metadata: Metadata = buildMetadata(uk);

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell dict={uk}>{children}</SiteShell>;
}
