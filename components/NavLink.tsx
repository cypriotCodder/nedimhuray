"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** Header link that marks itself `aria-current="page"` on its own route (`match`). */
export function NavLink({ match, ...props }: ComponentProps<typeof Link> & { match: string }) {
  const current = usePathname() === match;
  return <Link {...props} aria-current={current ? "page" : undefined} />;
}
