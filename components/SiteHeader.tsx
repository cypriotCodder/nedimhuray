import Link from "next/link";
import { ui } from "@/content/ui";
import { localePath, type Locale } from "@/lib/i18n";
import { getProjectTotal } from "@/lib/projects";
import { getSite } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

const linkClass = "transition-colors duration-(--duration-fast) hover:text-fg aria-[current=page]:text-fg";

export function SiteHeader({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  const t = ui[lang].nav;
  const home = localePath(lang, "/");
  const about = localePath(lang, "/about");

  return (
    <header className="frame flex items-baseline justify-between gap-4 py-5 md:py-7">
      <Link href={home} className="shrink-0 text-small font-semibold tracking-tight">
        {site.name}
        <span className="text-accent" aria-hidden="true">
          .
        </span>
      </Link>
      <nav aria-label={t.label}>
        <ul className="label flex items-center gap-4 whitespace-nowrap sm:gap-6">
          <li>
            <NavLink href={localePath(lang, "/#index")} match={home} className={linkClass}>
              {t.index}
              {/* The count makes room for the language switch on phones (the home page repeats it). */}
              <span className="hidden text-faint sm:inline"> ({getProjectTotal()})</span>
            </NavLink>
          </li>
          <li>
            <NavLink href={about} match={about} className={linkClass}>
              {t.about}
            </NavLink>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className={linkClass}>
              {t.contact}
            </a>
          </li>
          <li>
            <LanguageSwitch lang={lang} className={linkClass} />
          </li>
          <li className="flex">
            <ThemeToggle label={ui[lang].themeToggle} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
