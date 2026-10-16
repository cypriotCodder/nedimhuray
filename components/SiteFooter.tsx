import type { Locale } from "@/lib/i18n";
import { getSite } from "@/lib/site";

export function SiteFooter({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  return (
    <footer className="frame mt-section border-t border-line py-8 md:py-10">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <a
          href={`mailto:${site.email}`}
          className="text-lead font-medium transition-colors duration-(--duration-fast) hover:text-accent md:col-span-7"
        >
          {site.email}
        </a>
        <ul className="label flex gap-6 md:col-span-3">
          {site.socials.map((s) => (
            <li key={s.href}>
              {/* lang="en": brand names, so Turkish casing doesn't uppercase them to "GİTHUB". */}
              <a href={s.href} lang="en" className="transition-colors duration-(--duration-fast) hover:text-fg" rel="me noopener">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="label text-faint md:col-span-2 md:text-right">© {site.name}</p>
      </div>
    </footer>
  );
}
