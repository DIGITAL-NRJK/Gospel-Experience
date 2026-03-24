import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Gospel Expérience Lyon | Festival & École Gospel Fourvière",
    template: "%s | Gospel Expérience Lyon",
  },
  description:
    "Festival biennal de gospel dans la Crypte de la Basilique de Fourvière à Lyon et école de gospel GEI. Concerts, Masterclass, ateliers chœur. Association GOSLYM.",
  keywords: [
    "festival gospel Lyon",
    "concert gospel Fourvière",
    "école gospel Lyon",
    "Gospel Experience Institute",
    "GEI",
    "GOSLYM",
    "masterclass gospel",
    "chorale gospel Lyon",
    "Basilique Fourvière",
    "Gospel Philharmonic Experience",
  ],
  authors: [{ name: "GOSLYM - Gospel Lyon Métropole" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Gospel Expérience Lyon",
    title: "Gospel Expérience Lyon | Festival & École Gospel Fourvière",
    description:
      "Vivez le gospel au cœur de Lyon. Festival biennal, école de gospel GEI, concerts dans la Crypte de Fourvière.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gospel Expérience Lyon",
    description: "Festival & École de Gospel à Lyon Fourvière",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fourvieregospelexperience.com"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
