import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "À propos",
  description: "Gospel Lyon Métropole (GOSLYM) : association dédiée à la promotion du chant gospel à Lyon. Festival, école, actions sociales.",
};

interface TeamMember { name: string; role: string; photo?: { asset: { _ref: string } }; bio?: string }
interface Settings {
  aboutIntro?: string;
  aboutIntro2?: string;
  aboutStats?: { value: string; label: string }[];
  missionFestival?: string;
  missionEcole?: string;
  socialActions?: { title: string; description: string }[];
  aboutTeam?: TeamMember[];
  aboutHistoryTitle?: string;
  aboutHistory?: string;
  aboutHistory2?: string;
  aboutCtaTitle?: string;
  aboutCtaDescription?: string;
}

const defaultStats = [
  { value: "2020", label: "Année de création" },
  { value: "65 000€", label: "Budget annuel" },
  { value: "3", label: "Éditions du festival" },
  { value: "4 500+", label: "Spectateurs cumulés" },
];

const defaultActions = [
  { title: "Jeunes en difficulté", description: "Le festival invite des jeunes de l'ALGED IME Fourvière et des mineurs isolés à participer aux Masterclass et à chanter sur scène." },
  { title: "Traiteur solidaire", description: "Le catering est assuré par La Petite Syrienne, traiteur social et solidaire, contribuant à l'insertion professionnelle." },
  { title: "Accessibilité", description: "Masterclass ouvertes aux personnes en situation de handicap, avec accompagnement adapté pour une pratique inclusive du gospel." },
];

const actionIcons = ["♪", "♥", "◈"];
const actionColors = ["var(--color-brand-light)", "var(--color-gold-light)", "var(--color-lavender-light)"];

export default async function AProposPage() {
  const settings = await client.fetch<Settings>(SITE_SETTINGS_QUERY);
  const stats = settings?.aboutStats?.length ? settings.aboutStats : defaultStats;
  const actions = settings?.socialActions?.length ? settings.socialActions : defaultActions;
  const team = settings?.aboutTeam || [];

  return (
    <>
      <Header />

      {/* HERO / INTRO */}
      <section className="relative min-h-[300px] md:min-h-[360px] bg-gradient-to-br from-[#413485] via-[#2A1F5E] to-[#0D0D0D] flex items-center overflow-hidden">
        <div className="site-container relative z-10 py-12 md:py-16">
          <div className="max-w-[600px]">
            <div className="font-display text-[12px] tracking-[3px] uppercase text-[var(--color-gold)] mb-3">L&apos;association</div>
            <h1 className="font-serif text-[30px] md:text-[40px] font-bold text-white leading-[1.1] mb-4">
              Gospel Lyon Métropole
            </h1>
            <p className="text-[16px] text-white/65 leading-relaxed">
              {settings?.aboutIntro || "GOSLYM a pour mission la promotion du chant gospel à Lyon et dans la métropole lyonnaise. L'association croit profondément que le gospel peut faire grandir grâce aux valeurs qu'il porte : fraternité, solidarité, communion, joie."}
            </p>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl px-5 py-5 text-center border border-[rgba(30,21,53,0.06)]">
                <div className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-brand)]">{s.value}</div>
                <div className="font-display text-[12px] tracking-[1px] uppercase text-[var(--color-text-muted)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="py-12 md:py-16 bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="section-tag text-[var(--color-gold)]">Notre histoire</div>
              <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-4">
                {settings?.aboutHistoryTitle || "Du rêve à la scène"}
              </h2>
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-5">
                {settings?.aboutHistory || "L'association GOSLYM est née en 2020 de la passion d'un groupe de bénévoles lyonnais pour le gospel. En pleine crise sanitaire, le père Matthieu Thouvenot et son équipe ont imaginé un festival qui rassemblerait amateurs et professionnels dans un lieu chargé d'histoire : la Crypte de la Basilique de Fourvière."}
              </p>
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8]">
                {settings?.aboutHistory2 || "La première édition, en octobre 2021, a réuni 1 500 spectateurs et 27 participants de Masterclass. Depuis, le festival a grandi : 3 000 spectateurs attendus pour la 2e édition en 2024, et le lancement du Gospel Experience Institute, l'école de gospel de l'association, en 2023. La 3e édition se tiendra du 23 au 26 avril 2026."}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#413485] to-[#6B4DAE] rounded-[20px] min-h-[300px] flex items-center justify-center">
              <span className="font-serif text-[60px] text-white/10">G</span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <div className="site-container py-10">
        <div className="bg-[var(--color-brand)] rounded-3xl py-8 md:py-10 px-5 md:px-8">
          <div className="section-tag text-[var(--color-gold)]">Notre mission</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-white mb-6">Deux projets, une vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-[var(--color-peach)] mb-2">Le Festival</h3>
              <p className="text-[15px] text-white/60 leading-[1.7]">
                {settings?.missionFestival || "Un festival biennal avec des grands concerts professionnels, offrant une scène aux chorales régionales, et des Masterclass pour permettre aux chanteurs de progresser dans leur art. Le Festival Gospel Expérience est devenu un rendez-vous culturel lyonnais unique."}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[var(--color-gold)] mb-2">L&apos;École de Gospel</h3>
              <p className="text-[15px] text-white/60 leading-[1.7]">
                {settings?.missionEcole || "Un lieu d'éducation et de transmission pour les jeunes et les adultes. Le Gospel Experience Institute propose des ateliers chœur mensuels au Carré Fourvière, encadrés par des artistes professionnels. Le gospel comme chemin vers l'épanouissement et la confiance en soi."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ÉQUIPE */}
      <section className="py-12 md:py-16 bg-white">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">L&apos;équipe</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-6">Les personnes derrière GOSLYM</h2>
          {team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((m, i) => (
                <div key={i} className="bg-[var(--color-cream)] rounded-[20px] p-6 text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-[#413485] to-[#6B4DAE]">
                    {m.photo ? (
                      <img src={urlFor(m.photo).width(160).height(160).url()} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-serif text-[24px] font-bold">{m.name[0]}</div>
                    )}
                  </div>
                  <h4 className="font-serif text-[17px] font-bold text-[var(--color-brand)] mb-1">{m.name}</h4>
                  <div className="font-display text-[12px] tracking-[1px] uppercase text-[var(--color-gold)] mb-2">{m.role}</div>
                  {m.bio && <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{m.bio}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[var(--color-cream)] rounded-[20px] p-8 text-center">
              <p className="text-[15px] text-[var(--color-text-muted)] mb-2">La section équipe sera renseignée prochainement.</p>
              <p className="text-[13px] text-[var(--color-text-light)]">Ajoutez les membres depuis Studio → Réglages → Page À propos → Équipe.</p>
            </div>
          )}
        </div>
      </section>

      {/* ACTIONS SOCIALES */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Dimension sociale</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-6">Le gospel comme vecteur d&apos;inclusion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {actions.map((a, i) => (
              <div key={a.title} className="bg-white rounded-2xl p-6 border border-[rgba(30,21,53,0.06)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] mb-3" style={{ backgroundColor: actionColors[i % actionColors.length] }}>
                  {actionIcons[i % actionIcons.length]}
                </div>
                <h4 className="font-serif text-base font-bold text-[var(--color-brand)] mb-2">{a.title}</h4>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="site-container py-10">
        <div className="bg-[var(--color-gold-light)] rounded-3xl px-6 md:px-8 py-9 text-center">
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-gold-dark)] mb-2">{settings?.aboutCtaTitle || "Envie de nous rejoindre ?"}</h3>
          <p className="text-[15px] text-[var(--color-gold-dark)] opacity-70 mb-5 max-w-[480px] mx-auto">{settings?.aboutCtaDescription || "Bénévoles, partenaires, mécènes — chaque contribution compte pour faire vivre le gospel à Lyon."}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="btn-coral no-underline">Nous contacter</Link>
            <Link href="/festival" className="btn-outline no-underline">Découvrir le festival</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
