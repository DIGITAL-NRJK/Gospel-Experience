import Link from "next/link";
import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";

interface FooterSection { title: string; links: { label: string; href: string }[] }
interface Socials { instagram?: string; facebook?: string; youtube?: string }
interface Settings {
  headerLogoText?: string;
  headerLogoSubtext?: string;
  footerSections?: FooterSection[];
  footerDescription?: string;
  footerCopyright?: string;
  socials?: Socials;
}

const defaultSections: FooterSection[] = [
  { title: "Festival", links: [
    { label: "Programme", href: "/festival" },
    { label: "Événements", href: "/evenements" },
    { label: "Le lieu", href: "/festival#lieu" },
  ]},
  { title: "École GEI", links: [
    { label: "Formations", href: "/ecole" },
    { label: "Inscription", href: "/ecole#inscription" },
    { label: "Dates", href: "/ecole#dates" },
  ]},
  { title: "Association", links: [
    { label: "À propos", href: "/a-propos" },
    { label: "Actualités", href: "/actualites" },
    { label: "Galerie", href: "/galerie" },
    { label: "Contact", href: "/contact" },
  ]},
];

const sectionColors = ["var(--color-coral)", "var(--color-teal)", "var(--color-indigo)", "var(--color-gold)"];

export default async function Footer() {
  let s: Settings = {};
  try { s = (await client.fetch<Settings>(SITE_SETTINGS_QUERY)) || {}; } catch {}

  const sections = s.footerSections?.length ? s.footerSections : defaultSections;
  const socials = s.socials || {};
  const socialItems = [
    { key: "instagram", label: "Instagram", icon: "Ig", bg: "var(--color-coral)", url: socials.instagram },
    { key: "facebook", label: "Facebook", icon: "Fb", bg: "var(--color-indigo)", url: socials.facebook },
    { key: "youtube", label: "YouTube", icon: "Yt", bg: "var(--color-magenta)", url: socials.youtube },
  ].filter((item) => item.url);

  return (
    <footer className="bg-cream">
      <div className="site-container">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_${sections.map(() => "1fr").join("_")}] gap-8 pt-10 pb-6 border-t border-[rgba(43,27,94,0.06)]`}>
          <div>
            <div className="font-serif text-lg font-bold text-(--color-indigo) mb-2">
              {s.headerLogoText || "Gospel Expérience"}
              <span className="block text-[10px] font-normal tracking-[3px] uppercase text-gold">
                {s.headerLogoSubtext || "Lyon Fourvière"}
              </span>
            </div>
            <p className="text-[14px] text-text-muted leading-relaxed">
              {s.footerDescription || "Association GOSLYM — Gospel Lyon Métropole. Promouvoir le gospel, rassembler les talents, transmettre des valeurs de joie et de fraternité."}
            </p>
            {socialItems.length > 0 && (
              <div className="flex gap-2 mt-3">
                {socialItems.map((item) => (
                  <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white no-underline hover:opacity-80 transition-opacity" style={{ backgroundColor: item.bg }}>
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {sections.map((section, i) => (
            <div key={section.title}>
              <h5 className="text-[11px] tracking-[2px] uppercase font-bold mb-3" style={{ color: sectionColors[i % sectionColors.length] }}>
                {section.title}
              </h5>
              {section.links?.map(({ label, href }) => (
                <Link key={label} href={href} className="block text-[14px] text-text-muted no-underline mb-2 hover:text-(--color-indigo) transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between py-4 border-t border-[rgba(43,27,94,0.04)] text-[12px] text-[var(--color-text-light)] gap-2">
          <span>© {new Date().getFullYear()} {s.footerCopyright || "GOSLYM — Gospel Lyon Métropole"}</span>
          <span>
            <Link href="/mentions-legales" className="no-underline text-inherit hover:text-(--color-indigo)">Mentions légales</Link>
            {" · "}
            <Link href="/confidentialite" className="no-underline text-inherit hover:text-(--color-indigo)">Confidentialité</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
