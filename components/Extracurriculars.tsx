"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { extracurriculars, Extracurricular } from "@/data/extracurriculars";
import MediaLightbox from "./MediaLightbox";
import { useLightbox } from "./LightboxContext";

const categories = ["All", "Research", "Sports", "Service", "Tech", "Music", "Leadership"] as const;
type Category = typeof categories[number];

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
    <section id="extracurriculars" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Extracurriculars & Leadership
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExtracurriculars.map((ec, index) => (
            <motion.div
              key={ec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 overflow-hidden"
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
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to view
                            </div>
                          </div>
                        </>
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
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              sizes="150px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                              </svg>
                            </div>
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
                // No media - show placeholder
                <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center px-2">{ec.title}</span>
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

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-sm text-gray-600">{ec.years}</span>
                {ec.hoursPerWeek && (
                  <span className="text-sm text-gray-500">• {ec.hoursPerWeek}</span>
                )}
                {ec.leadership && (
                  <span className="text-sm font-semibold text-primary-600">• {ec.leadership}</span>
                )}
              </div>

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
            </motion.div>
          ))}
        </div>
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
