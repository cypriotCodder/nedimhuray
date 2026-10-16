import { SiteShell } from "@/components/SiteShell";
import { siteMetadata, siteViewport } from "@/lib/metadata";

export const metadata = siteMetadata("tr");
export const viewport = siteViewport;

export default function Layout({ children }: LayoutProps<"/tr">) {
  return <SiteShell lang="tr">{children}</SiteShell>;
}
