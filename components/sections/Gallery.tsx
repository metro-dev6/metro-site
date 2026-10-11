"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageComparison } from "@/components/ui/image-comparison";
import { MobileGalleryStack, type MobileGalleryItem } from "@/components/ui/mobile-gallery-stack";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { fadeUp, EASE_OUT } from "@/lib/motion";
import { GALLERY_ITEMS, ROW_SPAN, COMPARISON_ROW_SPAN, type GalleryItem } from "@/lib/gallery-data";

const INITIAL_COUNT = 5;

const MOBILE_ITEMS: MobileGalleryItem[] = GALLERY_ITEMS.map((item) => ({
  id: item.id,
  type: item.type,
  title: item.title,
  desc: item.desc,
  url: item.url ?? "",
  beforeUrl: item.beforeUrl,
  afterUrl: item.afterUrl,
  objectPosition: item.objectPosition,
  beforeObjectPosition: item.beforeObjectPosition,
  afterObjectPosition: item.afterObjectPosition,
}));

export function Gallery() {
  const isDesktop = useIsDesktop();
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const canToggle = GALLERY_ITEMS.length > INITIAL_COUNT;
  const visible = expanded ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, INITIAL_COUNT);

  return (
    <section className="py-12 lg:py-16">
      <div className="bg-[#141414] rounded-[50px] mx-4 sm:mx-10 px-6 lg:px-12 py-16 lg:py-20">
        <div className="mx-auto max-w-[1600px]">

        <motion.div {...fadeUp} className="mb-12">
          <div className="font-accent text-xs font-medium tracking-[0.25em] uppercase text-brand-yellow mb-3 not-italic">
            Gallery
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-brand-white tracking-normal leading-[0.95]">
            The work speaks for <span className="text-brand-yellow">itself.</span>
          </h2>
          <p className="text-white/70 text-base mt-4 max-w-lg leading-relaxed">
            Every car here got detailed where it sits, right in Bakersfield. Drag the sliders to see the before.
          </p>
          <div className="mt-6 h-px bg-white/10" />
        </motion.div>

        {isDesktop ? (
          <>
            <div className="grid grid-cols-4 auto-rows-[240px] grid-flow-row-dense gap-3">
              {visible.map((item, idx) =>
                item.type === "comparison" ? (
                  <motion.div
                    key={item.id}
                    className="col-span-2 rounded-2xl overflow-hidden relative"
                    style={{ gridRow: `span ${COMPARISON_ROW_SPAN}` }}
                    initial={idx >= INITIAL_COUNT ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: idx >= INITIAL_COUNT ? (idx - INITIAL_COUNT) * 0.05 : 0 }}
                  >
                    <ImageComparison
                      before={{ src: item.beforeUrl!, alt: `${item.title} before` }}
                      after={{ src: item.afterUrl!, alt: `${item.title} after` }}
                      initialPosition={75}
                      fillContainer
                      beforeObjectPosition={item.beforeObjectPosition}
                      afterObjectPosition={item.afterObjectPosition}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.id}
                    className="group relative rounded-2xl overflow-hidden cursor-zoom-in"
                    style={{ gridRow: `span ${ROW_SPAN[item.size]}` }}
                    onClick={() => setLightbox(item)}
                    initial={idx >= INITIAL_COUNT ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: idx >= INITIAL_COUNT ? (idx - INITIAL_COUNT) * 0.05 : 0 }}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <h3 className="text-white text-sm font-medium line-clamp-1">{item.title}</h3>
                      {item.desc && <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{item.desc}</p>}
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {canToggle && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="bg-brand-yellow text-brand-black font-black tracking-widest text-sm px-7 h-11 rounded-full hover:shadow-[0_0_20px_5px_rgba(250,194,5,0.35)] transition-[transform,box-shadow] duration-150 active:scale-[0.97]"
                >
                  {expanded ? "Show less" : "Show all"}
                </button>
              </div>
            )}
          </>
        ) : (
          <MobileGalleryStack items={MOBILE_ITEMS} />
        )}

        </div>
      </div>

      <AnimatePresence>
        {lightbox && lightbox.type !== "comparison" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              src={lightbox.url}
              alt={lightbox.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
