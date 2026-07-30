"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BrainCircuit,
  Code2,
  HandHeart,
  Landmark,
  Music2,
  Trophy,
  UsersRound,
} from "lucide-react";
import { extracurriculars, Extracurricular } from "@/data/extracurriculars";
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

export default function Extracurriculars() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpenLocal] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<any[]>([]);
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

  const openLightbox = (media: any[], index: number = 0) => {
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
            If the story above is what changed in my head, this is where it went in practice:
            the courts I stopped hiding on, the club I rebuilt, and the rooms full of seniors
            and shelter residents that made service feel less like a requirement and more like
            the point.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.075}
        >
          {filteredExtracurriculars.map((ec) => (
            <div key={ec.id} data-reveal-item className="h-full">
              <motion.article
                id={`ec-${ec.id}`}
                whileHover={{ scale: 1.015, y: -5 }}
                transition={{ duration: 0.24 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 overflow-hidden scroll-mt-28 h-full"
              >
              {/* Media Preview */}
              {ec.media && ec.media.length > 0 ? (
                <div className="mb-4">
                  {ec.media.length === 1 ? (
                    // Single image/video
                    <div
                      className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(ec.media!, 0)}
                    >
                      {ec.media[0].type === 'image' ? (
                        <>
                          <Image
                            src={ec.media[0].path}
                            alt={ec.media[0].caption || ec.title}
                            fill
                            className={`transition-transform duration-300 group-hover:scale-110 ${ec.media[0].fit === 'contain' ? 'object-contain bg-slate-50 p-2' : 'object-cover'}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to view
                            </div>
                          </div>
                        </>
                      ) : (
                        // Video Preview
                        ec.media[0].thumbnail ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={ec.media[0].thumbnail}
                              alt={ec.media[0].caption || ec.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <svg className="w-16 h-16 text-white opacity-90 shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                              </svg>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                              Video
                            </span>
                          </div>
                        ) : (
                          <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                              </svg>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Video
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    // Multiple images - Show grid
                    <div className="grid grid-cols-3 gap-2">
                      {ec.media.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
                          onClick={() => openLightbox(ec.media!, idx)}
                        >
                          {item.type === 'image' ? (
                            <Image
                              src={item.path}
                              alt={item.caption || `${ec.title} ${idx + 1}`}
                              fill
                              className={`transition-transform duration-300 group-hover:scale-110 ${item.fit === 'contain' ? 'object-contain bg-slate-50 p-1.5' : 'object-cover'}`}
                              sizes="150px"
                            />
                          ) : (
                            item.thumbnail ? (
                              <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
                                <Image
                                  src={item.thumbnail}
                                  alt={item.caption || `${ec.title} video thumbnail`}
                                  fill
                                  className="object-cover"
                                  sizes="150px"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <svg className="w-8 h-8 text-white opacity-90" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                </svg>
                              </div>
                            )
                          )}
                          {idx === 2 && ec.media && ec.media.length > 3 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold">
                              +{ec.media.length - 3}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Media count badge */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => openLightbox(ec.media!, 0)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      View {ec.media.length} {ec.media.length === 1 ? 'item' : 'items'}
                    </button>
                  </div>
                </div>
              ) : (
                // No media - an intentional category-led visual treatment.
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center px-5">
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

              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 flex-1">{ec.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[ec.category] || "bg-gray-100 text-gray-700"
                    }`}
                >
                  {ec.category}
                </span>
              </div>

              {(ec.years || ec.hoursPerWeek || ec.leadership) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {ec.years && <span className="text-sm text-gray-600">{ec.years}</span>}
                  {ec.hoursPerWeek && (
                    <span className="text-sm text-gray-500">
                      {ec.years ? "• " : ""}{ec.hoursPerWeek}
                    </span>
                  )}
                  {ec.leadership && (
                    <span className="text-sm font-semibold text-primary-600">
                      {ec.years || ec.hoursPerWeek ? "• " : ""}{ec.leadership}
                    </span>
                  )}
                </div>
              )}

              <p className={`text-gray-700 text-sm mb-4 ${expandedId === ec.id ? "" : "line-clamp-3"}`}>
                {ec.description}
              </p>

              {/* Expandable section */}
              <div
                className="cursor-pointer"
                onClick={() => setExpandedId(expandedId === ec.id ? null : ec.id)}
              >
                {expandedId === ec.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    {ec.achievements && ec.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {ec.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-gray-700">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {ec.links && ec.links.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Links:</h4>
                        <div className="space-y-1">
                          {ec.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
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

                <div className="text-primary-600 text-sm font-medium mt-4">
                  {expandedId === ec.id ? "Click to collapse" : "Click to expand"}
                </div>
              </div>
              </motion.article>
            </div>
          ))}
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
