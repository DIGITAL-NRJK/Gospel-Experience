import { client, FESTIVAL_EVENTS_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Festival Gospel Expérience",
  description: "Festival biennal de gospel dans la Crypte de la Basilique de Fourvière à Lyon.",
};

interface Event { _id: string; title: string; dateStart: string; venue: string; timeStart?: string; timeEnd?: string; eventType: string; ticketUrl?: string }
interface Tarif { name: string; price: string; description: string; popular: boolean }
interface VenueStat { value: string; label: string }
interface Settings { festivalTarifs?: Tarif[]; festivalVenue?: string; festivalVenueStats?: VenueStat[] }

const defaultTarifs: Tarif[] = [
  { name: "Concert solo", price: "15€", description: "1 concert au choix", popular: false },
  { name: "Pass Festival", price: "35€", description: "3 concerts + carré OR", popular: true },
  { name: "Pass Masterclass", price: "90€", description: "Pass Festival + Masterclass + scène", popular: false },
];
const defaultVenueStats: VenueStat[] = [
  { value: "800", label: "Places" }, { value: "1884", label: "Construction" },
  { value: "UNESCO", label: "Patrimoine" }, { value: "Lyon 5e", label: "Localisation" },
];

export default async function FestivalPage() {
  const [events, settings] = await Promise.all([
    client.fetch<Event[]>(FESTIVAL_EVENTS_QUERY),
    client.fetch<Settings>(SITE_SETTINGS_QUERY),
  ]);
  const tarifs = settings?.festivalTarifs?.length ? settings.festivalTarifs : defaultTarifs;
  const venueDesc = settings?.festivalVenue || "Située sous la Basilique Notre-Dame de Fourvière, la crypte offre un cadre unique avec une acoustique remarquable.";
  const venueStats = settings?.festivalVenueStats?.length ? settings.festivalVenueStats : defaultVenueStats;

  return (
    <>
      <Header />
      <section className="relative min-h-[350px] md:min-h-[400px] bg-gradient-to-br from-[#3D1E10] to-[var(--color-indigo)] flex items-center overflow-hidden">
        <div className="site-container relative z-10 py-12 md:py-16">
          <div className="max-w-[520px]">
            <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-gold)] font-bold mb-3">Festival biennal</div>
            <h1 className="font-serif text-[32px] md:text-[42px] font-bold text-white leading-[1.1] mb-4">
              Fourvière<br /><span className="text-[var(--color-peach-deep)]">Gospel Expérience</span>
            </h1>
            <p className="text-[16px] text-white/65 leading-relaxed mb-7">Depuis 2021, le rendez-vous incontournable du gospel dans la Crypte de la Basilique de Fourvière à Lyon.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#billetterie" className="btn-coral no-underline">Réserver ma place</a>
              <a href="#programmation" className="btn-outline border-white/40 text-white no-underline">Voir le programme</a>
            </div>
          </div>
        </div>
      </section>

      <section id="programmation" className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-coral)]">Programmation</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-2">Prochaine édition</h2>
          <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed mb-6">4 jours de concerts, Masterclass et ateliers dans la Crypte de Fourvière.</p>
          <div className="flex flex-col gap-3">
            {events && events.length > 0 ? events.map((event) => {
              const date = new Date(event.dateStart);
              const day = date.getDate().toString().padStart(2, "0");
              const month = date.toLocaleDateString("fr-FR", { month: "short" });
              return (
                <div key={event._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4 px-4 bg-white rounded-2xl border border-[rgba(43,27,94,0.06)]">
                  <div className="rounded-xl px-3.5 py-2.5 text-center min-w-[56px] bg-[var(--color-coral-light)]">
                    <div className="font-serif text-xl font-bold leading-none text-[var(--color-coral-dark)]">{day}</div>
                    <div className="text-[11px] tracking-[1px] uppercase text-[var(--color-coral)]">{month}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-bold text-[var(--color-indigo)] mb-0.5">{event.title}</h4>
                    <p className="text-[13px] text-[var(--color-text-light)]">{event.venue}{event.timeStart && ` · ${event.timeStart}`}{event.timeEnd && ` - ${event.timeEnd}`}</p>
                  </div>
                  <span className="tag-festival">{event.eventType}</span>
                </div>
              );
            }) : <p className="text-[15px] text-[var(--color-text-muted)] text-center py-8">La programmation sera annoncée prochainement.</p>}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-indigo)]">Le lieu</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Crypte de la Basilique de Fourvière</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-[var(--color-indigo)] to-[#4A2E8A] rounded-[20px] min-h-[220px]" />
            <div>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7] mb-4">{venueDesc}</p>
              <div className="grid grid-cols-2 gap-3">
                {venueStats.map((s) => (
                  <div key={s.label} className="bg-white rounded-xl px-4 py-3 border border-[rgba(43,27,94,0.06)]">
                    <div className="font-serif text-xl font-bold text-[var(--color-indigo)]">{s.value}</div>
                    <div className="text-[12px] text-[var(--color-text-light)] uppercase tracking-[1px]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="billetterie" className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Billetterie</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Tarifs & Pass</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tarifs.map(t => (
              <div key={t.name} className={`rounded-[20px] p-6 text-center ${t.popular ? "bg-[var(--color-coral-light)] border-2 border-[var(--color-coral)]" : "bg-white border border-[rgba(43,27,94,0.06)]"}`}>
                {t.popular && <div className="text-[11px] tracking-[1px] uppercase font-bold text-[var(--color-coral)] mb-2">Populaire</div>}
                <div className="font-serif text-[30px] font-bold text-[var(--color-indigo)]">{t.price}</div>
                <div className="text-base font-bold text-[var(--color-indigo)] mt-1">{t.name}</div>
                <div className="text-[14px] text-[var(--color-text-muted)] mt-1 mb-4">{t.description}</div>
                <button className={t.popular ? "btn-coral" : "btn-teal"}>Réserver</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
