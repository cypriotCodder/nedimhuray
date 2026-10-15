"use client";

import type { Media } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Muted looping video for case studies. Autoplays only when the user hasn't
 * asked for reduced motion; otherwise it shows the poster with controls.
 */
export function VideoBlock({ src, poster }: { src: string; poster: Media }) {
  const reduce = usePrefersReducedMotion();

  return (
    <video
      key={reduce ? "still" : "auto"}
      src={src}
      poster={poster.src}
      width={poster.width}
      height={poster.height}
      aria-label={poster.alt}
      muted
      loop
      playsInline
      preload="none"
      autoPlay={!reduce}
      controls={reduce}
      className="h-auto w-full bg-surface"
    />
  );
}
