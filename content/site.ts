import type { Site } from "./types";

/*
 * Owner details shown in the intro, header, footer and /about.
 * Copy sourced from portfolio-content.md (drawn from the GitHub READMEs).
 */
export const site: Site = {
  name: "Nedim",
  positioning: "Backend & full-stack developer building data-driven web apps and real-time systems.",
  description:
    "Backend & full-stack developer in Cyprus. Selected work in data-driven web apps, real-time systems, and performance engineering.",
  location: "Kyrenia-Nicosia, Cyprus",
  availability: "Currently seeking full-time opportunities",
  email: "huraynedim@icloud.com",
  socials: [
    { label: "GitHub", href: "https://github.com/cypriotCodder" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nedim-huray" },
  ],
  about: {
    intro:
      "I’m Nedim — a backend and full-stack developer based in Cyprus. I build APIs, multi-tenant web applications, and real-time systems, and I’m drawn to problems where correctness and performance actually matter.",
    bio: "I’m a Computer Science graduate (University of Nicosia, 2026) focused on backend and full-stack engineering. Most of what I build is data-driven and multi-tenant: APIs, admin tooling, and real-time workflows backed by PostgreSQL. I care about the parts that are easy to get wrong — data modelling, authentication and session handling, and keeping a system honest under load.\n\nThat interest shows up across a fairly wide range of work. I built a restaurant QR-ordering system that runs on a venue’s own hardware, including a bridge to thermal kitchen printers. My final-year dissertation rebuilt the same e-commerce app as both a monolith and an event-driven microservices system, then measured them under load with k6, Grafana, and Jaeger. And for my own curiosity I’ve been writing a 2D game engine in C++20 — chunk streaming, physics, and a full visual editor — which is where my interest in distributed systems, performance, and low-level programming comes from.\n\nI came to software after several years working as a fitness trainer, so I’m comfortable learning something properly and showing up for the unglamorous parts of a job. I speak Turkish and English fluently and I’m open to backend or full-stack roles in Cyprus or remote.",
    portrait: {
      src: "/about/portrait.jpeg",
      alt: "Nedim smiling with arms folded, wearing a cream knit sweater, in front of a dark blue textured wall.",
      width: 768,
      height: 1024,
    },
    skills: [
      { group: "Backend", items: ["TypeScript", "Node.js", "Python", "FastAPI", "REST APIs"] },
      { group: "Frontend", items: ["React", "Next.js"] },
      { group: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "Redis"] },
      { group: "Infrastructure & tooling", items: ["Docker", "RabbitMQ", "GitHub Actions", "k6", "Grafana", "Jaeger"] },
      { group: "Systems", items: ["C++20", "SDL2", "OpenGL", "Lua"] },
      { group: "Languages", items: ["Turkish (fluent)", "English (fluent)"] },
    ],
    // cv: { href: "/cv.pdf", label: "Download CV (PDF)" },
  },
};
