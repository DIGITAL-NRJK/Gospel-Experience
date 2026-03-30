import { client, ALL_FORMATIONS_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "École GEI — Gospel Experience Institute",
  description: "Ateliers chœur gospel un dimanche par mois dans la Crypte de la Basilique de Fourvière. Jeunes et adultes. Dirigé par Hazaële.",
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
}

export default async function EcolePage() {
  const [formations, s] = await Promise.all([
    client.fetch(ALL_FORMATIONS_QUERY),
    client.fetch<Settings>(SITE_SETTINGS_QUERY),
  ]);

  const intervenants = s?.ecoleIntervenants?.length ? s.ecoleIntervenants : [
    { name: "Hazaële", role: "Compositrice · Interprète · Chef de chœur", bio: "Hazaële dirige les ateliers chœur du Gospel Experience Institute. Artiste passionnée et pédagogue, elle transmet avec générosité son amour du gospel.", bio2: "Possibilité de participer aux concerts de Gospel Philharmonic Experience dès le mois de décembre." },
  ];

  const dates = s?.ecoleDates?.length ? s.ecoleDates : [];

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-87.5 md:min-h-100 bg-linear-to-br from-[#0D3D2A] to-(--color-indigo) flex items-center overflow-hidden">
        {s?.ecoleHeroImage && (
          <img src={urlFor(s.ecoleHeroImage).width(1600).height(800).url()} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-linear-to-br from-[rgba(13,61,42,0.8)] to-[rgba(43,27,94,0.85)]" />
        <div className="site-container relative z-10 py-12 md:py-16">
          <div className="max-w-130">
            <div className="text-[12px] tracking-[3px] uppercase text-teal font-bold mb-3">
              {s?.ecoleHeroTag || "Atelier chœur gospel"}
            </div>
            <h1 className="font-serif text-[32px] md:text-[42px] font-bold text-white leading-[1.1] mb-4">
              {s?.ecoleHeroTitle || "Gospel Experience Institute"}
            </h1>
            <p className="text-[16px] text-white/65 leading-relaxed mb-7">
              {s?.ecoleHeroSubtitle || "Un dimanche par mois, rejoignez notre atelier chœur gospel dans la Crypte de la Basilique de Fourvière."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={s?.ecoleHeroButton1?.url || "#inscription"} className="btn-teal no-underline">
                {s?.ecoleHeroButton1?.text || "S'inscrire maintenant"}
              </a>
              <a href={s?.ecoleHeroButton2?.url || "#dates"} className="btn-outline border-white/40 text-white no-underline">
                {s?.ecoleHeroButton2?.text || "Voir les dates"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT / CRÉNEAUX */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-teal">{s?.ecoleFormatTag || "Format"}</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-(--color-indigo) mb-6">
            {s?.ecoleFormatTitle || "Deux créneaux, un dimanche par mois"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formations && formations.length > 0 ? formations.map((f: { _id: string; targetAudience: string; schedule: string; venue?: string; price: string; registrationUrl?: string }) => (
              <div key={f._id} className={`rounded-[20px] p-6 md:p-7 ${f.targetAudience === "jeunes" ? "bg-teal-light" : "bg-white border-2 border-teal"}`}>
                <div className="text-[13px] font-bold text-teal-dark uppercase tracking-[1px] mb-2">{f.targetAudience === "jeunes" ? "Jeunes (16-18 ans)" : "Adultes & Jeunes"}</div>
                <div className="font-serif text-[28px] md:text-[32px] font-bold text-teal-dark">{f.schedule}</div>
                {f.venue && <p className="text-[14px] text-text-muted mt-2">{f.venue}</p>}
                <div className="mt-4 font-serif text-xl font-bold text-teal-dark">{f.price}</div>
                {f.registrationUrl && <a href={f.registrationUrl} className="btn-teal inline-block mt-4 text-[13px] no-underline">S&apos;inscrire →</a>}
              </div>
            )) : (
              <>
                <div className="rounded-[20px] p-6 md:p-7 bg-teal-light">
                  <div className="text-[13px] font-bold text-teal-dark uppercase tracking-[1px] mb-2">Jeunes (16-18 ans)</div>
                  <div className="font-serif text-[28px] md:text-[32px] font-bold text-teal-dark">11h – 13h</div>
                  <p className="text-[14px] text-teal-dark opacity-70 mt-2">Session dédiée aux jeunes talents.</p>
                  <div className="mt-4 font-serif text-xl font-bold text-teal-dark">30€ <span className="text-[14px] font-normal">/ semestre</span></div>
                </div>
                <div className="rounded-[20px] p-6 md:p-7 bg-white border-2 border-teal">
                  <div className="text-[13px] font-bold text-teal-dark uppercase tracking-[1px] mb-2">Adultes & jeunes</div>
                  <div className="font-serif text-[28px] md:text-[32px] font-bold text-teal-dark">14h – 17h</div>
                  <p className="text-[14px] text-text-muted mt-2">Session ouverte à tous. Technique vocale, répertoire gospel.</p>
                  <div className="mt-4 font-serif text-xl font-bold text-teal-dark">150€ <span className="text-[14px] font-normal">/ semestre</span></div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* INTERVENANTS — supporte plusieurs */}
      <section className="py-12 md:py-16 bg-linear-to-b from-cream to-[#E8F8F0]">
        <div className="site-container">
          <div className="section-tag text-teal-dark">{intervenants.length > 1 ? "Intervenants" : "Intervenant(e)"}</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-(--color-indigo) mb-6">
            {intervenants.length > 1 ? "L'équipe pédagogique" : intervenants[0]?.name || "Intervenant(e)"}
          </h2>
          <div className={`grid gap-8 ${intervenants.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-[200px_1fr]"}`}>
            {intervenants.map((p, i) => (
              <div key={i} className={intervenants.length > 1 ? "bg-white rounded-[20px] p-6 border border-[rgba(43,27,94,0.06)]" : "contents"}>
                {/* Photo */}
                <div className={`bg-linear-to-br from-teal to-[#5DCAA5] rounded-[20px] overflow-hidden ${intervenants.length > 1 ? "h-[200px] mb-4" : "min-h-[240px]"}`}>
                  {p.photo && (
                    <img src={urlFor(p.photo).width(400).height(400).url()} alt={p.name} className="w-full h-full object-cover" />
                  )}
                </div>
                {/* Info */}
                <div>
                  {intervenants.length > 1 && (
                    <h3 className="font-serif text-[20px] font-bold text-(--color-indigo) mb-1">{p.name}</h3>
                  )}
                  {p.role && (
                    <div className="text-[14px] text-teal font-bold mb-2">{p.role}</div>
                  )}
                  {p.bio && (
                    <p className="text-[15px] text-text-muted leading-[1.7] mb-4">{p.bio}</p>
                  )}
                  {p.bio2 && (
                    <p className="text-[15px] text-text-muted leading-[1.7]">{p.bio2}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATES — dynamiques depuis Studio */}
      <section id="dates" className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-gold">{s?.ecoleDatesTag || "Dates 2026"}</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-(--color-indigo) mb-5">
            {s?.ecoleDatesTitle || "Calendrier des sessions"}
          </h2>
          {dates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dates.map((d) => {
                const dateObj = new Date(d.date + "T00:00:00");
                const day = dateObj.getDate().toString().padStart(2, "0");
                const monthShort = dateObj.toLocaleDateString("fr-FR", { month: "short" });
                const monthLong = dateObj.toLocaleDateString("fr-FR", { month: "long" });
                return (
                  <div key={d.date} className="bg-white rounded-2xl px-5 py-4 border border-[rgba(43,27,94,0.06)] flex items-center gap-4">
                    <div className="bg-teal-light rounded-xl px-4 py-2.5 text-center">
                      <div className="font-serif text-[22px] font-bold text-teal-dark leading-none">{day}</div>
                      <div className="text-[11px] tracking-[1px] uppercase text-teal">{monthShort}</div>
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-(--color-indigo)">Dimanche {day} {monthLong}</div>
                      <div className="text-[13px] text-text-light">{d.lieu || "Carré Fourvière"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[15px] text-text-muted text-center py-8">Les dates seront annoncées prochainement. Ajoutez-les depuis le Studio → Réglages → Page École GEI.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <div id="inscription" className="site-container pb-10">
        <div className="bg-teal-light rounded-3xl px-6 md:px-8 py-9 text-center">
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-teal-dark mb-2">
            {s?.ecoleCtaTitle || "Prêt à rejoindre le chœur ?"}
          </h3>
          <p className="text-[15px] text-teal-dark opacity-70 mb-5">
            {s?.ecoleCtaDescription || "Carré Fourvière — 5 place de Fourvière, 69005 Lyon"}
          </p>
          <a href={s?.ecoleCtaButton?.url || "#inscription"} className="btn-teal no-underline">
            {s?.ecoleCtaButton?.text || "S'inscrire maintenant"}
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
