"use client";

import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import GalleryFullscreen from "@/components/GalleryFullscreen";
import GalleryGrid from "@/components/GalleryGrid";
import Navigation from "@/components/Navigation";
import { useLightbox } from "@/components/LightboxContext";
import { galleryPhotos } from "@/data/gallery";

const LAYOUT_DURATION_MS = 450;

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { setLightboxOpen } = useLightbox();
  const lastOpenedIndex = useRef<number | null>(null);
  const unlockTimer = useRef<number | null>(null);

  const openPhoto = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setLightboxOpen(true);
    },
    [setLightboxOpen]
  );

  const closePhoto = useCallback(() => {
    setActiveIndex(null);
    // Keep nav hidden through the shrink-back so it doesn't flash over the photo.
    window.setTimeout(() => setLightboxOpen(false), LAYOUT_DURATION_MS);
  }, [setLightboxOpen]);

  useEffect(() => () => setLightboxOpen(false), [setLightboxOpen]);

  // Hold scroll lock for the open duration plus the shared-element close, so the
  // destination tile does not shift under the shrinking photo.
  useLayoutEffect(() => {
    if (unlockTimer.current) {
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = null;
    }

    const { body, documentElement } = document;
    if (activeIndex !== null) {
      const previousOverflow = body.dataset.galleryPrevOverflow ?? body.style.overflow;
      const previousPadding = body.dataset.galleryPrevPadding ?? body.style.paddingRight;
      body.dataset.galleryPrevOverflow = previousOverflow;
      body.dataset.galleryPrevPadding = previousPadding;
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
      return;
    }

    unlockTimer.current = window.setTimeout(() => {
      body.style.overflow = body.dataset.galleryPrevOverflow ?? "";
      body.style.paddingRight = body.dataset.galleryPrevPadding ?? "";
      delete body.dataset.galleryPrevOverflow;
      delete body.dataset.galleryPrevPadding;
    }, LAYOUT_DURATION_MS);

    return () => {
      if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
    };
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      const { body } = document;
      body.style.overflow = body.dataset.galleryPrevOverflow ?? "";
      body.style.paddingRight = body.dataset.galleryPrevPadding ?? "";
      delete body.dataset.galleryPrevOverflow;
      delete body.dataset.galleryPrevPadding;
    };
  }, []);

  // Return keyboard focus to the tile the photo came from.
  useEffect(() => {
    if (activeIndex !== null) {
      lastOpenedIndex.current = activeIndex;
      return;
    }
    const previous = lastOpenedIndex.current;
    if (previous === null) return;
    lastOpenedIndex.current = null;
    const trigger = document.querySelector<HTMLElement>(`[data-gallery-index="${previous}"]`);
    trigger?.focus({ preventScroll: true });
  }, [activeIndex]);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 md:pt-36 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-primary-600"
          >
            Back to main page
          </Link>
          <h1 className="mt-5 font-libre text-4xl font-bold text-slate-900 md:text-5xl">
            Gallery
          </h1>
          <p className="mt-4 max-w-xl text-base text-gray-600 md:text-lg">
            A few more moments - on the court, in the field, and beyond.
          </p>
        </motion.div>

        <LayoutGroup>
          <GalleryGrid
            photos={galleryPhotos}
            activeIndex={activeIndex}
            onSelect={openPhoto}
          />

          {activeIndex !== null && (
            <GalleryFullscreen
              photos={galleryPhotos}
              index={activeIndex}
              onClose={closePhoto}
              onNavigate={setActiveIndex}
            />
          )}
        </LayoutGroup>
      </div>
    </main>
  );
}
