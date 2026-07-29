import type { Metadata } from "next";
import "../globals.css";
import { en } from "@/content/en";
import { SiteShell, buildMetadata } from "@/app/site-shell";

export const metadata: Metadata = buildMetadata(en);

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell dict={en}>{children}</SiteShell>;
}
