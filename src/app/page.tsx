import {
  client,
  SITE_SETTINGS_QUERY,
  UPCOMING_EVENTS_QUERY,
  FEATURED_TESTIMONIALS_QUERY,
  FEATURED_PARTNERS_QUERY,
  RECENT_ARTICLES_QUERY,
  RECENT_GALLERY_QUERY,
} from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import FlyerSection from "@/components/FlyerSection";

export const revalidate = 60;

interface SiteSettings {
  siteMode: "festival" | "académie" | "general";
  heroVideoFileUrl?: string;
  heroVideoUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  currentSeason: string;
  stats: { spectators: string; editions: string; artists: string; since: string };
  ctaPrimary?: { text: string; url: string };
  ctaSecondary?: { text: string; url: string };
  flyerImage?: { asset: { _ref: string } };
  flyerTitle?: string;
  flyerDescription?: string;
  flyerLink?: string;
  secondarySponsors?: { name: string; url?: string }[];
}

interface Event { _id: string; title: string; eventType: string; dateStart: string; timeStart?: string; timeEnd?: string; venue: string; ticketUrl?: string }
interface Testimonial { _id: string; quote: string; personName: string; personRole: string }
interface Partner { _id: string; name: string; logo?: { asset: { _ref: string } }; role: string; description?: string; website?: string }
interface Article { _id: string; title: string; slug: { current: string }; category: string; publishedAt: string; mainImage?: { asset: { _ref: string } }; readTime?: number }
interface GalleryItem { _id: string; title: string; mediaType: "photo" | "video"; image?: { asset: { _ref: string } }; featured: boolean }

const categoryColors: Record<string, { bg: string; text: string }> = {
  festival: { bg: "var(--color-coral)", text: "Festival" },
  ecole: { bg: "var(--color-teal)", text: "École GEI" },
  interview: { bg: "var(--color-indigo)", text: "Interview" },
  coulisses: { bg: "var(--color-text-muted)", text: "Coulisses" },
};
const gradients = [
  "from-[var(--color-peach)] to-[var(--color-coral-light)]",
  "from-[var(--color-teal-light)] to-[#ECFAF3]",
  "from-[var(--color-lavender-light)] to-[#F5F0FC]",
];

export default async function HomePage() {
  const [settings, events, testimonials, partners, articles, gallery] = await Promise.all([
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
    client.fetch<Event[]>(UPCOMING_EVENTS_QUERY),
    client.fetch<Testimonial[]>(FEATURED_TESTIMONIALS_QUERY),
    client.fetch<Partner[]>(FEATURED_PARTNERS_QUERY),
    client.fetch<Article[]>(RECENT_ARTICLES_QUERY),
    client.fetch<GalleryItem[]>(RECENT_GALLERY_QUERY),
  ]);

  const isEcoleMode = settings?.siteMode === "académie";
  const ctaPrimaryText = settings?.ctaPrimary?.text || (isEcoleMode ? "S'inscrire à la GEI" : "Réserver ma place");
  const ctaPrimaryUrl = settings?.ctaPrimary?.url || (isEcoleMode ? "/ecole" : "/festival#billetterie");
  const ctaSecondaryText = settings?.ctaSecondary?.text || (isEcoleMode ? "Prochain festival" : "Découvrir la GEI");
  const ctaSecondaryUrl = settings?.ctaSecondary?.url || (isEcoleMode ? "/festival" : "/ecole");
  const hasHeroVideo = !!(settings?.heroVideoFileUrl || settings?.heroVideoUrl);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[400px] md:min-h-[480px] overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        {hasHeroVideo ? (
          <HeroVideo mp4Url={settings?.heroVideoFileUrl} youtubeUrl={settings?.heroVideoUrl} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-indigo)] via-[#1E1432] to-[#0D0D0D]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,20,50,0.6)] via-[rgba(30,20,50,0.75)] to-[rgba(30,20,50,0.9)]" />
        <div className="relative z-10 text-center max-w-[640px] mx-auto px-5 py-12 md:py-16">
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[2px] uppercase text-white bg-white/10 backdrop-blur px-5 py-2 rounded-full font-bold mb-5 border border-white/10">
            {settings?.currentSeason || "Saison 2026 – 2027"}
          </span>
          <h1 className="font-serif text-[34px] md:text-[48px] font-bold leading-[1.1] text-white mb-4">
            Vivez le <em className="italic text-[var(--color-peach-deep)] font-normal">Gospel</em><br />au cœur de Lyon
          </h1>
          <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed mb-7">
            {settings?.heroSubtitle || "Festival, Masterclass, École de Gospel — une expérience musicale et humaine unique dans l'écrin sacré de la Basilique de Fourvière."}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={ctaPrimaryUrl} className={`${isEcoleMode ? "btn-teal" : "btn-coral"} no-underline`}>{ctaPrimaryText}</a>
            <a href={ctaSecondaryUrl} className="btn-outline no-underline">{ctaSecondaryText}</a>
          </div>
          {settings?.heroVideoUrl && (
            <a href={settings.heroVideoUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[13px] text-white/80 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10 no-underline cursor-pointer hover:bg-white/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="9,6 18,12 9,18" /></svg>
              Voir la vidéo
            </a>
          )}
          {settings?.stats && (
            <div className="flex gap-2 justify-center flex-wrap mt-8">
              {[[settings.stats.spectators, "Spectateurs"], [settings.stats.editions, "Éditions"], [settings.stats.artists, "Artistes"], [settings.stats.since, "Depuis"]].map(([num, label]) => (
                <div key={label} className="bg-white/10 backdrop-blur rounded-2xl px-4 md:px-5 py-3 text-center min-w-[90px] border border-white/10">
                  <div className="font-serif text-xl md:text-2xl font-bold text-[var(--color-gold)] leading-none">{num}</div>
                  <div className="text-[11px] tracking-[1px] uppercase text-white/45 mt-1">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DEUX PÔLES */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="section-tag text-[var(--color-coral)]">Nos deux pôles</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-2">Un écosystème gospel unique</h2>
          <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed max-w-[520px]">GOSLYM porte deux projets complémentaires : le festival biennal et l&apos;académie de gospel pour former les talents de demain.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#FFF0E6] via-[var(--color-coral-light)] to-[var(--color-peach)] rounded-[20px] p-6 md:p-7 border border-[rgba(216,90,48,0.12)] min-h-[200px] flex flex-col justify-end">
              <div className="text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-coral-dark)] mb-2">Festival</div>
              <h3 className="font-serif text-[22px] md:text-[24px] font-bold text-[var(--color-coral-dark)] mb-2">Le Fourvière Gospel Expérience</h3>
              <p className="text-[14px] text-[#8A5030] leading-relaxed mb-4">Le rendez-vous biennal du gospel dans la Crypte de Fourvière. Concerts, chorales et Masterclass.</p>
              <a className="btn-coral self-start text-[13px] px-5 py-2.5 no-underline" href="/festival">Découvrir →</a>
            </div>
            <div className="bg-gradient-to-br from-[#ECFAF3] via-[var(--color-teal-light)] to-[#B0E6D0] rounded-[20px] p-6 md:p-7 border border-[rgba(29,158,117,0.12)] min-h-[200px] flex flex-col justify-end">
              <div className="text-[11px] tracking-[2px] uppercase font-bold text-[var(--color-teal-dark)] mb-2">Académie</div>
              <h3 className="font-serif text-[22px] md:text-[24px] font-bold text-[var(--color-teal-dark)] mb-2">Le Gospel Experience Institute </h3>
              <p className="text-[14px] text-[#1A6B4E] leading-relaxed mb-4">Ateliers chœur gospel un dimanche par mois avec Hazaële. Formation et valeurs humaines.</p>
              <a className="btn-teal self-start text-[13px] px-5 py-2.5 no-underline" href="/ecole">Découvrir →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FLYER */}
      {settings?.flyerImage && (
        <FlyerSection
          imageUrl={urlFor(settings.flyerImage).width(560).url()}
          fullImageUrl={urlFor(settings.flyerImage).width(1600).url()}
          title={settings.flyerTitle || "Rejoignez le Gospel Experience Institute"}
          description={settings.flyerDescription}
          link={settings.flyerLink}
        />
      )}

      {/* ÉDITIONS */}
      <div className="site-container">
        <div className="bg-[var(--color-indigo)] rounded-3xl py-8 md:py-10 px-5 md:px-8">
          <div className="section-tag text-[var(--color-gold)]">Rétrospective</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-white mb-5">Les éditions précédentes du FGE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { year: "2021", label: "1ère Édition — La Genèse", sub: "Née après la pandémie pour restaurer le lien social par la musique.", stats: [["1 500", "Spectateurs"], ["4", "Concerts"], ["2", "Jours"]], color: "var(--color-peach-deep)" },
              { year: "2024", label: "2e Édition — La Confirmation", sub: "4 jours avec le Gospel Philharmonic Experience et un quatuor à cordes.", stats: [["2 000+", "Spectateurs"], ["5", "Concerts"], ["4", "Jours"]], color: "var(--color-lavender)" },
            ].map(e => (
              <div key={e.year} className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-5">
                <div className="font-serif text-[30px] font-bold mb-1" style={{ color: e.color }}>{e.year}</div>
                <div className="text-base font-bold text-white mb-1">{e.label}</div>
                <div className="text-[13px] text-white/50 leading-relaxed mb-3">{e.sub}</div>
                <div className="flex gap-5">
                  {e.stats.map(([n, l]) => (
                    <div key={l} className="text-center">
                      <div className="font-serif text-lg font-bold text-[var(--color-gold)]">{n}</div>
                      <div className="text-[11px] tracking-[1px] uppercase text-white/40">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ÉVÉNEMENTS */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
        <div className="site-container">
          <div className="section-tag text-[var(--color-gold)]">Agenda</div>
          <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Prochains événements</h2>
          <div className="flex flex-col gap-3">
            {events?.map((event) => {
              const date = new Date(event.dateStart);
              const day = date.getDate().toString().padStart(2, "0");
              const month = date.toLocaleDateString("fr-FR", { month: "short" });
              const isFestival = event.eventType === "festival" || event.eventType === "concert";
              return (
                <div key={event._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4 px-4 md:px-5 bg-white rounded-2xl border border-[rgba(43,27,94,0.06)]">
                  <div className={`rounded-xl px-3.5 py-2.5 text-center min-w-[56px] ${isFestival ? "bg-[var(--color-coral-light)]" : "bg-[var(--color-teal-light)]"}`}>
                    <div className={`font-serif text-xl font-bold leading-none ${isFestival ? "text-[var(--color-coral-dark)]" : "text-[var(--color-teal-dark)]"}`}>{day}</div>
                    <div className={`text-[11px] tracking-[1px] uppercase ${isFestival ? "text-[var(--color-coral)]" : "text-[var(--color-teal)]"}`}>{month}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-bold text-[var(--color-indigo)] mb-0.5">{event.title}</h4>
                    <p className="text-[13px] text-[var(--color-text-light)]">{event.venue}{event.timeStart && ` · ${event.timeStart}`}{event.timeEnd && ` - ${event.timeEnd}`}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={isFestival ? "tag-festival" : "tag-ecole"}>{isFestival ? "Festival" : "École GEI"}</span>
                    {event.ticketUrl && <a href={event.ticketUrl} className="text-[13px] font-bold no-underline" style={{ color: isFestival ? "var(--color-coral-dark)" : "var(--color-teal-dark)" }}>Réserver →</a>}
                  </div>
                </div>
              );
            })}
            {(!events || events.length === 0) && <p className="text-[15px] text-[var(--color-text-muted)] text-center py-8">Aucun événement à venir pour le moment.</p>}
          </div>
        </div>
      </section>
      
      {/* ARTICLES PREVIEW */}
      {articles && articles.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
          <div className="site-container">
            <div className="flex justify-between items-end mb-5">
              <div>
                <div className="section-tag text-[var(--color-indigo)]">Actualités</div>
                <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)]">Derniers articles</h2>
              </div>
              <a href="/actualites" className="text-[13px] text-[var(--color-coral)] font-bold no-underline">Tous les articles →</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((a, i) => {
                const cat = categoryColors[a.category] || categoryColors.coulisses;
                const date = new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                return (
                  <div key={a._id} className="bg-white rounded-2xl overflow-hidden border border-[rgba(43,27,94,0.06)] cursor-pointer hover:shadow-sm transition-shadow">
                    <div className={`h-[160px] bg-gradient-to-br ${gradients[i % gradients.length]} relative overflow-hidden`}>
                      {a.mainImage && <img src={urlFor(a.mainImage).width(500).height(320).url()} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />}
                      <span className="absolute top-3 left-3 text-[11px] tracking-[1px] uppercase font-bold px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: cat.bg }}>{cat.text}</span>
                    </div>
                    <div className="p-5">
                      <h4 className="text-[16px] font-bold text-[var(--color-indigo)] leading-snug mb-2">{a.title}</h4>
                      <div className="text-[13px] text-[var(--color-text-light)]">{date}{a.readTime && ` · ${a.readTime} min`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TÉMOIGNAGES */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="site-container">
            <div className="section-tag text-[var(--color-magenta)]">Témoignages</div>
            <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Ils ont vécu l&apos;expérience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((t, i) => {
                const bgs = ["white", "var(--color-coral-light)", "var(--color-teal-light)"];
                return (
                  <div key={t._id} className="rounded-[20px] p-5 md:p-6 border border-[rgba(43,27,94,0.06)]" style={{ backgroundColor: bgs[i % 3] }}>
                    <div className="text-[24px] text-[var(--color-gold)] font-serif mb-2">«</div>
                    <p className="text-[15px] text-[var(--color-text-body)] leading-relaxed italic mb-4">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-lavender-light)] flex items-center justify-center font-bold text-[14px] text-[var(--color-indigo)]">{t.personName[0]}</div>
                      <div>
                        <div className="text-[14px] font-bold text-[var(--color-indigo)]">{t.personName}</div>
                        <div className="text-[12px] text-[var(--color-text-light)]">{t.personRole}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PARTENAIRES PHARES — nouveau design avec logos */}
      {partners && partners.length > 0 && (
        <div className="site-container pb-4">
          <div className="bg-gradient-to-br from-[#FFF3E8] to-[var(--color-cream)] rounded-3xl py-8 md:py-10 px-5 md:px-8">
            <div className="section-tag text-[var(--color-gold)]">Partenaires phares</div>
            <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-5">Ils portent le projet avec nous</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.map((p) => (
                <div key={p._id} className="bg-white rounded-[20px] p-5 md:p-6 border border-[rgba(43,27,94,0.06)] flex gap-5 items-start">
                  {/* Logo — rectangle adaptatif, pas un cercle */}
                  <div className="w-20 h-20 rounded-2xl shrink-0 overflow-hidden bg-[var(--color-cream)] flex items-center justify-center p-2">
                    {p.logo ? (
                      <img src={urlFor(p.logo).width(160).height(160).fit("max").url()} alt={p.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-serif text-[20px] font-bold text-[var(--color-indigo)] opacity-30">{p.name[0]}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-[17px] font-bold text-[var(--color-indigo)] mb-0.5">{p.name}</h4>
                    <div className="text-[13px] text-[var(--color-text-light)] mb-2">{p.role}</div>
                    {p.description && <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{p.description}</p>}
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-[var(--color-coral)] no-underline mt-2 inline-block">
                        Découvrir →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {settings?.secondarySponsors && settings.secondarySponsors.length > 0 && (
              <div className="mt-8 text-center">
                <div className="text-[12px] tracking-[2px] uppercase text-[var(--color-text-light)] mb-3">Ils nous soutiennent également</div>
                <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
                  {settings.secondarySponsors.map((s) => (
                    s.url ? (
                      <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[15px] text-[var(--color-text-muted)] no-underline hover:text-[var(--color-indigo)] transition-colors">{s.name}</a>
                    ) : (
                      <span key={s.name} className="text-[15px] text-[var(--color-text-muted)]">{s.name}</span>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GALERIE PREVIEW */}
      {gallery && gallery.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="site-container">
            <div className="flex justify-between items-end mb-5">
              <div>
                <div className="section-tag text-[var(--color-magenta)]">Médiathèque</div>
                <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)]">Photos & vidéos</h2>
              </div>
              <a href="/galerie" className="text-[13px] text-[var(--color-coral)] font-bold no-underline">Voir tout →</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" style={{ gridAutoRows: "200px" }}>
              {gallery.map((g, i) => {
                const fallback = ["from-[var(--color-indigo)] to-[#4A2E8A]", "from-[var(--color-peach-deep)] to-[var(--color-peach)]", "from-[var(--color-teal)] to-[#5DCAA5]", "from-[var(--color-magenta)] to-[#ED93B1]", "from-[var(--color-gold-light)] to-[var(--color-peach)]"];
                return (
                  <div key={g._id} className={`rounded-2xl relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center ${!g.image ? `bg-gradient-to-br ${fallback[i % fallback.length]}` : ""}`} style={{ gridRow: g.featured ? "span 2" : undefined }}>
                    {g.image && <img src={urlFor(g.image).width(g.featured ? 800 : 500).height(g.featured ? 720 : 400).url()} alt={g.title} className="absolute inset-0 w-full h-full object-cover" />}
                    {g.mediaType === "video" && <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-indigo)"><polygon points="9,6 18,12 9,18" /></svg></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[13px] text-white font-bold z-10">{g.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}



      {/* NEWSLETTER */}
      <div className="site-container py-10">
        <div className="p-5 md:p-7 bg-white rounded-[20px] border border-[rgba(43,27,94,0.06)] flex flex-col md:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-lavender)] shrink-0 hidden md:block" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-serif text-[18px] font-bold text-[var(--color-indigo)] mb-1">Accès préventes exclusives</h3>
            <p className="text-[14px] text-[var(--color-text-muted)]">Rejoignez la communauté et réservez vos places avant l&apos;ouverture au grand public.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
            <input type="email" placeholder="votre@email.com" className="bg-[var(--color-cream)] border border-[rgba(43,27,94,0.1)] rounded-[20px] px-4 py-3 text-[14px] text-[var(--color-text-body)] min-w-[180px] outline-none" />
            <button className="bg-[var(--color-indigo)] text-white text-[13px] font-bold px-5 py-3 rounded-[20px] border-none cursor-pointer">S&apos;inscrire</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
