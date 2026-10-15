import { siteCard, ogSize } from "@/lib/og";
import { site } from "@/content/site";
import { getProjects } from "@/lib/projects";

// Default card for every page without its own (home, about, 404).
export const alt = `${site.name} — selected work`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return siteCard(getProjects());
}
