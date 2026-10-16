import type { Label } from "@/content/types";

/*
 * Locales. English is the default and lives at the root (/, /about, /work/…);
 * every other locale lives under its own prefix (/tr, /tr/about, /tr/work/…).
 * Each locale is its own route group with its own root layout (app/(en), app/(tr)),
 * so <html lang> is right in the static HTML.
 */

export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Each locale's name in its own language, for the language switch. */
export const localeNames: Record<Locale, string> = { en: "English", tr: "Türkçe" };

/** Open Graph locale tags. */
export const ogLocales: Record<Locale, string> = { en: "en_US", tr: "tr_TR" };

/** An unprefixed site path in `lang`: "/about" → "/tr/about", "/#index" → "/tr#index". */
export function localePath(lang: Locale, path: string): string {
  if (lang === defaultLocale) return path;
  return path === "/" || path.startsWith("/#") ? `/${lang}${path.slice(1)}` : `/${lang}${path}`;
}

/** The inverse of localePath: "/tr/about" → "/about", "/tr" → "/". */
export function unprefixedPath(pathname: string): string {
  for (const lang of locales) {
    if (lang === defaultLocale) continue;
    if (pathname === `/${lang}`) return "/";
    if (pathname.startsWith(`/${lang}/`)) return pathname.slice(lang.length + 1);
  }
  return pathname;
}

/** A Label in `lang`: names that don't vary are plain strings. */
export function labelIn(label: Label, lang: Locale): string {
  return typeof label === "string" ? label : label[lang];
}
