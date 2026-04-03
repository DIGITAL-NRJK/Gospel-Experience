"use client";

import { useState, useMemo } from "react";

interface Event {
  _id: string;
  title: string;
  eventType: string[];
  dateStart: string;
  timeStart?: string;
  timeEnd?: string;
  venue: string;
  ticketUrl?: string;
  artistNames?: string;
  artists?: { _id: string; name: string }[];
  archived?: boolean;
}

const ITEMS_PER_PAGE = 8;

const filterLabels: Record<string, string> = {
  all: "Tous",
  festival: "Festival",
  concert: "Concert",
  masterclass: "Masterclass",
  "atelier-gei": "Atelier GEI",
  past: "Passés",
};

export default function EventFilter({ events, archived }: { events: Event[]; archived: Event[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);

  const now = new Date();

  const filtered = useMemo(() => {
    let list: Event[];
    if (activeFilter === "past") {
      list = [...events.filter((e) => new Date(e.dateStart) < now), ...archived];
      list.sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime());
    } else if (activeFilter === "all") {
      list = events;
    } else {
      list = events.filter((e) => {
        const types = Array.isArray(e.eventType) ? e.eventType : [e.eventType].filter(Boolean);
        return types.includes(activeFilter);
      });
    }
    return list;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, events, archived]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const filterCounts: Record<string, number> = {
    all: events.length,
    festival: events.filter((e) => e.eventType?.includes("festival")).length,
    concert: events.filter((e) => e.eventType?.includes("concert")).length,
    masterclass: events.filter((e) => e.eventType?.includes("masterclass")).length,
    "atelier-gei": events.filter((e) => e.eventType?.includes("atelier-gei")).length,
    past: events.filter((e) => new Date(e.dateStart) < now).length + archived.length,
  };

  const activeFilters = Object.entries(filterCounts).filter(([, count]) => count > 0);

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setPage(1);
  }

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {activeFilters.map(([key, count]) => (
          <button
            type="button"
            key={key}
            onClick={() => handleFilterChange(key)}
            className={activeFilter === key ? "filter-btn-active" : "filter-btn"}
          >
            {filterLabels[key] || key} ({count})
          </button>
        ))}
      </div>

      {/* Event list */}
      <div className="flex flex-col gap-3">
        {paginated.map((event) => {
          const date = new Date(event.dateStart);
          const isPast = date < now;
          const day = date.getDate().toString().padStart(2, "0");
          const month = date.toLocaleDateString("fr-FR", { month: "short" });
          const fullDate = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
          const types = Array.isArray(event.eventType) ? event.eventType : [event.eventType].filter(Boolean);
          const isFestival = types.some((t) => ["festival", "concert", "masterclass"].includes(t));
          const artistDisplay = event.artistNames || event.artists?.map((a) => a.name).join(", ");

          return (
            <div key={event._id} className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4 px-4 md:px-5 bg-white rounded-2xl border border-[rgba(30,21,53,0.06)] ${isPast ? "opacity-60" : ""}`}>
              <div className={`rounded-xl px-3.5 py-2.5 text-center min-w-[56px] ${isFestival ? "bg-[var(--color-brand-light)]" : "bg-[var(--color-gold-light)]"}`}>
                <div className={`font-serif text-xl font-bold leading-none ${isFestival ? "text-[var(--color-brand)]" : "text-[var(--color-gold-dark)]"}`}>{day}</div>
                <div className={`font-display text-[11px] tracking-[1px] uppercase ${isFestival ? "text-[var(--color-brand)]" : "text-[var(--color-gold)]"}`}>{month}</div>
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-bold text-[var(--color-brand)] mb-0.5">{event.title}</h4>
                <p className="text-[13px] text-[var(--color-text-light)]">
                  {fullDate} · {event.venue}
                  {event.timeStart && ` · ${event.timeStart}`}
                  {event.timeEnd && ` - ${event.timeEnd}`}
                </p>
                {artistDisplay && <p className="text-[13px] text-[var(--color-text-muted)] italic mt-0.5">{artistDisplay}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className={isFestival ? "tag-festival" : "tag-ecole"}>{types.join(" · ") || "Événement"}</span>
                {!isPast && event.ticketUrl && (
                  <a href={event.ticketUrl} className="font-display text-[13px] no-underline" style={{ color: isFestival ? "var(--color-brand)" : "var(--color-gold-dark)" }}>
                    Réserver →
                  </a>
                )}
                {isPast && <span className="font-display text-[12px] text-[var(--color-text-light)]">Terminé</span>}
              </div>
            </div>
          );
        })}
        {paginated.length === 0 && (
          <p className="text-[15px] text-[var(--color-text-muted)] text-center py-12">Aucun événement dans cette catégorie.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="font-display text-[13px] px-4 py-2 rounded-full border border-[rgba(30,21,53,0.08)] bg-white cursor-pointer disabled:opacity-30 disabled:cursor-default hover:border-[var(--color-brand)] transition-colors"
          >
            ← Précédent
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPage(p)}
                className={`font-display text-[13px] w-9 h-9 rounded-full border cursor-pointer transition-colors ${
                  p === page
                    ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                    : "bg-white text-[var(--color-text-muted)] border-[rgba(30,21,53,0.08)] hover:border-[var(--color-brand)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="font-display text-[13px] px-4 py-2 rounded-full border border-[rgba(30,21,53,0.08)] bg-white cursor-pointer disabled:opacity-30 disabled:cursor-default hover:border-[var(--color-brand)] transition-colors"
          >
            Suivant →
          </button>
        </div>
      )}
    </>
  );
}
