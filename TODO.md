# TODO

Outstanding work after phases 1–8 (see PLAN.md). Ordered roughly by priority.
Last updated: 2026-10-15.

## 1. Domain ✅ (done 2026-10-15)

Live at **https://nedimhuray.com** (Vercel project `portfolio-website`, team `cypriotcodders-projects`).
Cloudflare DNS: `@` and `www` CNAME → `082fe52fe516427b.vercel-dns-017.com`, DNS only. Let's Encrypt certificate
issued by Vercel (auto-renews). `www` and `http://` both 308-redirect to `https://nedimhuray.com`.
`NEXT_PUBLIC_SITE_URL=https://nedimhuray.com` is set for Production (canonical URLs, OG images, sitemap).

Keep the Cloudflare records **DNS only**: turning on the orange-cloud proxy would interfere with Vercel's certificates and caching.

## 2. Replace placeholder content (it is live on nedimhuray.com now)

Everything in `content/` is placeholder, including the **contact email (`hello@example.com`)** and
the social links (they point to github.com / linkedin.com home pages). PLAN.md §9 lists what's needed:

- [ ] `content/site.ts`: name, one-line positioning, location, availability, email, social links
- [ ] `content/site.ts` → `about`: intro, bio, skills, portrait (`public/about/`), CV PDF (set `about.cv` once the file exists)
- [ ] `content/projects.ts`: 3–6 real projects (title, tagline, year, role, tags, stack, links, blocks) with media in `public/projects/<slug>/`
  - Covers: use JPG or PNG (WebP/AVIF covers get a text-only share card, because `next/og` can't decode them), 16:10, with real alt text
  - Give every image `width`/`height` (the `Media` type requires them; this prevents layout shift)
- [ ] Delete the generated placeholder art and `scripts/generate-placeholders.mjs` + the `placeholders` npm script once nothing uses them
- [ ] Accent colour or brand preferences, if any (tokens live in `app/globals.css`; keep AA contrast in both themes)

## 3. Still open from phase 7: mobile LCP

Target in PLAN.md: LCP < 2 s on a throttled mobile profile.
Measured on the production deployment before the domain went live (Lighthouse mobile, simulated throttling, 2 runs each):

| Route                | Perf   | LCP        | CLS |
|----------------------|--------|------------|-----|
| `/`                  | 94–96  | 2.5–2.7 s  | 0   |
| `/work/quiet-machine`| 95     | 2.4–2.5 s  | 0   |
| `/about`             | 96–100 | 1.4–2.3 s  | 0   |

Accessibility, Best Practices and SEO score 100 on every route. Desktop scores 100 / LCP ≈ 0.5–0.7 s.

What we know: FCP is ~0.8–1.0 s, the LCP image itself arrives immediately, and nearly all of the LCP time
is "render delay", which Lighthouse ties to the JS that runs before the paint. First-load JS on `/` is 144 kB gz,
about 125 kB of which is the React/Next runtime. Swapping the SVG cover for a JPEG did not help.

Things to try, in order:
- [ ] Re-measure after real images replace the placeholders (raster covers through `next/image` get resized per device)
- [ ] Shrink the client boundary on `/`: `ProjectIndex` makes the whole list a client component; render rows on the
      server and keep only the hover/preview logic on the client
- [ ] Profile one throttled run in Chrome DevTools (Performance panel, 4× CPU) to see what's between image load and paint
- [ ] Get real-user numbers: Vercel Speed Insights (`@vercel/speed-insights`); this is a new dependency, so decide first
- [ ] Home hit 94 in one of two runs; keep an eye on the ≥ 95 target

## 4. Repository & deploy pipeline

- [ ] `git init` and make a first commit (PLAN.md wants each phase committed; nothing is committed yet)
- [ ] Push to GitHub and connect the repo to the Vercel project for automatic preview + production deploys
      (right now, deploys only happen manually via `vercel deploy --prod`)
- [ ] Write `README.md` (still blank): how to run, how to add a project, how to deploy, domain/DNS notes
- [ ] Optional: update Vercel CLI (`npm i -g vercel@latest`; installed 62.2.0, latest 64.2.0)

## 5. Testing gaps

Everything so far was verified in Chromium only (headless, 390 / 1024 / 1440 px, both themes, reduced motion).

- [ ] Safari (macOS + iOS): view-transition morph, theme toggle, cursor preview
- [ ] Firefox: the same (browsers without view-transition support should just navigate instantly)
- [ ] A real phone: tap cards, the morph into the hero, scrolling performance
- [ ] Screen reader pass (VoiceOver): Index rows, theme toggle (`aria-pressed`), skip link

## 6. Small polish (nice to have)

- [ ] When the cursor preview opens from keyboard focus it parks over the row's role/tags column; place it after the title instead
- [ ] Going back from a case study to the Index on desktop has no animation (instant); consider a reverse morph
- [ ] `theme-color` meta follows the system theme, not the manual toggle
- [ ] Mark the current page in the header nav (`aria-current="page"`)
- [ ] Vercel Authentication protects preview deployments (production is public); fine as is, but note it when sharing previews
