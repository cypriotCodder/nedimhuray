import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";

// Display + body: one variable grotesque with an optical-size axis, so the
// same family works at 9rem titles and 1rem body copy.
export const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

// Metadata: mono for numbers, years, roles, tags.
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
