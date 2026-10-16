import { site } from "@/content/site";
import type { Site } from "@/content/types";
import { labelIn, type Locale } from "./i18n";

/** Owner details in one locale. */
export function getSite(lang: Locale): Site {
  const { about } = site;
  return {
    ...site,
    positioning: site.positioning[lang],
    description: site.description[lang],
    location: site.location[lang],
    availability: site.availability[lang],
    about: {
      intro: about.intro[lang],
      bio: about.bio[lang],
      portrait: { ...about.portrait, alt: about.portrait.alt[lang] },
      skills: about.skills.map((s) => ({ group: s.group[lang], items: s.items.map((i) => labelIn(i, lang)) })),
      cv: about.cv?.[lang],
    },
  };
}
