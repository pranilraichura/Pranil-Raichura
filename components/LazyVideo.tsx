"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoHTMLAttributes } from "react";

interface LazyVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  rootMargin?: string;
}

/**
 * Keeps long-form media completely off the network until it is close to view.
 * A poster preserves the layout and gives the visitor an immediate visual target.
 */
export default function LazyVideo({
  src,
  rootMargin = "480px 0px",
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  useEffect(() => {
    if (shouldLoad) videoRef.current?.load();
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      preload={shouldLoad ? "metadata" : "none"}
      playsInline
      {...props}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
}
