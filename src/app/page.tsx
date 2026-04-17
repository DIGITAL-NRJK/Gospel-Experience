import {
  client, SITE_SETTINGS_QUERY, UPCOMING_EVENTS_QUERY,
  FEATURED_TESTIMONIALS_QUERY, FEATURED_PARTNERS_QUERY,
  RECENT_ARTICLES_QUERY, RECENT_GALLERY_QUERY,
} from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FlyerSection from "@/components/FlyerSection";
import VillageGospelSection from "@/components/VillageGospelSection";
import Link from "next/link";

export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */
type S = Record<string, any>;

const categoryColors: Record<string, { bg: string; text: string }> = {
  festival: { bg: "#413485", text: "Festival" },
  ecole: { bg: "#C8A24E", text: "École GEI" },
  interview: { bg: "#6B4DAE", text: "Interview" },
  coulisses: { bg: "#8D83A5", text: "Coulisses" },
};

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

export default async function HomePage() {
  const [settings, events, testimonials, partners, articles, gallery] = await Promise.all([
    client.fetch<S>(SITE_SETTINGS_QUERY),
    client.fetch<any[]>(UPCOMING_EVENTS_QUERY),
    client.fetch<any[]>(FEATURED_TESTIMONIALS_QUERY),
    client.fetch<any[]>(FEATURED_PARTNERS_QUERY),
    client.fetch<any[]>(RECENT_ARTICLES_QUERY),
    client.fetch<any[]>(RECENT_GALLERY_QUERY),
  ]);

  const mode = settings?.siteMode || "general";
  const modeKey = mode === "festival" ? "Festival" : mode === "ecole" ? "Ecole" : "General";

  const heroTitle = settings?.[`hero${modeKey}Title`];
  const hasCustomTitle = !!heroTitle;
  // ✅ Sous-titre hero réécrit : plus court, verbes d'action, mots-clés en premier
  const heroSubtitle = settings?.[`hero${modeKey}Subtitle`] || "Chantez, ressentez, progressez. Concerts professionnels, Masterclasses et école de gospel dans l'écrin unique de la Crypte de Fourvière.";
  const heroMp4 = settings?.[`hero${modeKey}VideoFileUrl`];
  const heroYt = settings?.[`hero${modeKey}VideoUrl`];
  const heroStats = settings?.[`hero${modeKey}Stats`];
  const heroBtn1 = settings?.[`hero${modeKey}Btn1`] || { text: "Réserver ma place", url: "/festival" };
  const heroBtn2 = settings?.[`hero${modeKey}Btn2`] || { text: "Découvrir l'école", url: "/ecole" };
  const hasVideo = !!(heroMp4 || heroYt);

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[400px] md:min-h-[480px] overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        {hasVideo ? <HeroVideo mp4Url={heroMp4} youtubeUrl={heroYt} /> : <div className="absolute inset-0 bg-gradient-to-br from-[#413485] via-[#2A1F5E] to-[#0D0D0D]" />}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,20,50,0.6)] via-[rgba(30,20,50,0.75)] to-[rgba(30,20,50,0.9)]" />
        <div className="relative z-10 text-center max-w-[640px] mx-auto px-5 py-12 md:py-16">
          <span className="inline-flex items-center gap-2 font-display text-[12px] tracking-[2px] uppercase text-white/80 bg-white/10 backdrop-blur px-5 py-2 rounded-full mb-6 border border-white/10">
            {settings?.currentSeason || "Festival · 23–26 avril 2026 · Lyon Fourvière"}
          </span>
          {/* ✅ H1 garanti — fallback solide avec mots-clés locaux */}
          <h1 className="font-serif text-[34px] md:text-[48px] font-bold leading-[1.08] text-white mb-5">
            {hasCustomTitle ? heroTitle : (<>Vivez le <em className="italic text-[var(--color-peach)]">Gospel</em><br />au cœur de <span className="text-[var(--color-gold)]">Lyon</span></>)}
          </h1>
          <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed mb-8 max-w-[480px] mx-auto">
            {heroSubtitle}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={heroBtn1.url} className={`${mode === "ecole" ? "btn-teal" : "btn-coral"} no-underline`}>{heroBtn1.text}</a>
            <a href={heroBtn2.url} className="btn-outline-light no-underline">{heroBtn2.text}</a>
          </div>
          {heroYt && (
            <a href={heroYt} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-display text-[13px] text-white/80 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10 no-underline hover:bg-white/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="9,6 18,12 9,18" /></svg>
              Voir la vidéo
            </a>
          )}
          {heroStats && (
            <div className="flex gap-2 justify-center flex-wrap mt-8">
              {[
                [heroStats.spectators, "Spectateurs"],
                [heroStats.editions, "Éditions"],
                [heroStats.artists, "Artistes"],
                [heroStats.since, "Depuis"],
              ].filter(([v]) => v).map(([num, label]) => (
                <div key={label} className="bg-white/10 backdrop-blur rounded-2xl px-4 md:px-5 py-3 text-center min-w-[90px] border border-white/10">
                  <div className="font-serif text-xl md:text-2xl font-bold text-[var(--color-gold)] leading-none">{num}</div>
                  <div className="font-display text-[11px] tracking-[1px] uppercase text-white/45 mt-1">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 1. FESTIVAL & ÉCOLE — cartes blanches ===== */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          {/* Festival — carte blanche */}
          <div className="bg-white rounded-[20px] overflow-hidden border border-[rgba(30,21,53,0.06)] grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[280px] mb-6">
            <div className="px-6 md:px-10 py-10 md:py-14 flex flex-col justify-center">
              <div className="section-tag text-[var(--color-gold)]">{settings?.homeFestivalTag || "Le festival"}</div>
              <h2 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-brand)] leading-[1.15] mb-3">{settings?.homeFestivalTitle || "La Crypte de Fourvière comme vous ne l'avez jamais entendue"}</h2>
              <p className="text-[14px] md:text-[15px] text-[var(--color-text-muted)] leading-[1.65] mb-5 max-w-[440px]">{settings?.homeFestivalDescription || "Tous les deux ans, la Crypte de la Basilique se transforme en salle de concert pour accueillir le gospel. Quatre jours de concerts, Masterclasses et ateliers. 800 places — prochaine édition : 23–26 avril 2026."}</p>
              <a href={settings?.homeFestivalButton?.url || "/festival"} className="btn-coral self-start no-underline text-[13px] px-6 py-3">{settings?.homeFestivalButton?.text || "Découvrir le festival →"}</a>
            </div>
            <div className="bg-gradient-to-br from-[#413485] to-[#6B4DAE] min-h-[240px] md:min-h-0 relative overflow-hidden">
              {settings?.homeFestivalImage && <img src={urlFor(settings.homeFestivalImage).width(800).height(600).url()} alt="Festival Gospel Expérience — Crypte de la Basilique de Fourvière, Lyon" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
            </div>
          </div>
          {/* École — carte lavande */}
          <div className="bg-[var(--color-brand-light)] rounded-[20px] overflow-hidden grid grid-cols-1 md:grid-cols-[40%_60%] min-h-[260px]">
            <div className="bg-gradient-to-br from-[#413485] to-[#6B4DAE] min-h-[220px] md:min-h-0 order-2 md:order-1 relative overflow-hidden">
              {settings?.homeEcoleImage && <img src={urlFor(settings.homeEcoleImage).width(700).height(560).url()} alt="Atelier chœur gospel GEI — école de gospel à Lyon" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
            </div>
            <div className="px-6 md:px-10 py-10 md:py-14 flex flex-col justify-center order-1 md:order-2">
              <div className="section-tag text-[var(--color-gold)]">{settings?.homeEcoleTag || "L'école GEI"}</div>
              <h2 className="font-serif text-[22px] md:text-[26px] font-bold text-[var(--color-brand)] leading-[1.15] mb-3">{settings?.homeEcoleTitle || "Votre voix a sa place ici"}</h2>
              <p className="text-[14px] md:text-[15px] text-[var(--color-text-muted)] leading-[1.65] mb-5 max-w-[440px]">{settings?.homeEcoleDescription || "Un dimanche par mois, rejoignez l'atelier chœur gospel au Carré Fourvière. Jeunes dès 16 ans et adultes, tous niveaux."}</p>
              <a href={settings?.homeEcoleButton?.url || "/ecole"} className="btn-teal self-start no-underline text-[13px] px-6 py-3">{settings?.homeEcoleButton?.text || "S'inscrire à l'école →"}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 1.2. VILLAGE GOSPEL ===== */}
      <VillageGospelSection
        title={settings?.villageGospelTitle}
        text={settings?.villageGospelText}
        active={settings?.villageGospelActive ?? true}
      />

      {/* ===== 2. ÉVÉNEMENTS ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="site-container">
          <div className="flex justify-between items-end mb-5">
            <div>
              <div className="section-tag text-[var(--color-gold)]">Agenda</div>
              <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)]">Prochains événements</h2>
            </div>
            <Link href="/evenements" className="font-display text-[13px] text-[var(--color-gold)] no-underline">Voir tout →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {events?.map((event: any) => {
              const { dayLabel, monthLabel } = formatEventDate(event.dateStart, event.dateEnd);
              const types = Array.isArray(event.eventType) ? event.eventType : [event.eventType].filter(Boolean);
              const isFestival = types.some((t: string) => ["festival", "concert", "masterclass"].includes(t));
              const artistDisplay = event.artistNames || event.artists?.map((a: any) => a.name).join(", ");
              return (
                <div key={event._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4 px-4 md:px-5 bg-[var(--color-cream)] rounded-2xl border border-[rgba(30,21,53,0.06)]">
                  <div className={`rounded-xl px-3.5 py-2.5 text-center min-w-[64px] ${isFestival ? "bg-[var(--color-brand-light)]" : "bg-[var(--color-gold-light)]"}`}>
                    <div className={`font-serif text-xl font-bold leading-none ${isFestival ? "text-[var(--color-brand)]" : "text-[var(--color-gold-dark)]"}`}>{dayLabel}</div>
                    <div className={`font-display text-[11px] tracking-[1px] uppercase ${isFestival ? "text-[var(--color-brand)]" : "text-[var(--color-gold)]"}`}>{monthLabel}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-bold text-[var(--color-brand)] mb-0.5">{event.title}</h4>
                    <p className="text-[13px] text-[var(--color-text-light)]">
                      {event.venue}{event.timeStart && ` · ${event.timeStart}`}{event.timeEnd && ` - ${event.timeEnd}`}
                      {artistDisplay && <span className="block mt-0.5 text-[var(--color-text-muted)] italic">{artistDisplay}</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={isFestival ? "tag-festival" : "tag-ecole"}>{types.join(" · ") || "Événement"}</span>
                    {event.ticketUrl && <a href={event.ticketUrl} className="font-display text-[13px] no-underline" style={{ color: isFestival ? "var(--color-brand)" : "var(--color-gold-dark)" }}>Réserver →</a>}
                  </div>
                </div>
              );
            })}
            {(!events || events.length === 0) && <p className="text-[15px] text-[var(--color-text-muted)] text-center py-8">Aucun événement à venir pour le moment.</p>}
          </div>
        </div>
      </section>

      {/* ===== 3. FLYER(S) ===== */}
      {(settings?.flyerImage || settings?.festivalFlyerImage) && (() => {
        const flyers = [];

        if (settings?.festivalFlyerImage) {
          flyers.push({
            imageUrl:     urlFor(settings.festivalFlyerImage).width(560).url(),
            fullImageUrl: urlFor(settings.festivalFlyerImage).width(1600).url(),
            title:        settings.festivalFlyerTitle || "Fourvière Gospel Expérience 2026",
            description:  settings.festivalFlyerDesc  || "23 – 26 avril 2026 · Dans la Crypte de la Basilique de Fourvière · 3ème édition",
            tag:          "Festival",
            tagColor:     "var(--color-brand)",
            link:         "/festival/programme",
            linkText:     "Voir le programme →",
          });
        }

        if (settings?.flyerImage) {
          flyers.push({
            imageUrl:     urlFor(settings.flyerImage).width(560).url(),
            fullImageUrl: urlFor(settings.flyerImage).width(1600).url(),
            title:        settings.flyerTitle       || "Rejoignez l'école de gospel",
            description:  settings.flyerDescription || undefined,
            tag:          settings.flyerTagline     || "École de gospel",
            tagColor:     "var(--color-gold)",
            link:         settings.flyerButton?.url || "/ecole",
            linkText:     settings.flyerButton?.text || "S'inscrire →",
          });
        }

        return (
          <section className="py-12 md:py-16">
            <FlyerSection flyers={flyers} />
          </section>
        );
      })()}

      {/* ===== 4. ARTICLES ===== */}
      {articles && articles.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="site-container">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="section-tag text-[var(--color-gold)]">Actualités</div>
                <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)]">Derniers articles</h2>
              </div>
              <Link href="/actualites" className="font-display text-[13px] text-[var(--color-gold)] no-underline">Tous les articles →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4">
              {articles[0] && (() => {
                const a = articles[0];
                const cat = categoryColors[a.category] || categoryColors.coulisses;
                const date = new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                return (
                  <Link href={`/actualites/${a.slug.current}`} className="bg-[var(--color-cream)] rounded-2xl overflow-hidden border border-[rgba(30,21,53,0.06)] hover:shadow-sm transition-shadow no-underline">
                    <div className="h-[200px] md:h-[220px] bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-peach-light)] relative overflow-hidden">
                      {a.mainImage && <img src={urlFor(a.mainImage).width(700).height(440).url()} alt={a.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
                      <span className="font-display absolute top-3 left-3 text-[11px] tracking-[1px] uppercase px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: cat.bg }}>{cat.text}</span>
                    </div>
                    <div className="p-5 md:p-6">
                      <h4 className="text-[18px] font-bold text-[var(--color-brand)] leading-snug mb-3">{a.title}</h4>
                      <div className="text-[13px] text-[var(--color-text-light)]">{date}{a.readTime && ` · ${a.readTime} min`}</div>
                    </div>
                  </Link>
                );
              })()}
              <div className="flex flex-col gap-4">
                {articles.slice(1, 3).map((a: any) => {
                  const cat = categoryColors[a.category] || categoryColors.coulisses;
                  const date = new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                  return (
                    <Link key={a._id} href={`/actualites/${a.slug.current}`} className="bg-[var(--color-cream)] rounded-2xl p-5 border border-[rgba(30,21,53,0.06)] hover:shadow-sm transition-shadow no-underline flex-1">
                      <span className="font-display inline-block text-[10px] tracking-[1px] uppercase px-3 py-1 rounded-lg text-white mb-3" style={{ backgroundColor: cat.bg }}>{cat.text}</span>
                      <h4 className="text-[16px] font-bold text-[var(--color-brand)] leading-snug mb-2">{a.title}</h4>
                      <div className="text-[13px] text-[var(--color-text-light)]">{date}{a.readTime && ` · ${a.readTime} min`}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 5. PARTENAIRES ===== */}
      {partners && partners.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="site-container">
            <div className="section-tag text-[var(--color-gold)]">Partenaires</div>
            <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)] mb-6">Ils portent le projet avec nous</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.map((p: any) => (
                <div key={p._id} className="bg-white rounded-[20px] p-5 md:p-6 border border-[rgba(30,21,53,0.06)] flex gap-5 items-start">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shrink-0 overflow-hidden bg-[var(--color-cream)] flex items-center justify-center p-2">
                    {p.logo ? <img src={urlFor(p.logo).width(160).height(160).fit("max").url()} alt={`Logo ${p.name} — partenaire GOSLYM Gospel Lyon`} className="w-full h-full object-contain" loading="lazy" /> : <span className="font-serif text-[22px] font-bold text-[var(--color-brand)] opacity-30">{p.name[0]}</span>}
                  </div>
                  <div>
                    <h4 className="font-serif text-[17px] font-bold text-[var(--color-brand)] mb-0.5">{p.name}</h4>
                    <div className="text-[13px] text-[var(--color-text-light)] mb-2">{p.role}</div>
                    {p.description && <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{p.description}</p>}
                    {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" className="font-display text-[13px] text-[var(--color-gold)] no-underline mt-2 inline-block">Découvrir →</a>}
                  </div>
                </div>
              ))}
            </div>
            {settings?.secondarySponsors?.length > 0 && (
              <div className="mt-8 text-center">
                <div className="font-display text-[12px] tracking-[2px] uppercase text-[var(--color-text-light)] mb-3">Ils nous soutiennent également</div>
                <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                  {settings.secondarySponsors.map((sp: any) => sp.url ? <a key={sp.name} href={sp.url} target="_blank" rel="noopener noreferrer" className="text-[15px] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-brand)]">{sp.name}</a> : <span key={sp.name} className="text-[15px] text-[var(--color-text-muted)]">{sp.name}</span>)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== 6. TÉMOIGNAGES ===== */}
      {testimonials && testimonials.length > 0 && <TestimonialCarousel testimonials={testimonials} />}

      {/* ===== 7. GALERIE ===== */}
      {gallery && gallery.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="site-container">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="section-tag text-[var(--color-gold)]">Médiathèque</div>
                <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-brand)]">Photos & vidéos</h2>
              </div>
              <Link href="/galerie" className="font-display text-[13px] text-[var(--color-gold)] no-underline">Voir tout →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ gridAutoRows: "200px" }}>
              {gallery.map((g: any, i: number) => {
                const fallback = ["from-[#413485] to-[#6B4DAE]", "from-[var(--color-peach-deep)] to-[var(--color-peach)]", "from-[#C8A24E] to-[#E8C878]", "from-[var(--color-magenta)] to-[#ED93B1]", "from-[var(--color-gold-light)] to-[var(--color-peach)]"];
                return (
                  <Link key={g._id} href="/galerie" className={`rounded-2xl relative overflow-hidden hover:opacity-90 transition-opacity flex items-center justify-center no-underline ${!g.image ? `bg-gradient-to-br ${fallback[i % fallback.length]}` : ""}`} style={{ gridRow: i === 0 && g.featured ? "span 2" : undefined }}>
                    {g.image && <img src={urlFor(g.image).width(i === 0 ? 800 : 500).height(i === 0 ? 720 : 400).url()} alt={g.title || "Photo Festival Gospel Expérience Lyon"} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
                    {g.mediaType === "video" && <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="#413485"><polygon points="9,6 18,12 9,18" /></svg></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[13px] text-white font-bold z-10">{g.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== 8. CTA FESTIVAL — remplace la newsletter ===== */}
      <section className="bg-[var(--color-brand)]">
        <div className="site-container py-10 md:py-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex-1">
            <h3 className="font-serif text-[20px] md:text-[22px] font-bold text-white mb-2">
              Fourvière Gospel Expérience — 23 au 26 avril 2026
            </h3>
            <p className="text-[14px] text-white/60">
              Crypte de la Basilique de Fourvière · Lyon · 800 places — réservez avant complet
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="https://reservation.fourviere.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display bg-[var(--color-gold)] text-[var(--color-text-body)] text-[14px] px-6 py-3 rounded-[20px] inline-block no-underline hover:opacity-90 transition-opacity"
            >
              Réserver mes places →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
