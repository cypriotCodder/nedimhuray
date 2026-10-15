import Image from "next/image";
import Link from "next/link";
import type { FocusEventHandler, PointerEventHandler } from "react";
import { CoverTransition } from "./CoverTransition";
import type { IndexItem } from "./ProjectIndex";

type Props = {
  item: IndexItem;
  number: string;
  /** The first card's cover can be the LCP element on mobile. */
  eagerCover: boolean;
  /** Whether this card's cover owns the shared transition name (false while the cursor preview does). */
  shareCover: boolean;
  onPointerEnter: PointerEventHandler<HTMLAnchorElement>;
  onFocus: FocusEventHandler<HTMLAnchorElement>;
};

/**
 * One project in the Index.
 * - Wide + hover devices: a single typographic row; the cover lives in the cursor preview.
 * - Narrow or touch: the same link becomes a card with the cover inline.
 */
export function ProjectRow({ item, number, eagerCover, shareCover, onPointerEnter, onFocus }: Props) {
  const cover = (
    <div className="relative col-span-12 mb-3 aspect-[16/10] overflow-hidden bg-surface md:can-hover:hidden">
      <Image
        src={item.cover.src}
        alt={item.cover.alt}
        fill
        sizes="(min-width: 1400px) 1400px, 100vw"
        loading={eagerCover ? "eager" : "lazy"}
        fetchPriority={eagerCover ? "high" : undefined}
        className="object-cover"
      />
    </div>
  );

  // Screen readers announce the title as the link name, the rest as its description.
  const id = (part: string) => `row-${item.slug}-${part}`;

  return (
    <li>
      <Link
        href={`/work/${item.slug}`}
        aria-labelledby={id("title")}
        aria-describedby={["tagline", "role", "year", "tags"].map(id).join(" ")}
        onPointerEnter={onPointerEnter}
        onFocus={onFocus}
        className="index-row group grid grid-cols-12 gap-x-4 gap-y-3 border-b border-line py-6 transition-opacity duration-(--duration-base) ease-(--ease-out-expo) focus-visible:outline-offset-[-2px] md:items-baseline md:py-9 md:can-hover:py-7"
      >
        {shareCover ? <CoverTransition slug={item.slug}>{cover}</CoverTransition> : cover}

        {/* Number + year: a pair at the left on wide screens, split across the top line on narrow ones. */}
        <div className="label col-span-12 flex justify-between tabular-nums md:col-span-1 md:flex-col md:gap-1">
          <span className="transition-colors duration-(--duration-fast) group-hover:text-accent group-focus-visible:text-accent">
            {number}
          </span>
          <span id={id("year")} className="text-faint">
            {item.year}
          </span>
        </div>

        <h3 id={id("title")} className="col-span-12 text-index font-semibold md:col-span-8 md:pr-[0.6em]">
          {item.title}
          {/* Absolute at its static position, so it never forces a wrap; the h3 reserves its width (pr) so it never meets the meta column. */}
          <span
            aria-hidden="true"
            className="absolute ml-[0.15em] font-normal text-accent opacity-0 transition-[opacity,translate] duration-(--duration-base) ease-(--ease-out-expo) -translate-x-[0.2em] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          >
            ↗
          </span>
        </h3>

        <p id={id("tagline")} className="col-span-12 max-w-prose text-small text-muted md:can-hover:hidden">{item.tagline}</p>

        <div className="col-span-12 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:col-span-3 md:flex-col md:gap-1">
          <span id={id("role")} className="text-small">
            {item.role}
          </span>
          <ul id={id("tags")} className="label flex flex-wrap gap-x-4 text-faint">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}
