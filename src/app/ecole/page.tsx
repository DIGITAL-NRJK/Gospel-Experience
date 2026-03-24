import { client, ALL_FORMATIONS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// Revalide le contenu toutes les 60 secondes
export const revalidate = 60;

export const metadata: Metadata = {
  title: "École GEI — Gospel Experience Institute",
  description: "Ateliers chœur gospel un dimanche par mois au Carré Fourvière. Jeunes (16-18 ans) et adultes. Dirigé par Hazaële.",
};

export default async function EcolePage() {
  const formations = await client.fetch(ALL_FORMATIONS_QUERY);

  return (
    <>
      <Header />

      {/* HERO full width */}
      <section className="relative min-h-[380px] bg-gradient-to-br from-[#0D3D2A] to-[var(--color-indigo)] flex items-center overflow-hidden">
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[var(--color-teal)] opacity-[0.07] -top-[80px] -right-[30px]" />
        <div className="site-container relative z-10 py-16">
          <div className="max-w-[500px]">
            <div className="text-[10px] tracking-[3px] uppercase text-[var(--color-teal)] font-bold mb-3">Atelier chœur gospel</div>
            <h1 className="font-serif text-[40px] font-bold text-white leading-[1.12] mb-3.5">
              Gospel Experience<br /><span className="text-[#5DCAA5]">Institute</span>
            </h1>
            <p className="text-[15px] text-white/65 leading-relaxed mb-7">Un dimanche par mois, rejoignez notre atelier chœur gospel au Carré Fourvière. Ouvert aux choristes et solistes, jeunes et adultes.</p>
            <div className="flex gap-3">
              <button className="btn-teal">S&apos;inscrire maintenant</button>
              <button className="btn-outline border-white/40 text-white">Voir les dates</button>
            </div>
          </div>
        </div>
      </section>

      {/* CRÉNEAUX */}
      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-teal)]">Format</div>
          <h2 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-6">Deux créneaux, un dimanche par mois</h2>
          <div className="grid grid-cols-2 gap-4">
            {formations && formations.length > 0 ? formations.map((f: { _id: string; targetAudience: string; schedule: string; venue?: string; price: string; registrationUrl?: string }) => (
              <div key={f._id} className={`rounded-[20px] p-7 ${f.targetAudience === "jeunes" ? "bg-[var(--color-teal-light)]" : "bg-white border-2 border-[var(--color-teal)]"}`}>
                <div className="text-[11px] font-bold text-[var(--color-teal-dark)] uppercase tracking-[1px] mb-2">{f.targetAudience === "jeunes" ? "Jeunes (16-18 ans)" : "Adultes & Jeunes"}</div>
                <div className="font-serif text-[32px] font-bold text-[var(--color-teal-dark)]">{f.schedule}</div>
                {f.venue && <p className="text-[12px] text-[var(--color-text-muted)] mt-2 leading-relaxed">{f.venue}</p>}
                <div className="mt-4 font-serif text-xl font-bold text-[var(--color-teal-dark)]">{f.price}</div>
                {f.registrationUrl && <a href={f.registrationUrl} className="btn-teal inline-block mt-4 text-[11px] px-5 py-2 no-underline">S&apos;inscrire →</a>}
              </div>
            )) : (
              <>
                <div className="rounded-[20px] p-7 bg-[var(--color-teal-light)]">
                  <div className="text-[11px] font-bold text-[var(--color-teal-dark)] uppercase tracking-[1px] mb-2">Jeunes (16-18 ans)</div>
                  <div className="font-serif text-[32px] font-bold text-[var(--color-teal-dark)]">11h – 13h</div>
                  <p className="text-[12px] text-[var(--color-teal-dark)] opacity-70 mt-2 leading-relaxed">Session dédiée aux jeunes talents. Apprentissage du chant gospel, travail de groupe.</p>
                  <div className="mt-4 font-serif text-xl font-bold text-[var(--color-teal-dark)]">30€ <span className="text-[12px] font-normal">/ semestre</span></div>
                </div>
                <div className="rounded-[20px] p-7 bg-white border-2 border-[var(--color-teal)]">
                  <div className="text-[11px] font-bold text-[var(--color-teal-dark)] uppercase tracking-[1px] mb-2">Adultes & jeunes</div>
                  <div className="font-serif text-[32px] font-bold text-[var(--color-teal-dark)]">14h – 17h</div>
                  <p className="text-[12px] text-[var(--color-text-muted)] mt-2 leading-relaxed">Session ouverte à tous. Technique vocale, répertoire gospel traditionnel et urbain.</p>
                  <div className="mt-4 font-serif text-xl font-bold text-[var(--color-teal-dark)]">150€ <span className="text-[12px] font-normal">/ semestre</span></div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* INTERVENANTE */}
      <section className="py-14 bg-gradient-to-b from-[var(--color-cream)] to-[#E8F8F0]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-teal-dark)]">Intervenante</div>
          <h2 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-5">Hazaële</h2>
          <div className="grid grid-cols-[200px_1fr] gap-6">
            <div className="bg-gradient-to-br from-[var(--color-teal)] to-[#5DCAA5] rounded-[20px] min-h-[240px]" />
            <div>
              <div className="text-[12px] text-[var(--color-teal)] font-bold mb-2">Compositrice · Interprète · Chef de chœur</div>
              <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.7] mb-4">Hazaële dirige les ateliers chœur du Gospel Experience Institute. Artiste passionnée et pédagogue, elle transmet avec générosité son amour du gospel et accompagne chaque participant dans sa progression vocale et artistique.</p>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-[1.7]">Possibilité de participer aux concerts de Gospel Philharmonic Experience dès le mois de décembre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DATES */}
      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Dates 2026</div>
          <h2 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-5">Calendrier des sessions</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {[["11", "Janv"], ["22", "Fév"], ["15", "Mars"], ["19", "Avr"], ["17", "Mai"], ["14", "Juin"]].map(([d, m]) => (
              <div key={d + m} className="bg-white rounded-[14px] px-5 py-4 border border-[rgba(43,27,94,0.06)] flex items-center gap-3.5">
                <div className="bg-[var(--color-teal-light)] rounded-xl px-3.5 py-2 text-center">
                  <div className="font-serif text-[22px] font-bold text-[var(--color-teal-dark)] leading-none">{d}</div>
                  <div className="text-[9px] tracking-[1px] uppercase text-[var(--color-teal)]">{m}</div>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[var(--color-indigo)]">Dimanche {d} {m}</div>
                  <div className="text-[11px] text-[var(--color-text-light)]">Carré Fourvière</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="site-container pb-10">
        <div className="bg-[var(--color-teal-light)] rounded-3xl px-7 py-9 text-center">
          <h3 className="font-serif text-2xl font-bold text-[var(--color-teal-dark)] mb-2">Prêt à rejoindre le chœur ?</h3>
          <p className="text-[13px] text-[var(--color-teal-dark)] opacity-70 mb-5">Carré Fourvière — 5 place de Fourvière, 69005 Lyon</p>
          <button className="btn-teal">S&apos;inscrire maintenant</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
