import { client, FESTIVAL_EVENTS_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Festival Gospel Expérience",
  description: "Festival biennal de gospel dans la Crypte de la Basilique de Fourvière à Lyon. Concerts professionnels, chorales régionales, Masterclass.",
};

interface Event { _id: string; title: string; dateStart: string; venue: string; timeStart?: string; timeEnd?: string; eventType: string[]; ticketUrl?: string }
interface VenueStat { value: string; label: string }
interface Settings {
  festivalHeroImage?: { asset: { _ref: string } };
  festivalHeroTag?: string;
  festivalHeroTitle?: string;
  festivalHeroSubtitle?: string;
  festivalHeroButton1?: { text: string; url: string };
  festivalHeroButton2?: { text: string; url: string };
  festivalPresentationTag?: string;
  festivalPresentationTitle?: string;
  festivalIntro?: string;
  festivalIntro2?: string;
  festivalIntro3?: string;
  festivalCrypteImage?: { asset: { _ref: string } };
  festivalCrypteText?: string;
  festivalVenueStats?: VenueStat[];
  festivalBasiliqueImage?: { asset: { _ref: string } };
  festivalBasiliqueText?: string;
  festivalBasiliqueText2?: string;
  festivalCtaTitle?: string;
  festivalCtaDescription?: string;
}

const defaultVenueStats: VenueStat[] = [
  { value: "800", label: "Places" }, { value: "1884", label: "Construction" },
  { value: "UNESCO", label: "Patrimoine" }, { value: "Lyon 5e", label: "Localisation" },
];

export default async function FestivalPage() {
  const [events, s] = await Promise.all([
    client.fetch<Event[]>(FESTIVAL_EVENTS_QUERY),
    client.fetch<Settings>(SITE_SETTINGS_QUERY),
  ]);
  const venueStats = s?.festivalVenueStats?.length ? s.festivalVenueStats : defaultVenueStats;

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[350px] md:min-h-[420px] bg-gradient-to-br from-[#3D1E10] to-[var(--color-indigo)] flex items-center overflow-hidden">
        {s?.festivalHeroImage && (
          <img src={urlFor(s.festivalHeroImage).width(1600).height(800).url()} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(61,30,16,0.8)] to-[rgba(43,27,94,0.85)]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[var(--color-coral)] opacity-[0.06] -top-[100px] -right-[50px]" />
        <div className="site-container relative z-10 py-12 md:py-16">
          <div className="max-w-[560px]">
            <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-gold)] font-bold mb-3">
              {s?.festivalHeroTag || "Festival biennal"}
            </div>
            <h1 className="font-serif text-[32px] md:text-[44px] font-bold text-white leading-[1.1] mb-4">
              {s?.festivalHeroTitle || "Fourvière Gospel Expérience"}
            </h1>
            <p className="text-[16px] text-white/65 leading-relaxed mb-7">
              {s?.festivalHeroSubtitle || "Depuis 2021, le rendez-vous incontournable du gospel à Lyon. Quatre jours de concerts, Masterclass et ateliers dans le cadre exceptionnel de la Crypte de la Basilique de Fourvière."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={s?.festivalHeroButton1?.url || "#programmation"} className="btn-coral no-underline">
                {s?.festivalHeroButton1?.text || "Voir le programme"}
              </a>
              <a href={s?.festivalHeroButton2?.url || "#lieu"} className="btn-outline-light no-underline">
                {s?.festivalHeroButton2?.text || "Découvrir le lieu"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRÉSENTATION */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-coral)]">
            {s?.festivalPresentationTag || "Le festival"}
          </div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-4">
            {s?.festivalPresentationTitle || "Une expérience unique en son genre"}
          </h2>
          <div className="max-w-[720px]">
            <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-5">
              {s?.festivalIntro || "Le Festival Gospel Expérience est un événement biennal porté par l'association GOSLYM (Gospel Lyon Métropole). Né en 2021, en pleine sortie de crise sanitaire, il a été conçu comme un moment de rassemblement et de retrouvailles autour de la musique gospel."}
            </p>
            {(s?.festivalIntro2) && (
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-5">{s.festivalIntro2}</p>
            )}
            {(s?.festivalIntro3) && (
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8]">{s.festivalIntro3}</p>
            )}
          </div>
        </div>
      </section>

      {/* PROGRAMMATION */}
      <section id="programmation" className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Programmation</div>
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
                  <div className="flex items-center gap-3">
                    <span className="tag-festival">{(Array.isArray(event.eventType) ? event.eventType : [event.eventType].filter(Boolean)).join(" · ") || "Concert"}</span>
                    {event.ticketUrl && <a href={event.ticketUrl} className="text-[13px] font-bold text-[var(--color-coral-dark)] no-underline">Réserver →</a>}
                  </div>
                </div>
              );
            }) : <p className="text-[15px] text-[var(--color-text-muted)] text-center py-8">La programmation de la prochaine édition sera annoncée prochainement.</p>}
          </div>
        </div>
      </section>

      {/* CRYPTE */}
      <section id="lieu" className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-indigo)]">Le lieu</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">La Crypte de la Basilique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[20px] overflow-hidden min-h-[260px] bg-gradient-to-br from-[var(--color-indigo)] to-[#4A2E8A]">
              {s?.festivalCrypteImage && (
                <img src={urlFor(s.festivalCrypteImage).width(800).height(520).url()} alt="Crypte de Fourvière" className="w-full h-full object-cover" />
              )}
            </div>
            <div>
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.7] mb-5">
                {s?.festivalCrypteText || "Située sous la Basilique Notre-Dame de Fourvière, la crypte offre un cadre unique avec une acoustique remarquable. Ses voûtes basses et pierres apparentes créent une atmosphère intimiste propice aux concerts gospel."}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {venueStats.map((st) => (
                  <div key={st.label} className="bg-white rounded-xl px-4 py-3 border border-[rgba(43,27,94,0.06)]">
                    <div className="font-serif text-xl font-bold text-[var(--color-indigo)]">{st.value}</div>
                    <div className="text-[12px] text-[var(--color-text-light)] uppercase tracking-[1px]">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BASILIQUE */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="site-container">
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">La Basilique de Fourvière</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.7] mb-5">
                {s?.festivalBasiliqueText || "La Basilique Notre-Dame de Fourvière, monument emblématique de Lyon classé au patrimoine mondial de l'UNESCO, domine la ville depuis la colline de Fourvière. Son esplanade offre une vue panoramique exceptionnelle sur Lyon et les Alpes."}
              </p>
              {(s?.festivalBasiliqueText2) && (
                <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">{s.festivalBasiliqueText2}</p>
              )}
            </div>
            <div className="rounded-[20px] overflow-hidden min-h-[260px] bg-gradient-to-br from-[var(--color-lavender)] to-[var(--color-lavender-light)]">
              {s?.festivalBasiliqueImage && (
                <img src={urlFor(s.festivalBasiliqueImage).width(800).height(520).url()} alt="Basilique de Fourvière" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LOCALISATION */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Accès</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Comment s&apos;y rendre</h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6">
            <div>
              <div className="bg-white rounded-[20px] p-6 border border-[rgba(43,27,94,0.06)] mb-4">
                <h4 className="font-serif text-[17px] font-bold text-[var(--color-indigo)] mb-3">Crypte de la Basilique de Fourvière</h4>
                <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7] mb-3">8 place de Fourvière<br />69005 Lyon</p>
                <div className="text-[14px] text-[var(--color-text-muted)] leading-[1.7]">
                  <p className="mb-2"><strong className="text-[var(--color-indigo)]">Funiculaire</strong> : Station Fourvière (ligne F2)</p>
                  <p className="mb-2"><strong className="text-[var(--color-indigo)]">Bus</strong> : Ligne C20, arrêt Fourvière</p>
                  <p><strong className="text-[var(--color-indigo)]">Voiture</strong> : Parking Fourvière à proximité</p>
                </div>
              </div>
            </div>
            <GoogleMap
              query="Basilique Notre-Dame de Fourvière, Lyon"
              title="Basilique de Fourvière — Lieu du festival"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="site-container py-10">
        <div className="bg-gradient-to-br from-[var(--color-coral-light)] to-[var(--color-peach)] rounded-3xl px-6 md:px-8 py-9 text-center">
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-coral-dark)] mb-2">
            {s?.festivalCtaTitle || "Ne manquez pas la prochaine édition"}
          </h3>
          <p className="text-[15px] text-[var(--color-coral-dark)] opacity-70 mb-5 max-w-[480px] mx-auto">
            {s?.festivalCtaDescription || "Inscrivez-vous à la newsletter pour être informé de l'ouverture de la billetterie et de la programmation."}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-[400px] mx-auto" suppressHydrationWarning>
            <input type="email" placeholder="votre@email.com" className="flex-1 bg-white border border-[rgba(43,27,94,0.1)] rounded-[20px] px-4 py-3 text-[14px] outline-none" suppressHydrationWarning />
            <button type="button" className="btn-coral" suppressHydrationWarning>S&apos;inscrire</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
