"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink { label: string; href: string }
interface HeaderClientProps {
  logoText?: string;
  logoSubtext?: string;
  logoUrl?: string;
  navLinks: NavLink[];
  ctaButton?: { text: string; url: string };
}

const defaultNav: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/festival", label: "Festival" },
  { href: "/ecole", label: "École GEI" },
  { href: "/evenements", label: "Événements" },
  { href: "/actualites", label: "Actualités" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function HeaderClient({ logoText, logoSubtext, logoUrl, navLinks, ctaButton }: HeaderClientProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/studio")) return null;

  const links = navLinks.length > 0 ? navLinks : defaultNav;
  const cta = ctaButton || { text: "Billetterie", url: "/festival" };

  return (
    <header className="header-sticky">
      <div className="site-container flex items-center justify-between py-2.5">
        <Link href="/" className="no-underline relative z-10 shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={logoText || "GOSLYM"} className="h-11 w-auto" />
          ) : (
            <img src="/images/logo-goslym.png" alt="GOSLYM — Gospel Lyon Métropole" className="h-11 w-auto" />
          )}
        </Link>

        <nav className="hidden lg:flex gap-5 relative z-10">
          {links.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link key={href} href={href} className={`font-display text-[13px] tracking-[0.5px] uppercase no-underline transition-colors ${isActive ? "text-[var(--color-gold)]" : "text-[var(--color-text-muted)]"}`}>
                {label}
              </Link>
            );
          })}
        </nav>

        <Link href={cta.url} className="hidden md:inline-block btn-coral text-[13px] px-5 py-2.5 no-underline relative z-10">
          {cta.text}
        </Link>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer relative z-10" aria-label="Menu">
          <span className={`w-6 h-[2px] bg-[var(--color-brand)] rounded transition-transform ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-[var(--color-brand)] rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-[var(--color-brand)] rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[var(--color-cream)] border-t border-[rgba(30,21,53,0.06)] px-5 pb-5">
          <nav className="flex flex-col gap-1 pt-3">
            {links.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
              return (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`font-display text-[15px] py-2.5 px-3 rounded-xl no-underline transition-colors ${isActive ? "text-[var(--color-gold)] bg-[var(--color-gold-light)]" : "text-[var(--color-text-body)]"}`}>
                  {label}
                </Link>
              );
            })}
          </nav>
          <Link href={cta.url} onClick={() => setMenuOpen(false)} className="btn-coral block text-center mt-4 no-underline">
            {cta.text}
          </Link>
        </div>
      )}
    </header>
  );
}
