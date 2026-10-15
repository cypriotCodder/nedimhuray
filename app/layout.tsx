import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { themeColors } from "@/lib/theme";
import "./globals.css";

// Display + body: one variable grotesque with an optical-size axis, so the
// same family works at 9rem titles and 1rem body copy.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

// Metadata: mono for numbers, years, roles, tags.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${site.name} — Selected work`, template: `%s — ${site.name}` },
  description: site.positioning,
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: site.name, locale: "en", url: "./" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  // Follows the system theme; ThemeToggle overrides both tags after a manual choice.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
  colorScheme: "dark light",
};

// Runs before first paint so the page never flashes the wrong theme.
// Saved choice (see ThemeToggle) wins; otherwise follow the system.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: themeScript sets data-theme on <html> before React hydrates.
    <html lang="en" className={`${bricolage.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col bg-canvas text-fg">
        <a
          href="#main"
          className="label sr-only z-50 bg-fg px-3 py-2 text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
