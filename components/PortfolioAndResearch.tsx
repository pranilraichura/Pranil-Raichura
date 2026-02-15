"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioProjects } from "@/data/portfolio";
import { researchProjects } from "@/data/research";

const categoryColors: Record<string, string> = {
    "AI/ML": "from-purple-500 to-purple-600",
    "Web Development": "from-blue-500 to-blue-600",
    Research: "from-green-500 to-green-600",
    "Game Development": "from-pink-500 to-pink-600",
};

const categoryIcons: Record<string, string> = {
    "AI/ML": "🤖",
    "Web Development": "🌐",
    Research: "🔬",
    "Game Development": "🎮",
};

function PortfolioCard({
    project,
    index,
}: {
    project: (typeof portfolioProjects)[number];
    index: number;
}) {
    const [expanded, setExpanded] = useState(false);
    const descShort =
        project.description.length > 120
            ? project.description.slice(0, 120) + "…"
            : project.description;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="bg-white rounded-xl p-4 shadow-md border border-gray-200 relative overflow-hidden group"
        >
            {/* Category gradient accent */}
            <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${categoryColors[project.category]} opacity-10 rounded-bl-full z-10`}
            />

            {/* Background media */}
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
                            style={{ opacity: project.backgroundMedia.opacity ?? 0.08 }}
                        />
                    ) : (
                        <img
                            src={project.backgroundMedia.src}
                            alt=""
                            className={`w-full h-full object-cover ${project.backgroundMedia.className || ""}`}
                            style={{ opacity: project.backgroundMedia.opacity ?? 0.08 }}
                        />
                    )}
                </div>
            )}

            <div className="relative z-10">
                {/* Category + featured badge */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xl">{categoryIcons[project.category]}</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {project.category}
                        </span>
                    </div>
                    {project.featured && (
                        <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                            Featured
                        </span>
                    )}
                </div>

                {/* Title & tagline */}
                <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight font-libre">
                    {project.title}
                </h3>
                <p className="text-xs text-primary-600 font-medium mb-2 font-libre">
                    {project.tagline}
                </p>

                {/* Description with expand */}
                <div className="mb-2">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {expanded ? project.description : descShort}
                    </p>
                    {project.description.length > 120 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-1"
                        >
                            {expanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </div>

                {/* Recognition */}
                {project.recognition && (
                    <div className="mb-2 p-2 bg-yellow-50 border-l-3 border-yellow-400 rounded">
                        <p className="text-xs font-medium text-yellow-800">
                            🏆 {project.recognition}
                        </p>
                    </div>
                )}

                {/* Tech pills */}
                <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-center text-xs transition-colors duration-200"
                        >
                            View Project →
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium text-center text-xs transition-colors duration-200"
                        >
                            {project.category === "Research" ? "View Paper" : "View Code"} →
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ResearchCard({
    project,
    index,
}: {
    project: (typeof researchProjects)[number];
    index: number;
}) {
    const [expanded, setExpanded] = useState(false);
    const descShort =
        project.description.length > 120
            ? project.description.slice(0, 120) + "…"
            : project.description;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-md border border-gray-200"
        >
            {/* Header: title + dates */}
            <div className="flex items-start justify-between mb-1">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight font-libre">
                        {project.title}
                    </h3>
                    {project.role && (
                        <span className="text-xs text-gray-500 font-libre">{project.role}</span>
                    )}
                </div>
                {/* @ts-ignore */}
                {project.dates && (
                    <span className="text-xs text-gray-400 font-medium ml-2 flex-shrink-0 mt-1">
                        {/* @ts-ignore */}
                        {project.dates}
                    </span>
                )}
            </div>

            {/* Tech */}
            {project.tech && (
                <p className="text-xs text-gray-500 mb-2">
                    <span className="font-medium">Tech:</span> {project.tech}
                </p>
            )}

            {/* Description with expand */}
            <div className="mb-2">
                <p className="text-sm text-gray-700 leading-relaxed">
                    {expanded ? project.description : descShort}
                </p>
                {project.description.length > 120 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-1"
                    >
                        {expanded ? "Show less" : "Read more"}
                    </button>
                )}
            </div>

            {/* Highlights */}
            {project.highlights && (
                <ul className="space-y-1 mb-2">
                    {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-600">
                            <span className="w-1 h-1 bg-primary-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Mentors */}
            {project.mentors && (
                <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Mentors:</p>
                    <div className="flex flex-wrap gap-2">
                        {project.mentors.map((mentor, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 text-xs bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-100"
                            >
                                {/* @ts-ignore */}
                                {mentor.image && (
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-7 h-7 rounded-full object-cover border border-gray-100"
                                    />
                                )}
                                <div>
                                    <div className="font-medium text-gray-900 text-xs">
                                        {mentor.name}
                                    </div>
                                    <div className="text-[10px] text-gray-500">
                                        {mentor.affiliation}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Single mentor */}
            {project.mentor && (
                <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Mentor:</p>
                    <div className="flex items-center gap-2 text-xs bg-white rounded-lg px-2 py-1.5 shadow-sm border border-gray-100 inline-flex">
                        {/* @ts-ignore */}
                        {project.mentor.image && (
                            <img
                                src={project.mentor.image}
                                alt={project.mentor.name}
                                className="w-7 h-7 rounded-full object-cover border border-gray-100"
                            />
                        )}
                        <div>
                            <div className="font-medium text-gray-900 text-xs">
                                {project.mentor.name}
                            </div>
                            <div className="text-[10px] text-gray-500">
                                {project.mentor.affiliation}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Paper callout */}
            {project.paperTitle && (
                <div className="bg-blue-50 rounded-lg p-3 border-l-3 border-primary-600">
                    <p className="text-xs font-semibold text-gray-800 mb-0.5">
                        Research Paper:
                    </p>
                    <p className="text-xs text-gray-900 mb-1">{project.paperTitle}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        {project.preprintLink && (
                            <a
                                href={project.preprintLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-700 font-medium text-xs underline"
                            >
                                View Preprint →
                            </a>
                        )}
                        {project.status && (
                            <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-[10px] font-medium">
                                {project.status}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default function PortfolioAndResearch() {
    return (
        <section
            id="portfolio-research"
            className="py-16 bg-gradient-to-br from-gray-50 to-white"
        >
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Projects &amp; Research
                    </h2>
                    <div className="w-24 h-1 bg-primary-600 mx-auto mb-3"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Innovative projects across AI, web development, and ongoing research
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left column — Portfolio */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 font-libre">
                            <span className="w-1 h-6 bg-primary-600 rounded-full"></span>
                            Project Portfolio
                        </h3>
                        <div className="space-y-4">
                            {portfolioProjects.map((project, index) => (
                                <PortfolioCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Right column — Research */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 font-libre">
                            <span className="w-1 h-6 bg-primary-600 rounded-full"></span>
                            Experience &amp; Research
                        </h3>
                        <div className="space-y-4">
                            {researchProjects.map((project, index) => (
                                <ResearchCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
