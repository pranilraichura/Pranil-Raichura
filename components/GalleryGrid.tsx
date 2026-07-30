"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/data/gallery";

const GRID_ROW_HEIGHT = 2;

interface GalleryGridProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
  indexOffset?: number;
}

interface GridMetrics {
  columns: number;
  columnWidth: number;
  gap: number;
}

export default function GalleryGrid({
  photos,
  activeIndex,
  onSelect,
  indexOffset = 0,
}: GalleryGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const resizeFrame = useRef<number | null>(null);
  const [metrics, setMetrics] = useState<GridMetrics>({
    columns: 2,
    columnWidth: 172,
    gap: 12,
  });

  // One ResizeObserver keeps the dense grid calibrated without running work on
  // scroll. Its callback is rAF-throttled so responsive resizing stays cheap.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const measure = () => {
      const width = grid.getBoundingClientRect().width;
      const columns = window.innerWidth >= 768 ? 3 : 2;
      const gap = window.innerWidth >= 768 ? 16 : 12;
      const columnWidth = (width - gap * (columns - 1)) / columns;

      setMetrics((current) => {
        if (
          current.columns === columns &&
          current.gap === gap &&
          Math.abs(current.columnWidth - columnWidth) < 0.5
        ) {
          return current;
        }
        return { columns, columnWidth, gap };
      });
    };

    const scheduleMeasure = () => {
      if (resizeFrame.current !== null) return;
      resizeFrame.current = window.requestAnimationFrame(() => {
        resizeFrame.current = null;
        measure();
      });
    };

    measure();
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(grid);

    return () => {
      observer.disconnect();
      if (resizeFrame.current !== null) {
        window.cancelAnimationFrame(resizeFrame.current);
      }
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid auto-rows-[2px] grid-cols-2 grid-flow-dense gap-3 md:grid-cols-3 md:gap-4"
    >
      {photos.map((photo, index) => {
        const galleryIndex = index + indexOffset;
        const isActive = activeIndex === galleryIndex;
        const columnSpan = photo.featured ? Math.min(2, metrics.columns) : 1;
        const tileWidth =
          metrics.columnWidth * columnSpan + metrics.gap * (columnSpan - 1);
        const tileHeight = tileWidth / photo.aspectRatio;
        const rowSpan = Math.max(
          1,
          Math.ceil((tileHeight + metrics.gap) / (GRID_ROW_HEIGHT + metrics.gap))
        );

        return (
          <motion.button
            key={photo.slug}
            type="button"
            data-gallery-index={galleryIndex}
            data-gallery-featured={photo.featured ? "true" : undefined}
            onClick={() => onSelect(galleryIndex)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : Math.min(index, 7) * 0.05,
            }}
            style={{
              gridColumnEnd: `span ${columnSpan}`,
              gridRowEnd: `span ${rowSpan}`,
            }}
            className="group block h-full w-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            aria-label={`Open full screen: ${photo.alt}`}
          >
            {/* Keep the dense-grid slot reserved while the shared-element image
                has moved into the full-screen layer. */}
            <div
              className="relative h-full w-full overflow-hidden rounded-xl bg-gray-100"
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
                    sizes={
                      photo.featured
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
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
