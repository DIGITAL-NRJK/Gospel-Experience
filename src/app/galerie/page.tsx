import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Photos et vidéos des éditions du Festival Gospel Expérience, des Masterclass et de l'école GEI à Lyon Fourvière.",
};

const filters = ["Tout", "Édition 2024", "Édition 2021", "Masterclass", "École GEI", "Coulisses"];

const items = [
  { bg: "from-[var(--color-indigo)] to-[#4A2E8A]", label: "Concert GPE 2024", video: true, span: true },
  { bg: "from-[var(--color-peach-deep)] to-[var(--color-peach)]", label: "Masterclass 2024" },
  { bg: "from-[var(--color-teal)] to-[#5DCAA5]", label: "Coulisses" },
  { bg: "from-[var(--color-magenta)] to-[#ED93B1]", label: "Chœur GEI" },
  { bg: "from-[var(--color-gold-light)] to-[var(--color-peach)]", label: "Crypte Fourvière" },
  { bg: "from-[#4A2E8A] to-[var(--color-indigo)]", label: "Concert Grand Chœur", video: true },
  { bg: "from-[var(--color-coral)] to-[var(--color-peach-deep)]", label: "Artistes 2024" },
  { bg: "from-[var(--color-lavender-light)] to-[#D4C4F0]", label: "Atelier jeunes" },
  { bg: "from-[var(--color-teal-light)] to-[#B0E6D0]", label: "Session janvier" },
];

export default function GaleriePage() {
  return (
    <>
      <Header />

      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-magenta)]">Médiathèque</div>
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-1.5">Photos & vidéos</h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-6">Revivez les moments forts des éditions précédentes, des Masterclass et de l&apos;école GEI.</p>

          <div className="flex gap-2 mb-8">
            {filters.map((f, i) => (
              <span key={f} className={`text-[11px] px-4 py-1.5 rounded-full border cursor-pointer transition-colors ${i === 0 ? "bg-[var(--color-magenta)] text-white border-[var(--color-magenta)]" : "bg-white text-[var(--color-text-muted)] border-[rgba(43,27,94,0.08)] hover:border-[var(--color-magenta)]"}`}>
                {f}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "180px" }}>
            {items.map((g, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${g.bg} rounded-2xl relative flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
                style={{ gridRow: g.span ? "span 2" : undefined }}
              >
                {g.video && (
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-indigo)"><polygon points="9,6 18,12 9,18" /></svg>
                  </div>
                )}
                <span className="absolute bottom-3 left-4 text-[11px] text-white/90 font-bold">{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
