# CLAUDE.md

Portfolio website for Nedim. A small static site whose only job is to showcase projects well. The full plan is in [PLAN.md](PLAN.md) — read it before making structural decisions.

## Stack

Next.js (App Router) + TypeScript, Tailwind CSS, Motion (`motion` package), deployed as a static site on Vercel. No database, CMS, auth or API routes.

## Commands

Keep this section accurate:

- `npm run dev` — local dev server (Turbopack). Prefetching and view-transition morphs only fully work in a production build.
- `npm run build` — production build (must pass with zero type/lint errors)
- `npm run start` — serve the production build (use this to check transitions)
- `npm run lint` — ESLint (`eslint-config-next`)
- `npm run typecheck` — `next typegen && tsc --noEmit` (typegen provides the global `PageProps`/`LayoutProps` types)
- `npm run placeholders` — regenerate the placeholder SVG artwork in `public/projects/`

## Structure (target)

```
app/(en)/            English routes: / , /work/[slug], /about (thin; render components/views/)
app/(tr)/tr/         the same routes in Turkish under /tr
components/          UI components (Index, ProjectRow, CursorPreview, BlockRenderer, ...)
components/views/    page bodies shared by both locales (take a `lang` prop)
content/projects.ts  all project data, typed as ProjectSource[] (single source of truth; copy is { en, tr })
content/site.ts      owner details and /about copy ({ en, tr })
content/ui.ts        interface copy (nav, labels, aria-labels) per locale
public/projects/<slug>/   media for each project
lib/                 small helpers (getProject(slug, lang), getSite(lang), localePath, metadata)
```

## Rules

- **Content is data.** Adding a project must only require editing `content/projects.ts` and adding media under `public/projects/<slug>/`. Never hardcode project content inside components.
- **Two languages.** Every user-facing string exists in English and Turkish: content in `content/*.ts` as `{ en, tr }`, interface copy in `content/ui.ts`. Build internal links with `localePath(lang, path)`. Turkish copy is reviewed by the owner; don't ship unreviewed machine translation.
- **Keep it basic.** No new dependency unless the plan needs it. Prefer CSS/Tailwind over JS; prefer the platform over libraries. Ask before adding anything beyond Next, React, Tailwind and Motion.
- **One signature interaction** (cursor-following preview + shared-element transition into the case study). Don't add competing effects.
- **Accessibility is not optional:** semantic HTML, visible focus, alt text, keyboard-operable everything, and every animation must respect `prefers-reduced-motion`.
- **Performance budget:** Lighthouse ≥ 95 in all categories, first-load JS on `/` < 150 kB gz, no layout shift. Use `next/image`, `next/font`, and size all media.
- **Design tokens** live as CSS variables (colour, spacing, type scale); don't scatter magic values through components.
- **Placeholder content** must be obviously fake but look good; never invent real-sounding claims about the owner's work, employers, or metrics.
- TypeScript strict mode. No `any`. Small components, no premature abstraction.
- Match existing code style once it exists; don't reformat unrelated files.

## Working agreement

- Work in the phases listed in PLAN.md; finish and verify each (build + visually check in a browser at mobile and desktop widths) before starting the next.
- Don't commit, push or deploy unless asked.
- If something in PLAN.md turns out to be wrong or impractical, say so and propose the change rather than silently diverging; update PLAN.md when a decision changes.
