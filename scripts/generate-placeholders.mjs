// Generates the deterministic placeholder artwork in public/projects/<slug>/.
// Run with `npm run placeholders`. Safe to delete once real media replaces it.
// No dependencies: every image is a hand-built SVG string.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "..", "public", "projects");

// Small seeded PRNG so output is stable between runs.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n) => Math.round(n * 10) / 10;

const svg = (w, h, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
  (defs ? `<defs>${defs}</defs>` : "") +
  body +
  `</svg>\n`;

const grain = (id, opacity) =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%">` +
  `<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>` +
  `<feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 ${opacity} 0"/>` +
  `</filter>`;

/* 1 — Topographic contours (Atlas of Nowhere) */
function contours(w, h, seed) {
  const rand = rng(seed);
  const cx = w * (0.35 + rand() * 0.3);
  const cy = h * (0.35 + rand() * 0.3);
  const p = [rand() * 6.28, rand() * 6.28, rand() * 6.28];
  const rings = 34;
  const step = Math.max(w, h) / 46;
  let paths = "";
  for (let k = 0; k < rings; k++) {
    const base = 18 + k * step;
    let d = "";
    const pts = 120;
    for (let i = 0; i <= pts; i++) {
      const t = (i / pts) * Math.PI * 2;
      const r =
        base *
        (1 +
          0.2 * Math.sin(3 * t + p[0] + k * 0.05) +
          0.09 * Math.sin(5 * t + p[1] - k * 0.11) +
          0.04 * Math.sin(9 * t + p[2] + k * 0.23));
      d += `${i ? "L" : "M"}${r1(cx + Math.cos(t) * r * 1.25)} ${r1(cy + Math.sin(t) * r)}`;
    }
    const major = k % 5 === 0;
    const o = Math.max(0.12, 0.9 - k * 0.024);
    paths += `<path d="${d}Z" fill="none" stroke="#6fd6c0" stroke-opacity="${r1(o)}" stroke-width="${major ? 2.2 : 1}"/>`;
  }
  let grid = "";
  for (let x = 0; x <= w; x += w / 8) grid += `<path d="M${r1(x)} 0V${h}" stroke="#6fd6c0" stroke-opacity=".08"/>`;
  for (let y = 0; y <= h; y += h / 5) grid += `<path d="M0 ${r1(y)}H${w}" stroke="#6fd6c0" stroke-opacity=".08"/>`;
  const marker =
    `<g stroke="#ff5a2b" stroke-width="2"><path d="M${r1(cx - 18)} ${r1(cy)}H${r1(cx + 18)}M${r1(cx)} ${r1(cy - 18)}V${r1(cy + 18)}"/></g>` +
    `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="34" fill="none" stroke="#ff5a2b" stroke-width="1.5"/>`;
  return svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="#0b1513"/>${grid}${paths}${marker}<rect width="${w}" height="${h}" filter="url(#g)"/>`,
    grain("g", 0.07),
  );
}

/* 2 — Halftone field (Quiet Machine) */
function halftone(w, h, seed) {
  const rand = rng(seed);
  const gap = 30;
  const fx = rand() * 0.6 + 0.2;
  const fy = rand() * 0.6 + 0.2;
  const ph = rand() * 6.28;
  let dots = "";
  for (let y = gap / 2; y < h; y += gap) {
    for (let x = gap / 2; x < w; x += gap) {
      const dx = x / w - fx;
      const dy = y / h - fy;
      const dist = Math.sqrt(dx * dx * 1.6 + dy * dy);
      const wave = 0.5 + 0.5 * Math.sin(dist * 22 - ph);
      const v = Math.max(0, 1 - dist * 1.35) * (0.35 + 0.65 * wave);
      const r = (gap / 2) * 0.95 * v;
      if (r > 0.6) dots += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}"/>`;
    }
  }
  const ring = `<circle cx="${r1(w * fx)}" cy="${r1(h * fy)}" r="${r1(Math.min(w, h) * 0.42)}" fill="none" stroke="#f3eee4" stroke-opacity=".5" stroke-width="1.5"/>`;
  return svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="#15110b"/><g fill="#f2a83b">${dots}</g>${ring}<rect width="${w}" height="${h}" filter="url(#g)"/>`,
    grain("g", 0.06),
  );
}

/* 3 — Stacked signal lines (Paper Signal) — a light image on purpose */
function signal(w, h, seed) {
  const rand = rng(seed);
  const lines = 42;
  const top = h * 0.14;
  const gap = (h * 0.78) / lines;
  const accent = Math.floor(lines * (0.35 + rand() * 0.3));
  const bumps = Array.from({ length: 4 }, () => ({ c: 0.3 + rand() * 0.4, s: 0.03 + rand() * 0.06, a: 0.5 + rand() }));
  let body = "";
  for (let i = 0; i < lines; i++) {
    const y0 = top + i * gap;
    const local = bumps.map((b) => ({ ...b, c: b.c + (rand() - 0.5) * 0.04, a: b.a * (0.6 + rand() * 0.8) }));
    let d = `M${w * 0.08} ${r1(y0)}`;
    const steps = 72;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = w * 0.08 + t * w * 0.84;
      let amp = 0;
      for (const b of local) amp += b.a * Math.exp(-((t - b.c) ** 2) / (2 * b.s * b.s));
      const jitter = (rand() - 0.5) * 1.6 * amp;
      d += `L${r1(x)} ${r1(y0 - amp * gap * 2.6 + jitter)}`;
    }
    const isAccent = i === accent;
    body += `<path d="${d}V${r1(y0 + gap * 3)}H${w * 0.08}Z" fill="#ebe6dc"/>`;
    body += `<path d="${d}" fill="none" stroke="${isAccent ? "#ff5a2b" : "#171614"}" stroke-width="${isAccent ? 2.6 : 1.4}"/>`;
  }
  return svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="#ebe6dc"/>${body}<rect width="${w}" height="${h}" filter="url(#g)"/>`,
    grain("g", 0.09).replace("0 0 0 0 1  0 0 0 0 1  0 0 0 0 1", "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0"),
  );
}

/* 4 — Soft colour field with a measuring grid (Field Notes 00) */
function field(w, h, seed) {
  const rand = rng(seed);
  const palette = ["#ff6f91", "#ffb38a", "#7b5cff", "#ff5a2b"];
  let blobs = "";
  for (let i = 0; i < 5; i++) {
    const c = palette[i % palette.length];
    blobs += `<circle cx="${r1(rand() * w)}" cy="${r1(rand() * h)}" r="${r1(Math.min(w, h) * (0.18 + rand() * 0.22))}" fill="${c}" fill-opacity="${r1(0.55 + rand() * 0.4)}"/>`;
  }
  let grid = "";
  const cols = 12;
  for (let i = 1; i < cols; i++) {
    const x = (w / cols) * i;
    grid += `<path d="M${r1(x)} 0V${h}" stroke="#f3eee4" stroke-opacity=".12"/>`;
  }
  let ticks = "";
  for (let i = 0; i <= 60; i++) {
    const x = (w / 60) * i;
    const len = i % 5 === 0 ? 18 : 8;
    ticks += `<path d="M${r1(x)} ${h - 40}v${-len}" stroke="#f3eee4" stroke-opacity=".7"/>`;
  }
  const blur = Math.round(Math.min(w, h) * 0.09);
  return svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="#130e14"/><g filter="url(#b)">${blobs}</g>${grid}${ticks}<rect width="${w}" height="${h}" filter="url(#g)"/>`,
    `<filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${blur}"/></filter>` +
      grain("g", 0.1),
  );
}

// Placeholder covers until real screenshots exist. Each style loosely matches its project.
const projects = [
  { slug: "masadan-siparis", art: signal, seed: 37 }, // waveforms ≈ printed kitchen tickets
  { slug: "microshop", art: halftone, seed: 23 }, // dot field ≈ many services
  { slug: "kentimde", art: contours, seed: 11 }, // contour map ≈ a municipality
  { slug: "asfalya", art: field, seed: 41 }, // soft colour fields ≈ analytics
  { slug: "seed-engine", art: contours, seed: 59 }, // terrain ≈ procedural islands
];

for (const p of projects) {
  const dir = join(OUT, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "cover.svg"), p.art(1600, 1000, p.seed));
}

console.log(`Wrote ${projects.length} placeholder covers to ${OUT}`);
