// src/app/festival/programme/page.tsx
// Page programme complet — accessible par lien, hors menu de navigation
// URL : /festival/programme
// Données pilotables depuis Sanity Studio → ⑥ Page Programme

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity.client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programme complet — Fourvière Gospel Expérience 2026",
  description:
    "Programme détaillé du Festival Fourvière Gospel Expérience 2026 : 4 concerts, Village Gospel sur l'esplanade, ateliers et masterclasses — du 23 au 26 avril 2026.",
  robots: { index: false, follow: false },
};

// ─── GROQ query ──────────────────────────────────────────────────────────────

const PROGRAMME_QUERY = `*[_type == "siteSettings"][0]{
  programmeHeroTitle,
  programmeHeroSubtitle,
  programmeBilletterieUrl,
  programmeConcerts[] {
    day, date, time, ensemble, director, description, firstPart, soldOut
  },
  programmeEsplanadeTitle,
  programmeEsplanadeSubtitle,
  programmeEsplanadeDesc1,
  programmeEsplanadeDesc2,
  programmeEsplanade[] {
    time, label, detail, type
  },
  programmeMasterTitle,
  programmeMasterDesc,
  programmeMasterDesc2,
  programmeMasterSessions[] {
    day, time, icon
  },
  programmeCtaTitle,
  programmeCtaDesc,
}`;

// ─── Fallbacks (données hardcodées) ──────────────────────────────────────────

const CONCERTS_DEFAULT = [
  {
    day: "Jeudi",
    date: "23 avril",
    time: "20h30 – 22h",
    ensemble: "Gospel Academy de Lyon",
    director: "Christelle Doy Edha",
    description:
      "La Gospel Academy réunit une soixantaine de choristes amateurs passionnés, issus de l'association lyonnaise Oxygène. Le groupe s'engageant en faveur de l'inclusion et de la solidarité au service des familles. Sous la direction de Christelle Doy Edha, cheffe de chœur, la formation propose un concert à cappella spécialement conçu pour le festival Fourvière Gospel Expérience.",
    firstPart: null,
    soldOut: false,
  },
  {
    day: "Vendredi",
    date: "24 avril",
    time: "20h30 – 22h",
    ensemble: "Le Grand Chœur GPE",
    director: "Pascal Horecka",
    description:
      "Le grand Chœur du gospel philharmonique experience rassemble entre 50 et 500 choristes amateurs. Il associe l'expérience du chant classique à l'énergie du gospel afin de transmettre un message de paix, de joie et d'espoir. Dirigé par Pascal Horecka, professeur de musicologie à l'Université de Lyon 2 et à l'ENS, ce chœur bénéficie d'une direction artistique reconnue à l'international (Prague, Budapest, Lyon).",
    firstPart: "Silowe gospel dirigé par Rose Makamu",
    soldOut: false,
  },
  {
    day: "Samedi",
    date: "25 avril",
    time: "20h30 – 22h",
    ensemble: "Le Chœur Gospel de Paris",
    director: "Georges Seba",
    description:
      "Le Chœur Gospel de Paris est composé d'une centaine de chanteurs venus des quatre coins du monde. Cette formation métisse incarne pleinement l'universalité du message d'espérance porté par le gospel. Le chœur revisite les racines de cette musique spirituelle, née dans le Mississippi rural et héritière de l'Afrique, autrefois marquée par l'histoire des champs de coton. Fondée et dirigée par Georges Seba, surnommé le King du Blues, la formation promet une soirée intense et vibrante.",
    firstPart: null,
    soldOut: false,
  },
  {
    day: "Dimanche",
    date: "26 avril",
    time: "18h30 – 20h",
    ensemble: "One Step Gospel",
    director: "Pascal Horecka",
    description:
      "Basé à Lausanne, One Step Gospel réunit une quarantaine de chanteurs sélectionnés sur audition. Ensemble, ils proposent des performances puissantes, mêlant authenticité, modernité et émotion. Dirigé par Pascal Horecka, le chœur clôturera le festival avec un concert fédérateur et inspirant.",
    firstPart: "Masterclass et Gospel Experience Institut",
    soldOut: false,
  },
];

const ESPLANADE_DEFAULT = [
  { time: "12h30 – 13h",  label: "Groupe Silowe",   detail: "dirigé par Rose Makamu",              type: "concert" },
  { time: "13h – 14h",    label: "Atelier",          detail: "Histoire du gospel",                  type: "atelier" },
  { time: "14h – 15h",    label: "Groupe Silowe",   detail: "dirigé par Rose Makamu",              type: "concert" },
  { time: "14h30 – 15h",  label: "Atelier",          detail: "Histoire du gospel",                  type: "atelier" },
  { time: "15h – 16h",    label: "Groupe Perousa",  detail: "dirigé par Jean Bourgeois Bidd",       type: "concert" },
  { time: "16h – 16h30",  label: "Atelier",          detail: "Histoire du gospel",                  type: "atelier" },
  { time: "17h – 18h",    label: "Chorale Ciel",    detail: "dirigée par Virginia Lhermenault",     type: "concert" },
  { time: "18h – 18h30",  label: "Atelier",          detail: "Histoire du gospel",                  type: "atelier" },
  { time: "19h – 20h",    label: "Chœur Full Blum", detail: "gospel dirigé par Christelle Doy",    type: "concert" },
  { time: "20h – 20h15",  label: "Atelier",          detail: "Histoire du gospel",                  type: "atelier" },
];

const MASTER_SESSIONS_DEFAULT = [
  { day: "Samedi 25 avril",   time: "10h – 17h", icon: "🎵" },
  { day: "Dimanche 26 avril", time: "10h – 16h", icon: "🎤" },
];

// ─── Composant ───────────────────────────────────────────────────────────────

export default async function ProgrammePage() {
  const settings = await client.fetch(PROGRAMME_QUERY).catch(() => null);

  // Résoudre les données — Sanity en priorité, fallback hardcodé
  const heroTitle       = settings?.programmeHeroTitle    || "Programme complet";
  const heroSubtitle    = settings?.programmeHeroSubtitle || "4 concerts dans la Crypte · Village Gospel sur l'Esplanade · Masterclasses";
  const billetterieUrl  = settings?.programmeBilletterieUrl || "https://reservation.fourviere.org";

  const concerts         = settings?.programmeConcerts?.length     ? settings.programmeConcerts     : CONCERTS_DEFAULT;
  const esplanade        = settings?.programmeEsplanade?.length    ? settings.programmeEsplanade    : ESPLANADE_DEFAULT;
  const masterSessions   = settings?.programmeMasterSessions?.length ? settings.programmeMasterSessions : MASTER_SESSIONS_DEFAULT;

  const esplanadeTitle    = settings?.programmeEsplanadeTitle    || "Le Village Gospel sur l'Esplanade";
  const esplanadeSubtitle = settings?.programmeEsplanadeSubtitle || "Samedi 25 avril · Accès gratuit · 12h30 – 20h15";
  const esplanadeDesc1    = settings?.programmeEsplanadeDesc1    || null;
  const esplanadeDesc2    = settings?.programmeEsplanadeDesc2    || null;

  const masterTitle = settings?.programmeMasterTitle || "Les Masterclasses";
  const masterDesc  = settings?.programmeMasterDesc  || null;
  const masterDesc2 = settings?.programmeMasterDesc2 || null;

  const ctaTitle = settings?.programmeCtaTitle || "Ne manquez pas la 3ème édition";
  const ctaDesc  = settings?.programmeCtaDesc  || "Crypte de la Basilique de Fourvière · 800 places · Lyon 5ème";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-cream)]">

        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#1A1532] via-[#2A1F5E] to-[#413485] overflow-hidden">
          <div className="site-container relative z-10 py-14 md:py-20">
            <div className="max-w-[560px]">
              <Link
                href="/festival"
                className="inline-flex items-center gap-1.5 font-display text-[12px] tracking-[1.5px] uppercase text-white/60 mb-6 no-underline hover:text-white/90 transition-colors"
              >
                ← Page Festival
              </Link>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="font-display text-[11px] tracking-[2px] uppercase bg-[var(--color-gold)] text-[#1A1532] px-4 py-1.5 rounded-full font-bold">
                  3ème édition
                </span>
                <span className="font-display text-[11px] tracking-[2px] uppercase bg-white/15 text-white px-4 py-1.5 rounded-full border border-white/20">
                  23 – 26 avril 2026
                </span>
              </div>
              <h1 className="font-serif text-[30px] md:text-[46px] font-bold text-white leading-[1.1] mb-4">
                {heroTitle}
              </h1>
              <p className="text-[16px] text-white/65 leading-relaxed mb-8">
                {heroSubtitle}
              </p>
              <a
                href={billetterieUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-[#1A1532] font-display text-[14px] tracking-[0.5px] font-bold px-7 py-3.5 rounded-xl no-underline hover:opacity-90 transition-opacity"
              >
                Réserver mes places →
              </a>
            </div>
          </div>
        </section>

        {/* ── Concerts ── */}
        <section className="py-14 md:py-18">
          <div className="site-container">
            <div className="text-center mb-10">
              <div className="section-tag text-[var(--color-gold)] justify-center">Dans la Crypte de Fourvière</div>
              <h2 className="font-serif text-[26px] md:text-[32px] font-bold text-[var(--color-brand)]">
                Les {concerts.length} concerts
              </h2>
              <p className="text-[14px] text-[var(--color-text-muted)] mt-2">Du jeudi au dimanche · 20h30 (18h30 le dimanche)</p>
            </div>

            <div className="flex flex-col gap-6">
              {concerts.map((c: typeof CONCERTS_DEFAULT[number], i: number) => (
                <div
                  key={c.ensemble}
                  className="bg-white rounded-2xl overflow-hidden border border-[rgba(30,21,53,0.07)] grid grid-cols-1 md:grid-cols-[200px_1fr] shadow-sm"
                >
                  {/* Bloc date */}
                  <div
                    className="flex flex-col items-center justify-center py-8 px-6 text-white text-center"
                    style={{ backgroundColor: i % 2 === 0 ? "var(--color-brand)" : "#C8A24E" }}
                  >
                    <div className="font-display text-[11px] tracking-[2px] uppercase opacity-80 mb-1">{c.day}</div>
                    <div className="font-serif text-[28px] font-bold leading-none mb-1">{c.date?.split(" ")[0]}</div>
                    <div className="font-display text-[13px] uppercase tracking-[1px] opacity-80 mb-3">{c.date?.split(" ")[1]}</div>
                    <div className="font-display text-[12px] bg-white/20 px-3 py-1 rounded-full">{c.time}</div>
                    {c.soldOut && (
                      <div className="mt-3 font-display text-[10px] tracking-[1.5px] uppercase bg-[#D93025] text-white px-3 py-1 rounded-full font-bold">
                        Complet
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6 md:p-8">
                    {c.firstPart && (
                      <div
                        className="inline-flex items-center font-display text-[11px] tracking-[1px] uppercase px-3 py-1 rounded-lg text-white mb-3"
                        style={{ backgroundColor: i % 2 === 0 ? "var(--color-brand)" : "#C8A24E" }}
                      >
                        En 1ère partie : {c.firstPart}
                      </div>
                    )}
                    <h3 className="font-serif text-[20px] md:text-[23px] font-bold text-[var(--color-brand)] mb-1">
                      {c.ensemble}
                    </h3>
                    {c.director && (
                      <p className="font-display text-[12px] tracking-[1px] uppercase text-[var(--color-text-light)] mb-3">
                        Dirigé par {c.director}
                      </p>
                    )}
                    {c.description && (
                      <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Village Gospel — Esplanade ── */}
        <section className="py-14 md:py-18 bg-white">
          <div className="site-container">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[1.5px] uppercase bg-[var(--color-gold)] text-[#1A1532] px-3.5 py-1.5 rounded-full font-bold mb-4">
                🆕 Nouveau · 3ème édition
              </span>
              <h2 className="font-serif text-[26px] md:text-[32px] font-bold text-[var(--color-brand)]">
                {esplanadeTitle}
              </h2>
              <p className="text-[14px] text-[var(--color-text-muted)] mt-2 max-w-[520px] mx-auto">
                {esplanadeSubtitle}
              </p>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-[var(--color-brand-light)] to-[#EAE7F5] rounded-2xl p-6 md:p-8 mb-8 max-w-[720px] mx-auto">
              {esplanadeDesc1 ? (
                <p className="text-[15px] text-[var(--color-brand)] leading-relaxed mb-3">{esplanadeDesc1}</p>
              ) : (
                <p className="text-[15px] text-[var(--color-brand)] leading-relaxed mb-3">
                  L&apos;esplanade de Fourvière vibrera au rythme du gospel. De 13h à 20h, le public peut assister
                  gratuitement à des concerts et démonstrations, découvrir l&apos;histoire du gospel à travers
                  des ateliers animés par les participants, et profiter d&apos;un quiz interactif organisé par{" "}
                  <strong>Radio Scoop</strong>.
                </p>
              )}
              {esplanadeDesc2 ? (
                <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{esplanadeDesc2}</p>
              ) : (
                <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">
                  Ces temps forts, accessibles gratuitement, s&apos;adressent aussi bien aux familles
                  qu&apos;aux groupes d&apos;amis. En parallèle, vous pourrez faire une pause gourmande
                  auprès de nos partenaires : <strong>La Maison Pignol</strong> et{" "}
                  <strong>Les Apprentis d&apos;Auteuil</strong>.
                </p>
              )}
            </div>

            {/* Programme détaillé esplanade */}
            <div className="max-w-[640px] mx-auto">
              <h3 className="font-display text-[12px] tracking-[2px] uppercase text-[var(--color-text-light)] mb-4 text-center">
                Programme du samedi sur l&apos;esplanade
              </h3>
              <div className="flex flex-col gap-2">
                {esplanade.map((item: typeof ESPLANADE_DEFAULT[number], i: number) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${
                      item.type === "concert"
                        ? "bg-[var(--color-brand-light)] border-[rgba(65,52,133,0.12)]"
                        : "bg-[var(--color-cream)] border-[rgba(30,21,53,0.06)]"
                    }`}
                  >
                    <span className="font-display text-[12px] text-[var(--color-text-light)] shrink-0 w-[110px]">
                      {item.time}
                    </span>
                    <div className="flex-1">
                      <span
                        className={`font-bold text-[14px] ${
                          item.type === "concert"
                            ? "text-[var(--color-brand)]"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.detail && (
                        <span className="text-[13px] text-[var(--color-text-muted)] ml-1.5 italic">
                          — {item.detail}
                        </span>
                      )}
                    </div>
                    {item.type === "concert" && (
                      <span className="text-[10px] font-display tracking-[1px] uppercase bg-[var(--color-brand)] text-white px-2 py-0.5 rounded-full shrink-0">
                        Concert
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Masterclasses ── */}
        <section className="py-14 md:py-18">
          <div className="site-container max-w-[720px]">
            <div className="text-center mb-10">
              <div className="section-tag text-[var(--color-gold)] justify-center">Formation</div>
              <h2 className="font-serif text-[26px] md:text-[32px] font-bold text-[var(--color-brand)]">
                {masterTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {masterSessions.map((s: typeof MASTER_SESSIONS_DEFAULT[number]) => (
                <div
                  key={s.day}
                  className="bg-white rounded-2xl p-6 text-center border border-[rgba(30,21,53,0.07)] shadow-sm"
                >
                  <div className="text-[28px] mb-3">{s.icon}</div>
                  <div className="font-serif text-[17px] font-bold text-[var(--color-brand)] mb-1">{s.day}</div>
                  <div className="font-display text-[13px] text-[var(--color-gold)] tracking-[1px]">{s.time}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#1A1532] to-[#413485] rounded-2xl p-6 md:p-8 text-white text-center">
              {masterDesc ? (
                <p className="text-[15px] leading-relaxed text-white/80 mb-3">{masterDesc}</p>
              ) : (
                <p className="text-[15px] leading-relaxed text-white/80 mb-3">
                  Dans la <strong className="text-white">crypte de la basilique Notre-Dame de Fourvière</strong>.
                  Ouvertes à tous, avec une attention particulière portée aux publics isolés, ces masterclasses
                  sont animées par des professionnels du Gospel Philharmonic Experience de Lyon.
                </p>
              )}
              {masterDesc2 ? (
                <p className="text-[14px] text-white/65 leading-relaxed">{masterDesc2}</p>
              ) : (
                <p className="text-[14px] text-white/65 leading-relaxed">
                  À l&apos;issue de ces formations, les participants auront l&apos;opportunité de se produire
                  en première partie du concert de{" "}
                  <strong className="text-[var(--color-gold)]">One Step Gospel</strong> le dimanche.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA billetterie ── */}
        <section className="py-12 md:py-16 bg-white text-center px-5">
          <div className="site-container max-w-[560px]">
            <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-3">
              {ctaTitle}
            </h2>
            <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed mb-7">
              {ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={billetterieUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-coral no-underline"
              >
                Réserver mes places →
              </a>
              <Link href="/festival" className="btn-outline no-underline">
                ← Retour à la page Festival
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
