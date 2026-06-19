"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { ContactMenu } from "@/components/contact-menu";

/**
 * Owns the open/close state for the burger contact drawer and wires the
 * header + drawer together. Any CTA on the page can open the drawer by
 * dispatching a window "open-contact" event.
 */
export function SiteChrome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openMenu = () => setOpen(true);
    window.addEventListener("open-contact", openMenu);
    return () => window.removeEventListener("open-contact", openMenu);
  }, []);

  return (
    <>
      <Header
        menuOpen={open}
        onToggleMenu={() => setOpen((v) => !v)}
        onOpenMenu={() => setOpen(true)}
      />
      <ContactMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
