import { projects } from "@/content/projects";
import type { Project, ProjectSource } from "@/content/types";
import { labelIn, type Locale } from "./i18n";

/** A project's copy in one locale. */
function resolve(p: ProjectSource, lang: Locale): Project {
  return {
    ...p,
    tagline: p.tagline[lang],
    role: p.role[lang],
    tags: p.tags[lang],
    cover: { ...p.cover, alt: p.cover.alt[lang] },
    links: p.links?.map((l) => ({ label: labelIn(l.label, lang), href: l.href })),
    blocks: p.blocks[lang],
  };
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjects(lang: Locale): Project[] {
  return projects.map((p) => resolve(p, lang));
}

export function getProject(slug: string, lang: Locale): Project | undefined {
  const p = projects.find((p) => p.slug === slug);
  return p && resolve(p, lang);
}

/** The project after `slug` in index order, wrapping around to the first. */
export function getNextProject(slug: string, lang: Locale): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return resolve(projects[(i + 1) % projects.length], lang);
}

/** 1-based position, zero-padded: 1 → "01". */
export function getProjectNumber(slug: string): string {
  return String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}

/** Number of projects, zero-padded: "05". */
export function getProjectTotal(): string {
  return String(projects.length).padStart(2, "0");
}
