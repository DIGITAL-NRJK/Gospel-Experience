import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "À propos",
  description: "Gospel Lyon Métropole (GOSLYM) : association dédiée à la promotion du chant gospel à Lyon.",
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

      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">L&apos;association</div>
          <h1 className="font-serif text-[26px] md:text-[32px] font-bold text-[var(--color-indigo)] mb-3">Gospel Lyon Métropole — GOSLYM</h1>
          <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.7] max-w-[640px]">
            {settings?.aboutIntro || "Gospel Lyon Métropole (GOSLYM) a pour mission la promotion du chant gospel à Lyon et dans la métropole lyonnaise. L'association croit profondément que le gospel peut faire grandir grâce aux valeurs qu'il porte : fraternité, solidarité, communion, joie."}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl px-5 py-5 text-center border border-[rgba(43,27,94,0.06)]">
                <div className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-indigo)]">{s.value}</div>
                <div className="text-[13px] text-[var(--color-text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="site-container pb-10">
        <div className="bg-[var(--color-indigo)] rounded-3xl py-8 md:py-10 px-5 md:px-8">
          <div className="section-tag text-[var(--color-gold)]">Notre mission</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-white mb-6">Deux projets, une vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-[var(--color-peach-deep)] mb-2">Le Festival</h3>
              <p className="text-[15px] text-white/60 leading-[1.7]">
                {settings?.missionFestival || "Un festival biennal avec des grands concerts professionnels, offrant une scène aux chorales régionales, et des Masterclass pour permettre aux chanteurs de progresser dans leur art."}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5DCAA5] mb-2">L&apos;École de Gospel</h3>
              <p className="text-[15px] text-white/60 leading-[1.7]">
                {settings?.missionEcole || "À plus long terme, un lieu d'éducation et de professionnalisation pour les jeunes. Le gospel comme chemin vers l'épanouissement, l'apprentissage du travail en groupe et la confiance en soi."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-magenta)]">Dimension sociale</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-6">Le gospel comme vecteur d&apos;inclusion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {actions.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-[rgba(43,27,94,0.06)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: actionColors[i % actionColors.length] }}>
                  <div className="w-4 h-4 rounded-full bg-[var(--color-indigo)] opacity-30" />
                </div>
                <h4 className="text-base font-bold text-[var(--color-indigo)] mb-2">{s.title}</h4>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="site-container py-10">
        <div className="p-5 md:p-7 bg-white rounded-[20px] border border-[rgba(43,27,94,0.06)] flex flex-col md:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-lavender)] shrink-0 hidden md:block" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-serif text-[18px] font-bold text-[var(--color-indigo)] mb-1">Restez informés</h3>
            <p className="text-[14px] text-[var(--color-text-muted)]">Recevez les actus de l&apos;association directement dans votre boîte mail.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
            <input type="email" placeholder="votre@email.com" className="bg-[var(--color-cream)] border border-[rgba(43,27,94,0.1)] rounded-[20px] px-4 py-3 text-[14px] text-[var(--color-text-body)] min-w-[180px] outline-none" />
            <button className="bg-[var(--color-indigo)] text-white text-[13px] font-bold px-5 py-3 rounded-[20px] border-none cursor-pointer">S&apos;inscrire</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
