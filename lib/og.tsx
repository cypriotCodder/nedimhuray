/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img>, not next/image */
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import type { Locale } from "./i18n";

/*
 * Open Graph cards, rendered at build time with next/og (Satori).
 * Colours are literals (no CSS variables here); they mirror the dark theme tokens.
 * Satori supports a subset of CSS: every multi-child div needs display:flex, and
 * use top/left/width/height rather than `inset`.
 * Labels are uppercased in JS with the locale's rules (Satori's text-transform
 * would turn Turkish "i" into "I" instead of "İ").
 */

export const ogSize = { width: 1200, height: 630 };

const C = {
  canvas: "#0e0d0b",
  fg: "#efebe2",
  muted: "#a9a49c",
  faint: "#83807a",
  line: "#302d2b",
  accent: "#fa5f29",
};

type Font = { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" };

/**
 * Fetch a text subset of a Google font as TTF, one entry per weight.
 * Returns [] when offline, so the card falls back to the default font.
 */
async function googleFont(name: string, family: string, axes: string, text: string): Promise<Font[]> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const faces = [...css.matchAll(/font-weight: (\d+);[\s\S]*?src: url\((.+?)\) format\('(?:opentype|truetype)'\)/g)];
    return await Promise.all(
      faces.map(async ([, weight, src]) => ({
        name,
        data: await (await fetch(src)).arrayBuffer(),
        weight: weight === "600" ? (600 as const) : (400 as const),
        style: "normal" as const,
      })),
    );
  } catch {
    return [];
  }
}

async function fonts(display: string, mono: string): Promise<Font[]> {
  const sets = await Promise.all([
    googleFont("Display", "Bricolage+Grotesque", "opsz,wght@96,400;96,600", display),
    googleFont("Mono", "Geist+Mono", "wght@400", mono),
  ]);
  return sets.flat();
}

// Satori can only decode these; anything else (e.g. WebP/AVIF) gets a text-only card.
const MIME: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

async function dataUri(publicPath: string): Promise<string | null> {
  const type = MIME[extname(publicPath).toLowerCase()];
  if (!type) return null;
  const data = await readFile(join(process.cwd(), "public", publicPath), "base64");
  return `data:${type};base64,${data}`;
}

const monoLabel = { fontFamily: "Mono", fontSize: 22, letterSpacing: "0.08em" } as const;
const displayType = { fontFamily: "Display", fontWeight: 600, lineHeight: 0.92, letterSpacing: "-0.045em" } as const;

function Name() {
  return (
    <div style={{ display: "flex", ...displayType, fontSize: 34, letterSpacing: "-0.02em", color: C.fg }}>
      {site.name}
      <span style={{ color: C.accent }}>.</span>
    </div>
  );
}

export function siteCardAlt(lang: Locale): string {
  return `${site.name} — ${ui[lang].home.title}`;
}

/** Site card: the Index itself, set as a typographic list. */
export async function siteCard(projects: Project[], lang: Locale) {
  const shown = projects.slice(0, 4);
  const more = projects.length - shown.length;
  const titles = shown.map((p) => p.title).join("");
  const heading = ui[lang].home.title.toLocaleUpperCase(lang);
  const moreLabel = ui[lang].og.more(more).toLocaleUpperCase(lang);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 64, background: C.canvas, color: C.fg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Name />
          <div style={{ ...monoLabel, color: C.faint }}>{heading}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", borderTop: `1px solid ${C.line}` }}>
          {shown.map((p, i) => (
            <div key={p.slug} style={{ display: "flex", alignItems: "center", gap: 32, borderBottom: `1px solid ${C.line}`, padding: "14px 0" }}>
              <div style={{ ...monoLabel, width: 40, color: i === 0 ? C.accent : C.faint }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ ...displayType, fontSize: 64, color: i === 0 ? C.fg : C.muted }}>{p.title}</div>
            </div>
          ))}
          {more > 0 && <div style={{ ...monoLabel, color: C.faint, marginTop: 16 }}>{moreLabel}</div>}
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts(`${site.name}.${titles}`, `${heading}${moreLabel}0123456789`) },
  );
}

/** Project card: the cover full-bleed, title over a dark scrim. */
export async function projectCard(project: Project, number: string, total: string) {
  const cover = await dataUri(project.cover.src);
  const label = `${number} / ${total}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: C.canvas, color: C.fg }}>
        {cover && (
          <img src={cover} alt="" width={ogSize.width} height={ogSize.height} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(14,13,11,0.95) 0%, rgba(14,13,11,0.75) 38%, rgba(14,13,11,0.1) 75%, rgba(14,13,11,0.55) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", position: "relative", width: "100%", padding: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Name />
            <div style={{ ...monoLabel, color: C.fg }}>{label}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", gap: 24 }}>
            <div style={{ ...displayType, fontSize: 112 }}>{project.title}</div>
            <div style={{ fontFamily: "Display", fontWeight: 400, fontSize: 30, lineHeight: 1.25, color: C.muted, maxWidth: 900 }}>{project.tagline}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: await fonts(`${site.name}.${project.title}${project.tagline}`, `${label}`),
    },
  );
}
