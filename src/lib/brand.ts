/**
 * Locale-independent brand data — the things that read the same in every
 * language: names, contacts, tool names, icon indexes.
 *
 * Every dictionary in src/content spreads this in, so components reach all of
 * it through the single `dict` object they already receive. Keeping it here
 * rather than copying it per locale means a changed phone number is changed
 * once, not once per language.
 *
 * All human-readable COPY lives in src/content/uk.ts and en.ts.
 */
export const shared = {
  wordmark: "Bondarenko", // swappable: "Bondarenko" | "Pursuit"
  studioLabel: "Studio",
  fullNameLatin: "Alex Bondarenko",

  // Tech stack grid (Figma 14:1362). icon = /public/tech-icons/{n}.svg
  stack: [
    { name: "Figma", icon: 1 },
    { name: "Photoshop", icon: 2 },
    { name: "Illustrator", icon: 4 }, // 4.svg = Ai mark (Figma had 3/4 swapped vs labels)
    { name: "AfterEffects", icon: 3 }, // 3.svg = Ae mark
    { name: "Next.js", icon: 5 },
    { name: "React", icon: 6 },
    { name: "Typescript", icon: 7 },
    { name: "Three.js", icon: 8 },
    { name: "Claude", icon: 9 },
    { name: "GSAP", icon: 10 },
    { name: "Supabase", icon: 11 },
    { name: "VS Code", icon: 12 },
  ],

  tools: [
    "Figma",
    "Photoshop",
    "Illustrator",
    "After Effects",
    "Next.js",
    "React",
    "TypeScript",
    "Cursor",
    "VS Code",
    "Supabase",
    "GSAP",
    "Framer Motion",
  ],

  contacts: {
    email: "pursuit.alex@gmail.com",
    phone: "+380 50 435 4821",
    telegram: "@pursuit",
    behance: {
      handle: "@pursuitalex",
      url: "https://www.behance.net/pursuitalex",
    },
  },
  email: "pursuit.alex@gmail.com",
};
