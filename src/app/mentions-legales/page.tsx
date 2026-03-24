import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Gospel Expérience Lyon — Association GOSLYM.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <h1 className="font-serif text-[28px] md:text-[34px] font-bold text-[var(--color-indigo)] mb-8">Mentions légales</h1>
          <div className="max-w-[720px] space-y-6">
            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Éditeur du site</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Le site fourvieregospelexperience.com est édité par l&apos;association GOSLYM (Gospel Lyon Métropole), association loi 1901.
              </p>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7] mt-2">
                Adresse : Carré Fourvière, 5 place de Fourvière, 69005 Lyon<br />
                Email : goslym69@gmail.com<br />
                Téléphone : 07 88 51 96 52
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Directeur de la publication</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Le directeur de la publication est le président de l&apos;association GOSLYM.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Hébergement</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Ce site est hébergé par Netlify, Inc.<br />
                Adresse : 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis<br />
                Site web : netlify.com
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Propriété intellectuelle</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, mises en page) est protégé par le droit d&apos;auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable de l&apos;association GOSLYM.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Crédits photographiques</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Les photographies présentes sur ce site sont la propriété de l&apos;association GOSLYM ou utilisées avec l&apos;accord de leurs auteurs. Toute utilisation sans autorisation est interdite.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Liens hypertextes</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Ce site peut contenir des liens vers d&apos;autres sites. L&apos;association GOSLYM n&apos;est pas responsable du contenu de ces sites externes.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
