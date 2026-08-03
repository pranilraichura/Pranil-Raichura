"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";

interface MediaItem {
    type: 'image' | 'video';
    path: string;
    caption?: string;
    thumbnail?: string;
}

interface MediaLightboxProps {
    media: MediaItem[];
    isOpen: boolean;
    onClose: () => void;
    initialIndex?: number;
}

export default function MediaLightbox({ media, isOpen, onClose, initialIndex = 0 }: MediaLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
    }, [media.length]);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    }, [media.length]);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrevious, isOpen, onClose]);

    // Prevent scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const currentMedia = media[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
                        aria-label="Close lightbox"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 z-10 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                        {currentIndex + 1} / {media.length}
                    </div>

                    {/* Main Content */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-7xl max-h-[90vh] w-auto mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {currentMedia.type === 'image' ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={currentMedia.path}
                                    alt={currentMedia.caption || 'Image'}
                                    width={1920}
                                    height={1080}
                                    className="max-h-[80vh] w-auto object-contain rounded-lg"
                                    quality={95}
                                />
                            </div>
                        ) : (
                            <video
                                src={currentMedia.path}
                                controls
                                autoPlay
                                playsInline
                                preload="metadata"
                                className="max-h-[80vh] w-full rounded-lg"
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}

                        {/* Caption */}
                        {currentMedia.caption && (
                            <div className="mt-4 text-center text-white text-lg">
                                {currentMedia.caption}
                            </div>
                        )}
                    </motion.div>

                    {/* Navigation Arrows */}
                    {media.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrevious();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70"
                                aria-label="Previous image"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70"
                                aria-label="Next image"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Thumbnail Strip */}
                    {media.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg max-w-full overflow-x-auto">
                            {media.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(index);
                                    }}
                                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${index === currentIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    {item.type === 'image' ? (
                                        <Image
                                            src={item.thumbnail ?? item.path}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
