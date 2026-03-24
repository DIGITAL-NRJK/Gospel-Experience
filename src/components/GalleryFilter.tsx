"use client";

import { useState } from "react";
import { urlFor } from "@/lib/sanity.image";
import Lightbox from "@/components/Lightbox";

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(items.map((i) => i.category)));
  const filtered = activeFilter === "all" ? items : items.filter((i) => i.category === activeFilter);
  const photoItems = filtered.filter((i) => i.mediaType === "photo" && i.image);
  const lightboxImages = photoItems.map((i) => ({
    src: urlFor(i.image!).width(1600).url(),
    alt: i.title,
  }));

  function handleClick(item: GalleryItem) {
    if (item.mediaType === "video" && item.videoUrl) {
      window.open(item.videoUrl, "_blank");
      return;
    }
    if (item.image) {
      const photoIndex = photoItems.findIndex((p) => p._id === item._id);
      if (photoIndex !== -1) setLightboxIndex(photoIndex);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter("all")}
          className={`text-[13px] px-4 py-2 rounded-full border cursor-pointer transition-colors ${
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
              className={`text-[13px] px-4 py-2 rounded-full border cursor-pointer transition-colors ${
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

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" style={{ gridAutoRows: "200px" }}>
          {filtered.map((g, i) => (
            <div
              key={g._id}
              onClick={() => handleClick(g)}
              className={`rounded-2xl relative flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity overflow-hidden ${
                !g.image ? `bg-gradient-to-br ${fallbackGradients[i % fallbackGradients.length]}` : ""
              }`}
              style={{ gridRow: g.featured ? "span 2" : undefined }}
            >
              {g.image && (
                <img
                  src={urlFor(g.image).width(g.featured ? 800 : 500).height(g.featured ? 720 : 400).url()}
                  alt={g.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {g.mediaType === "video" && (
                <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-indigo)"><polygon points="9,6 18,12 9,18" /></svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-4 text-[13px] text-white font-bold z-10 drop-shadow-sm">{g.title}</span>
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[1px] font-bold px-2.5 py-1 rounded bg-black/30 text-white/80 z-10">
                {categoryLabels[g.category] || g.category}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-base text-[var(--color-text-muted)]">Aucun média dans cette catégorie.</p>
        </div>
      )}

      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <Lightbox images={lightboxImages} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}
