"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/data/gallery";

const CHROME_IDLE_MS = 2500;
const LAYOUT_EASE = [0.32, 0.72, 0, 1] as const;
const LAYOUT_DURATION = 0.45;
const CROSSFADE_DURATION = 0.28;
const DISMISS_OFFSET = 110;
const DISMISS_VELOCITY = 600;
const SWIPE_OFFSET = 70;
const SWIPE_VELOCITY = 450;

interface GalleryFullscreenProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export default function GalleryFullscreen({
  photos,
  index,
  onClose,
  onNavigate,
}: GalleryFullscreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const photo = photos[index];

  const [chromeVisible, setChromeVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  // Skip shared-element motion when stepping between photos while already open;
  // only open/close should grow/shrink against the grid tile.
  const [suppressLayout, setSuppressLayout] = useState(false);
  const [backdropDim, setBackdropDim] = useState(1);

  const idleTimer = useRef<number | null>(null);
  const isClosing = useRef(false);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(
    () => () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    },
    []
  );

  // Scroll lock lives on the gallery page so it can outlast this unmount and
  // keep the destination tile steady through the shared-element close.

  const revealChrome = useCallback(() => {
    if (isClosing.current) return;
    setChromeVisible(true);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setChromeVisible(false), CHROME_IDLE_MS);
  }, []);

  // Controls stay hidden until the shared-element open has settled.
  useEffect(() => {
    const delay = prefersReducedMotion ? 80 : LAYOUT_DURATION * 1000 + 40;
    const timer = window.setTimeout(revealChrome, delay);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, revealChrome]);

  useEffect(() => {
    const onActivity = () => revealChrome();
    window.addEventListener("pointermove", onActivity);
    window.addEventListener("pointerdown", onActivity);
    window.addEventListener("touchstart", onActivity);
    return () => {
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("touchstart", onActivity);
    };
  }, [revealChrome]);

  const dismiss = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    setChromeVisible(false);
    setSuppressLayout(false);

    // Bring the destination tile on-screen so the shrink lands correctly.
    const tile = document.querySelector<HTMLElement>(
      `[data-gallery-index="${indexRef.current}"]`
    );
    if (tile) {
      const rect = tile.getBoundingClientRect();
      const offscreen = rect.top < 8 || rect.bottom > window.innerHeight - 8;
      if (offscreen) {
        window.scrollBy({ top: rect.top + rect.height / 2 - window.innerHeight / 2 });
      }
    }

    // Unmounting here remounts the matching layoutId on the grid tile;
    // Framer Motion interpolates between them in the same commit.
    onClose();
  }, [onClose]);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (photos.length < 2 || isClosing.current) return;
      setSuppressLayout(true);
      onNavigate((indexRef.current + direction + photos.length) % photos.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSuppressLayout(false));
      });
    },
    [onNavigate, photos.length]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }
      revealChrome();
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismiss, navigate, revealChrome]);

  const handleDrag = (_event: unknown, info: PanInfo) => {
    if (isClosing.current) return;
    if (info.offset.y > 0) {
      setBackdropDim(Math.max(0.4, 1 - info.offset.y / 500));
    }
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (isClosing.current) return;
    const { offset, velocity } = info;
    const verticalIntent = Math.abs(offset.y) > Math.abs(offset.x);

    if (verticalIntent) {
      if (offset.y > DISMISS_OFFSET || velocity.y > DISMISS_VELOCITY) {
        dismiss();
        return;
      }
      setBackdropDim(1);
      return;
    }

    if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
      setBackdropDim(1);
      navigate(1);
      return;
    }
    if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
      setBackdropDim(1);
      navigate(-1);
      return;
    }
    setBackdropDim(1);
  };

  if (!photo) return null;

  const layoutTransition =
    suppressLayout || prefersReducedMotion
      ? { duration: 0 }
      : { duration: LAYOUT_DURATION, ease: LAYOUT_EASE };

  return (
    <div
      className="fixed inset-0 z-[10050]"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: backdropDim }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
        className="absolute inset-0 bg-neutral-950"
        onClick={dismiss}
      />

      <div className="absolute inset-0 flex items-center justify-center" onClick={dismiss}>
        <motion.div
          layoutId={suppressLayout ? undefined : `gallery-${photo.slug}`}
          transition={{ layout: layoutTransition }}
          drag={isTouch ? true : false}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.65}
          onDrag={isTouch ? handleDrag : undefined}
          onDragEnd={isTouch ? handleDragEnd : undefined}
          onClick={(event) => {
            event.stopPropagation();
            revealChrome();
          }}
          className={`relative max-h-[100dvh] max-w-[100vw] ${isTouch ? "touch-none" : ""}`}
          style={{
            width: `min(100vw, calc(100dvh * ${photo.aspectRatio}))`,
            aspectRatio: photo.aspectRatio,
          }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={photo.slug}
              initial={{ opacity: suppressLayout ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.05 : CROSSFADE_DURATION }}
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={photo.thumbSrc}
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className="object-contain"
              />
              <Image
                src={photo.fullSrc}
                alt={photo.alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {chromeVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 z-10"
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

            <button
              type="button"
              onClick={dismiss}
              aria-label="Close full screen view"
              className="pointer-events-auto absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:right-5 md:top-5"
            >
              <X className="h-6 w-6" strokeWidth={1.75} />
            </button>

            <p className="absolute left-4 top-6 text-xs font-medium tracking-wide text-white/70 md:left-6">
              {index + 1} / {photos.length}
            </p>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Previous photo"
                  className="pointer-events-auto absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:left-5 md:h-12 md:w-12"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(1)}
                  aria-label="Next photo"
                  className="pointer-events-auto absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:right-5 md:h-12 md:w-12"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={1.75} />
                </button>
              </>
            )}

            {photo.caption ? (
              <p className="absolute inset-x-0 bottom-5 mx-auto max-w-2xl px-6 text-center text-sm text-white/85">
                {photo.caption}
              </p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
