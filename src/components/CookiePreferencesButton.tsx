"use client";

// Composant à placer dans : src/components/CookiePreferencesButton.tsx
// Utilisé dans Footer.tsx pour rouvrir le bandeau de consentement

export default function CookiePreferencesButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("goslym_consent");
        localStorage.removeItem("goslym_consent_details");
        localStorage.removeItem("goslym_consent_date");
        window.location.reload();
      }}
      className="no-underline text-inherit hover:text-[var(--color-brand)] bg-transparent border-none cursor-pointer text-[12px] p-0"
    >
      Cookies
    </button>
  );
}
