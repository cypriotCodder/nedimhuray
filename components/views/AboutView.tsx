import type { Metadata } from "next";
import Image from "next/image";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { alternates } from "@/lib/metadata";
import { getSite } from "@/lib/site";

// No openGraph here: it would replace the layout's, which carries the site card image.
export function aboutMetadata(lang: Locale): Metadata {
  return {
    title: ui[lang].about.title,
    description: getSite(lang).about.intro,
    alternates: alternates(lang, "/about"),
  };
}

export function AboutView({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  const t = ui[lang].about;
  const { about } = site;
  const links = [
    { label: site.email, href: `mailto:${site.email}` },
    ...site.socials,
    ...(about.cv ? [about.cv] : []),
  ];

  return (
    <article className="frame grid grid-cols-12 gap-x-4 pt-[clamp(2.5rem,8vh,6rem)]">
      <p className="label col-span-12 mb-10 flex justify-between md:mb-16">
        <span>{t.title}</span>
        <span className="text-faint">{site.location}</span>
      </p>

      <h1 className="col-span-12 text-lead font-medium text-balance md:col-span-10 lg:col-span-9">{about.intro}</h1>

      <div className="relative col-span-12 mt-12 aspect-[4/5] overflow-hidden bg-surface sm:col-span-8 md:col-span-5 md:mt-20">
        <Image
          src={about.portrait.src}
          alt={about.portrait.alt}
          fill
          sizes="(min-width: 768px) 40vw, (min-width: 640px) 66vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </div>

      <div className="col-span-12 mt-12 flex flex-col gap-14 md:col-span-6 md:col-start-7 md:mt-20 lg:col-span-5 lg:col-start-7">
        <div className="flex max-w-prose flex-col gap-[1em] text-body text-muted">
          {about.bio.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-line pt-8 sm:grid-cols-3">
          {about.skills.map((s) => (
            <div key={s.group}>
              <dt className="label text-faint">{s.group}</dt>
              <dd className="mt-3">
                <ul className="flex flex-col gap-1 text-small">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-line pt-8">
          <h2 className="label text-faint">{t.elsewhere}</h2>
          <ul className="mt-3 flex flex-col gap-1 text-small">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="underline decoration-line underline-offset-4 transition-colors duration-(--duration-fast) hover:text-accent hover:decoration-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
