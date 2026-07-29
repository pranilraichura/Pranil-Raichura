"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { workItems, domainOrder, WorkDomain, WorkItem } from "@/data/work";

const domainStyles: Record<WorkDomain, string> = {
    "AI Safety & Evaluation": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "AI & Education": "bg-amber-100 text-amber-800 border-amber-200",
    "Civic & Social Good": "bg-blue-100 text-blue-700 border-blue-200",
    "Accessibility & Health": "bg-rose-100 text-rose-700 border-rose-200",
    "Applied ML & Systems": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const COLLAPSED_LENGTH = 230;

function truncate(text: string) {
    if (text.length <= COLLAPSED_LENGTH) return text;
    const cut = text.slice(0, COLLAPSED_LENGTH);
    const lastSpace = cut.lastIndexOf(" ");
    return `${cut.slice(0, lastSpace > 0 ? lastSpace : COLLAPSED_LENGTH)}…`;
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = item.description.length > COLLAPSED_LENGTH;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06 }}
            className="mb-6 break-inside-avoid bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-slate-200/80 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
        >
            {/* Background media */}
            {item.backgroundMedia && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {item.backgroundMedia.type === "video" ? (
                        <video
                            src={item.backgroundMedia.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={`w-full h-full object-cover ${item.backgroundMedia.className || ""}`}
                            style={{ opacity: item.backgroundMedia.opacity ?? 0.08 }}
                        />
                    ) : (
                        <img
                            src={item.backgroundMedia.src}
                            alt=""
                            className={`w-full h-full object-cover ${item.backgroundMedia.className || ""}`}
                            style={{ opacity: item.backgroundMedia.opacity ?? 0.08 }}
                        />
                    )}
                </div>
            )}

            <div className="relative z-10">
                {/* Domain pills + dates */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                        {item.domains.map((domain) => (
                            <span
                                key={domain}
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${domainStyles[domain]}`}
                            >
                                {domain}
                            </span>
                        ))}
                    </div>
                    {(item.dates || item.years) && (
                        <span className="text-xs text-slate-400 font-medium flex-shrink-0 mt-0.5 text-right">
                            {item.dates || item.years}
                        </span>
                    )}
                </div>

                {/* Title + tagline */}
                <h3 className="text-xl font-bold text-slate-900 leading-tight font-libre">
                    {item.title}
                </h3>
                <p className="text-sm text-primary-600 font-medium mt-1 font-libre">
                    {item.tagline}
                </p>

                {/* Role / organization */}
                {(item.role || item.organization) && (
                    <p className="text-xs text-slate-500 mt-2">
                        {[item.role, item.organization].filter(Boolean).join(" · ")}
                        {item.hoursPerWeek ? ` · ${item.hoursPerWeek}` : ""}
                    </p>
                )}

                {/* Description */}
                <div className="mt-3">
                    <p className="text-sm text-slate-700 leading-relaxed">
                        {expanded ? item.description : truncate(item.description)}
                    </p>
                    {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs text-primary-600 hover:text-primary-700 font-semibold mt-1.5"
                        >
                            {expanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </div>

                {/* Recognition */}
                {item.recognition && (
                    <div className="mt-3 p-2.5 bg-amber-50/90 border-l-2 border-amber-400 rounded">
                        <p className="text-xs font-medium text-amber-900">{item.recognition}</p>
                    </div>
                )}

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                        {item.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start text-xs text-slate-600">
                                <span className="w-1 h-1 bg-primary-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                                <span className="leading-relaxed">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Mentors */}
                {item.mentors && item.mentors.length > 0 && (
                    <div className="mt-4">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                            {item.mentors.length > 1 ? "Mentors" : "Mentor"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.mentors.map((mentor) => (
                                <div
                                    key={mentor.name}
                                    className="flex items-center gap-2 bg-white/80 rounded-lg px-2 py-1.5 shadow-sm border border-slate-100"
                                >
                                    {mentor.image && (
                                        <img
                                            src={mentor.image}
                                            alt={mentor.name}
                                            className="w-7 h-7 rounded-full object-cover border border-slate-100"
                                        />
                                    )}
                                    <div>
                                        <div className="font-medium text-slate-900 text-xs">
                                            {mentor.name}
                                        </div>
                                        <div className="text-[10px] text-slate-500">
                                            {mentor.affiliation}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tech pills */}
                {item.tech && item.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tech.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Paper callout */}
                {item.paperTitle && (
                    <div className="mt-4 bg-blue-50/90 rounded-lg p-3 border-l-2 border-primary-600">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Paper
                        </p>
                        <p className="text-xs text-slate-900 leading-relaxed">{item.paperTitle}</p>
                        <div className="flex items-center gap-2 flex-wrap mt-2">
                            {item.preprintLink && (
                                <a
                                    href={item.preprintLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs underline"
                                >
                                    View preprint →
                                </a>
                            )}
                            {item.status && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-medium">
                                    {item.status}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Status without a paper callout */}
                {!item.paperTitle && item.status && (
                    <div className="mt-4">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-medium">
                            {item.status}
                        </span>
                    </div>
                )}

                {/* Links */}
                {(item.link || item.github) && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-xs transition-colors duration-200"
                            >
                                {item.linkLabel || "View project"} →
                            </a>
                        )}
                        {item.github && (
                            <a
                                href={item.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium text-xs transition-colors duration-200"
                            >
                                View code →
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    );
}

export default function Work() {
    const [selectedDomain, setSelectedDomain] = useState<WorkDomain | "All">("All");

    const filtered =
        selectedDomain === "All"
            ? workItems
            : workItems.filter((item) => item.domains.includes(selectedDomain));

    return (
        <section id="work" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Work</h2>
                    <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        This is the 3 AM version of me from the story above, six years later. Almost
                        none of it started as a research plan — it started as a problem that bothered
                        me and wouldn&apos;t leave. So instead of splitting these into
                        &ldquo;projects&rdquo; and &ldquo;research,&rdquo; they&apos;re grouped by what
                        they&apos;re actually about.
                    </p>
                </motion.div>

                {/* Domain filter */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-12">
                    {(["All", ...domainOrder] as const).map((domain) => (
                        <button
                            key={domain}
                            onClick={() => setSelectedDomain(domain)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedDomain === domain
                                ? "bg-primary-600 text-white shadow-lg scale-105"
                                : "bg-white text-slate-700 hover:bg-slate-100 shadow-md"
                                }`}
                        >
                            {domain}
                        </button>
                    ))}
                </div>

                {/* Masonry columns keep uneven card heights from opening whitespace voids */}
                <div className="columns-1 lg:columns-2 gap-6">
                    {filtered.map((item, index) => (
                        <WorkCard key={`${selectedDomain}-${item.id}`} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
