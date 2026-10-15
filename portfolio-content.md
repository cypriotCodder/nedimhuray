# Portfolio content — nedimhuray.com

Drop-in copy for the Home, About, and Projects sections. Every factual claim below is drawn from your own GitHub READMEs — nothing invented. Fields marked **[verify]** are my best inference from repo signals; confirm or correct them.

---

## 1. HOME — positioning statement (one line, next to your name)

**Recommended:**
> Backend & full-stack developer building data-driven web apps and real-time systems.

**Alternates (same voice, pick what fits):**
- Backend-leaning full-stack developer — APIs, multi-tenant web apps, and real-time workflows.
- I build backends, full-stack web apps, and the occasional game engine.
- Computer Science graduate building data-driven applications, from restaurant ordering to distributed systems.

**Also update your meta description** (currently the placeholder) to match — e.g.
> Backend & full-stack developer in Cyprus. Selected work in data-driven web apps, real-time systems, and performance engineering.

---

## 2. ABOUT PAGE

### Intro (1–2 sentences)
I'm Nedim — a backend and full-stack developer based in Cyprus. I build APIs, multi-tenant web applications, and real-time systems, and I'm drawn to problems where correctness and performance actually matter.

### Bio (2–3 paragraphs)
I'm a Computer Science graduate (University of Nicosia, 2026) focused on backend and full-stack engineering. Most of what I build is data-driven and multi-tenant: APIs, admin tooling, and real-time workflows backed by PostgreSQL. I care about the parts that are easy to get wrong — data modelling, authentication and session handling, and keeping a system honest under load.

That interest shows up across a fairly wide range of work. I built a restaurant QR-ordering system that runs on a venue's own hardware, including a bridge to thermal kitchen printers. My final-year dissertation rebuilt the same e-commerce app as both a monolith and an event-driven microservices system, then measured them under load with k6, Grafana, and Jaeger. And for my own curiosity I've been writing a 2D game engine in C++20 — chunk streaming, physics, and a full visual editor — which is where my interest in distributed systems, performance, and low-level programming comes from.

I came to software after several years working as a fitness trainer, so I'm comfortable learning something properly and showing up for the unglamorous parts of a job. I speak Turkish and English fluently and I'm open to backend or full-stack roles in Cyprus or remote.

### Skills (grouped)

**Backend** — TypeScript · Node.js · Python · FastAPI · REST APIs
**Frontend** — React · Next.js
**Data** — PostgreSQL · MongoDB · Prisma · Redis
**Infrastructure & tooling** — Docker · RabbitMQ · GitHub Actions · k6 · Grafana · Jaeger
**Systems** — C++20 · SDL2 · OpenGL · Lua
**Languages** — Turkish (fluent) · English (fluent)

---

## 3. PROJECTS (case studies)

> **About cover images & screenshots:** I haven't fabricated any — screenshots of a running app have to come from you so they're real. Notes per project say what each cover/screenshot should show, and where real images already live in your repos. I can also generate abstract 16:10 cover art in your site's teal/amber-on-dark style as placeholders — just ask.

---

### 01 · Masadan Sipariş — Restaurant QR Ordering

- **One-line:** A self-hosted QR ordering system built for a real restaurant, from the customer's phone to the kitchen printer.
- **Year:** 2025–2026 **[verify]**
- **Role:** Solo developer — design, build, and deployment
- **Tags:** Full-Stack · Real-Time · Self-Hosted · Hardware Integration

**Tech stack:** TypeScript · Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · PostgreSQL · Prisma 6 · Server-Sent Events · Zod · jose · bcryptjs · sharp · ESC/POS over TCP · Vitest · GitHub Actions

**Links:** [GitHub](https://github.com/cypriotCodder/Restaurant_app) · *(self-hosted — no public demo)*

**The story**

*Problem.* A restaurant (Heaven Restaurant, ~25–30 tables) needed guests to order from their own phones without installing an app or creating an account — and the orders had to reach the kitchen reliably, on existing hardware, without depending on a third-party cloud service.

*What I did.* I built a single self-hosted Next.js application that runs on the venue's own network. Guests scan a signed table QR code, browse a bilingual (Turkish/English) menu, order, and follow status live over Server-Sent Events; staff manage tickets and table bills from a live desk. The security model was a real design problem: QR codes carry an HMAC signature, table sessions expire and are capped per table, and an order-attempt ledger records abuse. The hardest part was hardware — accepted orders go into a PostgreSQL "outbox" that an on-premises bridge agent pulls and prints over TCP to an ESC/POS kitchen printer, with claims, acknowledgements, retries, and failed-delivery handling so a printer problem never silently loses a ticket.

*Outcome.* A complete end-to-end system — scan → order → staff acceptance → kitchen print — designed to run as a supervised service on one machine, with CI (lint, type-checks, Vitest) covering QR/session validation, auth, rate limits, order idempotency, billing, and the printer protocol. It deliberately avoids Redis, hosted storage, and external schedulers so a small venue can actually run and maintain it.

**Cover / screenshots:** Best cover = the customer menu on a phone, or the live staff desk. Good supporting shots: the QR scan flow, the admin menu editor, and the desk view showing a printer-failure indicator.

---

### 02 · MicroShop — Monolith vs Microservices (Dissertation)

- **One-line:** One e-commerce app, built two ways, measured under load — a study of what actually changes when you split a backend into services.
- **Year:** 2026
- **Role:** Solo — final-year dissertation project
- **Tags:** Distributed Systems · Performance Testing · Backend · Research

**Tech stack:** React · TypeScript · Express · PostgreSQL · MongoDB · Redis · RabbitMQ · Docker Compose · k6 · OpenTelemetry · Jaeger · Grafana · InfluxDB

**Links:** [GitHub](https://github.com/cypriotCodder/Microservices-Project-FYP) · *(saved charts & JSON results in the repo)*

**The story**

*Problem.* "Microservices scale better" is repeated constantly but rarely measured on a like-for-like system. My research question: what actually changes when the same application's shared backend is split into independent services with asynchronous messaging?

*What I did.* I built the same e-commerce app twice — accounts, catalogue, cart, orders, reviews, recommendations, and AI-assisted content — as a Node.js monolith and as an event-driven microservices system (API gateway, separate domain services, RabbitMQ events, Redis, a gateway circuit breaker for the LLM dependency). Then I load-tested both with k6 under matched scenarios, traced requests across services with OpenTelemetry and Jaeger, and injected faults (a 5-second delay into the LLM service, via Pumba) to watch the circuit breaker behave.

*Outcome.* Under a staged stress run to 500 virtual users, the microservices version held mean latency at **67.5 ms** and p95 at **156.7 ms**, versus **262.4 ms** mean and **985.3 ms** p95 for the monolith — while the monolith pushed higher raw throughput (243.6 vs 182.1 req/s). The write-heavy run told a more nuanced story, and microservices still showed higher *maximum* latency, so the typical-case win didn't remove slow outliers. The honest takeaway I kept throughout: these are observations of *these* implementations and runs — database engines and write semantics differ too — not a universal ranking. All figures are backed by saved JSON summaries and generated charts in the repo.

**Cover / screenshots:** Real assets already exist in the repo — use `diagrams/microservices.jpeg` (the architecture) as the cover, and the latency-comparison chart (`performance/results/charts/01_stress_latency_comparison.png`) as a key supporting image. App screenshots are in `docs/screenshots/`.

---

### 03 · Kentimde — Municipal Super App

- **One-line:** A multi-tenant platform for municipalities to run citizen issue reporting, permits, and inspections.
- **Year:** 2026 **[verify]**
- **Role:** Solo developer
- **Tags:** SaaS · Multi-Tenant · Security · Full-Stack

**Tech stack:** Next.js · PostgreSQL *(with row-level-security multi-tenancy)*

**Links:** [kentimde.org](https://kentimde.org) · *(source private — demo on request)*

**The story**

*Problem.* Municipal services — reporting a broken streetlight, applying for a permit, scheduling an inspection — are often fragmented across paper, phone calls, and disconnected systems. The goal was one platform a municipality could run for its citizens and staff, with strict separation between tenants.

*What I did.* I built a Next.js + PostgreSQL platform covering issue reporting, permits, and inspections, with multi-tenancy enforced at the database level through row-level security rather than application code alone. It supports seven user roles, four languages, and full audit logging so administrative actions are traceable.

*Outcome.* A production-oriented civic platform where the hard requirements — tenant isolation, role-based access, auditability, and multilingual support — are built into the foundation. The repository is private; I'm happy to give a walkthrough or demo on request.

**Cover / screenshots:** Since the repo is private, a cover from the `kentimde.org` landing page, or a role-based dashboard view you're comfortable sharing, works best. A small architecture diagram showing the RLS tenant boundary would read well here too.

---

### 04 · Asfalya — Insurance Notification & Insights Platform

- **One-line:** An insurance-agency platform that streamlines customer communication, tracks renewals, and turns agency data into insights.
- **Year:** 2025 **[verify]**
- **Role:** Solo developer
- **Tags:** Full-Stack · Python Backend · Analytics · Bilingual

**Tech stack:** FastAPI (async) · SQLAlchemy + asyncpg · PostgreSQL · Celery + Redis · python-jose · Passlib/bcrypt · Pandas + openpyxl · Resend · Next.js (App Router) · TypeScript · Tailwind + shadcn/ui · Recharts · Leaflet

**Links:** [Live demo](https://asfalya-delta.vercel.app) · [GitHub](https://github.com/cypriotCodder/Asfalya)

**The story**

*Problem.* Small insurance agencies juggle customer onboarding, renewal tracking, and communication across spreadsheets and ad-hoc tools, with no clear view of their own business data.

*What I did.* I built two decoupled services: an async FastAPI backend and a Next.js frontend. Instead of open self-signup, agencies onboard customers (individually or in bulk from Excel, with automated validation and cleaning), and customers activate their own accounts through a secure one-time-code flow — a temporary password plus a hashed, 15-minute-expiry OTP. The admin dashboard turns policy and payment data into revenue trends, policy distribution, and customer-growth metrics (Recharts), and a Leaflet map helps customers find nearby service providers. The whole interface switches between Turkish and English at runtime.

*Outcome.* A working, deployed platform (live demo linked above) that shows my backend range beyond the Node/TypeScript stack — async Python, background jobs with Celery/Redis, Excel ingestion with Pandas, and a secure admin-led auth flow — paired with a polished analytics frontend.

**Cover / screenshots:** Best cover = the admin analytics dashboard (the revenue/growth charts). Supporting shots: the bulk Excel import, the nearby-mechanics map, and the OTP activation screen. You can capture these from the live demo.

---

### 05 · Seed Engine — C++20 2D Game Engine

- **One-line:** A from-scratch C++20 engine for top-down procedurally generated 2D games, with a full visual editor.
- **Year:** 2026 **[verify]**
- **Role:** Solo — engine architect & developer
- **Tags:** Systems Programming · C++ · Game Engine · Tooling

**Tech stack:** C++20 · SDL2 · OpenGL 4.1 · Lua 5.4 · Dear ImGui · LZ4 · CMake

**Links:** [GitHub](https://github.com/cypriotCodder/SEED-Engine) · [Builds](https://github.com/cypriotCodder/seed-releases)

**The story**

*Problem.* A self-directed project to understand game engines by building one — the systems most web work never touches: real-time rendering, physics, procedural generation, streaming, and crash-safe persistence.

*What I did.* `seed_engine` is the reusable C++20 library; `seed_demo` is a game built on it (an explorable island with a destructible timber platform, digging, and building). It does chunk streaming, destructible building physics, generated materials, normal-map lighting, and background checkpoints that leave the previous save loadable if a commit is interrupted. Separately, `seed_editor` is a full dockable visual editor (Dear ImGui) with terrain tools, multi-selection inspector, prefabs, Lua scripting with live syntax checking, undo/redo, and one-click macOS app export — all kept strictly out of the shipped games so they never link the editor.

*Outcome.* A working engine, demo, and editor with defined, documented memory budgets (resident chunks, ECS entities, physics bodies), repeatable benchmarks, and a validation record that's honest about what's been exercised (macOS/OpenGL) versus what's still pending (Windows/Linux sign-off). It's the project that best shows I can reason about low-level systems and performance, not just application code.

**Cover / screenshots:** The repo already has a header image at the top of the README — that, or a shot of the editor with the terrain tools open, makes a strong cover. A clip of the demo (digging / platform collapse) would be an excellent short video if you can capture one.

---

## Quick fixes while you're in there

- **LinkedIn link is broken** in the footer — it currently points to `https://nedimhuray.com/www.linkedin.com/in/nedim-huray` (missing the `https://` prefix, so it resolves as a path on your own site). Should be `https://www.linkedin.com/in/nedim-huray`.
- **Headline & meta description** are still the template placeholder text — replace with the positioning statement above.
- **Years marked [verify]** — I inferred these from repo signals (e.g. Asfalya's 2025 copyright). Double-check before publishing.
