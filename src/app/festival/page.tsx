import { client, ALL_EVENTS_QUERY, ALL_ARTISTS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Festival Gospel Expérience",
  description:
    "Festival biennal de gospel dans la Crypte de la Basilique de Fourvière à Lyon. Concerts professionnels, chorales régionales, Masterclass avec Pascal Horecka.",
};

export default async function FestivalPage() {
  const [events, artists] = await Promise.all([
    client.fetch(ALL_EVENTS_QUERY),
    client.fetch(ALL_ARTISTS_QUERY),
  ]);

  const festivalEvents = events?.filter(
    (e: any) => e.eventType === "festival" || e.eventType === "concert" || e.eventType === "masterclass"
  );

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[380px] bg-gradient-to-br from-[#3D1E10] to-[var(--color-indigo)] flex items-center px-10 py-16 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[var(--color-coral)] opacity-[0.06] -top-[100px] -right-[50px]" />
        <div className="relative z-10 max-w-[500px]">
          <div className="text-[10px] tracking-[3px] uppercase text-[var(--color-gold)] font-bold mb-3">
            Festival biennal
          </div>
          <h1 className="font-serif text-[40px] font-bold text-white leading-[1.12] mb-3.5">
            Fourvière<br />
            <span className="text-[var(--color-peach-deep)]">Gospel Expérience</span>
          </h1>
          <p className="text-[15px] text-white/65 leading-relaxed mb-7">
            Depuis 2021, le rendez-vous incontournable du gospel dans la Crypte de la
            Basilique de Fourvière à Lyon. Concerts professionnels, chorales régionales,
            Masterclass.
          </p>
          <div className="flex gap-3">
            <button className="btn-coral">Réserver ma place</button>
            <button className="btn-outline border-white/40 text-white">Voir le programme</button>
          </div>
        </div>
      </section>

      {/* PROGRAMMATION */}
      <section className="py-11 px-7">
        <div className="section-tag text-[var(--color-coral)]">Programmation</div>
        <h2 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-1.5">
          Prochaine édition
        </h2>
        <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed mb-6">
          4 jours de concerts, Masterclass et ateliers dans la Crypte de Fourvière.
        </p>
        <div className="flex flex-col gap-2.5">
          {festivalEvents?.map((event: any) => {
            const date = new Date(event.dateStart);
            const day = date.getDate().toString().padStart(2, "0");
            const month = date.toLocaleDateString("fr-FR", { month: "short" });
            return (
              <div key={event._id} className="flex items-center gap-3.5 py-3.5 px-4.5 bg-white rounded-[14px] border border-[rgba(43,27,94,0.06)]">
                <div className="rounded-xl px-3 py-2 text-center min-w-[52px] bg-[var(--color-coral-light)]">
                  <div className="font-serif text-xl font-bold leading-none text-[var(--color-coral-dark)]">{day}</div>
                  <div className="text-[9px] tracking-[1px] uppercase text-[var(--color-coral)]">{month}</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[13px] font-bold text-[var(--color-indigo)] mb-0.5">{event.title}</h4>
                  <p className="text-[11px] text-[var(--color-text-light)]">
                    {event.venue}{event.timeStart && ` · ${event.timeStart}`}{event.timeEnd && ` - ${event.timeEnd}`}
                  </p>
                </div>
                <span className="tag-festival">{event.eventType}</span>
                {event.ticketUrl && (
                  <a href={event.ticketUrl} className="text-[10px] font-bold text-[var(--color-coral-dark)]">
                    Réserver →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* LIEU */}
      <section className="py-11 px-7 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="section-tag text-[var(--color-indigo)]">Le lieu</div>
        <h2 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-5">
          Crypte de la Basilique de Fourvière
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-gradient-to-br from-[var(--color-indigo)] to-[#4A2E8A] rounded-[20px] min-h-[220px]" />
          <div>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-[1.7] mb-4">
              Située sous la Basilique Notre-Dame de Fourvière, la crypte offre un cadre
              unique avec une acoustique remarquable. Ses voûtes basses et pierres apparentes
              créent une atmosphère intimiste propice aux concerts gospel.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {[["800", "Places"], ["1884", "Construction"], ["UNESCO", "Patrimoine"], ["Lyon 5e", "Localisation"]].map(([n, l]) => (
                <div key={l} className="bg-white rounded-xl px-4 py-3 border border-[rgba(43,27,94,0.06)]">
                  <div className="font-serif text-xl font-bold text-[var(--color-indigo)]">{n}</div>
                  <div className="text-[10px] text-[var(--color-text-light)] uppercase tracking-[1px]">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BILLETTERIE */}
      <section id="billetterie" className="py-11 px-7">
        <div className="section-tag text-[var(--color-gold)]">Billetterie</div>
        <h2 className="font-serif text-[26px] font-bold text-[var(--color-indigo)] mb-5">
          Tarifs & Pass
        </h2>
        <div className="grid grid-cols-3 gap-3.5">
          {[
            { name: "Concert solo", price: "15€", desc: "1 concert au choix", accent: false },
            { name: "Pass Festival", price: "35€", desc: "3 concerts + carré OR", accent: true },
            { name: "Pass Masterclass", price: "90€", desc: "Pass Festival + Masterclass + scène", accent: false },
          ].map((t) => (
            <div
              key={t.name}
              className={`rounded-[20px] p-6 text-center ${
                t.accent
                  ? "bg-[var(--color-coral-light)] border-2 border-[var(--color-coral)]"
                  : "bg-white border border-[rgba(43,27,94,0.06)]"
              }`}
            >
              {t.accent && (
                <div className="text-[9px] tracking-[1px] uppercase font-bold text-[var(--color-coral)] mb-2">
                  Populaire
                </div>
              )}
              <div className="font-serif text-[28px] font-bold text-[var(--color-indigo)]">{t.price}</div>
              <div className="text-[14px] font-bold text-[var(--color-indigo)] mt-1">{t.name}</div>
              <div className="text-[12px] text-[var(--color-text-muted)] mt-1 mb-4">{t.desc}</div>
              <button className={t.accent ? "btn-coral" : "btn-teal"}>Réserver</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
