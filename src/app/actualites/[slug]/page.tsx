import { client, ARTICLE_BY_SLUG_QUERY, ALL_ARTICLE_SLUGS_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 60;

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: { asset: { _ref: string } };
  body?: { _type: string; children?: { text: string }[]; style?: string; listItem?: string }[];
  readTime?: number;
}

const categoryLabels: Record<string, string> = {
  festival: "Festival",
  ecole: "École GEI",
  interview: "Interview",
  coulisses: "Coulisses",
};

const categoryColors: Record<string, string> = {
  festival: "var(--color-coral)",
  ecole: "var(--color-teal)",
  interview: "var(--color-indigo)",
  coulisses: "var(--color-text-muted)",
};

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_ARTICLE_SLUGS_QUERY);
  return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await client.fetch<Article>(ARTICLE_BY_SLUG_QUERY, { slug });
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt || `${article.title} — Gospel Expérience Lyon`,
  };
}

function renderBody(body: Article["body"]) {
  if (!body) return null;
  return body.map((block, i) => {
    if (block._type !== "block") return null;
    const text = block.children?.map((c) => c.text).join("") || "";
    if (!text.trim()) return null;

    if (block.style === "h2") return <h2 key={i} className="font-serif text-[22px] md:text-[26px] font-bold text-[var(--color-indigo)] mt-8 mb-3">{text}</h2>;
    if (block.style === "h3") return <h3 key={i} className="font-serif text-[18px] md:text-[20px] font-bold text-[var(--color-indigo)] mt-6 mb-2">{text}</h3>;
    if (block.style === "blockquote") return <blockquote key={i} className="border-l-4 border-[var(--color-gold)] pl-5 my-5 italic text-[16px] text-[var(--color-text-muted)]">{text}</blockquote>;

    return <p key={i} className="text-[16px] text-[var(--color-text-muted)] leading-[1.8] mb-4">{text}</p>;
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await client.fetch<Article>(ARTICLE_BY_SLUG_QUERY, { slug });

  if (!article) {
    return (
      <>
        <Header />
        <div className="site-container py-20 text-center">
          <h1 className="font-serif text-[30px] font-bold text-[var(--color-indigo)] mb-3">Article introuvable</h1>
          <p className="text-[15px] text-[var(--color-text-muted)] mb-6">Cet article n&apos;existe pas ou a été supprimé.</p>
          <Link href="/actualites" className="btn-coral no-underline">Voir tous les articles</Link>
        </div>
        <Footer />
      </>
    );
  }

  const date = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
  const cat = categoryLabels[article.category] || article.category;
  const catColor = categoryColors[article.category] || "var(--color-indigo)";

  return (
    <>
      <Header />

      <article className="py-12 md:py-16">
        <div className="site-container">
          {/* Breadcrumb */}
          <nav className="text-[13px] text-[var(--color-text-light)] mb-6">
            <Link href="/" className="no-underline text-inherit hover:text-[var(--color-indigo)]">Accueil</Link>
            <span className="mx-2">›</span>
            <Link href="/actualites" className="no-underline text-inherit hover:text-[var(--color-indigo)]">Actualités</Link>
            <span className="mx-2">›</span>
            <span className="text-[var(--color-text-body)]">{article.title}</span>
          </nav>

          {/* Header */}
          <div className="max-w-[720px]">
            <span
              className="inline-block text-[11px] tracking-[1px] uppercase font-bold px-3 py-1.5 rounded-lg text-white mb-4"
              style={{ backgroundColor: catColor }}
            >
              {cat}
            </span>
            <h1 className="font-serif text-[28px] md:text-[36px] font-bold text-[var(--color-indigo)] leading-[1.15] mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-[14px] text-[var(--color-text-light)] mb-8">
              <span>{date}</span>
              {article.readTime && (
                <>
                  <span>·</span>
                  <span>{article.readTime} min de lecture</span>
                </>
              )}
            </div>
          </div>

          {/* Image */}
          {article.mainImage && (
            <div className="rounded-2xl overflow-hidden mb-8 max-w-[720px]">
              <img
                src={urlFor(article.mainImage).width(1200).height(600).url()}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Body */}
          <div className="max-w-[720px]">
            {article.excerpt && !article.body && (
              <p className="text-[16px] text-[var(--color-text-muted)] leading-[1.8]">{article.excerpt}</p>
            )}
            {renderBody(article.body)}
          </div>

          {/* Back link */}
          <div className="max-w-[720px] mt-10 pt-8 border-t border-[rgba(43,27,94,0.08)]">
            <Link href="/actualites" className="text-[14px] font-bold text-[var(--color-coral)] no-underline">
              ← Tous les articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
