"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { GalleryPhoto } from "@/data/gallery";

interface GalleryGridProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
}

export default function GalleryGrid({ photos, activeIndex, onSelect }: GalleryGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
      {photos.map((photo, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.button
            key={photo.slug}
            type="button"
            data-gallery-index={index}
            onClick={() => onSelect(index)}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.5,
              delay: prefersReducedMotion ? 0 : Math.min(index, 7) * 0.05,
            }}
            className="group mb-3 block w-full break-inside-avoid rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 md:mb-4"
            aria-label={`Open full screen: ${photo.alt}`}
          >
            {/* Keep the masonry slot reserved while the shared-element image
                has moved into the full-screen layer. */}
            <div
              style={{ aspectRatio: photo.aspectRatio }}
              className="relative w-full overflow-hidden rounded-xl bg-gray-100"
            >
              {!isActive && (
                <motion.div
                  layoutId={`gallery-${photo.slug}`}
                  className="absolute inset-0"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Image
                    src={photo.thumbSrc}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-[filter,opacity] duration-300 ease-out group-hover:brightness-[1.06] group-hover:opacity-95"
                  />
                </motion.div>
              )}

              {/* Subtle category hint on hover only - not interactive/filterable. */}
              <span className="pointer-events-none absolute bottom-2 left-2 hidden rounded bg-black/45 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:inline">
                {photo.category}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
