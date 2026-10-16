import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n";
import { getProjectSlugs } from "@/lib/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).toString();
  const pages = [
    { path: "/", priority: 1 },
    ...getProjectSlugs().map((slug) => ({ path: `/work/${slug}`, priority: 0.8 })),
    { path: "/about", priority: 0.5 },
  ];
  // Every page in every locale, each listing all of its translations.
  return locales.flatMap((lang) =>
    pages.map(({ path, priority }) => ({
      url: url(localePath(lang, path)),
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, url(localePath(l, path))])) },
    })),
  );
}
