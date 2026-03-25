import { client, SITE_SETTINGS_QUERY } from "@/lib/sanity.client";
import HeaderClient from "./HeaderClient";

interface Settings {
  headerLogoUrl?: string;
  headerLogoText?: string;
  headerLogoSubtext?: string;
  headerNavLinks?: { label: string; href: string }[];
  headerCtaButton?: { text: string; url: string };
}

export default async function Header() {
  let settings: Settings = {};
  try {
    settings = (await client.fetch<Settings>(SITE_SETTINGS_QUERY)) || {};
  } catch {
    // Sanity unavailable - use defaults
  }

  return (
    <HeaderClient
      logoText={settings.headerLogoText}
      logoSubtext={settings.headerLogoSubtext}
      logoUrl={settings.headerLogoUrl}
      navLinks={settings.headerNavLinks || []}
      ctaButton={settings.headerCtaButton}
    />
  );
}
