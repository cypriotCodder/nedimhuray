import { ViewTransition, type ReactNode } from "react";

/**
 * Gives a project cover a shared view-transition name, so navigating between
 * two pages that both show it morphs one into the other (preview → hero,
 * card → hero, next-project → hero).
 *
 * Only one cover per slug may be mounted on a page at a time, and the wrapper
 * must be mounted/unmounted rather than renamed: React tracks names per mount.
 * Browsers without view transitions simply navigate without the animation.
 */
export function CoverTransition({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`cover-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
