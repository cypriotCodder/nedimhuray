import type { Metadata, Viewport } from "next";
import { ui } from "@/content/ui";
import { defaultLocale, localePath, locales, ogLocales, type Locale } from "./i18n";
import { getSite } from "./site";
import { siteUrl } from "./site-url";
import { themeColors } from "./theme";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * Open Graph fields every page repeats (a page's openGraph replaces the
 * layout's rather than merging with it).
 */
export function openGraph(lang: Locale, fields: OpenGraph = {}): OpenGraph {
  return {
    type: "website",
    siteName: getSite(lang).name,
    locale: ogLocales[lang],
    alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
    url: "./",
    ...fields,
  };
}

/** Canonical URL plus hreflang links to the same page in every locale. `path` is unprefixed. */
export function alternates(lang: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localePath(lang, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
      "x-default": localePath(defaultLocale, path),
    },
  };
}

/** Site-wide metadata for a locale's root layout. */
export function siteMetadata(lang: Locale): Metadata {
  const site = getSite(lang);
  return {
    metadataBase: siteUrl,
    title: { default: `${site.name} — ${ui[lang].home.title}`, template: `%s — ${site.name}` },
    description: site.description,
    alternates: { canonical: "./" },
    openGraph: openGraph(lang),
    twitter: { card: "summary_large_image" },
  };
}

export const siteViewport: Viewport = {
  // Follows the system theme; ThemeToggle overrides both tags after a manual choice.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
  colorScheme: "dark light",
};
