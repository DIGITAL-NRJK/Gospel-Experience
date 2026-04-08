"use client";

// Composant à placer dans : src/components/GoogleAnalyticsConditional.tsx
// Remplace GoogleAnalytics.tsx dans layout.tsx
// Charge Google Analytics uniquement si l'utilisateur a donné son consentement analytique

import { useEffect, useState } from "react";
import Script from "next/script";
import type { ConsentDetails } from "./CookieBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_DETAILS_KEY = "goslym_consent_details";

export default function GoogleAnalyticsConditional() {
  const [enabled, setEnabled] = useState(false);

  const readConsent = () => {
    try {
      const raw = localStorage.getItem(CONSENT_DETAILS_KEY);
      if (raw) {
        const details: ConsentDetails = JSON.parse(raw);
        setEnabled(details.analytics === true);
      }
    } catch {
      setEnabled(false);
    }
  };

  useEffect(() => {
    // Lecture initiale du consentement stocké
    readConsent();

    // Écoute les mises à jour en temps réel (changement depuis le bandeau)
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentDetails>).detail;
      setEnabled(detail.analytics === true);
    };
    window.addEventListener("goslym_consent_update", handler);
    return () => window.removeEventListener("goslym_consent_update", handler);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
