/**
 * Content types. `content/projects.ts` is the single source of truth and is
 * typed against these. Image dimensions are required so every image can be
 * laid out without layout shift.
 */

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Block =
  /** `title` renders as a small label above the text, e.g. "Problem". */
  | { type: "text"; title?: string; body: string }
  | ({ type: "image"; caption?: string; wide?: boolean } & Media)
  | { type: "video"; src: string; poster: Media; caption?: string }
  | { type: "gallery"; images: Media[]; caption?: string }
  | { type: "quote"; body: string; by?: string };

export type Project = {
  slug: string;
  title: string;
  /** One line, shown in the index and used as the meta description. */
  tagline: string;
  year: number;
  role: string;
  tags: string[];
  /** Used for the hover preview, mobile card and case-study hero. */
  cover: Media & { video?: string };
  links?: { label: string; href: string }[];
  stack?: string[];
  /** Reserved for ordering/emphasis; not used by the layout yet. */
  featured?: boolean;
  blocks: Block[];
};

export type Site = {
  name: string;
  /** One line, shown next to the name on the home page. */
  positioning: string;
  /** Meta description for search results and link previews. */
  description: string;
  location: string;
  availability: string;
  email: string;
  socials: { label: string; href: string }[];
  about: {
    /** One or two sentences, set large at the top of /about. */
    intro: string;
    /** Paragraphs separated by a blank line. */
    bio: string;
    portrait: Media;
    skills: { group: string; items: string[] }[];
    /** Omit until there's a real file in public/; the link only renders when set. */
    cv?: { href: string; label: string };
  };
};
