import { MetadataRoute } from "next";
import { client, SITEMAP_ARTICLES_QUERY } from "@/lib/sanity.client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fourvieregospelexperience.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE_URL}/festival`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/ecole`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/evenements`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/actualites`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/galerie`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${BASE_URL}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  // Pages d'articles dynamiques (query importée depuis sanity.client)
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await client.fetch<{ slug: string; _updatedAt: string }[]>(SITEMAP_ARTICLES_QUERY);
    articlePages = (articles || []).map((article) => ({
      url: `${BASE_URL}/actualites/${article.slug}`,
      lastModified: new Date(article._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Sanity non disponible au build — les articles seront absents du sitemap
  }

  return [...staticPages, ...articlePages];
}