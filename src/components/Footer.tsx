import Link from "next/link";
import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

interface FooterSection { title: string; links: { label: string; href: string }[] }
interface Socials { instagram?: string; facebook?: string; youtube?: string }
interface Settings {
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

const sectionColors = ["var(--color-brand)", "var(--color-gold)", "var(--color-brand)", "var(--color-gold)"];

export default async function Footer() {
  let s: Settings = {};
  try { s = (await client.fetch<Settings>(SITE_SETTINGS_QUERY)) || {}; } catch {}

  const sections = s.footerSections?.length ? s.footerSections : defaultSections;
  const socials = s.socials || {};
  const socialItems = [
    { key: "instagram", label: "Instagram", icon: "Ig", bg: "var(--color-brand)", url: socials.instagram },
    { key: "facebook", label: "Facebook", icon: "Fb", bg: "var(--color-brand-dark)", url: socials.facebook },
    { key: "youtube", label: "YouTube", icon: "Yt", bg: "var(--color-gold-dark)", url: socials.youtube },
  ].filter((item) => item.url);

  return (
    <footer className="bg-[var(--color-cream)] border-t border-[rgba(30,21,53,0.06)]">
      <div className="site-container">

        {/* Logo + description : pleine largeur sur mobile */}
        <div className="pt-8 pb-6 border-b border-[rgba(30,21,53,0.04)] lg:hidden">
          <div className="flex items-center gap-3 mb-3">
            <img src="/images/logo-goslym.png" alt="GOSLYM — Gospel Lyon Métropole" className="h-9 w-auto" />
            <div className="w-px h-7 bg-[rgba(30,21,53,0.1)]" />
            <img src="/images/logo-festival.png" alt="Fourvière Gospel Expérience" className="h-8 w-auto" />
          </div>
          <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed mb-3">
            {s.footerDescription || "Association GOSLYM — Gospel Lyon Métropole. Promouvoir le gospel, rassembler les talents, transmettre des valeurs de joie et de fraternité."}
          </p>
          {socialItems.length > 0 && (
            <div className="flex gap-2">
              {socialItems.map((item) => (
                <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="w-8 h-8 rounded-full flex items-center justify-center font-display text-[12px] text-white no-underline hover:opacity-80 transition-opacity" style={{ backgroundColor: item.bg }}>
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sections de navigation : 3 colonnes sur mobile */}
        <div className="grid grid-cols-3 lg:hidden gap-x-3 py-6">
          {sections.map((section, i) => (
            <div key={section.title}>
              <h5 className="font-display text-[10px] tracking-[1.5px] uppercase mb-2.5" style={{ color: sectionColors[i % sectionColors.length] }}>
                {section.title}
              </h5>
              {section.links?.map(({ label, href }) => (
                <Link key={label} href={href} className="block text-[13px] text-[var(--color-text-muted)] no-underline mb-1.5 hover:text-[var(--color-brand)] transition-colors leading-snug">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Layout desktop : 4 colonnes (logo + 3 sections) */}
        <div className="hidden lg:grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 pt-10 pb-6">
          {/* Logo column */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img src="/images/logo-goslym.png" alt="GOSLYM — Gospel Lyon Métropole" className="h-10 w-auto" />
              <div className="w-px h-8 bg-[rgba(30,21,53,0.1)]" />
              <img src="/images/logo-festival.png" alt="Fourvière Gospel Expérience" className="h-9 w-auto" />
            </div>
            <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed mb-3">
              {s.footerDescription || "Association GOSLYM — Gospel Lyon Métropole. Promouvoir le gospel, rassembler les talents, transmettre des valeurs de joie et de fraternité."}
            </p>
            {socialItems.length > 0 && (
              <div className="flex gap-2">
                {socialItems.map((item) => (
                  <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="w-8 h-8 rounded-full flex items-center justify-center font-display text-[12px] text-white no-underline hover:opacity-80 transition-opacity" style={{ backgroundColor: item.bg }}>
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Link columns */}
          {sections.map((section, i) => (
            <div key={section.title}>
              <h5 className="font-display text-[11px] tracking-[2px] uppercase mb-3" style={{ color: sectionColors[i % sectionColors.length] }}>
                {section.title}
              </h5>
              {section.links?.map(({ label, href }) => (
                <Link key={label} href={href} className="block text-[14px] text-[var(--color-text-muted)] no-underline mb-2 hover:text-[var(--color-brand)] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Barre de bas de page */}
        <div className="flex flex-col sm:flex-row justify-between py-4 border-t border-[rgba(30,21,53,0.04)] text-[12px] text-[var(--color-text-light)] gap-2">
          <span>© {new Date().getFullYear()} {s.footerCopyright || "GOSLYM — Gospel Lyon Métropole"}</span>
          <span>
            <Link href="/mentions-legales" className="no-underline text-inherit hover:text-[var(--color-brand)]">Mentions légales</Link>
            {" · "}
            <Link href="/confidentialite" className="no-underline text-inherit hover:text-[var(--color-brand)]">Confidentialité</Link>
            {" · "}
            <CookiePreferencesButton />
          </span>
        </div>
      </div>
    </footer>
  );
}
