import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { CoverTransition } from "@/components/CoverTransition";
import { NextProject } from "@/components/NextProject";
import { site } from "@/content/site";
import { getNextProject, getProject, getProjectNumber, getProjects } from "@/lib/projects";

// Every case study is prerendered at build time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    // openGraph replaces (not merges with) the layout's, so repeat siteName.
    openGraph: { type: "article", siteName: site.name, title: project.title, description: project.tagline, url: "./" },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const total = String(getProjects().length).padStart(2, "0");
  const facts: { term: string; value: ReactNode }[] = [
    { term: "Role", value: project.role },
    { term: "Year", value: project.year },
    { term: "Stack", value: project.stack?.join(", ") ?? "—" },
    {
      term: "Links",
      value: project.links?.length ? (
        <ul className="flex flex-col gap-1">
          {project.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="underline decoration-line underline-offset-4 transition-colors duration-(--duration-fast) hover:text-accent hover:decoration-accent"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        "—"
      ),
    },
  ];

  return (
    <article>
      <header className="frame grid grid-cols-12 gap-x-4 pt-[clamp(2.5rem,8vh,6rem)] pb-10 md:pb-14">
        <div className="label col-span-12 mb-10 flex justify-between md:mb-16">
          <Link href="/#index" className="transition-colors duration-(--duration-fast) hover:text-fg">
            <span aria-hidden="true">← </span>Index
          </Link>
          <span className="tabular-nums text-faint">
            {getProjectNumber(slug)} / {total}
          </span>
        </div>
        <h1 className="col-span-12 text-display font-semibold text-balance">{project.title}</h1>
        <p className="col-span-12 mt-6 text-lead text-muted text-pretty md:col-span-9 md:mt-8 lg:col-span-8">
          {project.tagline}
        </p>
      </header>

      {/* LCP element: eager + high priority, sized by aspect ratio (no layout shift).
          Shares its transition name with the cover the visitor clicked to get here. */}
      <CoverTransition slug={project.slug}>
        <div className="relative aspect-[16/10] max-h-[85svh] w-full overflow-hidden bg-surface">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>
      </CoverTransition>

      <dl className="frame grid grid-cols-2 gap-x-4 gap-y-6 border-b border-line py-8 md:grid-cols-12 md:py-10">
        {facts.map((f) => (
          <div key={f.term} className="md:col-span-3">
            <dt className="label text-faint">{f.term}</dt>
            <dd className="mt-2 text-small">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-block">
        <BlockRenderer blocks={project.blocks} />
      </div>

      <NextProject project={next} number={getProjectNumber(next.slug)} total={total} />
    </article>
  );
}
