// app/robots.ts
// Fichier robots.txt dynamique Next.js
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://goslym.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Bloquer les routes internes Next.js et Sanity Studio
        disallow: [
          "/studio/",   // Sanity Studio (si monté sur /studio)
          "/api/",      // Routes API internes
          "/_next/",    // Assets Next.js
        ],
      },
      {
        // Bloquer les crawlers IA d'OpenAI (facultatif — à adapter selon vos préférences)
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
