"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  BellRing,
  HeartHandshake,
  Laptop,
  Play,
  ShieldCheck,
  Smartphone,
  UsersRound,
  Video,
  Wifi,
} from "lucide-react";
import { extracurriculars, type Extracurricular } from "@/data/extracurriculars";
import MediaLightbox from "@/components/MediaLightbox";
import { useLightbox } from "@/components/LightboxContext";

type MediaItem = NonNullable<Extracurricular["media"]>[number];

const topics = [
  {
    icon: BellRing,
    title: "Emergency alerts",
    description: "Setting up local notifications so important information reaches people in time.",
  },
  {
    icon: ShieldCheck,
    title: "Scams & phishing",
    description: "Recognizing suspicious calls, messages, links, and requests before responding.",
  },
  {
    icon: Smartphone,
    title: "Everyday devices",
    description: "Making phones, tablets, settings, and accessibility tools feel more approachable.",
  },
  {
    icon: Wifi,
    title: "Online safety",
    description: "Building practical habits around passwords, privacy, downloads, and account security.",
  },
  {
    icon: Video,
    title: "Staying connected",
    description: "Helping participants use video calls and digital tools to reach family and friends.",
  },
  {
    icon: HeartHandshake,
    title: "Telehealth",
    description: "Walking through the digital basics that make remote care easier to access.",
  },
] as const;

const workshopSteps = [
  {
    number: "01",
    title: "Start with the room",
    description:
      "Each session begins with the questions participants actually have—not a generic technology lecture.",
  },
  {
    number: "02",
    title: "Explain without jargon",
    description:
      "Student volunteers turn unfamiliar settings and safety concepts into calm, repeatable steps.",
  },
  {
    number: "03",
    title: "Practice together",
    description:
      "The presentation opens into hands-on help, so participants can apply each lesson on their own device.",
  },
] as const;

const galleryLayouts = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12",
] as const;

function MediaPreview({
  item,
  index,
  onOpen,
}: {
  item: MediaItem;
  index: number;
  onOpen: (index: number) => void;
}) {
  const previewSrc = item.thumbnail ?? item.path;

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative min-h-[240px] overflow-hidden rounded-[1.75rem] bg-slate-900 text-left shadow-[0_18px_60px_rgba(2,6,23,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 ${galleryLayouts[(index - 1) % galleryLayouts.length]}`}
      aria-label={`Open ${item.type === "video" ? "video" : "photo"}: ${item.caption ?? "Tech4Silvers workshop"}`}
    >
      <Image
        src={previewSrc}
        alt={item.caption ?? "Tech4Silvers workshop"}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-transparent" />

      {item.type === "video" ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
          </span>
        </span>
      ) : null}

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
        <span className="max-w-xl text-sm font-medium leading-relaxed text-white/90 md:text-base">
          {item.caption}
        </span>
        <span className="shrink-0 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
          {item.type === "video" ? "Play video" : "View"}
        </span>
      </span>
    </button>
  );
}

export default function Tech4SilversShowcase() {
  const program = useMemo(
    () => extracurriculars.find((item) => item.id === "tech4silvers"),
    [],
  );
  const media = program?.media ?? [];
  const [lightboxOpen, setLightboxOpenLocal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const { setLightboxOpen } = useLightbox();
  const scrollPosition = useRef(0);

  useEffect(() => {
    setLightboxOpen(lightboxOpen);
    return () => setLightboxOpen(false);
  }, [lightboxOpen, setLightboxOpen]);

  useEffect(() => {
    let frame = 0;
    scrollPosition.current = window.scrollY;

    const update = () => {
      frame = 0;
      const nextY = window.scrollY;
      const delta = nextY - scrollPosition.current;
      if (nextY < 40) setHeaderVisible(true);
      else if (Math.abs(delta) > 10) setHeaderVisible(delta < 0);
      scrollPosition.current = nextY;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const openMedia = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpenLocal(true);
  };

  if (!program || !media.length) return null;

  const hero = media[0];
  const galleryMedia = media.slice(1);
  const photoCount = media.filter((item) => item.type === "image").length;
  const videoCount = media.length - photoCount;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f1e8] text-slate-950">
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-slate-200/90 bg-white/95 text-slate-900 shadow-sm backdrop-blur-xl transition-[transform,opacity] duration-500 ease-out ${headerVisible && !lightboxOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-10">
          <Link
            href="/"
            className="font-libre text-xl font-bold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 md:text-2xl"
          >
            Pranil Raichura
          </Link>

          <div className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 sm:block">
            Tech4Silvers
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex" aria-label="Tech4Silvers page">
            <a href="#mission">Mission</a>
            <a href="#workshops">Workshops</a>
            <a href="#field-notes">Field notes</a>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[760px] items-end overflow-hidden bg-slate-950 md:min-h-[880px] md:h-[100svh]">
        <button
          type="button"
          onClick={() => openMedia(0)}
          className="absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-300"
          aria-label={`Open featured photo: ${hero.caption ?? "Tech4Silvers workshop"}`}
        >
          <Image
            src={hero.path}
            alt={hero.caption ?? "Tech4Silvers workshop"}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </button>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.91)_0%,rgba(2,6,23,0.58)_45%,rgba(2,6,23,0.14)_78%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px] [mask-image:linear-gradient(to_right,black,transparent_70%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-32 text-white sm:px-8 md:pb-20 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-amber-300" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                Technology should include everyone
              </p>
            </div>
            <h1 className="font-libre text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.8] tracking-[-0.055em]">
              Tech<span className="text-amber-300">4</span>Silvers
            </h1>
            <p className="mt-7 max-w-2xl text-balance text-xl leading-relaxed text-white/78 md:text-3xl md:leading-snug">
              Helping older adults feel safe, confident, and connected in a digital world.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">Student-run</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">Sacramento + Northern California</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">Workshops + one-on-one help</span>
            </div>
          </div>

          <a
            href="#mission"
            className="pointer-events-auto mt-12 inline-flex items-center gap-3 text-sm font-semibold text-white/75 hover:text-amber-300"
          >
            Enter the story
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </section>

      <section id="mission" className="relative px-5 py-24 sm:px-8 md:py-36 lg:px-10">
        <div className="absolute left-0 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-amber-300/45 blur-3xl md:h-64 md:w-64" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">Why it began</p>
            <h2 className="mt-5 font-libre text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              An alert only works if it reaches everyone.
            </h2>
          </div>

          <div>
            <p className="font-libre text-2xl leading-relaxed text-slate-800 md:text-3xl md:leading-relaxed">
              Tech4Silvers began after Pranil realized that many seniors in his community were missing digital wildfire and emergency alerts.
            </p>
            <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
              <p>
                One small workshop grew into a student-run organization and GBHS club partnering with senior centers across Sacramento and Northern California. Pranil recruits and trains volunteers, designs the lessons and handouts, and leads the sessions.
              </p>
              <p>
                The work is deliberately practical: set up the alert, identify the suspicious message, make the video call, and leave with a process that can be repeated without a volunteer standing nearby.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-slate-300 bg-slate-300 sm:grid-cols-4">
              {[
                ["Dozens", "of seniors helped"],
                ["2–3 hrs", "each week"],
                ["3 years", "and growing"],
                ["1 goal", "digital confidence"],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#fbf9f4] p-5 md:p-6">
                  <p className="font-libre text-2xl font-bold text-slate-950 md:text-3xl">{value}</p>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 md:pb-36 lg:px-10">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.25rem] bg-[#efc764] shadow-[0_30px_90px_rgba(74,55,12,0.18)] lg:grid-cols-2">
          <button
            type="button"
            onClick={() => openMedia(4)}
            className="group relative min-h-[420px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-950 md:min-h-[600px]"
            aria-label="Open hands-on Tech4Silvers workshop photo"
          >
            <Image
              src="/gallery/full/tech4silvers-hands-on.jpg"
              alt="Hands-on help at a Tech4Silvers workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </button>
          <div className="flex flex-col justify-between p-8 sm:p-10 md:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-700">The difference</p>
              <h2 className="mt-6 font-libre text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                Technology should preserve independence—not make people feel left behind.
              </h2>
            </div>
            <p className="mt-16 max-w-md text-base leading-7 text-slate-700 md:text-lg md:leading-8">
              Presentations create a shared foundation. The real work often happens afterward, sitting beside someone and solving the exact problem on the screen in front of them.
            </p>
          </div>
        </div>
      </section>

      <section id="workshops" className="bg-slate-950 px-5 py-24 text-white sm:px-8 md:py-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Inside a workshop</p>
              <h2 className="mt-5 font-libre text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Confidence is built by doing.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/60 lg:justify-self-end">
              Every session combines a clear group lesson with patient, one-on-one support. The aim is not to do the task for someone—it is to make the next time easier.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 lg:grid-cols-3">
            {workshopSteps.map((step) => (
              <article key={step.number} className="bg-slate-950 p-7 sm:p-9">
                <p className="font-libre text-5xl font-bold text-amber-300/35">{step.number}</p>
                <h3 className="mt-8 font-libre text-2xl font-bold">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/55 md:text-base">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <div className="flex items-center gap-3">
              <Laptop className="h-5 w-5 text-amber-300" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/50">What we cover</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map(({ icon: Icon, title, description }) => (
                <article key={title} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-amber-300/35 hover:bg-white/[0.07]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300 text-slate-950">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-libre text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="field-notes" className="bg-slate-950 px-5 pb-28 pt-6 text-white sm:px-8 md:pb-40 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-16 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Field notes</p>
              <h2 className="mt-5 font-libre text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">The work, up close.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/50 md:text-right">
              {photoCount} photos and {videoCount} videos from workshops, team sessions, and one-on-one support. Select any moment to view it full screen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[250px]">
            {galleryMedia.map((item, galleryIndex) => (
              <MediaPreview
                key={`${item.path}-${galleryIndex}`}
                item={item}
                index={galleryIndex + 1}
                onOpen={openMedia}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-amber-300 px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[56px] border-slate-950/5" />
        <div className="relative mx-auto max-w-7xl text-center">
          <UsersRound className="mx-auto h-8 w-8 text-slate-900" aria-hidden="true" />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-slate-700">The bigger idea</p>
          <h2 className="mx-auto mt-5 max-w-5xl font-libre text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
            Digital inclusion starts with meeting people where they are.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
            Tech4Silvers turns technical knowledge into patient, practical service—one workshop, one device, and one question at a time.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#field-notes" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Explore the archive
            </a>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-950/25 bg-white/20 px-6 py-3 text-sm font-semibold text-slate-950 hover:-translate-y-0.5 hover:bg-white/40">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Pranil’s portfolio
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-7 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold uppercase tracking-[0.18em]">Tech4Silvers</p>
          <p>Founded and led by Pranil Raichura</p>
        </div>
      </footer>

      <MediaLightbox
        media={media}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpenLocal(false)}
      />
    </main>
  );
}
