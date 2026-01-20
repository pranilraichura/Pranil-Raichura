"use client";

import { motion } from "framer-motion";
import { portfolioProjects } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
    "AI/ML": "from-purple-500 to-purple-600",
    "Web Development": "from-blue-500 to-blue-600",
    "Research": "from-green-500 to-green-600",
    "Game Development": "from-pink-500 to-pink-600",
};

const categoryIcons: Record<string, string> = {
    "AI/ML": "🤖",
    "Web Development": "🌐",
    "Research": "🔬",
    "Game Development": "🎮",
};

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Project Portfolio
                    </h2>
                    <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Showcasing innovative projects across AI, web development, and research
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {portfolioProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 relative overflow-hidden group"
                        >
                            {/* Category badge with gradient */}
                            <div
                                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${categoryColors[project.category]} opacity-10 rounded-bl-full z-10`}
                            />

                            {project.backgroundMedia && (
                                <div className="absolute inset-0 z-0">
                                    {project.backgroundMedia.type === "video" ? (
                                        <video
                                            src={project.backgroundMedia.src}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className={`w-full h-full object-cover ${project.backgroundMedia.className || ""}`}
                                            style={{ opacity: project.backgroundMedia.opacity ?? 0.1 }}
                                        />
                                    ) : (
                                        <img
                                            src={project.backgroundMedia.src}
                                            alt=""
                                            className={`w-full h-full object-cover ${project.backgroundMedia.className || ""}`}
                                            style={{ opacity: project.backgroundMedia.opacity ?? 0.1 }}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="relative">
                                {/* Category icon and label */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl">{categoryIcons[project.category]}</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                            {project.category}
                                        </span>
                                    </div>
                                    {project.featured && (
                                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Project title and tagline */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-primary-600 font-medium mb-4">
                                    {project.tagline}
                                </p>

                                {/* Description */}
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {/* Recognition badge */}
                                {project.recognition && (
                                    <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                        <p className="text-sm font-medium text-yellow-800">
                                            🏆 {project.recognition}
                                        </p>
                                    </div>
                                )}

                                {/* Tech stack */}
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-600 mb-2">TECH STACK</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-center transition-colors duration-200"
                                        >
                                            View Project →
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium text-center transition-colors duration-200"
                                        >
                                            {project.category === "Research" ? "View Paper" : "View Code"} →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
