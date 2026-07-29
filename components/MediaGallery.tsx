"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const mediaCategories = ["All", "Volleyball", "Research", "Service", "Personal"] as const;
type MediaCategory = typeof mediaCategories[number];

// TODO: Update these paths with your actual images/videos
// Add images to /public/media/ folder and update the paths below
const mediaItems = [
  {
    id: "1",
    type: "image" as const,
    category: "Volleyball" as MediaCategory,
    title: "Volleyball Tournament",
    src: "/media/volleyball-tournament.jpg", // Update this path
    thumbnail: "/media/volleyball-tournament.jpg",
  },
  {
    id: "2",
    type: "image" as const,
    category: "Research" as MediaCategory,
    title: "Research Presentation",
    src: "/media/research-presentation.jpg", // Update this path
    thumbnail: "/media/research-presentation.jpg",
  },
  {
    id: "3",
    type: "image" as const,
    category: "Service" as MediaCategory,
    title: "Tech4Silvers Event",
    src: "/media/tech4silvers-event.jpg", // Update this path
    thumbnail: "/media/tech4silvers-event.jpg",
  },
  {
    id: "4",
    type: "video" as const,
    category: "Personal" as MediaCategory,
    title: "Personal Video",
    src: "/media/personal-video.mp4", // Update this path
    thumbnail: "/media/personal-video-thumbnail.jpg", // Add thumbnail image
  },
  // Add more items here as needed
];

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<typeof mediaItems[0] | null>(null);

  const filteredMedia =
    selectedCategory === "All"
      ? mediaItems
      : mediaItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (media: typeof mediaItems[0]) => {
    setSelectedMedia(media);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedMedia(null);
  };

  return (
    <section id="media" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Media Gallery
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Photos and videos from my activities, research, and personal life
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {mediaCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => openLightbox(item)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm opacity-90">{item.category}</p>
              </div>
              {item.type === "image" ? (
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-primary-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Add Image</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent-orange/30 to-primary-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Add Video</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Instagram:</span> Follow me @pranilraichura (1k+ followers)
          </p>
          <p className="text-sm text-gray-500">
            Note: Add your actual images and videos to the /public folder and update the mediaItems array
          </p>
        </motion.div>

        {/* Lightbox */}
        {lightboxOpen && selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
              >
                ×
              </button>
              {selectedMedia.type === "image" ? (
                <div className="w-full h-auto bg-gray-800 rounded-lg p-4">
                  <p className="text-white text-center mb-4">{selectedMedia.title}</p>
                  <div className="w-full aspect-video bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-gray-400">Image placeholder</span>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-gray-800 rounded-lg p-4">
                  <p className="text-white text-center mb-4">{selectedMedia.title}</p>
                  <div className="w-full aspect-video bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-gray-400">Video placeholder</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

