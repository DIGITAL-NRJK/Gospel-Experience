import { client, ALL_GALLERY_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Photos et vidéos des éditions du Festival Gospel Expérience, des Masterclass et de l'école GEI à Lyon Fourvière.",
};

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  mediaType: "photo" | "video";
  image?: { asset: { _ref: string } };
  videoUrl?: string;
  featured: boolean;
}

const fallbackGradients = [
  "from-[var(--color-indigo)] to-[#4A2E8A]",
  "from-[var(--color-peach-deep)] to-[var(--color-peach)]",
  "from-[var(--color-teal)] to-[#5DCAA5]",
  "from-[var(--color-magenta)] to-[#ED93B1]",
  "from-[var(--color-gold-light)] to-[var(--color-peach)]",
  "from-[#4A2E8A] to-[var(--color-indigo)]",
  "from-[var(--color-coral)] to-[var(--color-peach-deep)]",
  "from-[var(--color-lavender-light)] to-[#D4C4F0]",
  "from-[var(--color-teal-light)] to-[#B0E6D0]",
];

export default async function GaleriePage() {
  const items = await client.fetch<GalleryItem[]>(ALL_GALLERY_QUERY);

  return (
    <>
      <Header />
      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-magenta)]">Médiathèque</div>
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-1.5">Photos & vidéos</h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-8">Revivez les moments forts des éditions précédentes, des Masterclass et de l&apos;école GEI.</p>

          {items && items.length > 0 ? (
            <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "180px" }}>
              {items.map((g, i) => (
                <div
                  key={g._id}
                  className={`rounded-2xl relative flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity overflow-hidden ${!g.image ? `bg-gradient-to-br ${fallbackGradients[i % fallbackGradients.length]}` : ""}`}
                  style={{ gridRow: g.featured ? "span 2" : undefined }}
                >
                  {g.image && (
                    <img
                      src={urlFor(g.image).width(g.featured ? 800 : 500).height(g.featured ? 720 : 360).url()}
                      alt={g.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {g.mediaType === "video" && (
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-indigo)"><polygon points="9,6 18,12 9,18" /></svg>
                    </div>
                  )}
                  <span className="absolute bottom-3 left-4 text-[11px] text-white/90 font-bold z-10 drop-shadow-sm">{g.title}</span>
                  {g.image && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[15px] text-[var(--color-text-muted)]">La galerie est en cours de préparation.</p>
              <p className="text-[13px] text-[var(--color-text-light)] mt-2">Les photos et vidéos seront ajoutées depuis le Studio Sanity.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
