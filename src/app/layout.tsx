import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "600", "700"],
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
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Gospel Expérience Lyon",
    title: "Gospel Expérience Lyon | Festival & École Gospel Fourvière",
    description:
      "Vivez le gospel au cœur de Lyon. Festival biennal, école de gospel GEI, concerts dans la Crypte de Fourvière.",
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
    <html lang="fr" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
