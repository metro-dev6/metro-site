"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageComparison } from "@/components/ui/image-comparison";

export interface MobileGalleryItem {
  id: number;
  type: "image" | "video" | "comparison";
  title: string;
  desc: string;
  url: string;
  beforeUrl?: string;
  afterUrl?: string;
  objectPosition?: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

const SWIPE_THRESHOLD_PX = 50;

export function MobileGalleryStack({ items }: { items: MobileGalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
      if (deltaX < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const item = items[index];

  return (
    <div>
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[0.07]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.type === "comparison" ? (
              <ImageComparison
                before={{ src: item.beforeUrl!, alt: `${item.title} before` }}
                after={{ src: item.afterUrl!, alt: `${item.title} after` }}
                initialPosition={75}
                beforeObjectPosition={item.beforeObjectPosition}
                afterObjectPosition={item.afterObjectPosition}
              />
            ) : (
              <div className="flex items-center justify-center bg-site-bg max-h-[60vh] min-h-[280px]">
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-h-[60vh] max-w-full object-contain"
                  style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="px-4 py-3 bg-site-bg">
          <h3 className="text-white text-sm font-medium">{item.title}</h3>
          {item.desc && (
            <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="w-8 h-8 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-white"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-white/50 text-xs tracking-wide">
          {index + 1} / {items.length}
        </span>
        <button
          onClick={next}
          aria-label="Next photo"
          className="w-8 h-8 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-white"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
