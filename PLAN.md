# Portfolio Website — Plan

## 1. Goal

A small, fast, single-purpose site whose job is to **show projects well**. Few pages, almost no chrome, one memorable way of presenting work. The "wow" comes from the presentation of the projects, not from feature count.

**Non-goals:** blog, CMS, auth, database, contact backend, dark-pattern animations, anything that needs a server to run.

## 2. Concept: "The Index"

The home page *is* the portfolio: a large, typographic index of projects. Each project is one big row (number, title, year, role, tags). The interaction is the showcase:

- **Hover (desktop):** a preview (image or looping muted video) follows the cursor with slight lag/easing, and the hovered row's text brightens while the others dim.
- **Click:** the preview *morphs* into the hero of the project's case-study page (shared-element transition), instead of a hard page change.
- **Case-study page:** full-bleed hero, a short fact strip (role / year / stack / links), then a vertical story of big media blocks with captions. Next-project link at the bottom, which cycles through the index.
- **Mobile/touch:** no cursor preview. Rows become large tappable cards with the cover image inline; same transition on tap.

Why this works: one interaction, repeated for every project, feels designed and confident. It's also cheap to build and trivially extended by adding one data entry.

## 3. Pages

| Route | Purpose |
|---|---|
| `/` | Intro (name, one-line positioning, location/availability) + The Index |
| `/work/[slug]` | Case study for one project |
| `/about` | Short bio, photo, skills, CV download, contact links (can be a section on `/` if preferred) |

No other pages. Contact = `mailto:` + social links in the footer.

## 4. Stack

- **Next.js (App Router) + TypeScript**, fully static (`generateStaticParams`, no runtime server needed)
- **Tailwind CSS** for styling, design tokens as CSS variables
- **Motion** (`motion` package, formerly Framer Motion) for the cursor preview and shared-element transitions
- **Content as typed data**: `content/projects.ts` exporting a `Project[]`. Case-study body as an ordered array of blocks (`text`, `image`, `video`, `quote`, `gallery`). No MDX/CMS until it's actually needed.
- **next/image** for images, `public/projects/<slug>/` for media
- **Deploy:** Vercel (static)

Rationale: Next + Vercel is the lowest-friction path for static hosting, image optimization and OG images. Everything else is deliberately boring.

## 5. Data model

```ts
type Block =
  | { type: "text"; body: string }
  | { type: "image"; src: string; alt: string; caption?: string; wide?: boolean }
  | { type: "video"; src: string; poster: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string }[] }
  | { type: "quote"; body: string; by?: string };

type Project = {
  slug: string;
  title: string;
  tagline: string;          // one line, shown in the index and meta description
  year: number;
  role: string;
  tags: string[];
  cover: { src: string; alt: string; video?: string }; // used for hover preview + hero
  links?: { label: string; href: string }[];
  stack?: string[];
  featured?: boolean;       // controls order/emphasis if needed
  blocks: Block[];
};
```

## 6. Visual design direction

- **Type-led.** One display face for titles (large, tight tracking) + one neutral sans/mono for metadata. Max two families, loaded via `next/font`.
- **Palette:** near-black and off-white with a single accent colour. Supports light/dark via `prefers-color-scheme` with a manual toggle; dark is the default design target because media pops on it.
- **Layout:** 12-col grid, generous whitespace, content max-width ~1400px, full-bleed for media.
- **Motion principles:** purposeful, 200–600ms, eased (no bounce), everything honours `prefers-reduced-motion` (fall back to instant/opacity-only).
- **Placeholder content** ships with the build (3–4 fake projects with generated gradient/solid covers) so the site looks complete before real assets are added.

## 7. Build phases

1. **Scaffold** — Next.js + TS + Tailwind + Motion, fonts, tokens, base layout (header, footer), lint/format config.
2. **Content layer** — `Project` types, 4 placeholder projects, helpers (`getProject`, `getNextProject`).
3. **The Index** — home page rows, hover dimming, cursor-following preview (desktop), tap cards (mobile).
4. **Case-study page** — hero, fact strip, block renderer, next-project footer.
5. **Transitions** — shared-element morph from preview → hero (Motion `layoutId` or View Transitions API; pick whichever is stable in the installed Next version, with a clean fallback to a fade).
   *Decision:* React's `<ViewTransition>` (stable in React 19.3, no Next config needed, no extra JS); see `components/CoverTransition.tsx`. Every rendering of a cover (cursor preview, mobile card, hero, next-project thumbnail) shares the name `cover-<slug>`. Browsers without view transitions navigate instantly. Reduced motion: an in-place crossfade only. `cacheComponents`/`partialPrefetching` are off so case studies are plain SSG and `<Link>` prefetches them in full; otherwise the hero streams in after the click and the morph can't pair.
6. **About + polish** — about section, theme toggle, focus states, reduced-motion, keyboard nav, 404.
   *Decisions:* `/about` is its own route; its copy lives in `content/site.ts` (`site.about`), and the CV link only renders once `site.about.cv` is set. Colour tokens are named by role (`canvas`, `surface`, `fg`, `muted`, `faint`, `line`, `accent`) and defined once with `light-dark()`; a pre-paint script sets `<html data-theme>` from the saved choice or the system setting (no flash; without JS the site follows the system). `faint` was raised to pass AA (4.9:1). The 404 lists the projects as a way back in.
7. **SEO/perf/a11y pass** — metadata, per-project OG images, sitemap, Lighthouse ≥ 95 on all four categories, axe-clean, no layout shift.
   *Status:* metadata + canonical URLs, `next/og` cards (site card = the Index; project card = cover + title; `lib/og.tsx`), `sitemap.xml`, `robots.txt`, site icon. The site origin comes from `NEXT_PUBLIC_SITE_URL`, else Vercel's production URL (`lib/site-url.ts`). The cursor preview (and Motion with it) is code-split and only loaded on fine-pointer screens, so first-load JS on `/` is 144 kB gz. Measured on a local production build: Lighthouse mobile 96–98 / 100 / 100 / 100, desktop 100 across the board, CLS 0, axe: 0 violations in both themes. **Open:** simulated-mobile LCP is 2.3–2.7 s, not < 2 s. It tracks the framework JS (≈125 kB of the 144 kB is React/Next), not the images (a raster cover tested no better). Re-measure with real assets on the deployed site before chasing it.
8. **Deploy** — Vercel, custom domain notes in README.
   *Status (2026-10-15):* deployed to Vercel project `portfolio-website`. Live at **https://nedimhuray.com** (Cloudflare DNS, CNAME records, DNS only; `www` and `http` → 308 → `https://nedimhuray.com`). `NEXT_PUBLIC_SITE_URL=https://nedimhuray.com` is set for Production. README not written yet. Remaining work is tracked in [TODO.md](TODO.md).

9. **Turkish (TR)** — the whole site in English and Turkish.
   *Decisions (2026-10-16):* English stays at `/`, `/about`, `/work/<slug>`; Turkish lives at `/tr`, `/tr/about`, `/tr/work/<slug>` (same slugs). No auto-redirect by browser language; a link in the header (`EN`/`TR`) goes to the same page in the other language. Each locale is a route group with its own root layout (`app/(en)`, `app/(tr)/tr`) so `<html lang>` is right in the static HTML; the route files are thin and render shared views from `components/views/`. This was chosen over one `app/[lang]` tree + rewrites, which would have made the real route `/en/…` and broken relative canonicals/OG URLs. Cost: switching language is a full page load, and unmatched URLs need `app/global-not-found.tsx` (experimental `globalNotFound` flag), which is English-only. Content: every piece of copy is `{ en, tr }` (`Text`/`Localized<T>` in `content/types.ts`), case-study `blocks` are written per locale, product names and stack stay shared; a missing translation fails the build. Interface copy is in `content/ui.ts`. Tags are translated, stack names stay English. SEO: per-locale canonical + hreflang (`x-default` = English), `og:locale`, per-locale OG cards (labels uppercased in JS with the locale's rules), both locales in the sitemap. On phones the header hides the project count to make room for the switch.

Each phase should end in a working, committed state.

## 8. Acceptance criteria

- Looks intentional and finished with placeholder content only.
- Adding a project = adding one object to `content/projects.ts` + dropping media in `public/projects/<slug>/`. Nothing else.
- Works with keyboard only; visible focus; semantic HTML; images have alt text.
- Fully usable with JS-driven effects disabled or reduced-motion on.
- Mobile (360px) through ultra-wide (2560px) without horizontal scroll.
- `npm run build` passes with zero type or lint errors; Lighthouse ≥ 95 across the board; LCP < 2s on a throttled mobile profile.
- First-load JS for `/` stays small (target < 150 kB gz).

## 9. Inputs needed from the owner (not blocking — placeholders used until supplied)

- Name, one-line positioning, location, availability line
- 3–6 projects: title, tagline, year, role, links, cover image/video, case-study copy and media
- Short bio + photo, CV PDF, email + social links
- Accent colour / any brand preferences, preferred domain

## 10. Later (explicitly out of scope for v1)

Blog/notes, project filtering by tag, more languages than EN/TR, analytics (Vercel Web Analytics is a one-line add), sound/WebGL flourishes.
