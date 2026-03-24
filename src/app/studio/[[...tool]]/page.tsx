"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("@/components/SanityStudio"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", color: "#6B5E8A" }}>
      Chargement du Studio...
    </div>
  ),
});

export default function StudioPage() {
  return <Studio />;
}