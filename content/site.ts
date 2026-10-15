import type { Site } from "./types";

/*
 * Owner details shown in the intro, header and footer.
 * PLACEHOLDER values — replace with real ones (PLAN.md §9).
 */
export const site: Site = {
  name: "Nedim",
  positioning: "Selected projects, presented one at a time. This line is a placeholder for a one-sentence positioning statement.",
  location: "City, Country (placeholder)",
  availability: "Availability line (placeholder)",
  email: "hello@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  about: {
    intro: "Placeholder introduction: one or two sentences about who you are and the kind of work you want to be known for.",
    bio: "This is sample bio copy. Replace it with a short, plain-spoken account of your background — where you started, what you work on now, and how you like to work.\n\nA second paragraph can cover what you are looking for next. Two or three paragraphs is plenty; the projects carry the rest.",
    portrait: {
      src: "/about/portrait.svg",
      alt: "Placeholder portrait: a halftone head-and-shoulders silhouette standing in for a photo.",
      width: 1200,
      height: 1500,
    },
    skills: [
      { group: "Disciplines", items: ["Sample discipline", "Another discipline", "Placeholder practice"] },
      { group: "Tools", items: ["Sample tool", "Another tool", "Placeholder framework"] },
      { group: "Currently", items: ["Placeholder interest", "Something you are learning"] },
    ],
    // cv: { href: "/cv.pdf", label: "Download CV (PDF)" },
  },
};
