"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Camera, Play } from "lucide-react";
import type { ActivityShowcaseDefinition, ActivityTheme } from "@/data/activityShowcases";
import MediaLightbox from "@/components/MediaLightbox";
import { useLightbox } from "@/components/LightboxContext";

const palettes: Record<
  ActivityTheme,
  { background: string; surface: string; ink: string; muted: string; accent: string; dark: string; glow: string }
> = {
  cosmos: {
    background: "#edf5fc",
    surface: "#ffffff",
    ink: "#082b4c",
    muted: "#4f6c84",
    accent: "#f5b335",
    dark: "#061f38",
    glow: "rgba(245,179,53,.24)",
  },
  volleyball: {
    background: "#e8e7df",
    surface: "#f7f7f1",
    ink: "#0d1715",
    muted: "#5b6662",
    accent: "#d8ff3f",
    dark: "#09120f",
    glow: "rgba(216,255,63,.22)",
  },
  programming: {
    background: "#eaf5ff",
    surface: "#f8fcff",
    ink: "#07172b",
    muted: "#506579",
    accent: "#37d2ff",
    dark: "#020b18",
    glow: "rgba(55,210,255,.25)",
  },
  flora: {
    background: "#efe9d9",
    surface: "#faf6e9",
    ink: "#1d382b",
    muted: "#647166",
    accent: "#f2a05e",
    dark: "#173329",
    glow: "rgba(242,160,94,.22)",
  },
  pranam: {
    background: "#f5ede1",
    surface: "#fffaf3",
    ink: "#291d18",
    muted: "#725e53",
    accent: "#db6b3c",
    dark: "#1c2d28",
    glow: "rgba(219,107,60,.22)",
  },
  clearpolicy: {
    background: "#eef3fb",
    surface: "#fbfdff",
    ink: "#111b2f",
    muted: "#647087",
    accent: "#657cff",
    dark: "#07111f",
    glow: "rgba(101,124,255,.23)",
  },
};

function useAutoHideHeader() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (y < 56) setHidden(false);
        else if (delta > 8) setHidden(true);
        else if (delta < -8) setHidden(false);
        lastY.current = y;
        frame.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return { hidden, reveal: () => setHidden(false) };
}

function MediaPreview({
  definition,
  index,
  className,
  priority = false,
  onOpen,
}: {
  definition: ActivityShowcaseDefinition;
  index: number;
  className: string;
  priority?: boolean;
  onOpen: (index: number) => void;
}) {
  const item = definition.media[index];
  const src = item.thumbnail ?? (item.type === "image" ? item.path : undefined);

  return (
    <button
      type="button"
      className={`group relative overflow-hidden rounded-[1.5rem] bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 ${className}`}
      onClick={() => onOpen(index)}
      aria-label={`Open ${item.caption ?? definition.navLabel} media`}
    >
      {src ? (
        <Image
          src={src}
          alt={item.caption ?? definition.navLabel}
          fill
          priority={priority}
          className={`${item.fit === "contain" ? "object-contain bg-white p-4" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--dark)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-80" />
      {item.type === "video" && (
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-md">
          <Play className="ml-1 h-5 w-5" fill="currentColor" aria-hidden="true" />
        </span>
      )}
      <span className="absolute bottom-0 left-0 right-0 translate-y-1 px-5 pb-4 pt-12 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {item.caption ?? "View media"}
      </span>
    </button>
  );
}

export default function ActivityShowcase({ definition }: { definition: ActivityShowcaseDefinition }) {
  const palette = palettes[definition.theme];
  const { hidden, reveal } = useAutoHideHeader();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { setLightboxOpen: setGlobalLightboxOpen } = useLightbox();

  const variables = useMemo(
    () =>
      ({
        "--page-bg": palette.background,
        "--surface": palette.surface,
        "--ink": palette.ink,
        "--muted": palette.muted,
        "--accent": palette.accent,
        "--dark": palette.dark,
        "--glow": palette.glow,
      }) as CSSProperties,
    [palette],
  );

  useEffect(() => {
    setGlobalLightboxOpen(lightboxOpen);
    return () => setGlobalLightboxOpen(false);
  }, [lightboxOpen, setGlobalLightboxOpen]);

  const openMedia = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main
      style={variables}
      data-showcase-theme={definition.theme}
      className="relative min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-[var(--accent)] selection:text-[var(--dark)]"
    >
      <header
        onFocusCapture={reveal}
        className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--dark)]/92 text-white backdrop-blur-xl transition-transform duration-300 motion-reduce:transition-none ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-7 lg:px-10">
          <Link href="/#extracurriculars" className="flex items-center gap-2 text-xs font-semibold tracking-wide hover:text-[var(--accent)]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Pranil Raichura</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
            {definition.navLabel}
          </p>
          <nav className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.14em] sm:gap-6 sm:text-xs" aria-label={`${definition.navLabel} sections`}>
            <a href="#story" className="hover:text-[var(--accent)]">Story</a>
            <a href="#field-notes" className="hidden hover:text-[var(--accent)] sm:block">Field notes</a>
            <a href="#gallery" className="hover:text-[var(--accent)]">Gallery</a>
          </nav>
        </div>
      </header>

      <section className="relative min-h-[92svh] overflow-hidden bg-[var(--dark)] text-white">
        <Image
          src={definition.hero}
          alt=""
          fill
          priority
          className="object-cover opacity-70"
          style={{ objectPosition: definition.heroPosition ?? "center" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--dark)_0%,rgba(0,0,0,.58)_44%,rgba(0,0,0,.10)_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,var(--glow),transparent_34%)]" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-[1600px] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <div className="max-w-5xl">
            <div className="mb-5 flex items-center gap-4">
              {definition.brandMark && (
                <span className="relative flex h-14 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/90 p-2 shadow-2xl">
                  <Image src={definition.brandMark} alt={definition.brandMarkAlt ?? ""} fill className="object-contain p-2" sizes="80px" />
                </span>
              )}
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)] sm:text-sm">
                {definition.eyebrow}
              </p>
            </div>
            <h1 className="font-libre text-[clamp(3.2rem,9vw,8.6rem)] font-bold leading-[.86] tracking-[-0.055em]">
              {definition.title}<br />
              <span className="text-[var(--accent)]">{definition.accentTitle}</span>
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/78 sm:text-xl lg:text-2xl">
              {definition.deck}
            </p>
          </div>
          <div className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
            <span className="h-px w-10 bg-[var(--accent)]" /> Scroll through the story
          </div>
        </div>
      </section>

      <section id="story" className="relative scroll-mt-20 px-5 py-20 sm:px-8 lg:py-32">
        <div aria-hidden="true" className="showcase-motif pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--muted)]">{definition.introduction.kicker}</p>
            <h2 className="mt-5 font-libre text-4xl font-bold leading-tight tracking-[-.035em] sm:text-5xl lg:text-6xl">
              {definition.introduction.title}
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-[1.75] text-[var(--muted)] sm:text-xl">
            {definition.introduction.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-black/10 bg-black/10 sm:grid-cols-3">
          {definition.facts.map((fact) => (
            <div key={fact.label} className="bg-[var(--surface)] px-7 py-8 sm:px-8 sm:py-10">
              <p className="font-libre text-4xl font-bold tracking-tight sm:text-5xl">{fact.value}</p>
              <p className="mt-2 text-sm leading-snug text-[var(--muted)]">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="field-notes" className="relative scroll-mt-14 bg-[var(--dark)] px-5 py-20 text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent)]">Field notes</p>
              <h2 className="mt-4 font-libre text-4xl font-bold tracking-tight sm:text-6xl">How the work moved.</h2>
            </div>
            <span className="hidden font-libre text-7xl font-bold text-white/[.05] md:block">{definition.chapters.length.toString().padStart(2, "0")}</span>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 lg:grid-cols-3">
            {definition.chapters.map((chapter) => (
              <article key={chapter.number} className="relative min-h-[24rem] bg-[var(--dark)] p-7 sm:p-9">
                <p className="font-libre text-6xl font-bold text-[var(--accent)]/30">{chapter.number}</p>
                <p className="mt-8 text-[10px] font-bold uppercase tracking-[.24em] text-[var(--accent)]">{chapter.kicker}</p>
                <h3 className="mt-3 font-libre text-2xl font-bold leading-tight sm:text-3xl">{chapter.title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/62 sm:text-base">{chapter.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
          <MediaPreview
            definition={definition}
            index={definition.feature.mediaIndex}
            className="aspect-[4/3] w-full shadow-[0_30px_80px_rgba(0,0,0,.16)]"
            onOpen={openMedia}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--muted)]">{definition.feature.kicker}</p>
            <h2 className="mt-5 font-libre text-4xl font-bold leading-tight tracking-[-.035em] sm:text-5xl">{definition.feature.title}</h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{definition.feature.body}</p>
            {definition.links && (
              <div className="mt-8 flex flex-wrap gap-3">
                {definition.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-bold text-[var(--surface)] transition-transform hover:-translate-y-0.5"
                  >
                    {link.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-14 px-5 pb-20 sm:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--muted)]">Visual archive</p>
              <h2 className="mt-3 font-libre text-4xl font-bold sm:text-5xl">Scenes from the story.</h2>
            </div>
            <div className="hidden items-center gap-2 text-sm font-semibold text-[var(--muted)] sm:flex">
              <Camera className="h-4 w-4" aria-hidden="true" /> {definition.media.length} moments
            </div>
          </div>
          <div className="grid auto-rows-[13rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[17rem] lg:grid-cols-12 lg:auto-rows-[18rem]">
            {definition.media.map((item, index) => {
              const layout = index % 6;
              const span = layout === 0 ? "lg:col-span-7 lg:row-span-2" : layout === 1 ? "lg:col-span-5" : layout === 2 ? "lg:col-span-5" : layout === 3 ? "lg:col-span-4" : "lg:col-span-4";
              return (
                <MediaPreview
                  key={`${item.path}-${index}`}
                  definition={definition}
                  index={index}
                  className={`h-full w-full ${span}`}
                  onOpen={openMedia}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--dark)] px-5 py-24 text-white sm:px-8 lg:py-36">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_70%_40%,var(--glow),transparent_38%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="font-libre text-4xl font-bold leading-tight tracking-[-.04em] sm:text-6xl lg:text-7xl">{definition.closing}</p>
          <Link href="/#extracurriculars" className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Return to the full portfolio
          </Link>
        </div>
      </section>

      <MediaLightbox
        media={definition.media}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
