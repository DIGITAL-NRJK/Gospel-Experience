"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/festival", label: "Festival" },
  { href: "/ecole", label: "École GEI" },
  { href: "/actualites", label: "Actualités" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/studio")) return null;

  return (
    <header className="header-sticky">
      <div className="site-container flex items-center justify-between py-3">
        <Link
          href="/"
          className="font-serif text-base md:text-lg text-[var(--color-indigo)] font-bold leading-tight no-underline"
        >
          Gospel Expérience
          <span className="block text-[10px] font-normal tracking-[3px] uppercase text-[var(--color-gold)]">
            Lyon Fourvière
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-5">
          {navItems.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-[13px] tracking-[0.5px] uppercase no-underline transition-colors ${
                  isActive ? "text-[var(--color-coral)] font-bold" : "text-[var(--color-text-muted)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Link href="/festival#billetterie" className="hidden md:inline-block btn-coral text-[13px] px-5 py-2.5 no-underline">
          Billetterie
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          aria-label="Menu"
        >
          <span className={`w-6 h-[2px] bg-[var(--color-indigo)] rounded transition-transform ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-[var(--color-indigo)] rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-[var(--color-indigo)] rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--color-cream)] border-t border-[rgba(43,27,94,0.06)] px-5 pb-5">
          <nav className="flex flex-col gap-1 pt-3">
            {navItems.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[15px] py-2.5 px-3 rounded-xl no-underline transition-colors ${
                    isActive
                      ? "text-[var(--color-coral)] font-bold bg-[var(--color-coral-light)]"
                      : "text-[var(--color-text-body)]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/festival#billetterie"
            onClick={() => setMenuOpen(false)}
            className="btn-coral block text-center mt-4 no-underline"
          >
            Billetterie
          </Link>
        </div>
      )}
    </header>
  );
}
