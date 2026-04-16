"use client";

// src/components/FlyerSection.tsx
// Version mise à jour : supporte 1 ou 2 flyers en grille

import { useState } from "react";
import Lightbox from "@/components/Lightbox";

export interface FlyerItem {
  imageUrl: string;
  fullImageUrl: string;
  title: string;
  description?: string;
  link?: string;
  linkText?: string;
  tag?: string;
  tagColor?: string; // ex: "var(--color-gold)" ou "var(--color-brand)"
}

interface FlyerSectionProps {
  flyers: FlyerItem[];
}

function FlyerCard({ flyer }: { flyer: FlyerItem }) {
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-[rgba(30,21,53,0.07)] shadow-sm flex flex-col md:flex-row items-center gap-0">
        {/* Image */}
        <div className="w-full md:w-[200px] shrink-0 p-4">
          <img
            src={flyer.imageUrl}
            alt={flyer.title}
            className="w-full max-w-[200px] mx-auto rounded-xl shadow-md cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setShowLightbox(true)}
            title="Cliquer pour agrandir"
          />
        </div>
        {/* Contenu */}
        <div className="flex-1 p-5 md:p-6 text-center md:text-left">
          <div
            className="section-tag mb-2"
            style={{ color: flyer.tagColor || "var(--color-gold)" }}
          >
            {flyer.tag || "Festival"}
          </div>
          <h3 className="font-serif text-[18px] md:text-[20px] font-bold text-[var(--color-brand)] mb-2 leading-snug">
            {flyer.title}
          </h3>
          {flyer.description && (
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed mb-4">
              {flyer.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
            {flyer.link && (
              <a
                href={flyer.link}
                className="btn-coral no-underline text-center text-[13px] px-5 py-2.5"
              >
                {flyer.linkText || "En savoir plus →"}
              </a>
            )}
            {/*<button
              onClick={() => setShowLightbox(true)}
              className="btn-outline text-[13px] px-5 py-2.5 cursor-pointer"
            >
              Voir le flyer en grand
            </button>*/}
          </div>
        </div>
      </div>

      {showLightbox && (
        <Lightbox
          images={[{ src: flyer.fullImageUrl, alt: flyer.title }]}
          initialIndex={0}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </>
  );
}

export default function FlyerSection({ flyers }: FlyerSectionProps) {
  if (!flyers || flyers.length === 0) return null;

  return (
    <div className="site-container pb-10">
      <div
        className={`grid gap-4 ${
          flyers.length >= 2 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {flyers.map((flyer) => (
          <FlyerCard key={flyer.title} flyer={flyer} />
        ))}
      </div>
    </div>
  );
}
