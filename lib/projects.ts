import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The project after `slug` in index order, wrapping around to the first. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/** 1-based position, zero-padded: 1 → "01". */
export function getProjectNumber(slug: string): string {
  return String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}
