/**
 * Content types. `content/projects.ts` and `content/site.ts` are the single
 * source of truth and are typed against the `*Source` types: every piece of
 * copy is written once per locale (`Text`), and a missing translation fails the
 * build. `lib/projects.ts` and `lib/site.ts` resolve them into the plain types
 * below for one locale, which is all components ever see.
 * Image dimensions are required so every image can be laid out without layout shift.
 */

import type { Locale } from "@/lib/i18n";

export type Localized<T> = Record<Locale, T>;
/** Copy, written once per locale. */
export type Text = Localized<string>;
/** A name that's the same in every locale ("GitHub"), or one per locale ("Live demo"). */
export type Label = string | Text;

export type Media<Alt = string> = {
  src: string;
  alt: Alt;
  width: number;
  height: number;
};

export type Link<L = string> = { label: L; href: string };

export type Block =
  /** `title` renders as a small label above the text, e.g. "Problem". */
  | { type: "text"; title?: string; body: string }
  | ({ type: "image"; caption?: string; wide?: boolean } & Media)
  | { type: "video"; src: string; poster: Media; caption?: string }
  | { type: "gallery"; images: Media[]; caption?: string }
  | { type: "quote"; body: string; by?: string };

/** A project as written in content/projects.ts. */
export type ProjectSource = {
  slug: string;
  /** The product's name; the same in every locale. */
  title: string;
  /** One line, shown in the index and used as the meta description. */
  tagline: Text;
  year: number;
  role: Text;
  tags: Localized<string[]>;
  /** Used for the hover preview, mobile card and case-study hero. */
  cover: Media<Text> & { video?: string };
  links?: Link<Label>[];
  /** Technology names; the same in every locale. */
  stack?: string[];
  /** Reserved for ordering/emphasis; not used by the layout yet. */
  featured?: boolean;
  /** The case study, written once per locale (blocks may differ between them). */
  blocks: Localized<Block[]>;
};

/** A project resolved for one locale. */
export type Project = Omit<ProjectSource, "tagline" | "role" | "tags" | "cover" | "links" | "blocks"> & {
  tagline: string;
  role: string;
  tags: string[];
  cover: Media & { video?: string };
  links?: Link[];
  blocks: Block[];
};

/** Owner details as written in content/site.ts. */
export type SiteSource = {
  name: string;
  /** One line, shown next to the name on the home page. */
  positioning: Text;
  /** Meta description for search results and link previews. */
  description: Text;
  location: Text;
  availability: Text;
  email: string;
  socials: Link[];
  about: {
    /** One or two sentences, set large at the top of /about. */
    intro: Text;
    /** Paragraphs separated by a blank line. */
    bio: Text;
    portrait: Media<Text>;
    skills: { group: Text; items: Label[] }[];
    /** Omit until there's a real file in public/; the link only renders when set. */
    cv?: Localized<Link>;
  };
};

/** Owner details resolved for one locale. */
export type Site = Omit<SiteSource, "positioning" | "description" | "location" | "availability" | "about"> & {
  positioning: string;
  description: string;
  location: string;
  availability: string;
  about: {
    intro: string;
    bio: string;
    portrait: Media;
    skills: { group: string; items: string[] }[];
    cv?: Link;
  };
};
