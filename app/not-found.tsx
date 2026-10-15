import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  const projects = getProjects();

  return (
    <section className="frame grid grid-cols-12 gap-x-4 pt-[clamp(2.5rem,8vh,6rem)]">
      <p className="label col-span-12 mb-10 flex justify-between md:mb-16">
        <span>Error</span>
        <span className="tabular-nums text-faint">404</span>
      </p>
      <h1 className="col-span-12 text-display font-semibold text-balance">Not in the index.</h1>
      <p className="col-span-12 mt-6 text-lead text-muted md:col-span-8 md:mt-8">
        This page doesn’t exist, or it moved. Try one of these instead.
      </p>

      <ul className="col-span-12 mt-12 border-t border-line md:col-span-8 md:mt-16">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-(--duration-fast) hover:text-accent"
            >
              <span className="label w-8 tabular-nums group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-body font-medium">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="label col-span-12 mt-8">
        <Link href="/" className="transition-colors duration-(--duration-fast) hover:text-fg">
          <span aria-hidden="true">← </span>Back to the index
        </Link>
      </p>
    </section>
  );
}
