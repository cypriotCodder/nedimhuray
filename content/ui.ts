import type { Localized } from "./types";

/*
 * Interface copy (navigation, labels, accessible names), one dictionary per locale.
 * Project and owner copy lives in projects.ts and site.ts, not here.
 */

const en = {
  skipToContent: "Skip to content",
  nav: { label: "Primary", index: "Index", about: "About", contact: "Contact" },
  themeToggle: "Dark theme",
  home: {
    title: "Selected work",
    basedIn: "Based in",
    status: "Status",
    index: "Index",
    count: (n: string, years: string) => `${n} projects, ${years}`,
  },
  caseStudy: { back: "Index", role: "Role", year: "Year", stack: "Stack", links: "Links", next: "Next project" },
  about: { title: "About", elsewhere: "Elsewhere" },
  notFound: {
    title: "Not found",
    label: "Error",
    heading: "Not in the index.",
    body: "This page doesn’t exist, or it moved. Try one of these instead.",
    back: "Back to the index",
  },
  og: { more: (n: number) => `+ ${n} more` },
};

export type Ui = typeof en;

export const ui: Localized<Ui> = {
  en,
  tr: {
    skipToContent: "İçeriğe geç",
    nav: { label: "Ana menü", index: "İşler", about: "Hakkımda", contact: "İletişim" },
    themeToggle: "Koyu tema",
    home: {
      title: "Seçilmiş işler",
      basedIn: "Konum",
      status: "Durum",
      index: "İşler",
      count: (n, years) => `${n} proje, ${years}`,
    },
    caseStudy: { back: "İşler", role: "Rol", year: "Yıl", stack: "Teknolojiler", links: "Bağlantılar", next: "Sonraki proje" },
    about: { title: "Hakkımda", elsewhere: "Bağlantılar" },
    notFound: {
      title: "Sayfa bulunamadı",
      label: "Hata",
      heading: "Bu sayfa listede yok.",
      body: "Bu sayfa yok ya da taşınmış. Bunlardan birine göz atabilirsiniz.",
      back: "İşlere dön",
    },
    og: { more: (n) => `+ ${n} proje daha` },
  },
};
