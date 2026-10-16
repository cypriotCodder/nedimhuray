import { siteCardAlt, siteCard, ogSize } from "@/lib/og";
import { getProjects } from "@/lib/projects";

// Default card for every page without its own (home, about, 404).
export const alt = siteCardAlt("en");
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return siteCard(getProjects("en"), "en");
}
