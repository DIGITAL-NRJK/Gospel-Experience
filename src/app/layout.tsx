import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "@/styles/globals.css";
import { client, NEXT_EVENT_QUERY } from "@/lib/sanity.client";
import CountdownBar from "@/components/CountdownBar";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-serif", weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], display: "swap", variable: "--font-sans", weight: ["400", "600", "700"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fourvieregospelexperience.com";

export const metadata: Metadata = {
  title: { default: "Gospel Expérience Lyon | Festival & École Gospel Fourvière", template: "%s | Gospel Expérience Lyon" },
  description: "Festival biennal de gospel dans la Crypte de la Basilique de Fourvière à Lyon et école de gospel GEI. Concerts, Masterclass, ateliers chœur. Association GOSLYM.",
  keywords: ["festival gospel Lyon", "concert gospel Fourvière", "école gospel Lyon", "Gospel Experience Institute", "GEI", "GOSLYM", "masterclass gospel"],
  openGraph: { type: "website", locale: "fr_FR", url: siteUrl, siteName: "Gospel Expérience Lyon" },
  twitter: { card: "summary_large_image" },
  metadataBase: new URL(siteUrl),
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization",
  name: "GOSLYM — Gospel Lyon Métropole", alternateName: "Gospel Expérience Lyon", url: siteUrl,
  address: { "@type": "PostalAddress", streetAddress: "5 place de Fourvière", addressLocality: "Lyon", postalCode: "69005", addressCountry: "FR" },
  telephone: "+33788519652", email: "goslym69@gmail.com",
};

const festivalSchema = {
  "@context": "https://schema.org", "@type": "MusicFestival",
  name: "Festival Gospel Expérience", url: `${siteUrl}/festival`,
  location: { "@type": "Place", name: "Crypte de la Basilique de Fourvière", address: { "@type": "PostalAddress", streetAddress: "5 place de Fourvière", addressLocality: "Lyon", postalCode: "69005", addressCountry: "FR" } },
  organizer: { "@type": "Organization", name: "GOSLYM" },
};

const schoolSchema = {
  "@context": "https://schema.org", "@type": "EducationalOrganization",
  name: "Gospel Experience Institute (GEI)", url: `${siteUrl}/ecole`,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let nextEvent: { _id: string; title: string; eventType: string; dateStart: string; ticketUrl?: string } | null = null;
  try { nextEvent = await client.fetch(NEXT_EVENT_QUERY); } catch {}

  return (
    <html lang="fr" className={`${playfair.variable} ${nunito.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {nextEvent && (
          <CountdownBar
            eventTitle={nextEvent.title}
            eventType={nextEvent.eventType}
            eventDate={nextEvent.dateStart}
            ticketUrl={nextEvent.ticketUrl}
          />
        )}
        {children}
      </body>
    </html>
  );
}
