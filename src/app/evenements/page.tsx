import { client, ALL_EVENTS_QUERY, ARCHIVED_EVENTS_QUERY } from "@/lib/sanity.client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Événements",
  description: "Tous les événements du Festival Gospel Expérience et de l'École GEI à Lyon Fourvière.",
};

interface Event {
  _id: string; title: string; eventType: string[]; dateStart: string;
  timeStart?: string; timeEnd?: string; venue: string; ticketUrl?: string;
  artistNames?: string; artists?: { _id: string; name: string }[];
}

export default async function EvenementsPage() {
  const [events, archived] = await Promise.all([
    client.fetch<Event[]>(ALL_EVENTS_QUERY),
    client.fetch<Event[]>(ARCHIVED_EVENTS_QUERY),
  ]);

  const upcoming = events?.filter((e) => new Date(e.dateStart) >= new Date()) || [];
  const past = events?.filter((e) => new Date(e.dateStart) < new Date()) || [];

  const renderEvent = (event: Event) => {
    const date = new Date(event.dateStart);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleDateString("fr-FR", { month: "short" });
    const fullDate = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const types = Array.isArray(event.eventType) ? event.eventType : [event.eventType].filter(Boolean);
    const isFestival = types.some((t: string) => ["festival", "concert"].includes(t));
    const artistDisplay = event.artistNames || event.artists?.map((a) => a.name).join(", ");

    return (
      <div key={event._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4 px-4 md:px-5 bg-white rounded-2xl border border-[rgba(43,27,94,0.06)]">
        <div className={`rounded-xl px-3.5 py-2.5 text-center min-w-[56px] ${isFestival ? "bg-[var(--color-coral-light)]" : "bg-[var(--color-teal-light)]"}`}>
          <div className={`font-serif text-xl font-bold leading-none ${isFestival ? "text-[var(--color-coral-dark)]" : "text-[var(--color-teal-dark)]"}`}>{day}</div>
          <div className={`text-[11px] tracking-[1px] uppercase ${isFestival ? "text-[var(--color-coral)]" : "text-[var(--color-teal)]"}`}>{month}</div>
        </div>
        <div className="flex-1">
          <h4 className="text-[15px] font-bold text-[var(--color-indigo)] mb-0.5">{event.title}</h4>
          <p className="text-[13px] text-[var(--color-text-light)]">
            {fullDate} · {event.venue}
            {event.timeStart && ` · ${event.timeStart}`}
            {event.timeEnd && ` - ${event.timeEnd}`}
          </p>
          {artistDisplay && <p className="text-[13px] text-[var(--color-text-muted)] italic mt-0.5">{artistDisplay}</p>}
        </div>
        <div className="flex items-center gap-3">
          <span className={isFestival ? "tag-festival" : "tag-ecole"}>{types.join(" · ") || "Événement"}</span>
          {event.ticketUrl && <a href={event.ticketUrl} className="text-[13px] font-bold no-underline" style={{ color: isFestival ? "var(--color-coral-dark)" : "var(--color-teal-dark)" }}>Réserver →</a>}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <nav className="text-[13px] text-[var(--color-text-light)] mb-6">
            <Link href="/" className="no-underline text-inherit hover:text-[var(--color-indigo)]">Accueil</Link>
            <span className="mx-2">›</span>
            <span className="text-[var(--color-text-body)]">Événements</span>
          </nav>

          <div className="section-tag text-[var(--color-gold)]">Agenda</div>
          <h1 className="font-serif text-[26px] md:text-[32px] font-bold text-[var(--color-indigo)] mb-2">Tous les événements</h1>
          <p className="text-[15px] text-[var(--color-text-muted)] mb-8">Concerts, Masterclass, ateliers gospel — passés et à venir.</p>

          {/* À venir */}
          {upcoming.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-indigo)] mb-4">À venir</h2>
              <div className="flex flex-col gap-3">{upcoming.map(renderEvent)}</div>
            </div>
          )}

          {/* Passés (non archivés) */}
          {past.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-text-muted)] mb-4">Passés</h2>
              <div className="flex flex-col gap-3 opacity-70">{past.map(renderEvent)}</div>
            </div>
          )}

          {/* Archivés */}
          {archived && archived.length > 0 && (
            <div>
              <h2 className="font-serif text-[20px] font-bold text-[var(--color-text-light)] mb-4">Archives</h2>
              <div className="flex flex-col gap-3 opacity-50">{archived.map(renderEvent)}</div>
            </div>
          )}

          {upcoming.length === 0 && past.length === 0 && (!archived || archived.length === 0) && (
            <p className="text-center text-[15px] text-[var(--color-text-muted)] py-12">Aucun événement pour le moment.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
