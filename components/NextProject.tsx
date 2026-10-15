import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { CoverTransition } from "./CoverTransition";

type Props = { project: Project; number: string; total: string };

/** Footer link to the next case study; cycles back to the first. */
export function NextProject({ project, number, total }: Props) {
  return (
    <nav aria-label="Next project" className="frame mt-section">
      <Link
        href={`/work/${project.slug}`}
        className="group grid grid-cols-12 items-end gap-x-4 gap-y-6 border-t border-line pt-8"
      >
        <p className="label col-span-12 flex justify-between">
          <span>Next project</span>
          <span className="tabular-nums text-faint">
            {number} / {total}
          </span>
        </p>
        <span className="col-span-12 text-index font-semibold transition-colors duration-(--duration-fast) group-hover:text-accent group-focus-visible:text-accent md:col-span-8">
          {project.title}
          <span aria-hidden="true" className="ml-[0.15em] font-normal">
            →
          </span>
        </span>
        <CoverTransition slug={project.slug}>
          <div className="relative col-span-12 aspect-[16/10] overflow-hidden bg-surface md:col-span-4">
            <Image src={project.cover.src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        </CoverTransition>
      </Link>
    </nav>
  );
}
