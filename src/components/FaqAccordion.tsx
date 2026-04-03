"use client";

import { useState } from "react";

interface FaqItem { question: string; answer: string }

export default function FaqAccordion({ items, accentColor = "var(--color-brand)" }: { items: FaqItem[]; accentColor?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="bg-white rounded-2xl border border-[rgba(30,21,53,0.06)] overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer bg-transparent border-none"
            >
              <span className="font-serif text-[16px] md:text-[17px] font-bold pr-4" style={{ color: accentColor }}>{item.question}</span>
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[18px] transition-transform"
                style={{ backgroundColor: `${accentColor}12`, color: accentColor, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 -mt-1">
                <p className="text-[15px] text-[var(--color-text-muted)] leading-[1.7]">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
