import type { Media, Project } from "./types";

/*
 * ALL PROJECT CONTENT LIVES HERE.
 * To add a project: append an object below and drop its media into
 * public/projects/<slug>/. Order in this array = order in the Index.
 *
 * Copy sourced from portfolio-content.md (drawn from the GitHub READMEs).
 * Covers are generated placeholder art (scripts/generate-placeholders.mjs)
 * until real screenshots are added.
 */

const COVER = { width: 1600, height: 1000 } as const;

const placeholderCover = (slug: string, art: string): Media => ({
  src: `/projects/${slug}/cover.svg`,
  alt: `Placeholder cover art: ${art}. A screenshot of the project will replace it.`,
  ...COVER,
});

export const projects: Project[] = [
  {
    slug: "masadan-siparis",
    title: "Masadan Sipariş",
    tagline: "A self-hosted QR ordering system built for a real restaurant, from the customer’s phone to the kitchen printer.",
    year: 2026,
    role: "Solo developer — design, build, and deployment",
    tags: ["Full-Stack", "Real-Time", "Self-Hosted", "Hardware Integration"],
    cover: placeholderCover("masadan-siparis", "stacked black waveform lines on off-white paper, one line in orange"),
    stack: [
      "TypeScript",
      "Next.js 16 (App Router)",
      "React 19",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Prisma 6",
      "Server-Sent Events",
      "Zod",
      "jose",
      "bcryptjs",
      "sharp",
      "ESC/POS over TCP",
      "Vitest",
      "GitHub Actions",
    ],
    links: [{ label: "GitHub", href: "https://github.com/cypriotCodder/Restaurant_app" }],
    featured: true,
    blocks: [
      {
        type: "text",
        title: "Problem",
        body: "A restaurant (Heaven Restaurant, ~25–30 tables) needed guests to order from their own phones without installing an app or creating an account — and the orders had to reach the kitchen reliably, on existing hardware, without depending on a third-party cloud service.",
      },
      {
        type: "text",
        title: "What I did",
        body: "I built a single self-hosted Next.js application that runs on the venue’s own network. Guests scan a signed table QR code, browse a bilingual (Turkish/English) menu, order, and follow status live over Server-Sent Events; staff manage tickets and table bills from a live desk.\n\nThe security model was a real design problem: QR codes carry an HMAC signature, table sessions expire and are capped per table, and an order-attempt ledger records abuse.\n\nThe hardest part was hardware. Accepted orders go into a PostgreSQL “outbox” that an on-premises bridge agent pulls and prints over TCP to an ESC/POS kitchen printer, with claims, acknowledgements, retries, and failed-delivery handling so a printer problem never silently loses a ticket.",
      },
      {
        type: "text",
        title: "Outcome",
        body: "A complete end-to-end system — scan → order → staff acceptance → kitchen print — designed to run as a supervised service on one machine, with CI (lint, type-checks, Vitest) covering QR/session validation, auth, rate limits, order idempotency, billing, and the printer protocol.\n\nIt deliberately avoids Redis, hosted storage, and external schedulers so a small venue can actually run and maintain it.",
      },
    ],
  },
  {
    slug: "microshop",
    title: "MicroShop",
    tagline: "One e-commerce app, built two ways, measured under load — a dissertation on what actually changes when you split a backend into services.",
    year: 2026,
    role: "Solo — final-year dissertation project",
    tags: ["Distributed Systems", "Performance Testing", "Backend", "Research"],
    cover: placeholderCover("microshop", "amber halftone dots forming concentric ripples on a dark brown field"),
    stack: [
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "Docker Compose",
      "k6",
      "OpenTelemetry",
      "Jaeger",
      "Grafana",
      "InfluxDB",
    ],
    links: [{ label: "GitHub (code, charts & JSON results)", href: "https://github.com/cypriotCodder/Microservices-Project-FYP" }],
    blocks: [
      {
        type: "text",
        title: "Problem",
        body: "“Microservices scale better” is repeated constantly but rarely measured on a like-for-like system. My research question: what actually changes when the same application’s shared backend is split into independent services with asynchronous messaging?",
      },
      {
        type: "text",
        title: "What I did",
        body: "I built the same e-commerce app twice — accounts, catalogue, cart, orders, reviews, recommendations, and AI-assisted content — as a Node.js monolith and as an event-driven microservices system (API gateway, separate domain services, RabbitMQ events, Redis, a gateway circuit breaker for the LLM dependency).\n\nThen I load-tested both with k6 under matched scenarios, traced requests across services with OpenTelemetry and Jaeger, and injected faults (a 5-second delay into the LLM service, via Pumba) to watch the circuit breaker behave.",
      },
      {
        type: "text",
        title: "Outcome",
        body: "Under a staged stress run to 500 virtual users, the microservices version held mean latency at 67.5 ms and p95 at 156.7 ms, versus 262.4 ms mean and 985.3 ms p95 for the monolith — while the monolith pushed higher raw throughput (243.6 vs 182.1 req/s). The write-heavy run told a more nuanced story, and microservices still showed higher maximum latency, so the typical-case win didn’t remove slow outliers.\n\nThe honest takeaway I kept throughout: these are observations of these implementations and runs — database engines and write semantics differ too — not a universal ranking. All figures are backed by saved JSON summaries and generated charts in the repo.",
      },
    ],
  },
  {
    slug: "kentimde",
    title: "Kentimde",
    tagline: "A multi-tenant platform for municipalities to run citizen issue reporting, permits, and inspections.",
    year: 2026,
    role: "Solo developer",
    tags: ["SaaS", "Multi-Tenant", "Security", "Full-Stack"],
    cover: placeholderCover("kentimde", "teal topographic contour lines on near-black, with an orange marker at the summit"),
    stack: ["Next.js", "PostgreSQL (row-level-security multi-tenancy)"],
    links: [{ label: "kentimde.org", href: "https://kentimde.org" }],
    blocks: [
      {
        type: "text",
        title: "Problem",
        body: "Municipal services — reporting a broken streetlight, applying for a permit, scheduling an inspection — are often fragmented across paper, phone calls, and disconnected systems. The goal was one platform a municipality could run for its citizens and staff, with strict separation between tenants.",
      },
      {
        type: "text",
        title: "What I did",
        body: "I built a Next.js + PostgreSQL platform covering issue reporting, permits, and inspections, with multi-tenancy enforced at the database level through row-level security rather than application code alone. It supports seven user roles, four languages, and full audit logging so administrative actions are traceable.",
      },
      {
        type: "text",
        title: "Outcome",
        body: "A production-oriented civic platform where the hard requirements — tenant isolation, role-based access, auditability, and multilingual support — are built into the foundation.\n\nThe source is private; I’m happy to give a walkthrough or demo on request.",
      },
    ],
  },
  {
    slug: "asfalya",
    title: "Asfalya",
    tagline: "An insurance-agency platform that streamlines customer communication, tracks renewals, and turns agency data into insights.",
    year: 2025,
    role: "Solo developer",
    tags: ["Full-Stack", "Python Backend", "Analytics", "Bilingual"],
    cover: placeholderCover("asfalya", "soft blurred fields of pink, peach and violet behind a fine measuring grid"),
    stack: [
      "FastAPI (async)",
      "SQLAlchemy + asyncpg",
      "PostgreSQL",
      "Celery + Redis",
      "python-jose",
      "Passlib/bcrypt",
      "Pandas + openpyxl",
      "Resend",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind + shadcn/ui",
      "Recharts",
      "Leaflet",
    ],
    links: [
      { label: "Live demo", href: "https://asfalya-delta.vercel.app" },
      { label: "GitHub", href: "https://github.com/cypriotCodder/Asfalya" },
    ],
    blocks: [
      {
        type: "text",
        title: "Problem",
        body: "Small insurance agencies juggle customer onboarding, renewal tracking, and communication across spreadsheets and ad-hoc tools, with no clear view of their own business data.",
      },
      {
        type: "text",
        title: "What I did",
        body: "I built two decoupled services: an async FastAPI backend and a Next.js frontend. Instead of open self-signup, agencies onboard customers (individually or in bulk from Excel, with automated validation and cleaning), and customers activate their own accounts through a secure one-time-code flow — a temporary password plus a hashed, 15-minute-expiry OTP.\n\nThe admin dashboard turns policy and payment data into revenue trends, policy distribution, and customer-growth metrics (Recharts), and a Leaflet map helps customers find nearby service providers. The whole interface switches between Turkish and English at runtime.",
      },
      {
        type: "text",
        title: "Outcome",
        body: "A deployed prototype (live demo linked above) that shows my backend range beyond the Node/TypeScript stack — async Python, background jobs with Celery/Redis, Excel ingestion with Pandas, and a secure admin-led auth flow — paired with a polished analytics frontend.",
      },
    ],
  },
  {
    slug: "seed-engine",
    title: "Seed Engine",
    tagline: "A from-scratch C++20 engine for top-down procedurally generated 2D games, with a full visual editor.",
    year: 2026,
    role: "Solo — engine architect & developer",
    tags: ["Systems Programming", "C++", "Game Engine", "Tooling"],
    cover: placeholderCover("seed-engine", "teal contour lines like the terrain of a procedurally generated island"),
    stack: ["C++20", "SDL2", "OpenGL 4.1", "Lua 5.4", "Dear ImGui", "LZ4", "CMake"],
    links: [
      { label: "GitHub", href: "https://github.com/cypriotCodder/SEED-Engine" },
      { label: "Builds", href: "https://github.com/cypriotCodder/seed-releases" },
    ],
    blocks: [
      {
        type: "text",
        title: "Problem",
        body: "A self-directed project to understand game engines by building one — the systems most web work never touches: real-time rendering, physics, procedural generation, streaming, and crash-safe persistence.",
      },
      {
        type: "text",
        title: "What I did",
        body: "seed_engine is the reusable C++20 library; seed_demo is a game built on it (an explorable island with a destructible timber platform, digging, and building). It does chunk streaming, destructible building physics, generated materials, normal-map lighting, and background checkpoints that leave the previous save loadable if a commit is interrupted.\n\nSeparately, seed_editor is a full dockable visual editor (Dear ImGui) with terrain tools, a multi-selection inspector, prefabs, Lua scripting with live syntax checking, undo/redo, and one-click macOS app export — all kept strictly out of the shipped games so they never link the editor.",
      },
      {
        type: "text",
        title: "Outcome",
        body: "A working engine, demo, and editor with defined, documented memory budgets (resident chunks, ECS entities, physics bodies), repeatable benchmarks, and a validation record that’s honest about what’s been exercised (macOS/OpenGL) versus what’s still pending (Windows/Linux sign-off).\n\nIt’s the project that best shows I can reason about low-level systems and performance, not just application code.",
      },
    ],
  },
];
