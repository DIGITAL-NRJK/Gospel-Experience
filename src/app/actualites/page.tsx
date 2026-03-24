import { client, ALL_ARTICLES_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// Revalide le contenu toutes les 60 secondes
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Actualités",
  description: "Interviews, retours sur les événements, vie de l'association GOSLYM et coulisses du gospel à Lyon.",
};

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: { asset: { _ref: string } };
  readTime?: number;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  festival: { bg: "rgba(216,90,48,0.85)", text: "Festival" },
  ecole: { bg: "rgba(29,158,117,0.85)", text: "École GEI" },
  interview: { bg: "rgba(43,27,94,0.8)", text: "Interview" },
  coulisses: { bg: "rgba(43,27,94,0.7)", text: "Coulisses" },
};

const gradients = [
  "from-[var(--color-peach)] to-[var(--color-coral-light)]",
  "from-[var(--color-teal-light)] to-[#ECFAF3]",
  "from-[var(--color-lavender-light)] to-[#F5F0FC]",
  "from-[var(--color-gold-light)] to-[var(--color-peach)]",
  "from-[var(--color-magenta-light)] to-[#F5E0EC]",
  "from-[var(--color-coral-light)] to-[var(--color-peach)]",
];

export default async function ActualitesPage() {
  const articles = await client.fetch<Article[]>(ALL_ARTICLES_QUERY);

  return (
    <>
      <Header />
      <section className="py-14">
        <div className="site-container">
          <div className="section-tag text-[var(--color-indigo)]">Blog</div>
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-1.5">Toutes les actualités</h1>
          <p className="text-[13px] text-[var(--color-text-muted)] mb-8">Interviews, retours sur les événements, vie de l&apos;association et coulisses du gospel.</p>

          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {articles.map((a, i) => {
                const cat = categoryColors[a.category] || categoryColors.coulisses;
                const date = new Date(a.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                return (
                  <div key={a._id} className="bg-white rounded-2xl overflow-hidden border border-[rgba(43,27,94,0.06)] flex cursor-pointer hover:shadow-sm transition-shadow">
                    <div className={`w-[160px] min-h-[140px] bg-gradient-to-br ${gradients[i % gradients.length]} shrink-0 relative`}>
                      {a.mainImage && (
                        <img src={urlFor(a.mainImage).width(320).height(280).url()} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <span className="absolute top-3 left-3 text-[9px] tracking-[1px] uppercase font-bold px-2.5 py-1 rounded-lg text-white" style={{ backgroundColor: cat.bg }}>{cat.text}</span>
                    </div>
                    <div className="p-5 flex flex-col justify-center">
                      <h4 className="text-[14px] font-bold text-[var(--color-indigo)] leading-snug mb-2">{a.title}</h4>
                      {a.excerpt && <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed mb-2 line-clamp-2">{a.excerpt}</p>}
                      <div className="text-[10px] text-[var(--color-text-light)]">{date}{a.readTime && ` · ${a.readTime} min`}</div>
                      <span className="text-[11px] font-bold text-[var(--color-coral)] mt-3">Lire l&apos;article →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[15px] text-[var(--color-text-muted)]">Aucun article publié pour le moment.</p>
              <p className="text-[13px] text-[var(--color-text-light)] mt-2">Les articles seront ajoutés depuis le Studio Sanity.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
