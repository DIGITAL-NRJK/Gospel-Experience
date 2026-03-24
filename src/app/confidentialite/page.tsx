import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles — Association GOSLYM.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <Header />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <h1 className="font-serif text-[28px] md:text-[34px] font-bold text-[var(--color-indigo)] mb-8">Politique de confidentialité</h1>
          <div className="max-w-[720px] space-y-6">
            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Collecte des données personnelles</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                L&apos;association GOSLYM collecte des données personnelles uniquement via le formulaire de contact du site et, le cas échéant, via le formulaire d&apos;inscription à la newsletter. Les données collectées sont : nom, prénom, adresse email, et le contenu du message.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Finalité du traitement</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Les données collectées sont utilisées exclusivement pour répondre aux demandes de contact, gérer les inscriptions aux événements et envoyer des informations relatives aux activités de l&apos;association (newsletter, préventes, actualités).
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Base légale</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Le traitement des données repose sur le consentement de la personne concernée (article 6.1.a du RGPD) lors de l&apos;envoi du formulaire de contact ou de l&apos;inscription à la newsletter.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Durée de conservation</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Les données de contact sont conservées pendant la durée nécessaire au traitement de la demande, et au maximum 3 ans après le dernier contact. Les données de newsletter sont conservées jusqu&apos;à désinscription.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Droits des personnes</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression, de limitation et de portabilité de vos données personnelles. Vous pouvez exercer ces droits en écrivant à goslym69@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Cookies</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Ce site n&apos;utilise pas de cookies publicitaires ni de trackers tiers. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Sous-traitants</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Les services suivants sont utilisés pour le fonctionnement du site : Netlify (hébergement), Sanity (gestion de contenu), Resend (envoi d&apos;emails). Ces prestataires sont conformes au RGPD.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-2">Contact</h2>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">
                Pour toute question relative à la protection de vos données personnelles, contactez-nous à goslym69@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
