"use client";

interface HeroVideoProps {
  mp4Url?: string;
  youtubeUrl?: string;
}

export default function HeroVideo({ mp4Url, youtubeUrl }: HeroVideoProps) {
  // MP4 is prioritaire
  if (mp4Url) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        >
          <source src={mp4Url} type="video/mp4" />
        </video>
      </div>
    );
  }

  // YouTube fallback
  if (youtubeUrl) {
    const getVideoId = (url: string): string | null => {
      const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
        /(?:youtu\.be\/)([^?\s]+)/,
        /(?:youtube\.com\/embed\/)([^?\s]+)/,
      ];
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    const videoId = getVideoId(youtubeUrl);
    if (!videoId) return null;

    return (
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&playsinline=1`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: "180%", height: "180%", border: "none" }}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    );
  }

  return null;
}
