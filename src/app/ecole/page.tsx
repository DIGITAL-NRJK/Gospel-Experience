import { client, ALL_FORMATIONS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "École GEI — Gospel Experience Institute",
  description: "Ateliers chœur gospel un dimanche par mois au Carré Fourvière. Jeunes et adultes. Dirigé par Hazaële.",
};

export default async function EcolePage() {
  const formations = await client.fetch(ALL_FORMATIONS_QUERY);

  return (
    <>
      <Header />
      <section className="relative min-h-[350px] md:min-h-[400px] bg-gradient-to-br from-[#0D3D2A] to-[var(--color-indigo)] flex items-center overflow-hidden">
        <div className="site-container relative z-10 py-12 md:py-16">
          <div className="max-w-[520px]">
            <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-teal)] font-bold mb-3">Atelier chœur gospel</div>
            <h1 className="font-serif text-[32px] md:text-[42px] font-bold text-white leading-[1.1] mb-4">
              Gospel Experience<br /><span className="text-[#5DCAA5]">Institute</span>
            </h1>
            <p className="text-[16px] text-white/65 leading-relaxed mb-7">Un dimanche par mois, rejoignez notre atelier chœur gospel au Carré Fourvière.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#inscription" className="btn-teal no-underline">S&apos;inscrire maintenant</a>
              <a href="#dates" className="btn-outline border-white/40 text-white no-underline">Voir les dates</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-teal)]">Format</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-6">Deux créneaux, un dimanche par mois</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formations && formations.length > 0 ? formations.map((f: { _id: string; targetAudience: string; schedule: string; venue?: string; price: string; registrationUrl?: string }) => (
              <div key={f._id} className={`rounded-[20px] p-6 md:p-7 ${f.targetAudience === "jeunes" ? "bg-[var(--color-teal-light)]" : "bg-white border-2 border-[var(--color-teal)]"}`}>
                <div className="text-[13px] font-bold text-[var(--color-teal-dark)] uppercase tracking-[1px] mb-2">{f.targetAudience === "jeunes" ? "Jeunes (16-18 ans)" : "Adultes & Jeunes"}</div>
                <div className="font-serif text-[28px] md:text-[32px] font-bold text-[var(--color-teal-dark)]">{f.schedule}</div>
                {f.venue && <p className="text-[14px] text-[var(--color-text-muted)] mt-2">{f.venue}</p>}
                <div className="mt-4 font-serif text-xl font-bold text-[var(--color-teal-dark)]">{f.price}</div>
                {f.registrationUrl && <a href={f.registrationUrl} className="btn-teal inline-block mt-4 text-[13px] no-underline">S&apos;inscrire →</a>}
              </div>
            )) : (
              <>
                <div className="rounded-[20px] p-6 md:p-7 bg-[var(--color-teal-light)]">
                  <div className="text-[13px] font-bold text-[var(--color-teal-dark)] uppercase tracking-[1px] mb-2">Jeunes (16-18 ans)</div>
                  <div className="font-serif text-[28px] md:text-[32px] font-bold text-[var(--color-teal-dark)]">11h – 13h</div>
                  <p className="text-[14px] text-[var(--color-teal-dark)] opacity-70 mt-2">Session dédiée aux jeunes talents.</p>
                  <div className="mt-4 font-serif text-xl font-bold text-[var(--color-teal-dark)]">30€ <span className="text-[14px] font-normal">/ semestre</span></div>
                </div>
                <div className="rounded-[20px] p-6 md:p-7 bg-white border-2 border-[var(--color-teal)]">
                  <div className="text-[13px] font-bold text-[var(--color-teal-dark)] uppercase tracking-[1px] mb-2">Adultes & jeunes</div>
                  <div className="font-serif text-[28px] md:text-[32px] font-bold text-[var(--color-teal-dark)]">14h – 17h</div>
                  <p className="text-[14px] text-[var(--color-text-muted)] mt-2">Session ouverte à tous. Technique vocale, répertoire gospel.</p>
                  <div className="mt-4 font-serif text-xl font-bold text-[var(--color-teal-dark)]">150€ <span className="text-[14px] font-normal">/ semestre</span></div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#E8F8F0]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-teal-dark)]">Intervenante</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Hazaële</h2>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
            <div className="bg-gradient-to-br from-[var(--color-teal)] to-[#5DCAA5] rounded-[20px] min-h-[240px]" />
            <div>
              <div className="text-[14px] text-[var(--color-teal)] font-bold mb-2">Compositrice · Interprète · Chef de chœur</div>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7] mb-4">Hazaële dirige les ateliers chœur du Gospel Experience Institute. Artiste passionnée et pédagogue, elle transmet avec générosité son amour du gospel.</p>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">Possibilité de participer aux concerts de Gospel Philharmonic Experience dès le mois de décembre.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="dates" className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Dates 2026</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Calendrier des sessions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[["11", "Janv"], ["22", "Fév"], ["15", "Mars"], ["19", "Avr"], ["17", "Mai"], ["14", "Juin"]].map(([d, m]) => (
              <div key={d + m} className="bg-white rounded-2xl px-5 py-4 border border-[rgba(43,27,94,0.06)] flex items-center gap-4">
                <div className="bg-[var(--color-teal-light)] rounded-xl px-4 py-2.5 text-center">
                  <div className="font-serif text-[22px] font-bold text-[var(--color-teal-dark)] leading-none">{d}</div>
                  <div className="text-[11px] tracking-[1px] uppercase text-[var(--color-teal)]">{m}</div>
                </div>
                <div>
                  <div className="text-[15px] font-bold text-[var(--color-indigo)]">Dimanche {d} {m}</div>
                  <div className="text-[13px] text-[var(--color-text-light)]">Carré Fourvière</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="inscription" className="site-container pb-10">
        <div className="bg-[var(--color-teal-light)] rounded-3xl px-6 md:px-8 py-9 text-center">
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-teal-dark)] mb-2">Prêt à rejoindre le chœur ?</h3>
          <p className="text-[15px] text-[var(--color-teal-dark)] opacity-70 mb-5">Carré Fourvière — 5 place de Fourvière, 69005 Lyon</p>
          <button className="btn-teal">S&apos;inscrire maintenant</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
