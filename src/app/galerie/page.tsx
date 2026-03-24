import { client, ALL_GALLERY_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryFilter from "@/components/GalleryFilter";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galerie",
  description: "Photos et vidéos des éditions du Festival Gospel Expérience, des Masterclass et de l'école GEI à Lyon Fourvière.",
};

export default async function GaleriePage() {
  const items = await client.fetch(ALL_GALLERY_QUERY);

  return (
    <>
      <Header />
      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-magenta)]">Médiathèque</div>
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-1.5">Photos & vidéos</h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-8">Revivez les moments forts des éditions précédentes, des Masterclass et de l&apos;école GEI.</p>

          {items && items.length > 0 ? (
            <GalleryFilter items={items} />
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
