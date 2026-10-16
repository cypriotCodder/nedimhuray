"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, localeNames, localePath, locales, unprefixedPath, type Locale } from "@/lib/i18n";

/**
 * Link to the current page in the other language, labelled in that language.
 * A plain <a>: each locale has its own root layout, so switching is a full
 * page load either way.
 */
export function LanguageSwitch({ lang, className }: { lang: Locale; className?: string }) {
  const path = unprefixedPath(usePathname());
  const other = locales.find((l) => l !== lang) ?? defaultLocale;
  return (
    <a
      href={localePath(other, path)}
      hrefLang={other}
      lang={other}
      // The visible code stays part of the accessible name (WCAG 2.5.3).
      aria-label={`${localeNames[other]} (${other.toUpperCase()})`}
      className={className}
    >
      {other.toUpperCase()}
    </a>
  );
}
