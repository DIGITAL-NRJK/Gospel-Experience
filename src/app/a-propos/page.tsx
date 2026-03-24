import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// Revalide le contenu toutes les 60 secondes
export const revalidate = 60;

export const metadata: Metadata = {
  title: "À propos",
  description: "Gospel Lyon Métropole (GOSLYM) : association dédiée à la promotion du chant gospel à Lyon. Festival, école, dimension sociale.",
};

interface Settings {
  aboutIntro?: string;
  aboutStats?: { value: string; label: string }[];
  missionFestival?: string;
  missionEcole?: string;
  socialActions?: { title: string; description: string }[];
}

const defaultStats = [
  { value: "2017", label: "Année de création" },
  { value: "15 000€", label: "Budget annuel" },
  { value: "12", label: "Membres actifs" },
  { value: "50+", label: "Adhérents" },
];

const defaultActions = [
  { title: "Jeunes en difficulté", description: "Le festival invite des jeunes de l'ALGED IME Fourvière et des mineurs isolés à participer aux Masterclass et à chanter sur scène." },
  { title: "Traiteur solidaire", description: "Le catering est assuré par La Petite Syrienne, traiteur social et solidaire, contribuant à l'insertion professionnelle." },
  { title: "Accessibilité", description: "Masterclass ouvertes aux personnes en situation de handicap, avec accompagnement adapté pour une pratique inclusive du gospel." },
];

const actionColors = ["var(--color-coral-light)", "var(--color-teal-light)", "var(--color-lavender-light)"];

export default async function AProposPage() {
  const settings = await client.fetch<Settings>(SITE_SETTINGS_QUERY);

  const stats = settings?.aboutStats?.length ? settings.aboutStats : defaultStats;
  const actions = settings?.socialActions?.length ? settings.socialActions : defaultActions;

  return (
    <>
      <Header />

      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">L&apos;association</div>
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-3">Gospel Lyon Métropole — GOSLYM</h1>
          <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.7] max-w-[640px]">
            {settings?.aboutIntro || "Gospel Lyon Métropole (GOSLYM) a pour mission la promotion du chant gospel à Lyon et dans la métropole lyonnaise. L'association croit profondément que le gospel peut faire grandir grâce aux valeurs qu'il porte : fraternité, solidarité, communion, joie."}
          </p>

          <div className="grid grid-cols-4 gap-3 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl px-5 py-5 text-center border border-[rgba(43,27,94,0.06)]">
                <div className="font-serif text-[26px] font-bold text-[var(--color-indigo)]">{s.value}</div>
                <div className="text-[11px] text-[var(--color-text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="site-container pb-10">
        <div className="bg-[var(--color-indigo)] rounded-3xl py-10 px-8">
          <div className="section-tag text-[var(--color-gold)]">Notre mission</div>
          <h2 className="font-serif text-[26px] font-bold text-white mb-6">Deux projets, une vision</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-[var(--color-peach-deep)] mb-2">Le Festival</h3>
              <p className="text-[13px] text-white/60 leading-[1.7]">
                {settings?.missionFestival || "Un festival biennal avec des grands concerts professionnels, offrant une scène aux chorales régionales, et des Masterclass pour permettre aux chanteurs de progresser dans leur art."}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5DCAA5] mb-2">L&apos;École de Gospel</h3>
              <p className="text-[13px] text-white/60 leading-[1.7]">
                {settings?.missionEcole || "À plus long terme, un lieu d'éducation et de professionnalisation pour les jeunes. Le gospel comme chemin vers l'épanouissement, l'apprentissage du travail en groupe et la confiance en soi."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-14 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-magenta)]">Dimension sociale</div>
          <h2 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-6">Le gospel comme vecteur d&apos;inclusion</h2>
          <div className="grid grid-cols-3 gap-3.5">
            {actions.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-[rgba(43,27,94,0.06)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: actionColors[i % actionColors.length] }}>
                  <div className="w-4 h-4 rounded-full bg-[var(--color-indigo)] opacity-30" />
                </div>
                <h4 className="text-[14px] font-bold text-[var(--color-indigo)] mb-1.5">{s.title}</h4>
                <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="site-container py-10">
        <div className="p-7 bg-white rounded-[20px] border border-[rgba(43,27,94,0.06)] flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-lavender)] shrink-0" />
          <div className="flex-1">
            <h3 className="font-serif text-[17px] font-bold text-[var(--color-indigo)] mb-1">Restez informés</h3>
            <p className="text-[12px] text-[var(--color-text-muted)]">Recevez les actus de l&apos;association directement dans votre boîte mail.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <input type="email" placeholder="votre@email.com" className="bg-[var(--color-cream)] border border-[rgba(43,27,94,0.1)] rounded-[20px] px-4 py-2.5 text-[12px] text-[var(--color-text-body)] min-w-[160px] outline-none" />
            <button className="bg-[var(--color-indigo)] text-white text-[11px] font-bold px-5 py-2.5 rounded-[20px] border-none cursor-pointer">S&apos;inscrire</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
