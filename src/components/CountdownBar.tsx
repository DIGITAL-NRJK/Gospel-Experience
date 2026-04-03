"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface CountdownBarProps {
  eventTitle: string;
  eventType: string | string[];
  eventDate: string;
  ticketUrl?: string;
}

export default function CountdownBar({ eventTitle, eventType, eventDate, ticketUrl }: CountdownBarProps) {
  const pathname = usePathname();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(eventDate).getTime();
    const update = () => {
      const diff = target - Date.now();
      setDaysLeft(diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [eventDate]);

  if (pathname?.startsWith("/studio") || daysLeft === null || daysLeft <= 0) return null;

  const types = Array.isArray(eventType) ? eventType : [eventType].filter(Boolean);
  const isFestival = types.some((t) => ["festival", "concert", "masterclass"].includes(t));

  const bgColor = isFestival ? "var(--color-brand)" : "var(--color-gold)";
  const textColor = isFestival ? "white" : "var(--color-text-body)";

  const message = isFestival
    ? `Le Fourvière Gospel Expérience est dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""}`
    : `La prochaine session du Gospel Experience Institute est dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""}`;
  const ctaText = isFestival ? "Réservez votre place !" : "Inscrivez-vous !";

  return (
    <div
      className="text-center py-2 px-4 font-display text-[12px] md:text-[13px]"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <span>{message} — </span>
      {ticketUrl ? (
        <a href={ticketUrl} className="underline font-bold" style={{ color: textColor }}>{ctaText}</a>
      ) : (
        <span className="underline font-bold">{ctaText}</span>
      )}
    </div>
  );
}
