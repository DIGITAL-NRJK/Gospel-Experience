import { client, ALL_ARTICLES_QUERY } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleFilter from "@/components/ArticleFilter";
import Link from "next/link";
import type { Metadata } from "next";

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

export default async function ActualitesPage() {
  const articles = await client.fetch<Article[]>(ALL_ARTICLES_QUERY);

  // Prepare articles with resolved image URLs for the client component
  const preparedArticles = (articles || []).map((a) => ({
    _id: a._id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    publishedAt: a.publishedAt,
    excerpt: a.excerpt,
    mainImage: a.mainImage ? urlFor(a.mainImage).width(360).height(300).url() : undefined,
    readTime: a.readTime,
  }));

  return (
    <>
      <Header />
      <section className="py-12 md:py-16">
        <div className="site-container">
          <nav className="text-[13px] text-[var(--color-text-light)] mb-6">
            <Link href="/" className="no-underline text-inherit hover:text-[var(--color-indigo)]">Accueil</Link>
            <span className="mx-2">›</span>
            <span className="text-[var(--color-text-body)]">Actualités</span>
          </nav>

          <div className="section-tag text-[var(--color-indigo)]">Blog</div>
          <h1 className="font-serif text-[26px] md:text-[32px] font-bold text-[var(--color-indigo)] mb-2">Toutes les actualités</h1>
          <p className="text-[15px] text-[var(--color-text-muted)] mb-8">Interviews, retours sur les événements, vie de l&apos;association et coulisses du gospel.</p>

          {preparedArticles.length > 0 ? (
            <ArticleFilter articles={preparedArticles} />
          ) : (
            <div className="text-center py-16">
              <p className="text-base text-[var(--color-text-muted)]">Aucun article publié pour le moment.</p>
              <p className="text-[15px] text-[var(--color-text-light)] mt-2">Les articles seront ajoutés depuis le Studio Sanity.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
