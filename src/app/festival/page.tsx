import { client, FESTIVAL_EVENTS_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";

export const revalidate = 60;

// ✅ Meta description enrichie avec les dates 2026
export const metadata: Metadata = {
  title: "Festival Gospel Expérience — Fourvière, Lyon",
  description: "Festival Gospel Expérience — 23 au 26 avril 2026, Crypte de la Basilique de Fourvière, Lyon. Concerts professionnels, Masterclasses ouvertes à tous, ateliers gratuits le week-end. Réservez vos places.",
};

interface Event {
  _id: string;
  title: string;
  dateStart: string;
  dateEnd?: string;
  venue: string;
  timeStart?: string;
  timeEnd?: string;
  eventType: string[];
  ticketUrl?: string;
  artistNames?: string;
  artists?: { _id: string; name: string }[];
  soldOut?: boolean;
}

function formatEventDate(dateStart: string, dateEnd?: string) {
  const start = new Date(dateStart);
  const startDay = start.getDate();
  const startMonth = start.toLocaleDateString("fr-FR", { month: "short" });

  if (!dateEnd) {
    return { dayLabel: startDay.toString().padStart(2, "0"), monthLabel: startMonth };
  }

  const end = new Date(dateEnd);

  // Même jour — pas de plage à afficher
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  ) {
    return { dayLabel: startDay.toString().padStart(2, "0"), monthLabel: startMonth };
  }

  const endDay = end.getDate();
  const endMonth = end.toLocaleDateString("fr-FR", { month: "short" });

  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    return { dayLabel: `${startDay}–${endDay}`, monthLabel: startMonth };
  }

  return { dayLabel: `${startDay}–${endDay}`, monthLabel: `${startMonth}–${endMonth}` };
}
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
  festivalFaqs?: { question: string; answer: string }[];
  festivalHighlights?: { icon: string; value: string; label: string; sub?: string }[];
  festivalUniqueCards?: { title: string; desc: string }[];
}

// ✅ Stats enrichies avec "800 places" pour levier de rareté
const defaultVenueStats: VenueStat[] = [
  { value: "800", label: "Places — salle intime" },
  { value: "1884", label: "Construction" },
  { value: "UNESCO", label: "Patrimoine mondial" },
  { value: "Lyon 5e", label: "Localisation" },
];

export default async function FestivalPage() {
  const [events, s] = await Promise.all([
    client.fetch<Event[]>(FESTIVAL_EVENTS_QUERY),
    client.fetch<Settings>(SITE_SETTINGS_QUERY),
  ]);
  const venueStats = s?.festivalVenueStats?.length ? s.festivalVenueStats : defaultVenueStats;

  const defaultHighlights = [
    { icon: "🎵", value: "3e édition", label: "23–26 avril 2026", sub: "Festival biennal depuis 2021" },
    { icon: "🎤", value: "Concerts · Masterclasses · Ateliers", label: "4 jours de programme", sub: "Ouvert à tous niveaux" },
    { icon: "🏛️", value: "Crypte de Fourvière", label: "Lyon 5e — UNESCO", sub: "800 places · salle intime" },
    { icon: "🎶", value: "Gospel en direct", label: "Artistes professionnels", sub: "Chœurs · Solistes · Groupes" },
  ];
  const highlights = s?.festivalHighlights?.length ? s.festivalHighlights : defaultHighlights;

  const defaultUniqueCards = [
    { title: "Un lieu hors du commun", desc: "La Crypte de la Basilique de Fourvière offre une acoustique naturelle exceptionnelle et une atmosphère unique en Europe pour un festival gospel." },
    { title: "Participatif par nature", desc: "Les Masterclasses permettent à chacun — débutant ou confirmé — de chanter avec les artistes. Le gospel se transmet en direct, sur scène." },
    { title: "Ancré dans Lyon", desc: "Porté par GOSLYM et ses artistes locaux, le festival met en valeur le talent lyonnais tout en accueillant des chœurs et solistes de toute la France." },
  ];
  const uniqueCards = s?.festivalUniqueCards?.length ? s.festivalUniqueCards : defaultUniqueCards;

  // ✅ Schema FAQ JSON-LD pour rich snippets Google
  const faqs = s?.festivalFaqs?.length ? s.festivalFaqs : [
    { question: "Faut-il réserver ses places à l'avance ?", answer: "Oui, nous recommandons de réserver en ligne via notre billetterie. Les places sont limitées à 800 par la capacité de la Crypte. Certaines soirées affichent complet. Réservez sur reservation.fourviere.org." },
    { question: "Les concerts sont-ils accessibles aux personnes à mobilité réduite ?", answer: "La Crypte de Fourvière est accessible aux personnes à mobilité réduite. Un accès adapté est prévu. Contactez-nous pour toute question spécifique." },
    { question: "Puis-je participer aux Masterclass sans expérience ?", answer: "Absolument. Les Masterclass sont ouvertes à tous les niveaux, débutants comme confirmés. Les artistes encadrants s'adaptent au niveau de chaque participant. Participation possible dès 16 ans." },
    { question: "Y a-t-il un parking à proximité ?", answer: "Le parking Fourvière se trouve à proximité immédiate de la Basilique. Vous pouvez également emprunter le funiculaire (station Fourvière, ligne F2) ou le bus C20." },
    { question: "Le festival a lieu tous les ans ?", answer: "Non, le Festival Gospel Expérience est un événement biennal — il a lieu tous les deux ans. La 3e édition se tient du 23 au 26 avril 2026 à la Crypte de la Basilique de Fourvière à Lyon." },
    { question: "Où se déroule le festival ?", answer: "Le festival se déroule dans la Crypte de la Basilique Notre-Dame de Fourvière, 8 place de Fourvière, 69005 Lyon. Accessible en funiculaire (ligne F2, station Fourvière) ou en bus (ligne C20)." },
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

      {/* HERO */}
      <section className="relative min-h-[350px] md:min-h-[420px] bg-gradient-to-br from-[#3D1E10] to-[var(--color-indigo)] overflow-hidden">
        {s?.festivalHeroImage && (
          <img src={urlFor(s.festivalHeroImage).width(1600).height(800).url()} alt="Crypte de la Basilique de Fourvière — Festival Gospel Expérience Lyon" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(61,30,16,0.8)] to-[rgba(43,27,94,0.85)]" />
        <div className="site-container relative z-10 py-16 md:py-20">
          <div className="max-w-[560px]">
            <div className="font-display text-[12px] tracking-[3px] uppercase text-[var(--color-gold)] mb-3">
              {s?.festivalHeroTag || "Festival biennal · 23–26 avril 2026"}
            </div>
            {/* ✅ H1 enrichi avec localisation et année */}
            <h1 className="font-serif text-[32px] md:text-[44px] font-bold text-white leading-[1.1] mb-4">
              {s?.festivalHeroTitle || "Festival Gospel Expérience — Fourvière, Lyon"}
            </h1>
            <p className="text-[16px] text-white/65 leading-relaxed mb-3">
              {s?.festivalHeroSubtitle || "23–26 avril 2026. Quatre jours de concerts, Masterclasses et ateliers dans la Crypte de la Basilique de Fourvière — le rendez-vous du gospel à Lyon."}
            </p>
            {/* ✅ Levier de rareté visible dès le hero */}
            <p className="text-[13px] text-[var(--color-gold)] font-display mb-7">
              Salle intime de 800 places — réservez avant complet
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={s?.festivalHeroButton1?.url || "#programmation"} className="btn-coral no-underline">
                {s?.festivalHeroButton1?.text || "Réserver mes places →"}
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

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Texte principal */}
            <div>
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-5">
                {s?.festivalIntro || "Le Fourvière Gospel Expérience est un festival biennal de gospel porté par l'association GOSLYM (Gospel Lyon Métropole). Né en 2021, en pleine sortie de crise sanitaire, il a été conçu comme un moment de rassemblement et de retrouvailles autour de la musique gospel — un art qui mêle puissance vocale, spiritualité et joie communicative."}
              </p>
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-5">
                {s?.festivalIntro2 || "En 2026, le festival entre dans sa 3e édition. Quatre jours de concerts professionnels, de Masterclasses ouvertes à tous et d'ateliers gratuits le week-end investissent la Crypte de la Basilique Notre-Dame de Fourvière — un lieu d'exception inscrit au patrimoine mondial de l'UNESCO, dont l'acoustique naturelle sublime les voix gospel. Avec seulement 800 places disponibles, chaque soirée offre une proximité rare avec des artistes de premier plan venus de toute la France."}
              </p>
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8]">
                {s?.festivalIntro3 || "Au-delà du spectacle, le Fourvière Gospel Expérience se veut un festival participatif : les Masterclasses permettent à chaque amateur de chanter aux côtés des artistes invités, quel que soit son niveau. Une invitation à vivre le gospel de l'intérieur, dans l'un des cadres les plus saisissants de Lyon."}
              </p>
            </div>

            {/* Bloc chiffres clés */}
            <div className="flex flex-col gap-3">
              {highlights.map((item) => (
                <div key={item.value} className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-[rgba(43,27,94,0.06)]">
                  <span className="text-[22px] mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-display text-[13px] font-bold text-[var(--color-indigo)] leading-snug">{item.value}</div>
                    <div className="text-[13px] text-[var(--color-gold)] font-semibold">{item.label}</div>
                    <div className="text-[12px] text-[var(--color-text-light)]">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bande "Ce qui rend ce festival unique" */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {uniqueCards.map((card) => (
              <div key={card.title} className="bg-gradient-to-br from-[var(--color-brand-light)] to-[var(--color-lavender-light)] rounded-2xl p-5">
                <h3 className="font-serif text-[16px] font-bold text-[var(--color-indigo)] mb-2">{card.title}</h3>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-[1.7]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMATION */}
      <section id="programmation" className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Programmation</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-2">Édition 2026 — 23 au 26 avril</h2>
          <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed mb-6">4 jours de concerts, Masterclasses et ateliers dans la Crypte de Fourvière. <strong className="text-[var(--color-brand)]">800 places — réservation recommandée.</strong></p>
          <div className="flex flex-col gap-3">
            {events && events.length > 0 ? events.map((event) => {
              const { dayLabel, monthLabel } = formatEventDate(event.dateStart, event.dateEnd);
              const artistDisplay = event.artistNames || (event.artists?.map((a) => a.name).join(", ")) || null;
              return (
                <div key={event._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4 px-4 bg-white rounded-2xl border border-[rgba(43,27,94,0.06)]">
                  <div className="rounded-xl px-3.5 py-2.5 text-center min-w-[64px] bg-[var(--color-coral-light)]">
                    <div className="font-serif text-xl font-bold leading-none text-[var(--color-brand)]">{dayLabel}</div>
                    <div className="text-[11px] tracking-[1px] uppercase text-[var(--color-coral)]">{monthLabel}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-bold text-[var(--color-indigo)] mb-0.5">{event.title}</h4>
                    {artistDisplay && (
                      <p className="text-[13px] font-medium text-[var(--color-brand)] mb-0.5">{artistDisplay}</p>
                    )}
                    <p className="text-[13px] text-[var(--color-text-light)]">{event.venue}{event.timeStart && ` · ${event.timeStart}`}{event.timeEnd && ` - ${event.timeEnd}`}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap justify-end">
                    {event.soldOut && (
                      <span className="font-display text-[10px] tracking-[1.5px] uppercase bg-[#D93025] text-white px-2.5 py-1 rounded-full font-bold">
                        Complet
                      </span>
                    )}
                    <span className="tag-festival">{(Array.isArray(event.eventType) ? event.eventType : [event.eventType].filter(Boolean)).join(" · ") || "Concert"}</span>
                    {event.ticketUrl && (
                      event.soldOut
                        ? <span className="text-[13px] font-bold text-[var(--color-text-light)] opacity-40 cursor-not-allowed select-none">Réserver →</span>
                        : <a href={event.ticketUrl} className="text-[13px] font-bold text-[var(--color-brand)] no-underline">Réserver →</a>
                    )}
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
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">La Crypte de la Basilique de Fourvière</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[20px] overflow-hidden min-h-[260px] bg-gradient-to-br from-[var(--color-indigo)] to-[#4A2E8A]">
              {s?.festivalCrypteImage && (
                <img src={urlFor(s.festivalCrypteImage).width(800).height(520).url()} alt="Crypte de la Basilique de Fourvière — salle de concert gospel Lyon" className="w-full h-full object-cover" loading="lazy" />
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
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">La Basilique Notre-Dame de Fourvière</h2>
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
                <img src={urlFor(s.festivalBasiliqueImage).width(800).height(520).url()} alt="Basilique Notre-Dame de Fourvière — Lyon patrimoine UNESCO" className="w-full h-full object-cover" loading="lazy" />
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

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="site-container">
            <div className="section-tag text-[var(--color-gold)]">FAQ</div>
            <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-6">Questions fréquentes</h2>
            <div className="max-w-[720px]">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* ✅ CTA final — sans newsletter */}
      <div className="site-container py-10">
        <div className="bg-gradient-to-br from-[var(--color-brand-light)] to-[var(--color-lavender-light)] rounded-3xl px-6 md:px-8 py-9 text-center">
          <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-brand)] mb-2">
            {s?.festivalCtaTitle || "Réservez vos places — 800 places disponibles"}
          </h3>
          <p className="text-[15px] text-[var(--color-brand)] opacity-70 mb-5 max-w-[480px] mx-auto">
            {s?.festivalCtaDescription || "Festival Gospel Expérience · 23–26 avril 2026 · Crypte de la Basilique de Fourvière, Lyon"}
          </p>
          <a href="https://reservation.fourviere.org" target="_blank" rel="noopener noreferrer" className="btn-coral no-underline">
            Réserver sur fourviere.org →
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}