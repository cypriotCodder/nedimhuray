"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { themeColors } from "@/lib/theme";

/*
 * Light/dark switch. The theme lives in <html data-theme>, which the pre-paint
 * script in app/layout.tsx sets; this button flips it and remembers the choice.
 * Until the visitor chooses, the site keeps following their system setting.
 */

type Theme = "light" | "dark";
const KEY = "theme";
const LIGHT_QUERY = "(prefers-color-scheme: light)";

const root = () => document.documentElement;
const currentTheme = (): Theme => (root().dataset.theme === "light" ? "light" : "dark");

function savedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null; // storage blocked: behave as if nothing was saved
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  // null during SSR/hydration, then the real theme.
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

  // Point the browser UI colour at the active theme (the server tags only know the
  // system setting). Re-run per route: client navigation re-renders the metadata tags.
  const pathname = usePathname();
  useEffect(() => {
    if (!theme) return;
    for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
      meta.content = themeColors[theme];
    }
  }, [theme, pathname]);

  useEffect(() => {
    const mq = matchMedia(LIGHT_QUERY);
    const follow = () => {
      if (!savedTheme()) root().dataset.theme = mq.matches ? "light" : "dark";
    };
    mq.addEventListener("change", follow);
    return () => mq.removeEventListener("change", follow);
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    root().dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // storage blocked: the switch still works for this page view
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className="-m-2 grid cursor-pointer place-items-center p-2 transition-colors duration-(--duration-fast) hover:text-fg"
    >
      {/* Half-filled disc: reads as "contrast" in either theme. */}
      <span
        aria-hidden="true"
        className="block size-3 rounded-full border border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]"
      />
    </button>
  );
}
