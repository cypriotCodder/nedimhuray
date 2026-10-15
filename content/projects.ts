import type { Media, Project } from "./types";

/*
 * ALL PROJECT CONTENT LIVES HERE.
 * To add a project: append an object below and drop its media into
 * public/projects/<slug>/. Order in this array = order in the Index.
 *
 * Everything below is placeholder content — fictional projects with sample
 * copy and generated artwork (see scripts/generate-placeholders.mjs).
 */

const WIDE = { width: 1600, height: 1000 } as const;
const TALL = { width: 1200, height: 1500 } as const;

const img = (slug: string, file: string, size: typeof WIDE | typeof TALL, alt: string): Media => ({
  src: `/projects/${slug}/${file}.svg`,
  alt,
  ...size,
});

export const projects: Project[] = [
  {
    slug: "atlas-of-nowhere",
    title: "Atlas of Nowhere",
    tagline: "A placeholder case study about a map of a place that doesn’t exist.",
    year: 2026,
    role: "Design & Development",
    tags: ["Placeholder", "Interactive", "Cartography"],
    cover: img("atlas-of-nowhere", "cover", WIDE, "Generated artwork: teal topographic contour lines on near-black, with an orange marker at the summit."),
    stack: ["Sample stack", "TypeScript", "WebGL"],
    links: [{ label: "Live site (placeholder)", href: "https://example.com" }],
    featured: true,
    blocks: [
      {
        type: "text",
        body: "This is placeholder copy. Replace it with the opening of the real story: what the project was, who it was for, and why it was worth doing.\n\nA good first paragraph sets up the problem in plain language. Keep it short; the images do most of the talking on this page.",
      },
      { type: "image", ...img("atlas-of-nowhere", "detail-1", WIDE, "Generated artwork: a second set of contour lines around a different summit."), wide: true, caption: "Placeholder caption — describe what the image shows and why it matters." },
      {
        type: "text",
        body: "Sample section about constraints and decisions. What did you try first? What didn’t work? Which trade-off ended up shaping the final result?",
      },
      {
        type: "gallery",
        images: [
          img("atlas-of-nowhere", "detail-2", TALL, "Generated artwork: tall crop of contour lines."),
          img("atlas-of-nowhere", "detail-3", TALL, "Generated artwork: tall crop of contour lines around an off-centre peak."),
        ],
        caption: "Placeholder gallery — two related views side by side.",
      },
      { type: "quote", body: "A placeholder pull quote goes here — one sentence worth reading twice.", by: "Sample Person, Fictional Role" },
      {
        type: "text",
        body: "Closing placeholder paragraph: what shipped, what you learned, and what you would do differently next time.",
      },
    ],
  },
  {
    slug: "quiet-machine",
    title: "Quiet Machine",
    tagline: "Sample project: an imaginary tool that makes less noise on purpose.",
    year: 2025,
    role: "Product Design",
    tags: ["Placeholder", "Product", "Systems"],
    cover: img("quiet-machine", "cover", WIDE, "Generated artwork: amber halftone dots forming concentric ripples on a dark brown field."),
    stack: ["Sample stack", "React", "Design system"],
    blocks: [
      {
        type: "text",
        body: "Placeholder introduction. This project doesn’t exist — it’s here to show how a product case study reads on this site.\n\nUse this space for the context a reader needs before they see the work.",
      },
      { type: "image", ...img("quiet-machine", "detail-1", WIDE, "Generated artwork: a halftone ripple centred lower in the frame."), caption: "Placeholder caption for a contained (non-full-bleed) image." },
      { type: "quote", body: "Sample quote: the best interface is the one you stop noticing.", by: "Placeholder" },
      {
        type: "gallery",
        images: [
          img("quiet-machine", "detail-2", TALL, "Generated artwork: tall halftone composition."),
          img("quiet-machine", "detail-3", TALL, "Generated artwork: tall halftone composition with a larger ring."),
        ],
      },
      {
        type: "text",
        body: "Sample outcome paragraph. Describe the result qualitatively until you have real, verifiable numbers to share.",
      },
    ],
  },
  {
    slug: "paper-signal",
    title: "Paper Signal",
    tagline: "Fictional editorial experiment: printed waveforms as a reading interface.",
    year: 2025,
    role: "Art Direction",
    tags: ["Placeholder", "Editorial", "Print"],
    cover: img("paper-signal", "cover", WIDE, "Generated artwork: stacked black waveform lines on off-white paper, one line in orange."),
    stack: ["Sample stack", "SVG", "Risograph"],
    links: [{ label: "Process notes (placeholder)", href: "https://example.com" }],
    blocks: [
      {
        type: "text",
        body: "Placeholder copy for a lighter, editorial project — included so the layout is tested against a bright cover image as well as dark ones.",
      },
      { type: "image", ...img("paper-signal", "detail-1", WIDE, "Generated artwork: another set of stacked waveform lines."), wide: true },
      {
        type: "gallery",
        images: [
          img("paper-signal", "detail-2", TALL, "Generated artwork: tall waveform stack."),
          img("paper-signal", "detail-3", TALL, "Generated artwork: tall waveform stack with the accent line higher up."),
        ],
        caption: "Placeholder caption spanning a gallery.",
      },
      {
        type: "text",
        body: "Sample reflection. A sentence or two about process is usually enough; link out to longer notes if they exist.",
      },
    ],
  },
  {
    slug: "field-notes-00",
    title: "Field Notes 00",
    tagline: "Sample entry: a made-up colour study kept as a running notebook.",
    year: 2024,
    role: "Concept & Visual Design",
    tags: ["Placeholder", "Colour", "Research"],
    cover: img("field-notes-00", "cover", WIDE, "Generated artwork: soft blurred fields of pink, peach and violet behind a fine measuring grid."),
    stack: ["Sample stack", "Generative", "CSS"],
    blocks: [
      { type: "quote", body: "Placeholder: start with a line, not a paragraph." },
      {
        type: "text",
        body: "This case study opens with a quote block to show that block order is entirely up to the content. Replace this with real notes.",
      },
      { type: "image", ...img("field-notes-00", "detail-1", WIDE, "Generated artwork: blurred colour fields in a different arrangement."), wide: true, caption: "Placeholder caption." },
      {
        type: "gallery",
        images: [
          img("field-notes-00", "detail-2", TALL, "Generated artwork: tall blurred colour study."),
          img("field-notes-00", "detail-3", TALL, "Generated artwork: tall blurred colour study, warmer."),
        ],
      },
    ],
  },
];
