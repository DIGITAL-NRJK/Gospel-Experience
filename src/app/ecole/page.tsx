import { client, ALL_FORMATIONS_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// ✅ Meta description enrichie avec mots-clés locaux et bénéfices
export const metadata: Metadata = {
  title: "École de Gospel à Lyon — Gospel Experience Institute (GEI)",
  description: "Apprenez le gospel à Lyon avec le Gospel Experience Institute (GEI). Ateliers chœur mensuels au Carré Fourvière, ouverts aux jeunes (16-18 ans, 30€) et adultes (150€/semestre). Dirigé par Hazaële.",
};

interface Intervenant { name: string; role?: string; photo?: { asset: { _ref: string } }; bio?: string; bio2?: string }
interface EcoleDate { date: string; lieu?: string }
interface Settings {
  ecoleHeroImage?: { asset: { _ref: string } };
  ecoleHeroTag?: string;
  ecoleHeroTitle?: string;
  ecoleHeroSubtitle?: string;
  ecoleHeroButton1?: { text: string; url: string };
  ecoleHeroButton2?: { text: string; url: string };
  ecoleFormatTag?: string;
  ecoleFormatTitle?: string;
  ecoleIntervenants?: Intervenant[];
  ecoleDates?: EcoleDate[];
  ecoleDatesTag?: string;
  ecoleDatesTitle?: string;
  ecoleCtaTitle?: string;
  ecoleCtaDescription?: string;
  ecoleCtaButton?: { text: string; url: string };
  ecolePresentationTitle?: string;
  ecolePresentationText?: string;
  ecoleVision?: string;
  ecolePedagogie?: string;
  ecoleFaqs?: { question: string; answer: string }[];
  ecoleJeunesSchedule?: string;
  ecoleJeunesDescription?: string;
  ecoleJeunesPrice?: string;
  ecoleAdultesSchedule?: string;
  ecoleAdultesDescription?: string;
  ecoleAdultesPrice?: string;
}

const defaultValues = [
  {
    icon: "♪",
    title: "Transmission",
    description: "Apprendre le gospel dans un cadre bienveillant, encadré par des artistes professionnels qui transmettent leur passion et leur savoir-faire.",
  },
  {
    icon: "◈",
    title: "Inclusion",
    description: "Tous les niveaux sont accueillis, débutants comme confirmés, dès 16 ans. Le gospel est accessible à toutes les voix.",
  },
  {
    icon: "★",
    title: "Scène",
    description: "Les participants ont la possibilité de monter sur scène lors des concerts du Festival Gospel Expérience dès le mois de décembre.",
  },
  {
    icon: "♥",
    title: "Communauté",
    description: "La pratique collective du chant renforce la confiance, la discipline et crée des liens profonds entre les participants.",
  },
];

export default async function EcolePage() {
  const [formations, s] = await Promise.all([
    client.fetch(ALL_FORMATIONS_QUERY),
    client.fetch<Settings>(SITE_SETTINGS_QUERY),
  ]);

  const intervenants = s?.ecoleIntervenants?.length ? s.ecoleIntervenants : [
    { name: "Hazaële", role: "Compositrice · Interprète · Chef de chœur", bio: "Hazaële dirige les ateliers chœur du Gospel Experience Institute. Artiste passionnée et pédagogue, elle transmet avec générosité son amour du gospel et accompagne chaque participant dans sa progression vocale.", bio2: "Possibilité de participer aux concerts de Gospel Philharmonic Experience dès le mois de décembre." },
  ];

  const dates = s?.ecoleDates?.length ? s.ecoleDates : [];

  const jeunesFormation = formations?.find((f: { targetAudience: string }) => f.targetAudience === "jeunes");
  const adultesFormation = formations?.find((f: { targetAudience: string }) => f.targetAudience !== "jeunes");

  // ✅ Schema FAQ JSON-LD pour rich snippets Google
  const faqs = s?.ecoleFaqs?.length ? s.ecoleFaqs : [
    { question: "Faut-il avoir de l'expérience en chant pour s'inscrire ?", answer: "Non, l'école de gospel GEI à Lyon accueille tous les niveaux. Les ateliers sont conçus pour que chacun progresse à son rythme, des débutants aux chanteurs confirmés." },
    { question: "À partir de quel âge peut-on participer ?", answer: "Le créneau Jeunes est ouvert dès 16 ans. Le créneau Adultes est ouvert à tous sans limite d'âge supérieure." },
    { question: "Combien de temps dure une session ?", answer: "Le créneau Jeunes dure 2 heures (11h-13h) et le créneau Adultes dure 3 heures (14h-17h). Les sessions ont lieu un dimanche par mois au Carré Fourvière, Lyon." },
    { question: "Peut-on participer aux concerts du festival ?", answer: "Oui, les participants de l'école de gospel GEI ont la possibilité de monter sur scène lors des concerts du Festival Gospel Expérience, notamment dès le mois de décembre." },
    { question: "Où se déroulent les ateliers de gospel ?", answer: "Les ateliers de gospel ont lieu au Carré Fourvière, 8 place de Fourvière, 69005 Lyon. Accessible en funiculaire (station Fourvière) ou en bus (ligne C20)." },
    { question: "Quel est le tarif de l'école de gospel à Lyon ?", answer: "Le créneau Jeunes (16-18 ans) est à 30€ par semestre. Le créneau Adultes est à 150€ par semestre. Les sessions ont lieu un dimanche par mois." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <Header />

      {/* ✅ Schema FAQ injecté */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[350px] md:min-h-[420px] bg-gradient-to-br from-[var(--color-brand-dark)] to-[#0D0D0D] overflow-hidden">
        {s?.ecoleHeroImage && (
          <img
            src={urlFor(s.ecoleHeroImage).width(1600).height(800).url()}
            alt="Atelier chœur gospel au Carré Fourvière — École GEI Lyon"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(42,31,94,0.85)] to-[rgba(13,13,13,0.9)]" />
        <div className="site-container relative z-10 py-16 md:py-20">
          <div className="max-w-[520px]">
            <div className="font-display text-[12px] tracking-[3px] uppercase text-[var(--color-gold)] mb-3">
              {s?.ecoleHeroTag || "Atelier chœur gospel · Lyon"}
            </div>
            {/* ✅ H1 enrichi avec mots-clés locaux et bénéfice utilisateur */}
            <h1 className="font-serif text-[32px] md:text-[42px] font-bold text-white leading-[1.1] mb-4">
              {s?.ecoleHeroTitle || "Apprenez le gospel à Lyon — L'école GEI vous attend"}
            </h1>
            <p className="text-[16px] text-white/65 leading-relaxed mb-7">
              {s?.ecoleHeroSubtitle || "Un dimanche par mois, rejoignez notre atelier chœur gospel au Carré Fourvière. Jeunes et adultes, tous niveaux bienvenus."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={s?.ecoleHeroButton1?.url || "#inscription"} className="btn-teal no-underline">
                {s?.ecoleHeroButton1?.text || "Rejoindre le chœur →"}
              </a>
              <a href={s?.ecoleHeroButton2?.url || "#dates"} className="btn-outline-light no-underline">
                {s?.ecoleHeroButton2?.text || "Voir les dates 2026"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRÉSENTATION ===== */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">L&apos;école</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-4">
            {s?.ecolePresentationTitle || "Une école de gospel au cœur de Lyon"}
          </h2>
          <div className="max-w-[720px] mb-10">
            <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-5">
              {s?.ecolePresentationText || "Le Gospel Experience Institute (GEI) est l'école de gospel de l'association GOSLYM, ouverte à Lyon depuis 2023. Portée par la Fondation Fourvière, elle propose des ateliers chœur mensuels accessibles aux débutants comme aux chanteurs expérimentés, dès 16 ans."}
            </p>
            <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-5">
              {s?.ecoleVision || "L'école est née d'une conviction : le gospel est bien plus qu'un genre musical. C'est une pratique collective qui renforce la confiance en soi, développe la discipline et crée des liens entre les participants. Le père Matthieu Thouvenot, président de GOSLYM, insiste sur les bénéfices éducatifs et sociaux : la pratique chorale peut aider certains jeunes en difficulté scolaire ou personnelle à retrouver un élan."}
            </p>
            <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8]">
              {s?.ecolePedagogie || "La pédagogie repose sur l'apprentissage par la pratique : technique vocale, harmonisation, interprétation de répertoire gospel. Les participants travaillent en chœur sous la direction d'artistes professionnels et ont l'opportunité de se produire sur scène lors des concerts du Festival Gospel Expérience."}
            </p>
          </div>

          {/* Valeurs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {defaultValues.map((v) => (
              <div key={v.title} className="bg-white rounded-[20px] p-6 border border-[rgba(30,21,53,0.06)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-gold-light)] flex items-center justify-center text-[18px] mb-4">{v.icon}</div>
                <h4 className="font-serif text-[17px] font-bold text-[var(--color-brand)] mb-2">{v.title}</h4>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.6]">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CRÉNEAUX ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">{s?.ecoleFormatTag || "Format"}</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-8">
            {s?.ecoleFormatTitle || "Deux créneaux, un dimanche par mois"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloc Jeunes */}
            <div className="bg-[var(--color-gold-light)] rounded-[20px] p-7 md:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-3.5l6-4.5-6-4.5v9z"/></svg>
                </div>
                <div>
                  <div className="font-display text-[13px] text-[var(--color-gold-dark)] uppercase tracking-[1px]">Jeunes</div>
                  <div className="text-[13px] text-[var(--color-gold-dark)] opacity-70">16 – 18 ans</div>
                </div>
              </div>
              <div className="font-serif text-[32px] md:text-[36px] font-bold text-[var(--color-gold-dark)] mb-2">
                {jeunesFormation?.schedule || s?.ecoleJeunesSchedule || "11h – 13h"}
              </div>
              <p className="text-[15px] text-[var(--color-gold-dark)] opacity-70 leading-relaxed mb-4 flex-1">
                {s?.ecoleJeunesDescription || "Session dédiée aux jeunes talents. Découverte du chant choral, technique vocale adaptée, répertoire gospel accessible. Un espace d'expression et de confiance."}
              </p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="font-serif text-[24px] font-bold text-[var(--color-gold-dark)]">
                    {jeunesFormation?.price || s?.ecoleJeunesPrice || "30€"}
                    <span className="text-[14px] font-normal ml-1">/ semestre</span>
                  </div>
                  {jeunesFormation?.venue && <div className="text-[13px] text-[var(--color-gold-dark)] opacity-60 mt-1">{jeunesFormation.venue}</div>}
                </div>
                {jeunesFormation?.registrationUrl ? (
                  <a href={jeunesFormation.registrationUrl} className="btn-teal text-[13px] px-5 py-2.5 no-underline">Rejoindre →</a>
                ) : (
                  <a href="#inscription" className="btn-teal text-[13px] px-5 py-2.5 no-underline">Rejoindre →</a>
                )}
              </div>
            </div>

            {/* Bloc Adultes */}
            <div className="bg-[var(--color-brand-light)] rounded-[20px] p-7 md:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-3.5l6-4.5-6-4.5v9z"/></svg>
                </div>
                <div>
                  <div className="font-display text-[13px] text-[var(--color-brand)] uppercase tracking-[1px]">Adultes & jeunes adultes</div>
                  <div className="text-[13px] text-[var(--color-brand)] opacity-70">Tous niveaux</div>
                </div>
              </div>
              <div className="font-serif text-[32px] md:text-[36px] font-bold text-[var(--color-brand)] mb-2">
                {adultesFormation?.schedule || s?.ecoleAdultesSchedule || "14h – 17h"}
              </div>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed mb-4 flex-1">
                {s?.ecoleAdultesDescription || "Session ouverte à tous. Technique vocale, harmonisation, interprétation de répertoire gospel. Travail en chœur avec possibilité de monter sur scène lors des concerts du festival."}
              </p>
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="font-serif text-[24px] font-bold text-[var(--color-brand)]">
                    {adultesFormation?.price || s?.ecoleAdultesPrice || "150€"}
                    <span className="text-[14px] font-normal ml-1">/ semestre</span>
                  </div>
                  {adultesFormation?.venue && <div className="text-[13px] text-[var(--color-text-light)] mt-1">{adultesFormation.venue}</div>}
                </div>
                {adultesFormation?.registrationUrl ? (
                  <a href={adultesFormation.registrationUrl} className="btn-coral text-[13px] px-5 py-2.5 no-underline">Rejoindre →</a>
                ) : (
                  <a href="#inscription" className="btn-coral text-[13px] px-5 py-2.5 no-underline">Rejoindre →</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERVENANTS ===== */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">{intervenants.length > 1 ? "Intervenants" : "Intervenant(e)"}</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-6">
            {intervenants.length > 1 ? "L'équipe pédagogique" : intervenants[0]?.name || "Intervenant(e)"}
          </h2>
          <div className={`grid gap-8 ${intervenants.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-[220px_1fr]"}`}>
            {intervenants.map((p, i) => (
              <div key={i} className={intervenants.length > 1 ? "bg-white rounded-[20px] p-6 border border-[rgba(30,21,53,0.06)]" : "contents"}>
                <div className={`bg-gradient-to-br from-[#413485] to-[#6B4DAE] rounded-[20px] overflow-hidden ${intervenants.length > 1 ? "h-[200px] mb-4" : "min-h-[260px]"}`}>
                  {p.photo && (
                    <img
                      src={urlFor(p.photo).width(400).height(400).url()}
                      alt={`${p.name} — chef de chœur gospel GEI Lyon`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div>
                  {intervenants.length > 1 && (
                    <h3 className="font-serif text-[20px] font-bold text-[var(--color-brand)] mb-1">{p.name}</h3>
                  )}
                  {p.role && (
                    <div className="font-display text-[14px] text-[var(--color-gold)] mb-2">{p.role}</div>
                  )}
                  {p.bio && (
                    <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7] mb-4">{p.bio}</p>
                  )}
                  {p.bio2 && (
                    <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">{p.bio2}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DATES ===== */}
      <section id="dates" className="py-12 md:py-16 bg-white">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">{s?.ecoleDatesTag || "Calendrier 2026"}</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-5">
            {s?.ecoleDatesTitle || "Dates des ateliers gospel à Lyon"}
          </h2>
          {dates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dates.map((d) => {
                const dateObj = new Date(d.date + "T00:00:00");
                const day = dateObj.getDate().toString().padStart(2, "0");
                const monthShort = dateObj.toLocaleDateString("fr-FR", { month: "short" });
                const monthLong = dateObj.toLocaleDateString("fr-FR", { month: "long" });
                return (
                  <div key={d.date} className="bg-[var(--color-cream)] rounded-2xl px-5 py-4 border border-[rgba(30,21,53,0.06)] flex items-center gap-4">
                    <div className="bg-[var(--color-gold-light)] rounded-xl px-4 py-2.5 text-center">
                      <div className="font-serif text-[22px] font-bold text-[var(--color-gold-dark)] leading-none">{day}</div>
                      <div className="font-display text-[11px] tracking-[1px] uppercase text-[var(--color-gold)]">{monthShort}</div>
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-[var(--color-brand)]">Dimanche {day} {monthLong}</div>
                      <div className="text-[13px] text-[var(--color-text-light)]">{d.lieu || "Carré Fourvière, Lyon"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[15px] text-[var(--color-text-muted)] text-center py-8">Les dates seront annoncées prochainement.</p>
          )}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      {faqs.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="site-container">
            <div className="section-tag text-[var(--color-gold)]">FAQ</div>
            <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-6">Questions fréquentes sur l&apos;école de gospel</h2>
            <div className="max-w-[720px]">
              <FaqAccordion items={faqs} accentColor="var(--color-gold-dark)" />
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <div id="inscription" className="site-container pb-10 pt-4">
        <div className="bg-[var(--color-gold-light)] rounded-3xl px-6 md:px-8 py-9 text-center">
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-gold-dark)] mb-2">
            {s?.ecoleCtaTitle || "Votre voix a sa place dans notre chœur"}
          </h3>
          <p className="text-[15px] text-[var(--color-gold-dark)] opacity-70 mb-5">
            {s?.ecoleCtaDescription || "Carré Fourvière — 8 place de Fourvière, 69005 Lyon · Un dimanche par mois"}
          </p>
          <a href={s?.ecoleCtaButton?.url || "#inscription"} className="btn-teal no-underline">
            {s?.ecoleCtaButton?.text || "Rejoindre le chœur →"}
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
