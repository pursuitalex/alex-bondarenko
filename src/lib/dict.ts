import { uk } from "@/content/uk";
import { en } from "@/content/en";

/**
 * The two site dictionaries and the helpers around them.
 *
 * Ukrainian is served from `/`, English from `/en` — chosen manually via the
 * footer switch, never auto-detected, so a URL always shows the same language
 * to a visitor and to a crawler.
 *
 * `Dict` is the Ukrainian object's own type, and en.ts is annotated with it, so
 * a key added to one language and forgotten in the other is a build error.
 */
export const dictionaries = { uk, en };

export type Lang = keyof typeof dictionaries;
export type Dict = typeof uk;

export const LANGS = Object.keys(dictionaries) as Lang[];

/** Where each language lives. Ukrainian keeps the bare root. */
export const localeHref: Record<Lang, string> = {
  uk: "/",
  en: "/en",
};

/**
 * Switch labels. Kept out of the dictionaries on purpose: the switch shows both
 * languages at once, and pulling in the other dictionary just to read one label
 * would ship the whole opposite-language copy to the client.
 */
export const langLabels: Record<Lang, string> = {
  uk: "UA",
  en: "EN",
};

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}
