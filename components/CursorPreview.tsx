"use client";

import Image from "next/image";
import {
  LazyMotion,
  domMin,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { CoverTransition } from "./CoverTransition";
import type { IndexItem } from "./ProjectIndex";

/** Imperative handle, so pointer moves never re-render the Index. */
export type PreviewHandle = {
  /**
   * Place the preview beside a viewport point (flips left near the right edge).
   * Vertically centred on `py`, or with `above`, sitting just above it.
   */
  moveTo: (px: number, py: number, options?: { above?: boolean }) => void;
};

type Props = {
  items: IndexItem[];
  activeSlug: string | null;
  ref: Ref<PreviewHandle>;
};

// Lag is deliberate but short: the preview should feel attached, not floaty.
const SPRING = { stiffness: 420, damping: 42, mass: 0.7 };
const EDGE = 16; // keep the preview this far from the viewport edges
const OFFSET = 28; // gap between cursor and preview

/**
 * Floating cover that trails the pointer over the Index (fine pointers only).
 * Loaded lazily by ProjectIndex, so touch devices never download Motion.
 * Every cover stays mounted (hidden) so they're decoded before first hover.
 * Only the active cover is wrapped in CoverTransition, so on click it — and
 * nothing else — morphs into the case-study hero. The wrapper is mounted per
 * slug (not renamed), which is what React's name tracking requires; switching
 * rows therefore remounts that image, which fades in.
 * Reduced motion: no lag, no tilt — it simply appears next to the cursor.
 */
export function CursorPreview({ items, activeSlug, ref }: Props) {
  const reduce = useReducedMotion() ?? false;
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const velocity = useVelocity(sx);
  const tilt = useTransform(velocity, [-2400, 0, 2400], [-5, 0, 5], { clamp: true });

  useImperativeHandle(ref, () => ({
    moveTo(px, py, options) {
      const el = box.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const right = px + OFFSET;
      x.set(right + w + EDGE > window.innerWidth ? px - OFFSET - w : right);
      const top = options?.above ? py - h - EDGE : py - h / 2;
      y.set(Math.min(Math.max(top, EDGE), window.innerHeight - h - EDGE));
    },
  }));

  const visible = activeSlug !== null;

  // Keep showing the last cover while the preview fades out.
  const [shownSlug, setShownSlug] = useState(activeSlug);
  if (activeSlug !== null && activeSlug !== shownSlug) setShownSlug(activeSlug);

  // When the preview (re)appears, start it at the cursor instead of
  // springing in from wherever it was last hidden.
  useEffect(() => {
    if (!visible) return;
    sx.jump(x.get());
    sy.jump(y.get());
  }, [visible, sx, sy, x, y]);

  // domMin = just the DOM renderer, which is all the spring-driven motion values need.
  return (
    <LazyMotion features={domMin} strict>
      <m.div
        ref={box}
        aria-hidden="true"
        data-visible={visible}
        style={{ x: reduce ? x : sx, y: reduce ? y : sy, rotate: reduce ? 0 : tilt }}
        className="group pointer-events-none fixed top-0 left-0 z-40 aspect-[16/10] w-[clamp(15rem,26vw,26rem)] will-change-transform"
      >
        <div className="relative h-full w-full scale-90 overflow-hidden bg-surface opacity-0 shadow-[0_2rem_4rem_-1rem_oklch(0_0_0/0.6)] transition-[opacity,scale] duration-(--duration-base) ease-(--ease-out-expo) group-data-[visible=true]:scale-100 group-data-[visible=true]:opacity-100">
          {items.map((item) => {
            const active = item.slug === activeSlug;
            const shown = item.slug === shownSlug;
            const image = (
              <Image
                key={item.slug}
                src={item.cover.src}
                alt=""
                fill
                sizes="26vw"
                loading="lazy"
                fetchPriority="low"
                className={`object-cover ${active ? "animate-fade-in" : shown ? "" : "opacity-0"}`}
              />
            );
            return active ? (
              <CoverTransition key={item.slug} slug={item.slug}>
                {image}
              </CoverTransition>
            ) : (
              image
            );
          })}
        </div>
      </m.div>
    </LazyMotion>
  );
}
