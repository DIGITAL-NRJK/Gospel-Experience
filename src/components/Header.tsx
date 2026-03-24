"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  if (pathname?.startsWith("/studio")) return null;

  return (
    <header className="header-sticky">
      <div className="site-container flex items-center justify-between py-3.5">
        <Link
          href="/"
          className="font-serif text-[15px] text-[var(--color-indigo)] font-bold leading-tight no-underline"
        >
          Gospel Expérience
          <span className="block text-[9px] font-normal tracking-[3px] uppercase text-[var(--color-gold)]">
            Lyon Fourvière
          </span>
        </Link>

        <nav className="flex gap-5">
          {navItems.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-[11px] tracking-[1px] uppercase no-underline transition-colors ${
                  isActive
                    ? "text-[var(--color-coral)] font-bold"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link href="/festival#billetterie" className="btn-coral text-[11px] px-5 py-2.5 no-underline">
          Billetterie
        </Link>
      </div>
    </header>
  );
}
