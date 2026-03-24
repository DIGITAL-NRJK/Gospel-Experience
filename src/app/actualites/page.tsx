import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Interviews, retours sur les événements, vie de l'association GOSLYM et coulisses du gospel à Lyon.",
};

const articles = [
  { bg: "from-[var(--color-peach)] to-[var(--color-coral-light)]", cat: "Interview", catBg: "bg-[rgba(43,27,94,0.8)]", title: "Hazaële : « Le gospel, c'est le partage et la joie de chanter ensemble »", date: "12 mars 2026 · 5 min" },
  { bg: "from-[var(--color-teal-light)] to-[#ECFAF3]", cat: "École GEI", catBg: "bg-[rgba(29,158,117,0.85)]", title: "L'école GEI ouvre ses portes : inscriptions pour la saison 2026", date: "8 mars 2026 · 3 min" },
  { bg: "from-[var(--color-lavender-light)] to-[#F5F0FC]", cat: "Festival", catBg: "bg-[rgba(216,90,48,0.85)]", title: "Retour en images sur l'édition 2024 du festival", date: "2 mars 2026 · 4 min" },
  { bg: "from-[var(--color-gold-light)] to-[var(--color-peach)]", cat: "Coulisses", catBg: "bg-[rgba(43,27,94,0.7)]", title: "Comment se prépare un festival gospel ? Les 6 mois avant le jour J", date: "18 fév 2026 · 7 min" },
  { bg: "from-[var(--color-magenta-light)] to-[#F5E0EC]", cat: "Interview", catBg: "bg-[rgba(43,27,94,0.8)]", title: "Pascal Horecka : la vision derrière Gospel Philharmonic Experience", date: "5 fév 2026 · 6 min" },
  { bg: "from-[var(--color-coral-light)] to-[var(--color-peach)]", cat: "Festival", catBg: "bg-[rgba(216,90,48,0.85)]", title: "Les chiffres de l'édition 2024 : un bilan exceptionnel", date: "20 jan 2026 · 3 min" },
];

const filters = ["Tout", "Festival", "École GEI", "Interviews", "Coulisses"];

export default function ActualitesPage() {
  return (
    <>
      <Header />

      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-indigo)]">Blog</div>
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-1.5">Toutes les actualités</h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-6">Interviews, retours sur les événements, vie de l&apos;association et coulisses du gospel.</p>

          <div className="flex gap-2 mb-8">
            {filters.map((f, i) => (
              <span key={f} className={`text-[11px] px-4 py-1.5 rounded-full border cursor-pointer transition-colors ${i === 0 ? "bg-[var(--color-indigo)] text-white border-[var(--color-indigo)]" : "bg-white text-[var(--color-text-muted)] border-[rgba(43,27,94,0.08)] hover:border-[var(--color-indigo)]"}`}>
                {f}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {articles.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[rgba(43,27,94,0.06)] flex cursor-pointer hover:shadow-sm transition-shadow">
                <div className={`w-[160px] min-h-[140px] bg-gradient-to-br ${a.bg} shrink-0 relative`}>
                  <span className={`absolute top-3 left-3 text-[9px] tracking-[1px] uppercase font-bold px-2.5 py-1 rounded-lg text-white ${a.catBg}`}>{a.cat}</span>
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h4 className="text-[14px] font-bold text-[var(--color-indigo)] leading-snug mb-2">{a.title}</h4>
                  <div className="text-[10px] text-[var(--color-text-light)]">{a.date}</div>
                  <span className="text-[11px] font-bold text-[var(--color-coral)] mt-3">Lire l&apos;article →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-coral">Charger plus d&apos;articles</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
