import { client, ALL_EVENTS_QUERY, ARCHIVED_EVENTS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventFilter from "@/components/EventFilter";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Événements",
  description: "Tous les événements du Festival Gospel Expérience et de l'École GEI à Lyon Fourvière.",
};

export default async function EvenementsPage() {
  const [events, archived] = await Promise.all([
    client.fetch(ALL_EVENTS_QUERY),
    client.fetch(ARCHIVED_EVENTS_QUERY),
  ]);

  return (
    <>
      <Header />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <nav className="text-[13px] text-[var(--color-text-light)] mb-6">
            <Link href="/" className="no-underline text-inherit hover:text-[var(--color-brand)]">Accueil</Link>
            <span className="mx-2">›</span>
            <span className="text-[var(--color-text-body)]">Événements</span>
          </nav>

          <div className="section-tag text-[var(--color-gold)]">Agenda</div>
          <h1 className="font-serif text-[26px] md:text-[32px] font-bold text-[var(--color-brand)] mb-2">Tous les événements</h1>
          <p className="text-[15px] text-[var(--color-text-muted)] mb-8">Concerts, Masterclass, ateliers gospel — passés et à venir.</p>

          <EventFilter events={events || []} archived={archived || []} />
        </div>
      </section>
      <Footer />
    </>
  );
}
