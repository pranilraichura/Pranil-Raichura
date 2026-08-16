"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BrainCircuit,
  ChevronDown,
  Code2,
  HandHeart,
  Landmark,
  Music2,
  Trophy,
  UsersRound,
} from "lucide-react";
import { extracurriculars, type ActivityMedia } from "@/data/extracurriculars";
import MediaLightbox from "./MediaLightbox";
import { useLightbox } from "./LightboxContext";
import { ScrollReveal, ScrollRevealGroup } from "./ScrollReveal";

const categories = ["All", "Research", "Sports", "Service", "Tech", "Music", "Leadership"] as const;
type Category = typeof categories[number];

const categoryIcons = {
  Research: BrainCircuit,
  Sports: Trophy,
  Service: HandHeart,
  Tech: Code2,
  Music: Music2,
  Leadership: Landmark,
} as const;

const categoryAccents: Record<string, string> = {
  Research: "from-purple-500 to-violet-400",
  Sports: "from-emerald-500 to-green-400",
  Service: "from-blue-500 to-cyan-400",
  Tech: "from-indigo-500 to-blue-400",
  Music: "from-pink-500 to-rose-400",
  Leadership: "from-amber-500 to-yellow-400",
};

export default function Extracurriculars() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpenLocal] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<ActivityMedia[]>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const { setLightboxOpen: setGlobalLightboxOpen } = useLightbox();

  // Sync local lightbox state with global context
  useEffect(() => {
    setGlobalLightboxOpen(lightboxOpen);
  }, [lightboxOpen, setGlobalLightboxOpen]);

  const filteredExtracurriculars =
    selectedCategory === "All"
      ? extracurriculars
      : extracurriculars.filter((ec) => ec.category === selectedCategory);

  const categoryColors: Record<string, string> = {
    Research: "bg-purple-100 text-purple-700 border-purple-300",
    Sports: "bg-green-100 text-green-700 border-green-300",
    Service: "bg-blue-100 text-blue-700 border-blue-300",
    Tech: "bg-indigo-100 text-indigo-700 border-indigo-300",
    Music: "bg-pink-100 text-pink-700 border-pink-300",
    Leadership: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  const openLightbox = (media: ActivityMedia[], index: number = 0) => {
    setLightboxMedia(media);
    setLightboxInitialIndex(index);
    setLightboxOpenLocal(true);
  };

  return (
    <section
      id="extracurriculars"
      className="pt-24 pb-12 relative"
      style={{
        backgroundImage: 'url(/starry_night.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

      {/* Subtle Top Divider Gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10"></div>

      {/* Bottom Gradient Transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600 mb-3">
            Beyond the classroom
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Extracurriculars & Leadership
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Outside class, I lead community service projects, compete in programming and
            volleyball, and perform violin. These are the teams, clubs, and organizations where
            I spend most of my time.
          </p>
        </ScrollReveal>

        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-12" distance={18}>
          {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === category
                  ? "bg-primary-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                  }`}
              >
                {category}
              </button>
            ))}
        </ScrollReveal>

        <ScrollRevealGroup
          dependencyKey={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8"
          stagger={0.075}
        >
          {filteredExtracurriculars.map((ec) => {
            const isExpanded = expandedId === ec.id;
            const visibleHighlights = ec.achievements?.slice(0, 2) ?? [];
            const remainingHighlights = ec.achievements?.slice(2) ?? [];
            const hasExpandableContent =
              ec.description.length > 360 || remainingHighlights.length > 0 || Boolean(ec.links?.length);

            return (
            <div key={ec.id} data-reveal-item className="h-full">
              <motion.article
                id={`ec-${ec.id}`}
                whileHover={{ scale: 1.012, y: -7 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="group/card relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.09)] transition-shadow duration-300 hover:shadow-[0_22px_52px_rgba(15,23,42,0.15)] sm:p-7"
              >
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${categoryAccents[ec.category] || "from-slate-500 to-slate-300"}`}
              />
              {/* Media Preview */}
              {ec.media && ec.media.length > 0 ? (
                <div className="mb-6">
                  <button
                    type="button"
                    className="group relative block h-56 w-full overflow-hidden rounded-xl bg-slate-950 text-left shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:h-64"
                    onClick={() => openLightbox(ec.media!, 0)}
                    aria-label={`Open ${ec.title} ${ec.media.length > 1 ? `gallery with ${ec.media.length} items` : "media"}`}
                  >
                    {ec.media[0].type === 'image' ? (
                      <Image
                        src={ec.media[0].thumbnail ?? ec.media[0].path}
                        alt={ec.media[0].caption || ec.title}
                        fill
                        className={`transition-transform duration-500 ease-out group-hover:scale-[1.035] ${ec.media[0].fit === 'contain' ? 'object-contain bg-slate-50 p-2' : 'object-cover'}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : ec.media[0].thumbnail ? (
                      <Image
                        src={ec.media[0].thumbnail}
                        alt={ec.media[0].caption || ec.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-950" />
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                      <span className="translate-y-1 rounded-full border border-white/30 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {ec.media.length > 1 ? "View gallery" : "View image"}
                      </span>
                    </div>

                    {ec.media[0].type === 'video' && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <svg className="h-14 w-14 text-white opacity-90 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                    )}

                    {ec.media.length > 1 && (
                      <span className="absolute right-3 top-1/2 flex h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/75 px-3 text-sm font-bold text-white shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                        +{ec.media.length - 1}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                // No media - an intentional category-led visual treatment.
                <div className="relative mb-6 flex h-56 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-950 px-5 text-center sm:h-64">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.34),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(249,115,22,0.28),transparent_36%)]"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]"
                  ></div>
                  <div className="relative mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-lg">
                    {(() => {
                      const CategoryIcon = categoryIcons[ec.category] || UsersRound;
                      return <CategoryIcon className="h-5 w-5" strokeWidth={1.8} />;
                    })()}
                  </div>
                  <span className="relative mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-200">
                    {ec.category}
                  </span>
                  <span className="relative text-white font-libre font-semibold leading-snug">
                    {ec.title}
                  </span>
                  {ec.leadership && (
                    <span className="relative mt-1.5 text-xs text-slate-300 font-medium">
                      {ec.leadership}
                    </span>
                  )}
                </div>
              )}

              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="flex-1 font-libre text-2xl font-bold leading-tight text-gray-900">{ec.title}</h3>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[ec.category] || "bg-gray-100 text-gray-700"
                    }`}
                >
                  {ec.category}
                </span>
              </div>

              {(ec.years || ec.hoursPerWeek || ec.leadership) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {ec.years && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{ec.years}</span>}
                  {ec.hoursPerWeek && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {ec.hoursPerWeek}
                    </span>
                  )}
                  {ec.leadership && (
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                      {ec.leadership}
                    </span>
                  )}
                </div>
              )}

              <p
                id={`ec-description-${ec.id}`}
                className={`mb-5 text-[15px] leading-6 text-slate-700 ${isExpanded ? "" : "line-clamp-6"}`}
              >
                {ec.description}
              </p>

              {visibleHighlights.length > 0 && (
                <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    At a glance
                  </p>
                  <ul className="space-y-2">
                    {visibleHighlights.map((achievement) => (
                      <li key={achievement} className="flex gap-2 text-sm leading-5 text-slate-700">
                        <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expandable section */}
              <div className="mt-auto">
                <AnimatePresence initial={false}>
                {isExpanded && (remainingHighlights.length > 0 || Boolean(ec.links?.length)) && (
                  <motion.div
                    id={`ec-details-${ec.id}`}
                    role="region"
                    aria-label={`${ec.title} details`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden border-t border-gray-200 pt-4"
                  >
                    {remainingHighlights.length > 0 && (
                      <div className="mb-4">
                        <h4 className="mb-2 font-semibold text-gray-800">More highlights</h4>
                        <ul className="list-inside list-disc space-y-1">
                          {remainingHighlights.map((achievement) => (
                            <li key={achievement} className="text-sm text-gray-700">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {ec.links && ec.links.length > 0 && (
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-800">Links</h4>
                        <div className="space-y-1">
                          {ec.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target={link.url.startsWith("http") ? "_blank" : undefined}
                              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-primary-600 hover:text-primary-700 text-sm block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.text} →
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
                </AnimatePresence>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                  {ec.detailPage && (
                    <Link
                      href={ec.detailPage.href}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      {ec.detailPage.label}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  )}

                  {hasExpandableContent && (
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : ec.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`ec-description-${ec.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      {isExpanded ? "Show less" : "Read full entry"}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
              </div>
              </motion.article>
            </div>
          );
          })}
        </ScrollRevealGroup>
      </div>

      {/* Lightbox */}
      <MediaLightbox
        media={lightboxMedia}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpenLocal(false)}
        initialIndex={lightboxInitialIndex}
      />
    </section>
  );
}
