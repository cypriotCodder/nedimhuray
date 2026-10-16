import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ui } from "@/content/ui";
import { bricolage, geistMono } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";
import "@/app/globals.css";

// Runs before first paint so the page never flashes the wrong theme.
// Saved choice (see ThemeToggle) wins; otherwise follow the system.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}`;

/** The whole document, shared by each locale's root layout and the global 404. */
export function SiteShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    // suppressHydrationWarning: themeScript sets data-theme on <html> before React hydrates.
    <html lang={lang} className={`${bricolage.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the root layout, shared by each locale */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col bg-canvas text-fg">
        <a
          href="#main"
          className="label sr-only z-50 bg-fg px-3 py-2 text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {ui[lang].skipToContent}
        </a>
        <SiteHeader lang={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
