import type { Metadata } from "next";
import { Playfair_Display, Fjalla_One, Nunito } from "next/font/google";
import "@/styles/globals.css";
import { client, NEXT_EVENT_QUERY } from "@/lib/sanity.client";
import CountdownBar from "@/components/CountdownBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-serif", weight: ["400", "700"] });
const fjallaOne = Fjalla_One({ subsets: ["latin"], display: "swap", variable: "--font-display", weight: "400" });
const nunito = Nunito({ subsets: ["latin"], display: "swap", variable: "--font-sans", weight: ["400", "600", "700"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://goslym.com";

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
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GOSLYM — Gospel Lyon Métropole",
  alternateName: ["Gospel Expérience Lyon", "Fourvière Gospel Expérience"],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 place de Fourvière",
    addressLocality: "Lyon",
    postalCode: "69005",
    addressCountry: "FR",
  },
  telephone: "+33788519652",
  email: "goslym69@gmail.com",
  sameAs: [
    "https://goslym.com",
    "https://www.helloasso.com/associations/gospel-lyon-metropole",
  ],
};

// ✅ Schema enrichi avec dates 2026, artistes et billetterie
const festivalSchema = {
  "@context": "https://schema.org",
  "@type": "MusicFestival",
  name: "Fourvière Gospel Expérience 2026",
  alternateName: "Festival Gospel Expérience Lyon",
  url: `${siteUrl}/festival`,
  startDate: "2026-04-23",
  endDate: "2026-04-26",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  description: "Festival biennal de gospel à Lyon. Quatre jours de concerts professionnels, Masterclasses et ateliers dans la Crypte de la Basilique de Fourvière.",
  image: `${siteUrl}/og-image.jpg`,
  location: {
    "@type": "Place",
    name: "Crypte de la Basilique Notre-Dame de Fourvière",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8 place de Fourvière",
      addressLocality: "Lyon",
      postalCode: "69005",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.7622,
      longitude: 4.8220,
    },
    maximumAttendeeCapacity: 800,
  },
  organizer: {
    "@type": "Organization",
    name: "GOSLYM — Gospel Lyon Métropole",
    url: siteUrl,
  },
  performer: [
    { "@type": "MusicGroup", name: "Gospel Academy de Lyon" },
    { "@type": "MusicGroup", name: "Grand Chœur GPE de Lyon" },
    { "@type": "MusicGroup", name: "Chorale Gospel de Paris" },
    { "@type": "MusicGroup", name: "One Step Gospel" },
  ],
  offers: {
    "@type": "Offer",
    url: "https://reservation.fourviere.org",
    availability: "https://schema.org/InStock",
    priceCurrency: "EUR",
  },
  typicalAgeRange: "Tout public",
};

// ✅ Schema École enrichi
const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Gospel Experience Institute (GEI)",
  alternateName: "École de gospel GEI Lyon",
  description: "École de gospel à Lyon : ateliers chœur mensuels au Carré Fourvière, ouverts aux jeunes (16-18 ans) et adultes tous niveaux.",
  url: `${siteUrl}/ecole`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 place de Fourvière",
    addressLocality: "Lyon",
    postalCode: "69005",
    addressCountry: "FR",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "GOSLYM — Gospel Lyon Métropole",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let nextEvent: { _id: string; title: string; eventType: string; dateStart: string; ticketUrl?: string } | null = null;
  try { nextEvent = await client.fetch(NEXT_EVENT_QUERY); } catch {}

  return (
    <html lang="fr" className={`${playfair.variable} ${fjallaOne.variable} ${nunito.variable}`}>
      <head>
        <GoogleAnalytics />
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
