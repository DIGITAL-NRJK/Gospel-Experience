"use client";

import { useState } from "react";

interface Testimonial {
  _id: string;
  quote: string;
  personName: string;
  personRole: string;
  videoUrl?: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const total = testimonials.length;
  if (total === 0) return null;

  const t = testimonials[current];

  const goNext = () => { setCurrent((current + 1) % total); setShowVideo(false); };
  const goPrev = () => { setCurrent((current - 1 + total) % total); setShowVideo(false); };

  const getVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/);
    return match ? match[1] : null;
  };

  const videoId = t.videoUrl ? getVideoId(t.videoUrl) : null;

  return (
    <section className="bg-[var(--color-indigo)] relative overflow-hidden">
      <div className="site-container py-14 md:py-20">
        <div className="max-w-[640px] mx-auto text-center">
          {/* Video or quote */}
          {showVideo && videoId ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <div className="font-serif text-[48px] md:text-[56px] text-[var(--color-gold)] leading-none mb-4">«</div>
              <p className="font-serif text-[22px] md:text-[28px] font-bold text-white leading-[1.35] mb-6">
                {t.quote}
              </p>
              {videoId && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="inline-flex items-center gap-2 text-[13px] text-white/70 bg-white/10 px-5 py-2.5 rounded-full border border-white/15 cursor-pointer hover:bg-white/20 transition-colors mb-4"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="9,6 18,12 9,18" /></svg>
                  Voir le témoignage vidéo
                </button>
              )}
            </>
          )}

          {/* Attribution */}
          <div className="text-[15px] text-white/50 mt-2">
            {t.personName} — {t.personRole}
          </div>

          {/* Navigation */}
          {total > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg cursor-pointer border-none transition-colors"
                aria-label="Témoignage précédent"
              >
                ‹
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setShowVideo(false); }}
                    className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all ${
                      i === current ? "bg-[var(--color-gold)] w-6" : "bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg cursor-pointer border-none transition-colors"
                aria-label="Témoignage suivant"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
