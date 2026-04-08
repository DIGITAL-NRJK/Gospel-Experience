"use client";

// Composant à placer dans : src/components/CookieBanner.tsx
// Conforme aux recommandations CNIL 2024 :
// - Refus aussi accessible que l'acceptation
// - Pas de case pré-cochée
// - Retrait du consentement possible à tout moment
// - Durée de validité : 13 mois (géré côté stockage)

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "goslym_consent";
const CONSENT_DETAILS_KEY = "goslym_consent_details";
const CONSENT_DATE_KEY = "goslym_consent_date";
const CONSENT_MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000; // 13 mois

export type ConsentDetails = { analytics: boolean };

function getStoredConsent(): ConsentDetails | null {
  try {
    const date = localStorage.getItem(CONSENT_DATE_KEY);
    if (date && Date.now() - Number(date) > CONSENT_MAX_AGE_MS) {
      // Consentement expiré — on réinitialise
      localStorage.removeItem(CONSENT_KEY);
      localStorage.removeItem(CONSENT_DETAILS_KEY);
      localStorage.removeItem(CONSENT_DATE_KEY);
      return null;
    }
    const raw = localStorage.getItem(CONSENT_DETAILS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function dispatchConsentUpdate(details: ConsentDetails) {
  window.dispatchEvent(new CustomEvent("goslym_consent_update", { detail: details }));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Léger délai pour éviter le flash au chargement
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    } else {
      dispatchConsentUpdate(stored);
    }
  }, []);

  const save = (details: ConsentDetails) => {
    localStorage.setItem(CONSENT_KEY, "done");
    localStorage.setItem(CONSENT_DETAILS_KEY, JSON.stringify(details));
    localStorage.setItem(CONSENT_DATE_KEY, String(Date.now()));
    dispatchConsentUpdate(details);
    setVisible(false);
    setShowPanel(false);
  };

  const acceptAll  = () => save({ analytics: true });
  const refuseAll  = () => save({ analytics: false });
  const saveCustom = () => save({ analytics });

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
    >
      {/* Overlay mobile */}
      <div className="absolute inset-0 bg-black/20 md:hidden" onClick={refuseAll} />

      <div className="relative max-w-[720px] mx-auto bg-white rounded-2xl shadow-2xl border border-[rgba(43,27,94,0.08)] overflow-hidden">

        {/* Bandeau principal */}
        {!showPanel && (
          <div className="p-6 md:p-7">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-[22px] mt-0.5" aria-hidden="true">🍪</span>
              <div>
                <h2 className="font-serif text-[17px] font-bold text-[var(--color-indigo)] mb-1">
                  Ce site utilise des cookies
                </h2>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                  Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) pour améliorer votre expérience.
                  Les cookies essentiels au fonctionnement du site sont toujours actifs.{" "}
                  <Link href="/confidentialite" className="underline text-[var(--color-brand)] hover:opacity-75">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
              <button
                onClick={acceptAll}
                className="flex-1 bg-[var(--color-brand)] text-white font-display text-[13px] tracking-[0.5px] px-5 py-3 rounded-xl hover:bg-[var(--color-indigo)] transition-colors"
              >
                Tout accepter
              </button>
              <button
                onClick={refuseAll}
                className="flex-1 bg-white text-[var(--color-brand)] font-display text-[13px] tracking-[0.5px] px-5 py-3 rounded-xl border-2 border-[var(--color-brand)] hover:bg-[var(--color-brand-light)] transition-colors"
              >
                Tout refuser
              </button>
              <button
                onClick={() => setShowPanel(true)}
                className="flex-1 text-[var(--color-text-muted)] font-display text-[13px] tracking-[0.5px] px-5 py-3 rounded-xl border border-[rgba(43,27,94,0.15)] hover:bg-[var(--color-cream)] transition-colors"
              >
                Personnaliser
              </button>
            </div>
          </div>
        )}

        {/* Panneau de personnalisation */}
        {showPanel && (
          <div className="p-6 md:p-7">
            <button
              onClick={() => setShowPanel(false)}
              className="text-[12px] text-[var(--color-text-muted)] mb-4 flex items-center gap-1 hover:text-[var(--color-brand)] transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              ← Retour
            </button>
            <h2 className="font-serif text-[17px] font-bold text-[var(--color-indigo)] mb-4">
              Personnaliser mes choix
            </h2>

            {/* Cookie essentiel — toujours actif */}
            <div className="flex items-start justify-between gap-4 py-4 border-t border-[rgba(43,27,94,0.06)]">
              <div>
                <div className="text-[14px] font-bold text-[var(--color-indigo)] mb-1">Cookies essentiels</div>
                <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">
                  Nécessaires au fonctionnement du site (session, sécurité). Ils ne peuvent pas être désactivés.
                </p>
              </div>
              <div className="shrink-0 mt-0.5 text-[12px] font-bold text-[var(--color-teal-dark)] bg-[var(--color-teal-light)] px-2.5 py-1 rounded-full">
                Toujours actif
              </div>
            </div>

            {/* Cookie analytique — optionnel */}
            <div className="flex items-start justify-between gap-4 py-4 border-t border-[rgba(43,27,94,0.06)]">
              <div>
                <div className="text-[14px] font-bold text-[var(--color-indigo)] mb-1">Mesure d&apos;audience</div>
                <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">
                  Google Analytics — nous aide à comprendre comment les visiteurs utilisent le site
                  (pages consultées, durée, source de trafic). Aucune donnée personnelle n&apos;est revendue.
                </p>
              </div>
              {/* Toggle switch */}
              <button
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors relative cursor-pointer border-none ${analytics ? "bg-[var(--color-brand)]" : "bg-[rgba(43,27,94,0.15)]"}`}
              >
                <span
                  className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${analytics ? "translate-x-5" : "translate-x-0"}`}
                />
                <span className="sr-only">{analytics ? "Désactiver" : "Activer"} la mesure d&apos;audience</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
              <button
                onClick={saveCustom}
                className="flex-1 bg-[var(--color-brand)] text-white font-display text-[13px] tracking-[0.5px] px-5 py-3 rounded-xl hover:bg-[var(--color-indigo)] transition-colors"
              >
                Enregistrer mes choix
              </button>
              <button
                onClick={refuseAll}
                className="flex-1 bg-white text-[var(--color-brand)] font-display text-[13px] tracking-[0.5px] px-5 py-3 rounded-xl border-2 border-[var(--color-brand)] hover:bg-[var(--color-brand-light)] transition-colors"
              >
                Tout refuser
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
