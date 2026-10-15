"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useSyncExternalStore, type FocusEvent, type PointerEvent } from "react";
import type { Project } from "@/content/types";
import type { PreviewHandle } from "./CursorPreview";
import { ProjectRow } from "./ProjectRow";

// Only fine-pointer, wide screens ever render the preview, so it (and Motion)
// is code-split and fetched after hydration; phones never download it.
const CursorPreview = dynamic(() => import("./CursorPreview").then((mod) => mod.CursorPreview), { ssr: false });

export type IndexItem = Pick<Project, "slug" | "title" | "tagline" | "year" | "role" | "tags" | "cover">;

// Same condition as the `md:can-hover:` CSS variant: wide + true hover device.
const PREVIEW_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 48rem)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(PREVIEW_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePreviewEnabled() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PREVIEW_QUERY).matches,
    () => false,
  );
}

export function ProjectIndex({ items }: { items: IndexItem[] }) {
  const enabled = usePreviewEnabled();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const previewRef = useRef<PreviewHandle>(null);
  const placeAt = (px: number, py: number, above = false) => previewRef.current?.moveTo(px, py, { above });

  const onPointerMove = (e: PointerEvent) => {
    if (enabled && e.pointerType === "mouse") placeAt(e.clientX, e.clientY);
  };

  // Keyboard users get the preview too: after the title's arrow, sitting above the
  // focused row so it covers the dimmed row above rather than this row's details.
  const onRowFocus = (slug: string, e: FocusEvent<HTMLAnchorElement>) => {
    if (!enabled || !e.currentTarget.matches(":focus-visible")) return;
    const row = e.currentTarget.getBoundingClientRect();
    const arrow = e.currentTarget.querySelector("h3 > [aria-hidden]");
    const x = arrow ? arrow.getBoundingClientRect().right : row.left + row.width * 0.6;
    placeAt(x, row.top, true);
    setActiveSlug(slug);
  };

  const onListBlur = (e: FocusEvent<HTMLUListElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setActiveSlug(null);
  };

  return (
    <>
      <ul
        className="index-list overflow-x-clip border-t border-line"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActiveSlug(null)}
        onBlur={onListBlur}
      >
        {items.map((item, i) => (
          <ProjectRow
            key={item.slug}
            item={item}
            number={String(i + 1).padStart(2, "0")}
            eagerCover={i === 0}
            shareCover={!enabled}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              placeAt(e.clientX, e.clientY);
              setActiveSlug(item.slug);
            }}
            onFocus={(e) => onRowFocus(item.slug, e)}
          />
        ))}
      </ul>
      {enabled && <CursorPreview ref={previewRef} items={items} activeSlug={activeSlug} />}
    </>
  );
}
