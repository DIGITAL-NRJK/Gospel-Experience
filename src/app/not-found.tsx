import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="py-20 md:py-28">
        <div className="site-container text-center">
          <div className="font-serif text-[80px] md:text-[120px] font-bold text-[var(--color-lavender)] leading-none mb-4">
            404
          </div>
          <h1 className="font-serif text-[24px] md:text-[30px] font-bold text-[var(--color-indigo)] mb-3">
            Page introuvable
          </h1>
          <p className="text-[16px] text-[var(--color-text-muted)] mb-8 max-w-[400px] mx-auto">
            La page que vous cherchez n&apos;existe pas ou a été déplacée. Pas de panique, le gospel vous attend ailleurs.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="btn-coral no-underline">Retour à l&apos;accueil</Link>
            <Link href="/contact" className="btn-outline no-underline">Nous contacter</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
