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
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Link from "next/link";

export const revalidate = 60;

interface SiteSettings {
  siteMode: "festival" | "ecole" | "general";
  heroVideoFileUrl?: string;
  heroVideoUrl?: string;
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
interface Testimonial { _id: string; quote: string; personName: string; personRole: string; videoUrl?: string }
interface Partner { _id: string; name: string; logo?: { asset: { _ref: string } }; role: string; description?: string; website?: string }
interface Article { _id: string; title: string; slug: { current: string }; category: string; publishedAt: string; mainImage?: { asset: { _ref: string } }; readTime?: number }
interface GalleryItem { _id: string; title: string; mediaType: "photo" | "video"; image?: { asset: { _ref: string } }; featured: boolean }

const categoryColors: Record<string, { bg: string; text: string }> = {
  festival: { bg: "#D85A30", text: "Festival" },
  ecole: { bg: "#1D9E75", text: "École GEI" },
  interview: { bg: "#2B1B5E", text: "Interview" },
  coulisses: { bg: "#6B5E8A", text: "Coulisses" },
};

export default async function HomePage() {
  const [settings, events, testimonials, partners, articles, gallery] = await Promise.all([
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
    client.fetch<Event[]>(UPCOMING_EVENTS_QUERY),
    client.fetch<Testimonial[]>(FEATURED_TESTIMONIALS_QUERY),
    client.fetch<Partner[]>(FEATURED_PARTNERS_QUERY),
    client.fetch<Article[]>(RECENT_ARTICLES_QUERY),
    client.fetch<GalleryItem[]>(RECENT_GALLERY_QUERY),
  ]);

  const isEcoleMode = settings?.siteMode === "ecole";
  const ctaPrimaryText = settings?.ctaPrimary?.text || (isEcoleMode ? "S'inscrire à l'école" : "Réserver ma place");
  const ctaPrimaryUrl = settings?.ctaPrimary?.url || (isEcoleMode ? "/ecole" : "/festival#billetterie");
  const ctaSecondaryText = settings?.ctaSecondary?.text || (isEcoleMode ? "Prochain festival" : "Découvrir l'école");
  const ctaSecondaryUrl = settings?.ctaSecondary?.url || (isEcoleMode ? "/festival" : "/ecole");
  const hasHeroVideo = !!(settings?.heroVideoFileUrl || settings?.heroVideoUrl);

  return (
    <>
      <Header />

      {/* ===== HERO — original avec stats et pill ===== */}
      <section className="relative min-h-[400px] md:min-h-[480px] overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
        {hasHeroVideo ? (
          <HeroVideo mp4Url={settings?.heroVideoFileUrl} youtubeUrl={settings?.heroVideoUrl} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-indigo)] via-[#1E1432] to-[#0D0D0D]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,20,50,0.6)] via-[rgba(30,20,50,0.75)] to-[rgba(30,20,50,0.9)]" />
        <div className="relative z-10 text-center max-w-[640px] mx-auto px-5 py-12 md:py-16">
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[2px] uppercase text-white/80 bg-white/10 backdrop-blur px-5 py-2 rounded-full font-bold mb-6 border border-white/10">
            {settings?.currentSeason || "Saison 2026 – 2027"}
          </span>
          <h1 className="font-serif text-[34px] md:text-[48px] font-bold leading-[1.08] text-white mb-5">
            Vivez le <em className="italic text-[var(--color-peach-deep)] font-normal">Gospel</em><br />au cœur de Lyon
          </h1>
          <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed mb-8 max-w-[480px] mx-auto">
            {settings?.heroSubtitle || "Festival, Masterclass, École de Gospel — une expérience musicale et humaine unique dans l'écrin sacré de la Basilique de Fourvière."}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={ctaPrimaryUrl} className={`${isEcoleMode ? "btn-teal" : "btn-coral"} no-underline`}>{ctaPrimaryText}</a>
            <a href={ctaSecondaryUrl} className="btn-outline border-white/40 text-white no-underline">{ctaSecondaryText}</a>
          </div>
          {settings?.heroVideoUrl && (
            <a href={settings.heroVideoUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[13px] text-white/80 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10 no-underline cursor-pointer hover:bg-white/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="9,6 18,12 9,18" /></svg>
              Voir la vidéo
            </a>
          )}
          {settings?.stats && (
            <div className="flex gap-2 justify-center flex-wrap mt-8">
              {[
                [settings.stats.spectators, "Spectateurs"],
                [settings.stats.editions, "Éditions"],
                [settings.stats.artists, "Artistes"],
                [settings.stats.since, "Depuis"],
              ].map(([num, label]) => (
                <div key={label} className="bg-white/10 backdrop-blur rounded-2xl px-4 md:px-5 py-3 text-center min-w-[90px] border border-white/10">
                  <div className="font-serif text-xl md:text-2xl font-bold text-[var(--color-gold)] leading-none">{num}</div>
                  <div className="text-[11px] tracking-[1px] uppercase text-white/45 mt-1">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== FESTIVAL — dans site-container ===== */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[280px] rounded-[20px] overflow-hidden">
            <div className="px-6 md:px-10 py-10 md:py-14 flex flex-col justify-center">
              <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-coral)] font-bold mb-2">Le festival</div>
              <h2 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-indigo)] leading-[1.15] mb-3">
                La Crypte de Fourvière<br className="hidden md:block" /> comme vous ne l&apos;avez<br className="hidden md:block" /> jamais entendue
              </h2>
              <p className="text-[14px] md:text-[15px] text-[var(--color-text-muted)] leading-[1.65] mb-5 max-w-[440px]">
                Tous les deux ans, la Crypte de la Basilique se transforme en salle de concert pour accueillir le gospel. Quatre jours de concerts, Masterclass et ateliers.
              </p>
              <a href="/festival" className="btn-coral self-start no-underline text-[13px] px-6 py-3">Découvrir le festival →</a>
            </div>
            <div className="bg-gradient-to-br from-[var(--color-indigo)] to-[#4A2E8A] min-h-[240px] md:min-h-0 rounded-none md:rounded-r-[20px]" />
          </div>
        </div>
      </section>

      {/* ===== ÉCOLE GEI — dans site-container ===== */}
      <section className="pb-12 md:pb-16">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] min-h-[260px] rounded-[20px] overflow-hidden">
            <div className="bg-gradient-to-br from-[var(--color-teal)] to-[#5DCAA5] min-h-[220px] md:min-h-0 order-2 md:order-1 rounded-none md:rounded-l-[20px]" />
            <div className="bg-[#ECFAF3] px-6 md:px-10 py-10 md:py-14 flex flex-col justify-center order-1 md:order-2">
              <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-teal-dark)] font-bold mb-2">L&apos;école GEI</div>
              <h2 className="font-serif text-[22px] md:text-[26px] font-bold text-[var(--color-teal-dark)] leading-[1.15] mb-3">
                Votre voix a<br />sa place ici
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#1A6B4E] leading-[1.65] mb-5 max-w-[440px]">
                Un dimanche par mois, rejoignez l&apos;atelier chœur gospel au Carré Fourvière. Jeunes dès 16 ans et adultes, tous niveaux.
              </p>
              <a href="/ecole" className="btn-teal self-start no-underline text-[13px] px-6 py-3">S&apos;inscrire →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLYER — dans site-container via composant ===== */}
      {settings?.flyerImage && (
        <FlyerSection
          imageUrl={urlFor(settings.flyerImage).width(560).url()}
          fullImageUrl={urlFor(settings.flyerImage).width(1600).url()}
          title={settings.flyerTitle || "Rejoignez l'école de gospel"}
          description={settings.flyerDescription}
          link={settings.flyerLink}
        />
      )}

      {/* ===== TÉMOIGNAGES — carrousel plein écran ===== */}
      {testimonials && testimonials.length > 0 && (
        <TestimonialCarousel testimonials={testimonials} />
      )}

      {/* ===== ÉVÉNEMENTS ===== */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-gold)] font-bold mb-2">Agenda</div>
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
            {(!events || events.length === 0) && (
              <p className="text-[15px] text-[var(--color-text-muted)] text-center py-8">Aucun événement à venir pour le moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== PARTENAIRES ===== */}
      {partners && partners.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
          <div className="site-container">
            <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-gold)] font-bold mb-2">Partenaires</div>
            <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-6">Ils portent le projet avec nous</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.map((p) => (
                <div key={p._id} className="bg-white rounded-[20px] p-5 md:p-6 border border-[rgba(43,27,94,0.06)] flex gap-5 items-start">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shrink-0 overflow-hidden bg-[var(--color-cream)] flex items-center justify-center p-2">
                    {p.logo ? (
                      <img src={urlFor(p.logo).width(160).height(160).fit("max").url()} alt={p.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-serif text-[22px] font-bold text-[var(--color-indigo)] opacity-30">{p.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-[17px] font-bold text-[var(--color-indigo)] mb-0.5">{p.name}</h4>
                    <div className="text-[13px] text-[var(--color-text-light)] mb-2">{p.role}</div>
                    {p.description && <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed">{p.description}</p>}
                    {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-[var(--color-coral)] no-underline mt-2 inline-block">Découvrir →</a>}
                  </div>
                </div>
              ))}
            </div>
            {settings?.secondarySponsors && settings.secondarySponsors.length > 0 && (
              <div className="mt-8 text-center">
                <div className="text-[12px] tracking-[2px] uppercase text-[var(--color-text-light)] mb-3">Ils nous soutiennent également</div>
                <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
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
        </section>
      )}

      {/* ===== GALERIE — complète avec featured et labels ===== */}
      {gallery && gallery.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="site-container">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-magenta)] font-bold mb-2">Médiathèque</div>
                <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)]">Photos & vidéos</h2>
              </div>
              <Link href="/galerie" className="text-[13px] text-[var(--color-coral)] font-bold no-underline">Voir tout →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ gridAutoRows: "200px" }}>
              {gallery.map((g, i) => {
                const fallback = ["from-[var(--color-indigo)] to-[#4A2E8A]", "from-[var(--color-peach-deep)] to-[var(--color-peach)]", "from-[var(--color-teal)] to-[#5DCAA5]", "from-[var(--color-magenta)] to-[#ED93B1]", "from-[var(--color-gold-light)] to-[var(--color-peach)]"];
                return (
                  <Link key={g._id} href="/galerie" className={`rounded-2xl relative overflow-hidden hover:opacity-90 transition-opacity flex items-center justify-center no-underline ${!g.image ? `bg-gradient-to-br ${fallback[i % fallback.length]}` : ""}`} style={{ gridRow: i === 0 && g.featured ? "span 2" : undefined }}>
                    {g.image && <img src={urlFor(g.image).width(i === 0 ? 800 : 500).height(i === 0 ? 720 : 400).url()} alt={g.title} className="absolute inset-0 w-full h-full object-cover" />}
                    {g.mediaType === "video" && <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="#2B1B5E"><polygon points="9,6 18,12 9,18" /></svg></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[13px] text-white font-bold z-10">{g.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== ARTICLES — grille asymétrique ===== */}
      {articles && articles.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--color-cream)] to-[#FFF3E8]">
          <div className="site-container">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="text-[12px] tracking-[3px] uppercase text-[var(--color-indigo)] font-bold mb-2">Actualités</div>
                <h2 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)]">Derniers articles</h2>
              </div>
              <Link href="/actualites" className="text-[13px] text-[var(--color-coral)] font-bold no-underline">Tous les articles →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4">
              {articles[0] && (() => {
                const a = articles[0];
                const cat = categoryColors[a.category] || categoryColors.coulisses;
                const date = new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                return (
                  <Link href={`/actualites/${a.slug.current}`} className="bg-white rounded-2xl overflow-hidden border border-[rgba(43,27,94,0.06)] hover:shadow-sm transition-shadow no-underline">
                    <div className="h-[200px] md:h-[220px] bg-gradient-to-br from-[var(--color-peach)] to-[var(--color-coral-light)] relative overflow-hidden">
                      {a.mainImage && <img src={urlFor(a.mainImage).width(700).height(440).url()} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />}
                      <span className="absolute top-3 left-3 text-[11px] tracking-[1px] uppercase font-bold px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: cat.bg }}>{cat.text}</span>
                    </div>
                    <div className="p-5 md:p-6">
                      <h4 className="text-[18px] font-bold text-[var(--color-indigo)] leading-snug mb-3">{a.title}</h4>
                      <div className="text-[13px] text-[var(--color-text-light)]">{date}{a.readTime && ` · ${a.readTime} min`}</div>
                    </div>
                  </Link>
                );
              })()}
              <div className="flex flex-col gap-4">
                {articles.slice(1, 3).map((a) => {
                  const cat = categoryColors[a.category] || categoryColors.coulisses;
                  const date = new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                  return (
                    <Link key={a._id} href={`/actualites/${a.slug.current}`} className="bg-white rounded-2xl p-5 border border-[rgba(43,27,94,0.06)] hover:shadow-sm transition-shadow no-underline flex-1">
                      <span className="inline-block text-[10px] tracking-[1px] uppercase font-bold px-3 py-1 rounded-lg text-white mb-3" style={{ backgroundColor: cat.bg }}>{cat.text}</span>
                      <h4 className="text-[16px] font-bold text-[var(--color-indigo)] leading-snug mb-2">{a.title}</h4>
                      <div className="text-[13px] text-[var(--color-text-light)]">{date}{a.readTime && ` · ${a.readTime} min`}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== NEWSLETTER — bande indigo ===== */}
      <section className="bg-[var(--color-indigo)]">
        <div className="site-container py-10 md:py-12 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-serif text-[20px] md:text-[22px] font-bold text-white mb-2">Accès préventes exclusives</h3>
            <p className="text-[14px] text-white/50">Réservez vos places avant l&apos;ouverture au grand public.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <input type="email" placeholder="votre@email.com" className="bg-white/10 border border-white/15 rounded-[20px] px-5 py-3 text-[14px] text-white placeholder-white/40 min-w-[200px] outline-none" />
            <button className="bg-[var(--color-gold)] text-[var(--color-indigo)] text-[14px] font-bold px-6 py-3 rounded-[20px] border-none cursor-pointer hover:opacity-90 transition-opacity">S&apos;inscrire</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
