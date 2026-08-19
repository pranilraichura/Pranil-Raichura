"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const storagePrefix = "pranilraichura:scroll:";

function locationKey(pathname: string, search = "") {
  return `${pathname}${search}`;
}

function savedScrollPosition(key: string) {
  const value = window.sessionStorage.getItem(`${storagePrefix}${key}`);
  const position = value ? Number.parseInt(value, 10) : Number.NaN;
  return Number.isFinite(position) ? position : null;
}

/**
 * Keeps in-tab navigation feeling continuous. We use sessionStorage instead of
 * a cookie: a scroll position belongs to this browser tab and should disappear
 * when its session ends.
 */
export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const currentKey = locationKey(pathname, search ? `?${search}` : "");
  const activeKey = useRef(currentKey);
  const restoreOnNextPathChange = useRef<string | null>(null);

  useEffect(() => {
    const previousMode = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const saveCurrentPosition = () => {
      window.sessionStorage.setItem(
        `${storagePrefix}${activeKey.current}`,
        String(Math.round(window.scrollY)),
      );
    };

    const restore = (key: string) => {
      const position = savedScrollPosition(key);
      if (position === null) return;

      // Let the incoming page paint before restoring its position. The second
      // frame accounts for images and client-rendered sections above the fold.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => window.scrollTo(0, position));
      });
    };

    const onPopState = () => {
      const key = locationKey(window.location.pathname, window.location.search);
      restoreOnNextPathChange.current = key;
    };

    const onInternalNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element | null)?.closest("a[href]");
      if (!link) return;

      const href = new URL(link.getAttribute("href") ?? "", window.location.href);
      const isDifferentDocument =
        href.origin === window.location.origin &&
        (href.pathname !== window.location.pathname || href.search !== window.location.search);

      if (isDifferentDocument) saveCurrentPosition();
    };

    const onPageShow = (event: PageTransitionEvent) => {
      const navigation = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      if (event.persisted || navigation?.type === "back_forward") {
        restore(locationKey(window.location.pathname, window.location.search));
      }
    };

    window.addEventListener("pagehide", saveCurrentPosition);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("click", onInternalNavigation, true);

    return () => {
      saveCurrentPosition();
      window.history.scrollRestoration = previousMode;
      window.removeEventListener("pagehide", saveCurrentPosition);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("click", onInternalNavigation, true);
    };
  }, []);

  useEffect(() => {
    activeKey.current = currentKey;

    if (restoreOnNextPathChange.current !== currentKey) return;

    const key = restoreOnNextPathChange.current;
    restoreOnNextPathChange.current = null;
    const position = savedScrollPosition(key);
    if (position === null) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => window.scrollTo(0, position));
    });
  }, [currentKey]);

  return null;
}
