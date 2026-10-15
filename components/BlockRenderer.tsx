import Image from "next/image";
import type { Block, Media } from "@/content/types";
import { VideoBlock } from "./VideoBlock";

/*
 * Renders a case study's ordered blocks on the page's 12-column grid.
 * Text sits in a narrow measure offset to the right; media is wider;
 * `wide` images break out to full bleed.
 */
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-block">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <div className="frame grid grid-cols-12 gap-x-4">
          <div className="col-span-12 flex max-w-prose flex-col gap-[1em] text-body text-muted md:col-span-7 md:col-start-5 lg:col-span-6 lg:col-start-5">
            {block.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      );

    case "image":
      return block.wide ? (
        <figure>
          <Picture media={block} sizes="100vw" />
          <Caption text={block.caption} />
        </figure>
      ) : (
        <figure className="frame">
          <Picture media={block} sizes="(min-width: 1400px) 1400px, 100vw" />
          <Caption text={block.caption} inFrame />
        </figure>
      );

    case "video":
      return (
        <figure className="frame">
          <VideoBlock src={block.src} poster={block.poster} />
          <Caption text={block.caption} inFrame />
        </figure>
      );

    case "gallery":
      return (
        <figure className="frame">
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            {block.images.map((img) => (
              <Picture key={img.src} media={img} sizes="(min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
          <Caption text={block.caption} inFrame />
        </figure>
      );

    case "quote":
      return (
        <figure className="frame grid grid-cols-12 gap-x-4">
          <blockquote className="col-span-12 text-lead font-medium text-balance md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-3">
            <p>
              <span className="text-accent" aria-hidden="true">
                “
              </span>
              {block.body}
              <span className="text-accent" aria-hidden="true">
                ”
              </span>
            </p>
          </blockquote>
          {block.by && (
            <figcaption className="label col-span-12 mt-6 md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-3">
              — {block.by}
            </figcaption>
          )}
        </figure>
      );
  }
}

function Picture({ media, sizes }: { media: Media; sizes: string }) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      className="h-auto w-full bg-surface"
    />
  );
}

function Caption({ text, inFrame = false }: { text?: string; inFrame?: boolean }) {
  if (!text) return null;
  const caption = (
    <figcaption className="label col-span-12 mt-4 md:col-span-7 md:col-start-5 lg:col-span-6 lg:col-start-5">
      {text}
    </figcaption>
  );
  // Full-bleed images need the frame re-applied so captions align with text.
  return inFrame ? (
    <div className="grid grid-cols-12 gap-x-4">{caption}</div>
  ) : (
    <div className="frame grid grid-cols-12 gap-x-4">{caption}</div>
  );
}
