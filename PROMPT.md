# Starter prompt for Claude Opus 5.5

Run `claude` in this directory, select Opus 5.5, and paste everything below the line.

---

You're building my portfolio website in this directory. Start by reading `CLAUDE.md` and `PLAN.md` fully — they are the spec. The directory is empty apart from those files and a blank README.

**Goal:** a very basic but impressive site whose whole purpose is to showcase my projects. The signature is "The Index": a large typographic list of projects on the home page, where hovering a row shows a preview that follows the cursor, and clicking morphs that preview into the hero of the project's case-study page. Keep everything else minimal.

**What I want you to do in this session:**

1. Scaffold the project per PLAN.md phase 1 (Next.js App Router, TypeScript strict, Tailwind, Motion, `next/font`). Use the current stable versions and check the installed Next.js docs/version before relying on any API from memory.
2. Implement phases 2–4: the typed content layer with 4 placeholder projects (generate good-looking placeholder covers, e.g. gradients or SVG art, and obviously fake copy), the home Index with the cursor-following preview on desktop and tappable cards on mobile, and the case-study page with the block renderer and next-project link.
3. Update the Commands section in `CLAUDE.md` with the real scripts.
4. Run `npm run build`, start the dev server, and check the result in a browser at 390px, 1024px and 1440px wide. Fix what looks off. Report honestly what you verified and what you didn't.

**Constraints:**

- Follow the rules in `CLAUDE.md` (content as data, no extra dependencies without asking, reduced-motion support, performance budget).
- Design direction: type-led, near-black/off-white with one accent, dark as the default design target, generous whitespace. It should look intentional and finished with placeholder content only. Make real design decisions rather than defaulting to generic template styling.
- Don't commit, push, or deploy.
- Stop after phase 4 and summarize: what exists, how to run it, any deviations from PLAN.md, and what you'd do next. Phases 5–8 (transition polish, about page, SEO/perf pass, deploy) come in follow-up sessions.

If something in the plan is ambiguous, make the most sensible choice, note it in your summary, and keep going. Ask me only if you're truly blocked.
