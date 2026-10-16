import type { SiteSource } from "./types";

/*
 * Owner details shown in the intro, header, footer and /about.
 * English copy sourced from portfolio-content.md (drawn from the GitHub READMEs).
 */
export const site: SiteSource = {
  name: "Nedim",
  positioning: {
    en: "Backend & full-stack developer building data-driven web apps and real-time systems.",
    tr: "Veri odaklı web uygulamaları ve gerçek zamanlı sistemler geliştiren backend ve full-stack geliştirici.",
  },
  description: {
    en: "Backend & full-stack developer in Cyprus. Selected work in data-driven web apps, real-time systems, and performance engineering.",
    tr: "Kıbrıs’ta backend ve full-stack geliştirici. Veri odaklı web uygulamaları, gerçek zamanlı sistemler ve performans mühendisliğinden seçilmiş işler.",
  },
  location: { en: "Kyrenia-Nicosia, Cyprus", tr: "Girne-Lefkoşa, Kıbrıs" },
  availability: { en: "Currently seeking full-time opportunities", tr: "Tam zamanlı iş fırsatlarına açığım" },
  email: "huraynedim@icloud.com",
  socials: [
    { label: "GitHub", href: "https://github.com/cypriotCodder" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nedim-huray" },
  ],
  about: {
    intro: {
      en: "I’m Nedim — a backend and full-stack developer based in Cyprus. I build APIs, multi-tenant web applications, and real-time systems, and I’m drawn to problems where correctness and performance actually matter.",
      tr: "Ben Nedim — Kıbrıs’ta yaşayan bir backend ve full-stack geliştiriciyim. API’ler, çok kiracılı (multi-tenant) web uygulamaları ve gerçek zamanlı sistemler geliştiriyorum; doğruluğun ve performansın gerçekten önemli olduğu problemler ilgimi çekiyor.",
    },
    bio: {
      en: "I’m a Computer Science graduate (University of Nicosia, 2026) focused on backend and full-stack engineering. Most of what I build is data-driven and multi-tenant: APIs, admin tooling, and real-time workflows backed by PostgreSQL. I care about the parts that are easy to get wrong — data modelling, authentication and session handling, and keeping a system honest under load.\n\nThat interest shows up across a fairly wide range of work. I built a restaurant QR-ordering system that runs on a venue’s own hardware, including a bridge to thermal kitchen printers. My final-year dissertation rebuilt the same e-commerce app as both a monolith and an event-driven microservices system, then measured them under load with k6, Grafana, and Jaeger. And for my own curiosity I’ve been writing a 2D game engine in C++20 — chunk streaming, physics, and a full visual editor — which is where my interest in distributed systems, performance, and low-level programming comes from.\n\nI came to software after several years working as a fitness trainer, so I’m comfortable learning something properly and showing up for the unglamorous parts of a job. I speak Turkish and English fluently and I’m open to backend or full-stack roles in Cyprus or remote.",
      tr: "Lefkoşa Üniversitesi’nin (University of Nicosia) Bilgisayar Bilimleri bölümünden 2026’da mezun oldum ve backend ile full-stack mühendisliğine odaklanıyorum. Geliştirdiklerimin çoğu veri odaklı ve çok kiracılı: PostgreSQL üzerine kurulu API’ler, yönetim araçları ve gerçek zamanlı iş akışları. En çok, hata yapması kolay olan kısımları önemsiyorum: veri modelleme, kimlik doğrulama ve oturum yönetimi, ve bir sistemin yük altında da doğru çalışmaya devam etmesi.\n\nBu ilgi oldukça farklı işlerde karşıma çıkıyor. Bir işletmenin kendi donanımında çalışan, mutfaktaki termal yazıcılara bağlanan bir restoran QR sipariş sistemi geliştirdim. Bitirme tezimde aynı e-ticaret uygulamasını hem monolit hem de olay güdümlü (event-driven) bir mikroservis sistemi olarak yeniden yazdım ve ikisini k6, Grafana ve Jaeger ile yük altında ölçtüm. Kendi merakım için de C++20 ile bir 2D oyun motoru yazıyorum — chunk streaming, fizik ve eksiksiz bir görsel editör. Dağıtık sistemlere, performansa ve düşük seviyeli programlamaya olan ilgim de buradan geliyor.\n\nYazılıma, birkaç yıl fitness antrenörü olarak çalıştıktan sonra geçtim; bu yüzden bir şeyi gerçekten öğrenmeye ve işin gösterişsiz kısımlarını da üstlenmeye alışkınım. Türkçe ve İngilizceyi akıcı konuşuyorum; Kıbrıs’ta ya da uzaktan, backend veya full-stack pozisyonlarına açığım.",
    },
    portrait: {
      src: "/about/portrait.jpeg",
      alt: {
        en: "Nedim smiling with arms folded, wearing a cream knit sweater, in front of a dark blue textured wall.",
        tr: "Nedim, koyu mavi dokulu bir duvarın önünde, krem rengi örgü bir kazakla kollarını kavuşturmuş gülümsüyor.",
      },
      width: 768,
      height: 1024,
    },
    skills: [
      { group: { en: "Backend", tr: "Backend" }, items: ["TypeScript", "Node.js", "Python", "FastAPI", { en: "REST APIs", tr: "REST API" }] },
      { group: { en: "Frontend", tr: "Frontend" }, items: ["React", "Next.js"] },
      { group: { en: "Data", tr: "Veri" }, items: ["PostgreSQL", "MongoDB", "Prisma", "Redis"] },
      {
        group: { en: "Infrastructure & tooling", tr: "Altyapı ve araçlar" },
        items: ["Docker", "RabbitMQ", "GitHub Actions", "k6", "Grafana", "Jaeger"],
      },
      { group: { en: "Systems", tr: "Sistemler" }, items: ["C++20", "SDL2", "OpenGL", "Lua"] },
      {
        group: { en: "Languages", tr: "Diller" },
        items: [
          { en: "Turkish (fluent)", tr: "Türkçe (akıcı)" },
          { en: "English (fluent)", tr: "İngilizce (akıcı)" },
        ],
      },
    ],
    // cv: {
    //   en: { href: "/cv.pdf", label: "Download CV (PDF)" },
    //   tr: { href: "/cv-tr.pdf", label: "Özgeçmişi indir (PDF)" },
    // },
  },
};
