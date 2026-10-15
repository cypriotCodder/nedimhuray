# TODO

Outstanding work after phases 1–8 (see PLAN.md). Ordered roughly by priority.
**Status:** §4, §6, §7 worked through on 2026-10-15. Changes are local and uncommitted until pushed to `main`.
Last updated: 2026-10-15.

## 1. Domain ✅ (done 2026-10-15)

Live at **https://nedimhuray.com** (Vercel project `portfolio-website`, team `cypriotcodders-projects`).
Cloudflare DNS: `@` and `www` CNAME → `082fe52fe516427b.vercel-dns-017.com`, DNS only. Let's Encrypt certificate
issued by Vercel (auto-renews). `www` and `http://` both 308-redirect to `https://nedimhuray.com`.
`NEXT_PUBLIC_SITE_URL=https://nedimhuray.com` is set for Production (canonical URLs, OG images, sitemap).

Keep the Cloudflare records **DNS only**: turning on the orange-cloud proxy would interfere with Vercel's certificates and caching.

## 2. Live site up to date ✅ (done 2026-10-15)

GitHub → Vercel auto-deploy works: commits `591751f` and `03d6a7c` built and went to production as **Git**
deployments. nedimhuray.com shows the real email, location, links and the new portrait.

Loose ends from that step:
- [ ] LinkedIn link still lacks `https://` (`www.linkedin.com/in/nedim-huray` → `https://www.linkedin.com/in/nedim-huray`); as is it 404s on our own domain
- [ ] Portrait alt text in `content/site.ts` still describes the old placeholder silhouette
- [ ] Portrait `width`/`height` say 1200×1500 but `portrait.jpeg` is 768×1024 (3:4; shown cropped to 4:5). Correct the numbers,
      and ideally supply a ≥ 1200 px-wide photo (on desktop it's displayed ~580 px wide, i.e. ~1160 px on retina)
- [ ] `public/about/portrait2.svg` is unused; delete it

## 3. Replace remaining placeholder content

Done and live: location, availability, email, GitHub + LinkedIn links (LinkedIn URL needs a fix, see §2), portrait.

- [ ] `content/site.ts`: one-line `positioning` (still placeholder)
- [ ] `content/site.ts` → `about`: `intro`, `bio`, `skills` (all placeholder), CV PDF (set `about.cv` once the file exists in `public/`)
- [ ] `content/projects.ts`: 3–6 real projects (title, tagline, year, role, tags, stack, links, blocks) with media in `public/projects/<slug>/`
  - Covers: use JPG or PNG (WebP/AVIF covers get a text-only share card, because `next/og` can't decode them), 16:10, with real alt text
  - Give every image `width`/`height` (the `Media` type requires them; this prevents layout shift)
- [ ] Delete the generated placeholder art and `scripts/generate-placeholders.mjs` + the `placeholders` npm script once nothing uses them
      (note: the script also writes `public/about/portrait.svg`; remove that part too)
- [ ] Accent colour or brand preferences, if any (tokens live in `app/globals.css`; keep AA contrast in both themes)

## 4. Mobile LCP (phase 7 follow-up)

Target in PLAN.md: LCP < 2 s on a throttled mobile profile.

**Re-measured 2026-10-15 on https://nedimhuray.com, 3 runs each.** Lighthouse's default *simulated* throttling turned
out to be noisy (same page 1.6–2.4 s), which inflated the earlier numbers. *Applied* throttling
(`--throttling-method=devtools`) is stable and is what we track now:

| Route                 | Perf  | LCP (applied) | LCP (simulated) |
|-----------------------|-------|---------------|-----------------|
| `/`                   | 99    | 1.8–1.9 s ✅  | 1.6–2.3 s       |
| `/work/quiet-machine` | 98–99 | 1.7–1.8 s ✅  | 2.4 s           |
| `/about`              | 94–95 | 2.8–2.9 s ❌  | 2.3–2.9 s       |

Render delay is now 16–110 ms on every page. The old "JS blocks the paint" theory no longer applies, so shrinking the
`ProjectIndex` client boundary is **dropped**: it would not move LCP.

`/about` regressed when the real portrait replaced the SVG: the LCP image was a 130 kB WebP that took 1.9 s to download.
- [x] Serve AVIF first (`images.formats` in `next.config.ts`): portrait 132 kB → 60 kB. Applies to all future raster covers too
- [x] `fetchPriority="high"` on the portrait (it's the LCP element on mobile)
- [ ] Deploy, then re-measure `/about` on production (locally it's now 2.1 s with ~0 TTFB; production adds ~0.4 s TTFB)
- [ ] If still > 2 s: the rest is bandwidth contention on slow 4G (fonts ≈ 98 kB + JS 144 kB load alongside the image).
      Options: a smaller/cropped portrait, or `preload` instead of `fetchPriority` so it starts from `<head>`
- [ ] Re-measure every page once real project covers replace the placeholders
- [ ] Optional real-user data: Vercel Speed Insights (`@vercel/speed-insights`); new dependency, decide first

Tried and rejected: dropping Bricolage's `opsz` axis would save 35 kB on every page (77 → 41 kB), but it visibly
degrades the display type (titles become wider and plainer; "Atlas of Nowhere" grows ~10%, the intro gains a line).
Kept the axis.

## 5. Repository & deploy pipeline

Done: this folder is a checkout of `github.com/cypriotCodder/nedimhuray` (private, `main` tracks `origin/main`),
and the Vercel project is connected to it (production branch `main`; other branches get preview deploys).

- [x] Auto-deploy confirmed (Git deployments of `591751f`, `03d6a7c`)
- [ ] Write `README.md` (still blank): how to run, how to add a project, how to deploy, domain/DNS notes
- [ ] Optional: update Vercel CLI (`npm i -g vercel@latest`; installed 62.2.0, latest 64.2.0)

## 6. Testing gaps

Automated runs on a local production build (2026-10-15):

- [x] **Chromium:** morph (hover, keyboard, mobile tap, next project), reduced motion, theme, keyboard nav, axe (0 violations, both themes)
- [x] **WebKit 26.6** (Safari's engine, via Playwright): every morph path pairs and animates with the same geometry as Chromium
      (sampled per frame: 374 → 1440 px over ~560 ms); reduced motion = in-place crossfade; theme toggle + `theme-color` sync;
      `aria-current`; keyboard preview placement. Note: in Safari, Tab skips links unless the visitor uses Option+Tab
      or enables "Press Tab to highlight each item" (normal Safari behaviour, nothing to fix)
- [ ] **Firefox:** blocked. Playwright's Firefox 155 Nightly won't start on this macOS ("Could not find profile folder"),
      and Firefox isn't installed. Install Firefox and check by hand, or retry with a newer Playwright
- [ ] **Real Safari** (macOS + iOS): a quick manual look at the morph. WebKit-in-Playwright isn't identical to Safari,
      and its screenshots of in-flight transitions are unreliable, so the motion itself was verified by numbers, not by eye
- [ ] **A real phone:** tap cards, the morph into the hero, scrolling
- [ ] **VoiceOver pass** (needs a person). Done as a proxy: the accessibility tree is sound (landmarks, nav list, headings,
      labelled Index region, `aria-pressed` toggle, `aria-current`). Fixed: Index rows announced "01 2026 Atlas of Nowhere
      Design & Development…"; now the link name is just the title, with tagline/role/year/tags as its description

## 7. Small polish

- [x] Keyboard-opened cursor preview no longer covers the focused row: it sits after the title's arrow, above the row
- [x] `theme-color` meta follows the manual toggle (and stays correct across client navigation; `lib/theme.ts` holds the colours)
- [x] Current page marked in the header nav (`aria-current="page"`, shown in full-strength text) via `components/NavLink.tsx`
- [ ] Going back from a case study to the Index on desktop has no animation (instant). A reverse morph needs a design:
      on desktop the cover only exists in the hidden cursor preview, so there's nothing on the Index to land on
- [ ] Vercel Authentication protects preview deployments (production is public); fine as is, but note it when sharing previews
