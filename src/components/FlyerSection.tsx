"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";

interface FlyerSectionProps {
  imageUrl: string;
  fullImageUrl: string;
  title: string;
  description?: string;
  link?: string;
}

export default function FlyerSection({ imageUrl, fullImageUrl, title, description, link }: FlyerSectionProps) {
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <>
      <div className="site-container pb-10">
        <div className="bg-gradient-to-br from-[var(--color-teal-light)] to-[#ECFAF3] rounded-3xl p-8 flex gap-8 items-center">
          <div className="w-[280px] shrink-0">
            <img
              src={imageUrl}
              alt={title}
              className="w-full rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowLightbox(true)}
              title="Cliquer pour agrandir"
            />
          </div>
          <div className="flex-1">
            <div className="section-tag text-[var(--color-teal-dark)]">École de gospel</div>
            <h2 className="font-serif text-[26px] font-bold text-[var(--color-teal-dark)] mb-3">{title}</h2>
            {description && (
              <p className="text-[13px] text-[var(--color-teal-dark)] opacity-70 leading-relaxed mb-5">{description}</p>
            )}
            <div className="flex gap-3">
              {link && (
                <a href={link} className="btn-teal no-underline">S&apos;inscrire →</a>
              )}
              <button
                onClick={() => setShowLightbox(true)}
                className="btn-outline text-[11px] px-5 py-2 cursor-pointer"
              >
                Voir le flyer en grand
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLightbox && (
        <Lightbox
          images={[{ src: fullImageUrl, alt: title }]}
          initialIndex={0}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </>
  );
}
