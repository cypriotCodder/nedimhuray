import type { Metadata } from "next";
import Link from "next/link";
import { ui } from "@/content/ui";
import { localePath, type Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";

export function notFoundMetadata(lang: Locale): Metadata {
  return { title: ui[lang].notFound.title };
}

export function NotFoundView({ lang }: { lang: Locale }) {
  const t = ui[lang].notFound;
  const projects = getProjects(lang);

  return (
    <section className="frame grid grid-cols-12 gap-x-4 pt-[clamp(2.5rem,8vh,6rem)]">
      <p className="label col-span-12 mb-10 flex justify-between md:mb-16">
        <span>{t.label}</span>
        <span className="tabular-nums text-faint">404</span>
      </p>
      <h1 className="col-span-12 text-display font-semibold text-balance">{t.heading}</h1>
      <p className="col-span-12 mt-6 text-lead text-muted md:col-span-8 md:mt-8">
        {t.body}
      </p>

      <ul className="col-span-12 mt-12 border-t border-line md:col-span-8 md:mt-16">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={localePath(lang, `/work/${p.slug}`)}
              className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-(--duration-fast) hover:text-accent"
            >
              <span className="label w-8 tabular-nums group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-body font-medium">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="label col-span-12 mt-8">
        <Link href={localePath(lang, "/")} className="transition-colors duration-(--duration-fast) hover:text-fg">
          <span aria-hidden="true">← </span>
          {t.back}
        </Link>
      </p>
    </section>
  );
}
