// src/components/VillageGospelSection.tsx
// Section "Village Gospel" — pilotable depuis Sanity Studio
// À insérer sur la homepage (après Festival/École) et sur la page Festival

import Link from "next/link";

interface VillageGospelSectionProps {
  title?: string;
  text?: string;
  active?: boolean;
}

const defaultTitle = "Le Village Gospel sur l'Esplanade de Fourvière";
const defaultText =
  "Pour la première fois lors de cette 3ème édition, l'esplanade de Fourvière vibrera au rythme du gospel. Le samedi, de 13h à 20h, le public pourra assister gratuitement à des concerts, démonstrations, et découvrir l'histoire du gospel à travers des ateliers participatifs — le tout animé par Radio Scoop avec un quiz interactif sur place.";

export default function VillageGospelSection({
  title = defaultTitle,
  text = defaultText,
  active = true,
}: VillageGospelSectionProps) {
  if (!active) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="site-container">
        {/* Carte principale */}
        <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#2A1F5E] via-[#413485] to-[#6B4DAE] px-6 md:px-12 py-10 md:py-14">

          {/* Motif décoratif */}
          <div className="absolute top-0 right-0 w-[340px] h-[340px] rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-[var(--color-gold)]/10 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-[720px]">
            {/* Badge */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[1.5px] uppercase bg-[var(--color-gold)] text-[#1A1532] px-3.5 py-1.5 rounded-full font-bold">
                🆕 Pour la 1ère fois
              </span>
              <span className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[1.5px] uppercase bg-white/15 text-white px-3.5 py-1.5 rounded-full border border-white/20">
                3ème édition · 2026
              </span>
            </div>

            {/* Titre */}
            <h2 className="font-serif text-[26px] md:text-[34px] font-bold text-white leading-[1.15] mb-4">
              {title}
            </h2>

            {/* Texte */}
            <p className="text-[15px] md:text-[16px] text-white/75 leading-relaxed mb-8 max-w-[600px]">
              {text}
            </p>

            {/* 3 cartes info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                {
                  icon: "🎵",
                  title: "Concerts gratuits",
                  desc: "Groupes gospel en live sur l'esplanade, samedi 13h–20h",
                },
                {
                  icon: "🎙️",
                  title: "Quiz Radio Scoop",
                  desc: "Un quiz interactif sur l'histoire du gospel, sur place",
                },
                {
                  icon: "🎤",
                  title: "Ateliers & Découverte",
                  desc: "Démonstrations et ateliers participatifs ouverts à tous",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white/10 backdrop-blur rounded-2xl px-4 py-4 border border-white/15"
                >
                  <div className="text-[22px] mb-2">{card.icon}</div>
                  <div className="font-display text-[13px] font-bold text-white mb-1 tracking-[0.3px]">
                    {card.title}
                  </div>
                  <p className="text-[12px] text-white/65 leading-snug">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/festival/programme"
                className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-[#1A1532] font-display text-[13px] tracking-[0.5px] px-6 py-3 rounded-xl no-underline font-bold hover:opacity-90 transition-opacity"
              >
                Voir le programme complet →
              </Link>
              <Link
                href="/festival"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-display text-[13px] tracking-[0.5px] px-6 py-3 rounded-xl no-underline border border-white/25 hover:bg-white/20 transition-colors"
              >
                Page Festival
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
