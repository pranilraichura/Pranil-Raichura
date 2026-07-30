"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  scale?: number;
}

interface ScrollRevealGroupProps {
  children: ReactNode;
  className?: string;
  dependencyKey?: string;
  stagger?: number;
}

function useReducedMotionSafeReveal(
  setup: (scope: HTMLDivElement) => gsap.Context,
  dependencyKey = "",
) {
  const ref = useRef<HTMLDivElement>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = setupRef.current(scope);

    return () => context.revert();
  }, [dependencyKey]);

  return ref;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 28,
  scale = 0.965,
}: ScrollRevealProps) {
  const setupRef = useRef({ delay, distance, scale });
  setupRef.current = { delay, distance, scale };

  const ref = useReducedMotionSafeReveal((scope) =>
    gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          scope,
          {
            autoAlpha: 0,
            y: setupRef.current.distance,
            scale: setupRef.current.scale,
            willChange: "transform, opacity",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.82,
            delay: setupRef.current.delay,
            ease: "power3.out",
            clearProps: "willChange",
            scrollTrigger: {
              trigger: scope,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(scope, { clearProps: "all" });
      });

      return () => media.revert();
    }, scope),
  );

  return (
    <div ref={ref} className={className} data-scroll-reveal="single">
      {children}
    </div>
  );
}

export function ScrollRevealGroup({
  children,
  className = "",
  dependencyKey = "",
  stagger = 0.09,
}: ScrollRevealGroupProps) {
  const staggerRef = useRef(stagger);
  staggerRef.current = stagger;

  const ref = useReducedMotionSafeReveal(
    (scope) =>
      gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", scope);
        if (items.length === 0) return;

        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.fromTo(
            items,
            {
              autoAlpha: 0,
              y: 30,
              scale: 0.965,
              willChange: "transform, opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.76,
              stagger: staggerRef.current,
              ease: "power3.out",
              clearProps: "willChange",
              scrollTrigger: {
                trigger: scope,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        media.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(items, { clearProps: "all" });
        });

        return () => media.revert();
      }, scope),
    dependencyKey,
  );

  return (
    <div ref={ref} className={className} data-scroll-reveal="group">
      {children}
    </div>
  );
}
