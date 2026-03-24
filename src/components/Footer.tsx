import Link from "next/link";

const footerLinks = {
  festival: {
    title: "Festival",
    color: "var(--color-coral)",
    links: [
      { label: "Programme", href: "/festival" },
      { label: "Billetterie", href: "/festival#billetterie" },
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
      { label: "Pédagogie", href: "/ecole#pedagogie" },
      { label: "Témoignages", href: "/ecole#temoignages" },
    ],
  },
  asso: {
    title: "Association",
    color: "var(--color-indigo)",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Partenaires", href: "/a-propos#partenaires" },
      { label: "Presse", href: "/contact?sujet=presse" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-cream)]">
      <div className="site-container">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-7 pt-9 pb-5 border-t border-[rgba(43,27,94,0.06)]">
          <div>
            <div className="font-serif text-base font-bold text-[var(--color-indigo)] mb-1.5">
              Gospel Expérience
              <span className="block text-[9px] font-normal tracking-[3px] uppercase text-[var(--color-gold)]">
                Lyon Fourvière
              </span>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Association GOSLYM — Gospel Lyon Métropole. Promouvoir le gospel,
              rassembler les talents, transmettre des valeurs de joie et de
              fraternité.
            </p>
            <div className="flex gap-2 mt-2.5">
              {[
                { label: "Ig", bg: "var(--color-coral)" },
                { label: "Fb", bg: "var(--color-indigo)" },
                { label: "Yt", bg: "var(--color-magenta)" },
              ].map(({ label, bg }) => (
                <div
                  key={label}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ backgroundColor: bg }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h5
                className="text-[10px] tracking-[2px] uppercase font-bold mb-2.5"
                style={{ color: section.color }}
              >
                {section.title}
              </h5>
              {section.links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block text-[12px] text-[var(--color-text-muted)] no-underline mb-1.5"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-between py-3 border-t border-[rgba(43,27,94,0.04)] text-[10px] text-[var(--color-text-light)]">
          <span>© 2026 GOSLYM — Gospel Lyon Métropole</span>
          <span>
            <Link href="/mentions-legales" className="no-underline text-inherit">
              Mentions légales
            </Link>
            {" · "}
            <Link href="/confidentialite" className="no-underline text-inherit">
              Politique de confidentialité
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
