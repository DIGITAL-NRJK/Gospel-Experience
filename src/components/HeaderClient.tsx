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

/* Skyline Lyon/Fourvière — simplified SVG path inspired by logo */
function SkylineSvg() {
  return (
    <svg
      viewBox="0 0 400 60"
      className="absolute right-4 top-1/2 -translate-y-1/2 w-[280px] h-[42px] hidden lg:block pointer-events-none"
      style={{ opacity: 0.07 }}
      fill="none"
      stroke="var(--color-gold)"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="
        M 0,55
        L 20,55 25,48 30,48 32,44 36,44 38,48 45,48 48,42 52,42 55,48
        L 65,48 68,40 72,40 75,35 78,35 80,30 82,30 84,28 86,30
        L 90,30 92,25 94,25 96,20 98,20 100,18 102,20 106,20 108,25
        L 112,25 115,22 118,22 120,18 122,18 124,14 126,14
        L 128,10 130,10 131,8 132,6 133,4 134,6 135,8 136,10 138,10
        L 140,14 142,14 144,18 148,18 150,22 155,22 158,28
        L 165,28 168,24 170,24 172,20 174,20 176,24 180,24 182,28
        L 190,28 195,32 200,32 205,36 210,36 212,32 215,32
        L 218,28 220,28 222,32 228,32 232,38 240,38
        L 248,38 252,42 260,42 265,45 275,45 280,48
        L 290,48 295,50 310,50 320,52 340,52 360,54 400,55
      " />
    </svg>
  );
}

export default function HeaderClient({ logoText, logoSubtext, logoUrl, navLinks, ctaButton }: HeaderClientProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/studio")) return null;

  const links = navLinks.length > 0 ? navLinks : defaultNav;
  const cta = ctaButton || { text: "Billetterie", url: "/festival" };

  return (
    <header className="header-sticky">
      <div className="site-container relative flex items-center justify-between py-3">
        <SkylineSvg />

        <Link href="/" className="font-serif text-base md:text-lg text-[var(--color-brand)] font-bold leading-tight no-underline relative z-10">
          {logoUrl ? (
            <img src={logoUrl} alt={logoText || "Gospel Expérience"} className="h-10 w-auto" />
          ) : (
            <>
              {logoText || "Gospel Expérience"}
              <span className="block font-display text-[10px] font-normal tracking-[3px] uppercase text-[var(--color-gold)]">
                {logoSubtext || "Lyon Fourvière"}
              </span>
            </>
          )}
        </Link>

        <nav className="hidden lg:flex gap-5 relative z-10">
          {links.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link key={href} href={href} className={`font-display text-[13px] tracking-[0.5px] uppercase no-underline transition-colors ${isActive ? "text-[var(--color-gold)] font-bold" : "text-[var(--color-text-muted)]"}`}>
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
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`font-display text-[15px] py-2.5 px-3 rounded-xl no-underline transition-colors ${isActive ? "text-[var(--color-gold)] font-bold bg-[var(--color-gold-light)]" : "text-[var(--color-text-body)]"}`}>
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
