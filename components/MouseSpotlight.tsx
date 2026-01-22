"use client";

import { useEffect, useState } from "react";
import { useFlashlight } from "./FlashlightContext";

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { isEnabled } = useFlashlight();

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth updates
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Initialize with center position
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      {/* Subtle dark overlay that creates gentle focus effect */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500"
        style={{
          opacity: isVisible && isEnabled ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.25) 80%)`,
        }}
      />
      {/* Very subtle inner glow for the spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{
          opacity: isVisible && isEnabled ? 0.3 : 0,
          background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
        }}
      />
    </>
  );
}

