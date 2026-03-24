"use client";

import { useState, useEffect, useCallback } from "react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const total = images.length;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl font-light cursor-pointer z-10 bg-transparent border-none"
        aria-label="Fermer"
      >
        ✕
      </button>

      {/* Counter */}
      {total > 1 && (
        <div className="absolute top-5 left-6 text-white/50 text-[13px]">
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* Previous */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl cursor-pointer border-none transition-colors"
          aria-label="Photo précédente"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
      />

      {/* Next */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl cursor-pointer border-none transition-colors"
          aria-label="Photo suivante"
        >
          ›
        </button>
      )}
    </div>
  );
}
