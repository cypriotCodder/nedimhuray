import Link from "next/link";
import { site } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const count = getProjects().length;

  return (
    <header className="frame flex items-baseline justify-between py-5 md:py-7">
      <Link href="/" className="text-small font-semibold tracking-tight">
        {site.name}
        <span className="text-accent" aria-hidden="true">
          .
        </span>
      </Link>
      <nav aria-label="Primary">
        <ul className="label flex items-center gap-5 sm:gap-6">
          <li>
            <Link href="/#index" className="transition-colors duration-(--duration-fast) hover:text-fg">
              Index <span className="text-faint">({String(count).padStart(2, "0")})</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className="transition-colors duration-(--duration-fast) hover:text-fg">
              About
            </Link>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="transition-colors duration-(--duration-fast) hover:text-fg">
              Contact
            </a>
          </li>
          <li className="flex">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
