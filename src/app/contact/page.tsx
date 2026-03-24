import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

// Revalide le contenu toutes les 60 secondes
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'association GOSLYM — Gospel Lyon Métropole. Billetterie, inscription école GEI, partenariats, presse.",
};

interface Settings {
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export default async function ContactPage() {
  const settings = await client.fetch<Settings>(SITE_SETTINGS_QUERY);

  const phone = settings?.contactPhone || "07 88 51 96 52";
  const email = settings?.contactEmail || "goslym69@gmail.com";
  const address = settings?.address || "Carré Fourvière\n5 place de Fourvière\n69005 Lyon";

  return (
    <>
      <Header />

      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-coral)]">Nous contacter</div>
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-6">Restons en contact</h1>

          <div className="grid grid-cols-2 gap-6">
            <ContactForm />

            <div>
              <div className="bg-[var(--color-indigo)] rounded-[20px] p-7 mb-4">
                <h3 className="font-serif text-lg font-bold text-white mb-4">Informations</h3>
                {[
                  ["Téléphone", phone],
                  ["Email", email],
                  ["Adresse", address],
                ].map(([label, value]) => (
                  <div key={label} className="mb-3.5">
                    <div className="text-[10px] tracking-[1px] uppercase text-[var(--color-gold)] font-bold mb-0.5">{label}</div>
                    <div className="text-[13px] text-white/70 whitespace-pre-line">{value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-[var(--color-lavender-light)] to-[var(--color-peach)] rounded-[20px] min-h-[180px] flex items-center justify-center">
                <span className="text-[12px] text-[var(--color-indigo)] font-bold">Carte Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
