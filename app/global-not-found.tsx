import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { NotFoundView } from "@/components/views/NotFoundView";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { siteMetadata, siteViewport } from "@/lib/metadata";

// Unmatched URLs skip every layout, so this renders the full document itself.
// It can't know the visitor's language, so it's English (with the switch to Turkish in the header).
export const metadata: Metadata = { ...siteMetadata("en"), title: `${ui.en.notFound.title} — ${site.name}` };
export const viewport = siteViewport;

export default function GlobalNotFound() {
  return (
    <SiteShell lang="en">
      <NotFoundView lang="en" />
    </SiteShell>
  );
}
