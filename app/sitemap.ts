import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).toString();
  return [
    { url: url("/"), priority: 1 },
    ...getProjects().map((p) => ({ url: url(`/work/${p.slug}`), priority: 0.8 })),
    { url: url("/about"), priority: 0.5 },
  ];
}
