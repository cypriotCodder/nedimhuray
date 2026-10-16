import type { Metadata } from "next";
import { ProjectIndex, type IndexItem } from "@/components/ProjectIndex";
import { ui } from "@/content/ui";
import { localePath, type Locale } from "@/lib/i18n";
import { alternates } from "@/lib/metadata";
import { getProjects, getProjectTotal } from "@/lib/projects";
import { getSite } from "@/lib/site";

export function homeMetadata(lang: Locale): Metadata {
  return { alternates: alternates(lang, "/") };
}

export function HomeView({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  const t = ui[lang].home;
  const projects = getProjects(lang);
  // Only send the fields the Index needs to the client.
  const items: IndexItem[] = projects.map(({ slug, title, tagline, year, role, tags, cover }) => ({
    slug,
    title,
    tagline,
    year,
    role,
    tags,
    cover,
    href: localePath(lang, `/work/${slug}`),
  }));
  const years = projects.map((p) => p.year);
  const span = `${Math.min(...years)}–${Math.max(...years)}`;

  return (
    <>
      <section className="frame grid grid-cols-12 gap-x-4 gap-y-10 pt-[clamp(4rem,14vh,10rem)] pb-section">
        <h1 className="col-span-12 text-lead font-medium md:col-span-9 lg:col-span-8">
          <span className="text-fg">{site.name}</span>
          <span className="text-faint"> — </span>
          <span className="text-muted">{site.positioning}</span>
        </h1>
        <dl className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-5 self-end md:col-span-3 md:col-start-10 md:grid-cols-1">
          <div>
            <dt className="label text-faint">{t.basedIn}</dt>
            <dd className="mt-1 text-small">{site.location}</dd>
          </div>
          <div>
            <dt className="label text-faint">{t.status}</dt>
            <dd className="mt-1 flex items-center gap-2 text-small">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {site.availability}
            </dd>
          </div>
        </dl>
      </section>

      <section id="index" aria-labelledby="index-heading" className="frame scroll-mt-8">
        <div className="label mb-4 flex justify-between">
          <h2 id="index-heading">{t.index}</h2>
          <p className="text-faint">{t.count(getProjectTotal(), span)}</p>
        </div>
        <ProjectIndex items={items} />
      </section>
    </>
  );
}
