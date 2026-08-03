"use client";

import { useEffect, useRef } from "react";
import { useFlashlight } from "./FlashlightContext";

export default function MouseSpotlight() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { isEnabled } = useFlashlight();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!outer || !inner || !finePointer || reducedMotion || !isEnabled) {
      if (outer) outer.style.opacity = "0";
      if (inner) inner.style.opacity = "0";
      return;
    }

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let pointerVisible = false;
    let heroVisible = window.scrollY <= window.innerHeight * 0.8;

    const paint = () => {
      frame = 0;
      const visible = pointerVisible && heroVisible;
      outer.style.opacity = visible ? "1" : "0";
      inner.style.opacity = visible ? "0.42" : "0";
      inner.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
    };

    const schedulePaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const handlePointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      pointerVisible = true;
      schedulePaint();
    };
    const handlePointerLeave = () => {
      pointerVisible = false;
      schedulePaint();
    };
    const handleScroll = () => {
      const nextHeroVisible = window.scrollY <= window.innerHeight * 0.8;
      if (nextHeroVisible === heroVisible) return;
      heroVisible = nextHeroVisible;
      schedulePaint();
    };

    paint();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isEnabled]);

  return (
    <>
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998] bg-black/10 opacity-0 transition-opacity duration-500"
      />
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-300 will-change-transform [background:radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_48%,transparent_72%)]"
        style={{ transform: "translate3d(-1000px, -1000px, 0)" }}
      />
    </>
  );
}
