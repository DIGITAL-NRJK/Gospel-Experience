// src/app/sitemap.ts
// Sitemap généré automatiquement — accessible à /sitemap.xml

import type { MetadataRoute } from "next";
import { client, SITEMAP_ARTICLES_QUERY } from "@/lib/sanity.client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://goslym.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Pages statiques ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/festival`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ecole`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/evenements`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/actualites`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/galerie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    // Note : /festival/programme est volontairement exclu (noindex)
  ];

  // ── Articles Sanity ────────────────────────────────────────────────────────
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      SITEMAP_ARTICLES_QUERY
    );
    articlePages = articles.map((a) => ({
      url: `${BASE_URL}/actualites/${a.slug}`,
      lastModified: new Date(a._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // En cas d'erreur Sanity, on retourne quand même les pages statiques
  }

  return [...staticPages, ...articlePages];
}