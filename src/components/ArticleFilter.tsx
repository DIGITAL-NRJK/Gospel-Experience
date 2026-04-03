"use client";

import { useState } from "react";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: string;
  readTime?: number;
}

const categoryLabels: Record<string, string> = {
  festival: "Festival",
  ecole: "École GEI",
  interview: "Interview",
  coulisses: "Coulisses",
};

const categoryColors: Record<string, string> = {
  festival: "#413485",
  ecole: "#C8A24E",
  interview: "#6B4DAE",
  coulisses: "#8D83A5",
};

const gradients = [
  "from-[var(--color-peach)] to-[var(--color-peach-light)]",
  "from-[var(--color-gold-light)] to-[var(--color-peach-light)]",
  "from-[var(--color-lavender-light)] to-[#F5F0FC]",
  "from-[var(--color-brand-light)] to-[var(--color-lavender-light)]",
  "from-[var(--color-peach-light)] to-[var(--color-gold-light)]",
  "from-[var(--color-lavender-light)] to-[var(--color-peach-light)]",
];

export default function ArticleFilter({ articles }: { articles: Article[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const filtered = activeFilter === "all" ? articles : articles.filter((a) => a.category === activeFilter);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={activeFilter === "all" ? "filter-btn-active" : "filter-btn"}
        >
          Tout ({articles.length})
        </button>
        {categories.map((cat) => {
          const count = articles.filter((a) => a.category === cat).length;
          return (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={activeFilter === cat ? "filter-btn-active" : "filter-btn"}
            >
              {categoryLabels[cat] || cat} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a, i) => {
            const catColor = categoryColors[a.category] || categoryColors.coulisses;
            const catLabel = categoryLabels[a.category] || a.category;
            const date = new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
            return (
              <Link
                key={a._id}
                href={`/actualites/${a.slug.current}`}
                className="bg-white rounded-2xl overflow-hidden border border-[rgba(30,21,53,0.06)] flex flex-col sm:flex-row cursor-pointer hover:shadow-sm transition-shadow no-underline"
              >
                <div className={`w-full sm:w-[180px] h-[160px] sm:h-auto bg-gradient-to-br ${gradients[i % gradients.length]} shrink-0 relative`}>
                  {a.mainImage && <img src={a.mainImage} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />}
                  <span className="font-display absolute top-3 left-3 text-[11px] tracking-[1px] uppercase px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: catColor }}>{catLabel}</span>
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <h4 className="text-base font-bold text-[var(--color-brand)] leading-snug mb-2">{a.title}</h4>
                  {a.excerpt && <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed mb-2 line-clamp-2">{a.excerpt}</p>}
                  <div className="text-[13px] text-[var(--color-text-light)]">{date}{a.readTime && ` · ${a.readTime} min`}</div>
                  <span className="font-display text-[13px] text-[var(--color-gold)] mt-3">Lire l&apos;article →</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-base text-[var(--color-text-muted)]">Aucun article dans cette catégorie.</p>
        </div>
      )}
    </>
  );
}
