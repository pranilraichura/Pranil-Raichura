"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import GalleryFullscreen from "@/components/GalleryFullscreen";
import GalleryGrid from "@/components/GalleryGrid";
import Navigation from "@/components/Navigation";
import { useLightbox } from "@/components/LightboxContext";
import { galleryPhotos } from "@/data/gallery";

const LAYOUT_DURATION_MS = 450;
const LAYOUT_EASE = [0.32, 0.72, 0, 1] as const;
const HERO_INDEX = 0;

export default function GalleryPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { setLightboxOpen } = useLightbox();
  const lastOpenedIndex = useRef<number | null>(null);
  const unlockTimer = useRef<number | null>(null);
  const lightboxTimer = useRef<number | null>(null);
  const heroPhoto = galleryPhotos[HERO_INDEX];
  const gridPhotos = galleryPhotos.slice(1);
  const heroIsActive = activeIndex === HERO_INDEX;

  const lockGalleryScroll = useCallback(() => {
    const { body, documentElement } = document;
    if (body.dataset.galleryScrollLocked === "true") return;

    body.dataset.galleryPrevOverflow = body.style.overflow;
    body.dataset.galleryPrevOverscroll = body.style.overscrollBehavior;
    body.dataset.galleryPrevPadding = body.style.paddingRight;
    documentElement.dataset.galleryPrevOverflow = documentElement.style.overflow;
    documentElement.dataset.galleryPrevOverscroll = documentElement.style.overscrollBehavior;
    body.dataset.galleryScrollLocked = "true";

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const unlockGalleryScroll = useCallback(() => {
    const { body, documentElement } = document;
    if (body.dataset.galleryScrollLocked !== "true") return;

    body.style.overflow = body.dataset.galleryPrevOverflow ?? "";
    body.style.overscrollBehavior = body.dataset.galleryPrevOverscroll ?? "";
    body.style.paddingRight = body.dataset.galleryPrevPadding ?? "";
    documentElement.style.overflow = documentElement.dataset.galleryPrevOverflow ?? "";
    documentElement.style.overscrollBehavior =
      documentElement.dataset.galleryPrevOverscroll ?? "";
    delete body.dataset.galleryPrevOverflow;
    delete body.dataset.galleryPrevOverscroll;
    delete body.dataset.galleryPrevPadding;
    delete body.dataset.galleryScrollLocked;
    delete documentElement.dataset.galleryPrevOverflow;
    delete documentElement.dataset.galleryPrevOverscroll;
  }, []);

  const openPhoto = useCallback(
    (index: number) => {
      if (lightboxTimer.current) {
        window.clearTimeout(lightboxTimer.current);
        lightboxTimer.current = null;
      }
      // Apply the lock in the click event itself so even an immediate wheel
      // input cannot reach the page before React commits the fullscreen layer.
      lockGalleryScroll();
      setActiveIndex(index);
      setLightboxOpen(true);
    },
    [lockGalleryScroll, setLightboxOpen]
  );

  const closePhoto = useCallback(() => {
    setActiveIndex(null);
    // Keep nav hidden through the shrink-back so it doesn't flash over the photo.
    lightboxTimer.current = window.setTimeout(() => {
      setLightboxOpen(false);
      lightboxTimer.current = null;
    }, LAYOUT_DURATION_MS);
  }, [setLightboxOpen]);

  useEffect(
    () => () => {
      if (lightboxTimer.current) window.clearTimeout(lightboxTimer.current);
      setLightboxOpen(false);
    },
    [setLightboxOpen]
  );

  // Hold scroll lock for the open duration plus the shared-element close, so the
  // destination tile does not shift under the shrinking photo.
  useLayoutEffect(() => {
    if (unlockTimer.current) {
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = null;
    }

    if (activeIndex !== null) {
      lockGalleryScroll();
      return;
    }

    unlockTimer.current = window.setTimeout(() => {
      unlockGalleryScroll();
      unlockTimer.current = null;
    }, LAYOUT_DURATION_MS);

    return () => {
      if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
    };
  }, [activeIndex, lockGalleryScroll, unlockGalleryScroll]);

  useEffect(() => {
    return () => {
      unlockGalleryScroll();
    };
  }, [unlockGalleryScroll]);

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

      <LayoutGroup>
        <motion.section
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
          className="relative h-[54svh] min-h-[440px] w-full overflow-hidden bg-neutral-950 md:h-[72svh] md:min-h-[560px] md:max-h-[820px]"
        >
          <button
            type="button"
            data-gallery-index={HERO_INDEX}
            onClick={() => openPhoto(HERO_INDEX)}
            aria-label={`Open full screen: ${heroPhoto.alt}`}
            className="group absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/90"
          >
            {!heroIsActive && (
              <motion.div
                layoutId={`gallery-${heroPhoto.slug}`}
                transition={{
                  duration: prefersReducedMotion ? 0 : LAYOUT_DURATION_MS / 1000,
                  ease: LAYOUT_EASE,
                }}
                className="absolute inset-0"
              >
                <Image
                  src={heroPhoto.fullSrc}
                  alt={heroPhoto.alt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            )}

            {heroPhoto.caption ? (
              <div className="pointer-events-none absolute bottom-10 right-8 z-20 hidden max-w-xs translate-y-2 text-right opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  {heroPhoto.category}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {heroPhoto.caption}
                </p>
              </div>
            ) : null}
          </button>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35" />

          <Link
            href="/"
            className="absolute left-4 top-24 z-20 text-sm font-medium text-white/75 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-6 md:left-10 md:top-28"
          >
            Back to main page
          </Link>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: 0.12 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-4 pb-8 text-white sm:px-6 md:pb-12 lg:px-8"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
              Beyond the resume
            </p>
            <h1 className="font-libre text-5xl font-bold tracking-tight md:text-7xl">
              Gallery
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
              A few more moments - on the court, in the field, and beyond.
            </p>
          </motion.div>
        </motion.section>

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 md:pt-14 lg:px-8">
          <GalleryGrid
            photos={gridPhotos}
            activeIndex={activeIndex}
            onSelect={openPhoto}
            indexOffset={1}
          />

          {activeIndex !== null && (
            <GalleryFullscreen
              photos={galleryPhotos}
              index={activeIndex}
              onClose={closePhoto}
              onNavigate={setActiveIndex}
            />
          )}
        </div>
      </LayoutGroup>
    </main>
  );
}
