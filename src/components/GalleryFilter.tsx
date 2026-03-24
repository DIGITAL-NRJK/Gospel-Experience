"use client";

import { useState } from "react";
import { urlFor } from "@/lib/sanity.image";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  mediaType: "photo" | "video";
  image?: { asset: { _ref: string } };
  videoUrl?: string;
  featured: boolean;
}

const categoryLabels: Record<string, string> = {
  "edition-2024": "Édition 2024",
  "edition-2021": "Édition 2021",
  "masterclass": "Masterclass",
  "ecole-gei": "École GEI",
  "coulisses": "Coulisses",
};

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

export default function GalleryFilter({ items }: { items: GalleryItem[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Extract unique categories from items
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const filtered = activeFilter === "all" ? items : items.filter((i) => i.category === activeFilter);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter("all")}
          className={`text-[11px] px-4 py-1.5 rounded-full border cursor-pointer transition-colors ${
            activeFilter === "all"
              ? "bg-[var(--color-magenta)] text-white border-[var(--color-magenta)]"
              : "bg-white text-[var(--color-text-muted)] border-[rgba(43,27,94,0.08)] hover:border-[var(--color-magenta)]"
          }`}
        >
          Tout ({items.length})
        </button>
        {categories.map((cat) => {
          const count = items.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[11px] px-4 py-1.5 rounded-full border cursor-pointer transition-colors ${
                activeFilter === cat
                  ? "bg-[var(--color-magenta)] text-white border-[var(--color-magenta)]"
                  : "bg-white text-[var(--color-text-muted)] border-[rgba(43,27,94,0.08)] hover:border-[var(--color-magenta)]"
              }`}
            >
              {categoryLabels[cat] || cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "180px" }}>
          {filtered.map((g, i) => (
            <div
              key={g._id}
              className={`rounded-2xl relative flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity overflow-hidden ${
                !g.image ? `bg-gradient-to-br ${fallbackGradients[i % fallbackGradients.length]}` : ""
              }`}
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-indigo)">
                    <polygon points="9,6 18,12 9,18" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-4 text-[11px] text-white font-bold z-10 drop-shadow-sm">
                {g.title}
              </span>
              <span className="absolute top-3 right-3 text-[8px] uppercase tracking-[1px] font-bold px-2 py-0.5 rounded bg-black/30 text-white/80 z-10">
                {categoryLabels[g.category] || g.category}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[15px] text-[var(--color-text-muted)]">Aucun média dans cette catégorie.</p>
        </div>
      )}
    </>
  );
}
