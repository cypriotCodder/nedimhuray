import type { Media, ProjectSource, Text } from "./types";

/*
 * ALL PROJECT CONTENT LIVES HERE.
 * To add a project: append an object below and drop its media into
 * public/projects/<slug>/. Order in this array = order in the Index.
 * Every piece of copy is written in English and Turkish ({ en, tr }).
 *
 * English copy sourced from portfolio-content.md (drawn from the GitHub READMEs).
 * Covers are generated placeholder art (scripts/generate-placeholders.mjs)
 * until real screenshots are added.
 */

const COVER = { width: 1600, height: 1000 } as const;

const placeholderCover = (slug: string, art: Text): Media<Text> => ({
  src: `/projects/${slug}/cover.svg`,
  alt: {
    en: `Placeholder cover art: ${art.en}. A screenshot of the project will replace it.`,
    tr: `Geçici kapak görseli: ${art.tr}. Yerine projenin bir ekran görüntüsü gelecek.`,
  },
  ...COVER,
});

export const projects: ProjectSource[] = [
  {
    slug: "masadan-siparis",
    title: "Masadan Sipariş",
    tagline: {
      en: "A self-hosted QR ordering system built for a real restaurant, from the customer’s phone to the kitchen printer.",
      tr: "Gerçek bir restoran için geliştirilmiş, müşterinin telefonundan mutfak yazıcısına kadar uzanan, kendi sunucusunda çalışan bir QR sipariş sistemi.",
    },
    year: 2026,
    role: { en: "Solo developer — design, build, and deployment", tr: "Tek geliştirici — tasarım, geliştirme ve kurulum" },
    tags: {
      en: ["Full-Stack", "Real-Time", "Self-Hosted", "Hardware Integration"],
      tr: ["Full-Stack", "Gerçek Zamanlı", "Kendi Sunucusunda", "Donanım Entegrasyonu"],
    },
    cover: placeholderCover("masadan-siparis", {
      en: "stacked black waveform lines on off-white paper, one line in orange",
      tr: "kırık beyaz kâğıt üzerinde üst üste siyah dalga çizgileri, biri turuncu",
    }),
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
    blocks: {
      en: [
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
      tr: [
        {
          type: "text",
          title: "Problem",
          body: "Bir restoran (Heaven Restaurant, ~25–30 masa), misafirlerin uygulama yüklemeden ya da hesap açmadan kendi telefonlarından sipariş verebilmesini istiyordu. Siparişlerin de üçüncü taraf bir bulut hizmetine bağımlı olmadan, mevcut donanımla mutfağa güvenilir şekilde ulaşması gerekiyordu.",
        },
        {
          type: "text",
          title: "Ne yaptım",
          body: "İşletmenin kendi ağında çalışan, kendi sunucusunda barındırılan tek bir Next.js uygulaması geliştirdim. Misafirler imzalı bir masa QR kodunu okutuyor, iki dilli (Türkçe/İngilizce) menüye göz atıyor, sipariş veriyor ve siparişin durumunu Server-Sent Events üzerinden canlı takip ediyor; personel ise siparişleri ve masa hesaplarını canlı bir panelden yönetiyor.\n\nGüvenlik modeli başlı başına bir tasarım problemiydi: QR kodları HMAC imzası taşıyor, masa oturumlarının bir süresi ve masa başına bir üst sınırı var, ve bir sipariş denemesi kaydı kötüye kullanımı kayıt altına alıyor.\n\nEn zor kısım donanımdı. Onaylanan siparişler bir PostgreSQL “outbox” tablosuna yazılıyor; işletmede çalışan bir köprü ajanı bunları çekip TCP üzerinden ESC/POS mutfak yazıcısına basıyor. Sahiplenme, onay, yeniden deneme ve başarısız teslimat yönetimi sayesinde bir yazıcı sorunu hiçbir fişin sessizce kaybolmasına yol açmıyor.",
        },
        {
          type: "text",
          title: "Sonuç",
          body: "Uçtan uca eksiksiz bir sistem — QR okutma → sipariş → personel onayı → mutfak çıktısı — tek bir makinede denetimli bir servis olarak çalışacak şekilde tasarlandı. CI (lint, tip kontrolleri, Vitest) QR/oturum doğrulamasını, kimlik doğrulamayı, istek sınırlarını, sipariş idempotency’sini, hesap kesimini ve yazıcı protokolünü kapsıyor.\n\nKüçük bir işletmenin sistemi gerçekten çalıştırıp bakımını yapabilmesi için Redis’ten, barındırılan depolama hizmetlerinden ve harici zamanlayıcılardan bilinçli olarak kaçınıyor.",
        },
      ],
    },
  },
  {
    slug: "microshop",
    title: "MicroShop",
    tagline: {
      en: "One e-commerce app, built two ways, measured under load — a dissertation on what actually changes when you split a backend into services.",
      tr: "İki farklı şekilde geliştirilip yük altında ölçülen tek bir e-ticaret uygulaması — bir backend’i servislere böldüğünüzde gerçekte neyin değiştiğini inceleyen bir bitirme tezi.",
    },
    year: 2026,
    role: { en: "Solo — final-year dissertation project", tr: "Tek başına — bitirme tezi projesi" },
    tags: {
      en: ["Distributed Systems", "Performance Testing", "Backend", "Research"],
      tr: ["Dağıtık Sistemler", "Performans Testi", "Backend", "Araştırma"],
    },
    cover: placeholderCover("microshop", {
      en: "amber halftone dots forming concentric ripples on a dark brown field",
      tr: "koyu kahverengi zemin üzerinde iç içe halkalar oluşturan kehribar rengi raster noktalar",
    }),
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
    links: [
      {
        label: { en: "GitHub (code, charts & JSON results)", tr: "GitHub (kod, grafikler ve JSON sonuçları)" },
        href: "https://github.com/cypriotCodder/Microservices-Project-FYP",
      },
    ],
    blocks: {
      en: [
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
      tr: [
        {
          type: "text",
          title: "Problem",
          body: "“Mikroservisler daha iyi ölçeklenir” sözü sürekli tekrarlanıyor, ama birebir karşılaştırılabilir bir sistem üzerinde nadiren ölçülüyor. Araştırma sorum şuydu: Aynı uygulamanın ortak backend’i, asenkron mesajlaşan bağımsız servislere bölündüğünde gerçekte ne değişir?",
        },
        {
          type: "text",
          title: "Ne yaptım",
          body: "Aynı e-ticaret uygulamasını — hesaplar, katalog, sepet, siparişler, yorumlar, öneriler ve yapay zekâ destekli içerik — iki kez geliştirdim: bir Node.js monoliti olarak ve olay güdümlü bir mikroservis sistemi olarak (API gateway, ayrı alan servisleri, RabbitMQ olayları, Redis ve LLM bağımlılığı için gateway’de bir circuit breaker).\n\nArdından ikisini eşleştirilmiş senaryolarla k6 ile yük testine soktum, istekleri OpenTelemetry ve Jaeger ile servisler arasında izledim ve circuit breaker’ın davranışını görmek için hata enjekte ettim (Pumba ile LLM servisine 5 saniyelik gecikme).",
        },
        {
          type: "text",
          title: "Sonuç",
          body: "500 sanal kullanıcıya kadar kademeli artan bir stres testinde mikroservis sürümü ortalama gecikmeyi 67,5 ms’de, p95’i 156,7 ms’de tuttu; monolitte bu değerler 262,4 ms ve 985,3 ms’ydi. Buna karşılık ham işlem hacminde monolit öndeydi (saniyede 243,6’ya karşı 182,1 istek). Yazma ağırlıklı test daha nüanslı bir tablo ortaya koydu: Mikroservislerde maksimum gecikme yine daha yüksekti, yani tipik durumdaki kazanç yavaş uç değerleri ortadan kaldırmadı.\n\nBaştan sona koruduğum dürüst sonuç şu: Bunlar bu uygulamalara ve bu test koşularına ait gözlemler — veritabanı motorları ve yazma semantiği de farklı — evrensel bir sıralama değil. Tüm rakamlar repodaki kayıtlı JSON özetleri ve üretilmiş grafiklerle destekleniyor.",
        },
      ],
    },
  },
  {
    slug: "kentimde",
    title: "Kentimde",
    tagline: {
      en: "A multi-tenant platform for municipalities to run citizen issue reporting, permits, and inspections.",
      tr: "Belediyelerin vatandaş bildirimlerini, ruhsatları ve denetimleri yönetmesi için çok beldeli bir platform.",
    },
    year: 2026,
    role: { en: "Solo developer", tr: "Tek geliştirici" },
    tags: {
      en: ["SaaS", "Multi-Tenant", "Security", "Full-Stack"],
      tr: ["SaaS", "Çok Belediyeli", "Güvenlik", "Full-Stack"],
    },
    cover: placeholderCover("kentimde", {
      en: "teal topographic contour lines on near-black, with an orange marker at the summit",
      tr: "siyaha yakın zemin üzerinde camgöbeği topografik eş yükselti eğrileri, zirvede turuncu bir işaret",
    }),
    stack: ["Next.js", "PostgreSQL (row-level-security multi-tenancy)"],
    links: [{ label: "kentimde.org", href: "https://kentimde.org" }],
    blocks: {
      en: [
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
      tr: [
        {
          type: "text",
          title: "Problem",
          body: "Belediye hizmetleri — bozuk bir sokak lambasını bildirmek, ruhsat başvurusu yapmak, denetim randevusu almak — çoğu zaman kâğıt, telefon ve birbirinden kopuk sistemler arasında dağınık durumda. Amaç, bir belediyenin vatandaşları ve personeli için işletebileceği, beldeler arasında katı bir ayrım olan tek bir platformdu.",
        },
        {
          type: "text",
          title: "Ne yaptım",
          body: "Bildirim, ruhsat ve denetim süreçlerini kapsayan bir Next.js + PostgreSQL platformu geliştirdim. Çok beldelilik yalnızca uygulama koduyla değil, veritabanı düzeyinde row-level security ile sağlanıyor. Platform yedi kullanıcı rolünü ve dört dili destekliyor; tam denetim kaydı (audit log) sayesinde yönetimsel işlemler izlenebiliyor.",
        },
        {
          type: "text",
          title: "Sonuç",
          body: "Zorlu gereksinimlerin — belde izolasyonu, rol tabanlı erişim, denetlenebilirlik ve çok dilli destek — en baştan temele yerleştirildiği, canlı kullanıma yönelik bir kamu hizmeti platformu.\n\nKaynak kodu kapalı; istenirse memnuniyetle bir tanıtım ya da demo yapabilirim.",
        },
      ],
    },
  },
  {
    slug: "asfalya",
    title: "Asfalya",
    tagline: {
      en: "An insurance-agency platform that streamlines customer communication, tracks renewals, and turns agency data into insights.",
      tr: "Müşteri iletişimini kolaylaştıran, poliçe yenilemelerini takip eden ve acente verisini içgörüye dönüştüren bir sigorta acentesi platformu.",
    },
    year: 2025,
    role: { en: "Solo developer", tr: "Tek geliştirici" },
    tags: {
      en: ["Full-Stack", "Python Backend", "Analytics", "Bilingual"],
      tr: ["Full-Stack", "Python Backend", "Analitik", "İki Dilli"],
    },
    cover: placeholderCover("asfalya", {
      en: "soft blurred fields of pink, peach and violet behind a fine measuring grid",
      tr: "ince bir ölçü ızgarasının arkasında pembe, şeftali ve mor tonlarında yumuşak, bulanık alanlar",
    }),
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
      { label: { en: "Live demo", tr: "Canlı demo" }, href: "https://asfalya-delta.vercel.app" },
      { label: "GitHub", href: "https://github.com/cypriotCodder/Asfalya" },
    ],
    blocks: {
      en: [
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
      tr: [
        {
          type: "text",
          title: "Problem",
          body: "Küçük sigorta acenteleri müşteri kaydını, yenileme takibini ve iletişimi elektronik tablolar ve derme çatma araçlar arasında idare ediyor; kendi iş verilerine dair net bir görünümleri yok.",
        },
        {
          type: "text",
          title: "Ne yaptım",
          body: "Birbirinden bağımsız iki servis geliştirdim: asenkron bir FastAPI backend’i ve bir Next.js frontend’i. Herkese açık kayıt yerine acenteler müşterilerini sisteme kendileri ekliyor (tek tek ya da Excel’den toplu olarak, otomatik doğrulama ve temizleme ile); müşteriler de hesaplarını güvenli bir tek kullanımlık kod akışıyla etkinleştiriyor — geçici bir şifre ve hash’lenmiş, 15 dakika geçerli bir OTP.\n\nYönetim paneli poliçe ve ödeme verilerini gelir trendlerine, poliçe dağılımına ve müşteri büyüme metriklerine (Recharts) dönüştürüyor; bir Leaflet haritası da müşterilerin yakındaki servis sağlayıcıları bulmasına yardımcı oluyor. Arayüzün tamamı çalışma anında Türkçe ile İngilizce arasında geçiş yapabiliyor.",
        },
        {
          type: "text",
          title: "Sonuç",
          body: "Yayında olan bir prototip (demo bağlantısı yukarıda). Node/TypeScript dışındaki backend yelpazemi gösteriyor — asenkron Python, Celery/Redis ile arka plan işleri, Pandas ile Excel içe aktarımı ve yönetici tarafından başlatılan güvenli bir kimlik doğrulama akışı — ve bunu özenli bir analitik arayüzüyle birleştiriyor.",
        },
      ],
    },
  },
  {
    slug: "seed-engine",
    title: "Seed Engine",
    tagline: {
      en: "A from-scratch C++20 engine for top-down procedurally generated 2D games, with a full visual editor.",
      tr: "Yukarıdan bakışlı, prosedürel olarak üretilen 2D oyunlar için sıfırdan yazılmış, eksiksiz bir görsel editöre sahip C++20 motoru.",
    },
    year: 2026,
    role: { en: "Solo — engine architect & developer", tr: "Tek başına — motor mimarı ve geliştirici" },
    tags: {
      en: ["Systems Programming", "C++", "Game Engine", "Tooling"],
      tr: ["Sistem Programlama", "C++", "Oyun Motoru", "Geliştirici Araçları"],
    },
    cover: placeholderCover("seed-engine", {
      en: "teal contour lines like the terrain of a procedurally generated island",
      tr: "prosedürel olarak üretilmiş bir adanın arazisini andıran camgöbeği eş yükselti eğrileri",
    }),
    stack: ["C++20", "SDL2", "OpenGL 4.1", "Lua 5.4", "Dear ImGui", "LZ4", "CMake"],
    links: [
      { label: "GitHub", href: "https://github.com/cypriotCodder/SEED-Engine" },
      { label: { en: "Builds", tr: "Sürümler" }, href: "https://github.com/cypriotCodder/seed-releases" },
    ],
    blocks: {
      en: [
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
      tr: [
        {
          type: "text",
          title: "Problem",
          body: "Oyun motorlarını bir tane yazarak anlamak için başlattığım kişisel bir proje. Odağında, çoğu web işinin hiç dokunmadığı sistemler var: gerçek zamanlı render, fizik, prosedürel üretim, streaming ve çökmeye dayanıklı kayıt.",
        },
        {
          type: "text",
          title: "Ne yaptım",
          body: "seed_engine yeniden kullanılabilir C++20 kütüphanesi; seed_demo ise onun üzerine kurulu bir oyun (yıkılabilir ahşap bir platformu olan, kazılıp üzerine inşa edilebilen, keşfedilebilir bir ada). Motorda chunk streaming, yıkılabilir yapı fiziği, üretilmiş malzemeler, normal map aydınlatma ve arka planda alınan kontrol noktaları var; bir kayıt işlemi yarıda kesilirse önceki kayıt yüklenebilir kalıyor.\n\nBunlardan ayrı olarak seed_editor; arazi araçları, çoklu seçim destekli bir inspector, prefab’lar, canlı sözdizimi denetimli Lua betikleri, geri al/yinele ve tek tıkla macOS uygulaması dışa aktarımı sunan, panelleri yerleştirilebilir eksiksiz bir görsel editör (Dear ImGui). Editör, yayınlanan oyunlardan tamamen ayrı tutuluyor; oyunlar editörle hiçbir zaman linklenmiyor.",
        },
        {
          type: "text",
          title: "Sonuç",
          body: "Tanımlı ve belgelenmiş bellek bütçeleri (bellekteki chunk’lar, ECS varlıkları, fizik gövdeleri), tekrarlanabilir benchmark’lar ve neyin test edildiği (macOS/OpenGL) ile neyin hâlâ beklediği (Windows/Linux onayı) konusunda dürüst bir doğrulama kaydı olan, çalışan bir motor, demo ve editör.\n\nYalnızca uygulama kodu değil, düşük seviyeli sistemler ve performans üzerine de düşünebildiğimi en iyi gösteren proje bu.",
        },
      ],
    },
  },
];
