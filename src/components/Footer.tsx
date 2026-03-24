import Link from "next/link";
import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";

const footerLinks = {
  festival: {
    title: "Festival",
    color: "var(--color-coral)",
    links: [
      { label: "Programme", href: "/festival" },
      { label: "Artistes", href: "/festival#artistes" },
      { label: "Le lieu", href: "/festival#lieu" },
    ],
  },
  ecole: {
    title: "École GEI",
    color: "var(--color-teal)",
    links: [
      { label: "Formations", href: "/ecole" },
      { label: "Inscription", href: "/ecole#inscription" },
      { label: "Dates", href: "/ecole#dates" },
    ],
  },
  asso: {
    title: "Association",
    color: "var(--color-indigo)",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Actualités", href: "/actualites" },
      { label: "Galerie", href: "/galerie" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

interface Socials {
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export default async function Footer() {
  let socials: Socials = {};
  try {
    const settings = await client.fetch<{ socials?: Socials }>(SITE_SETTINGS_QUERY);
    socials = settings?.socials || {};
  } catch {
    // Sanity unavailable - use empty socials
  }

  const socialItems = [
    { key: "instagram", label: "Instagram", icon: "Ig", bg: "var(--color-coral)", url: socials.instagram },
    { key: "facebook", label: "Facebook", icon: "Fb", bg: "var(--color-indigo)", url: socials.facebook },
    { key: "youtube", label: "YouTube", icon: "Yt", bg: "var(--color-magenta)", url: socials.youtube },
  ].filter((s) => s.url);

  return (
    <footer className="bg-[var(--color-cream)]">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 pt-10 pb-6 border-t border-[rgba(43,27,94,0.06)]">
          <div>
            <div className="font-serif text-lg font-bold text-[var(--color-indigo)] mb-2">
              Gospel Expérience
              <span className="block text-[10px] font-normal tracking-[3px] uppercase text-[var(--color-gold)]">
                Lyon Fourvière
              </span>
            </div>
            <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">
              Association GOSLYM — Gospel Lyon Métropole. Promouvoir le gospel,
              rassembler les talents, transmettre des valeurs de joie et de fraternité.
            </p>
            {socialItems.length > 0 && (
              <div className="flex gap-2 mt-3">
                {socialItems.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white no-underline hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h5
                className="text-[11px] tracking-[2px] uppercase font-bold mb-3"
                style={{ color: section.color }}
              >
                {section.title}
              </h5>
              {section.links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block text-[14px] text-[var(--color-text-muted)] no-underline mb-2 hover:text-[var(--color-indigo)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between py-4 border-t border-[rgba(43,27,94,0.04)] text-[12px] text-[var(--color-text-light)] gap-2">
          <span>© {new Date().getFullYear()} GOSLYM — Gospel Lyon Métropole</span>
          <span>
            <Link href="/mentions-legales" className="no-underline text-inherit hover:text-[var(--color-indigo)]">
              Mentions légales
            </Link>
            {" · "}
            <Link href="/confidentialite" className="no-underline text-inherit hover:text-[var(--color-indigo)]">
              Confidentialité
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
