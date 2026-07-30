"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    workItems,
    domainOrder,
    tech4SilversFeature,
    WorkDomain,
    WorkItem,
} from "@/data/work";
import { ScrollReveal, ScrollRevealGroup } from "./ScrollReveal";

const domainStyles: Record<WorkDomain, string> = {
    "AI Safety & Evaluation": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "AI & Education": "bg-amber-100 text-amber-800 border-amber-200",
    "Civic & Social Good": "bg-blue-100 text-blue-700 border-blue-200",
    "Accessibility & Health": "bg-rose-100 text-rose-700 border-rose-200",
    "Applied ML & Systems": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const domainAccents: Record<WorkDomain, string> = {
    "AI Safety & Evaluation": "bg-indigo-500",
    "AI & Education": "bg-amber-500",
    "Civic & Social Good": "bg-blue-500",
    "Accessibility & Health": "bg-rose-500",
    "Applied ML & Systems": "bg-emerald-500",
};

// Beyond Euler leads because the Story section closes on it; the rest follow by weight.
const featuredOrder = ["ml-structural-engineering", "ai-reasoning-visualization", "meridian"];

function orderFeatured(a: WorkItem, b: WorkItem) {
    const ai = featuredOrder.indexOf(a.id);
    const bi = featuredOrder.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
}

// The pull-quote is a verbatim sentence from the description, so drop it from the
// body copy rather than printing the same sentence twice.
function bodyWithoutPullQuote(item: WorkItem) {
    if (!item.pullQuote) return item.description;
    return item.description.replace(item.pullQuote, "").replace(/\s+/g, " ").trim();
}

function DomainPills({ domains }: { domains: WorkDomain[] }) {
    return (
        <>
            {domains.map((domain) => (
                <span
                    key={domain}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${domainStyles[domain]}`}
                >
                    {domain}
                </span>
            ))}
        </>
    );
}

/** Everything below the headline: highlights, mentorship, tech, paper, links. */
function WorkDetails({ item }: { item: WorkItem }) {
    return (
        <>
            {item.recognition && (
                <div className="mt-4 p-2.5 bg-amber-50/90 border-l-2 border-amber-400 rounded">
                    <p className="text-xs font-medium text-amber-900">{item.recognition}</p>
                </div>
            )}

            {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                    {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-600">
                            <span className="w-1 h-1 bg-primary-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span className="leading-relaxed">{highlight}</span>
                        </li>
                    ))}
                </ul>
            )}

            {item.mentors && item.mentors.length > 0 && (
                <div className="mt-4">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Mentorship
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {item.mentors.map((mentor) => (
                            <div
                                key={`${mentor.name}-${mentor.affiliation}`}
                                className="flex items-center gap-2.5 min-w-0"
                            >
                                {mentor.image && (
                                    <img
                                        src={mentor.image}
                                        alt=""
                                        loading="lazy"
                                        className="h-9 w-9 rounded-full object-cover border border-slate-200"
                                    />
                                )}
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-slate-700">
                                        {mentor.name}
                                    </p>
                                    <p className="text-[11px] text-slate-500 leading-snug">
                                        {mentor.affiliation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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

            {!item.paperTitle && item.status && (
                <div className="mt-4">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-medium">
                        {item.status}
                    </span>
                </div>
            )}

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
        </>
    );
}

function FeaturedHeading({ item }: { item: WorkItem }) {
    return (
        <>
            <div className="flex flex-wrap gap-1.5 mb-3">
                <DomainPills domains={item.domains} />
                {(item.dates || item.years) && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-slate-200 bg-slate-50 text-slate-500">
                        {item.dates || item.years}
                    </span>
                )}
            </div>
            <h3 className="font-libre text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {item.title}
            </h3>
            <p className="font-libre text-base text-primary-600 font-medium mt-1.5">
                {item.tagline}
            </p>
            {(item.role || item.organization) && (
                <p className="text-xs text-slate-500 mt-2">
                    {[item.role, item.organization].filter(Boolean).join(" · ")}
                    {item.hoursPerWeek ? ` · ${item.hoursPerWeek}` : ""}
                </p>
            )}
            {item.pullQuote && (
                <p className="font-libre text-lg md:text-xl leading-relaxed text-slate-800 border-l-2 border-primary-500 pl-5 mt-5">
                    {item.pullQuote}
                </p>
            )}
        </>
    );
}

/** Full-width featured tile: text on one side, a real photo on the other. */
function FeaturedWithFigure({ item }: { item: WorkItem }) {
    return (
        <article
            className="rounded-3xl bg-white shadow-xl border border-slate-200/80 overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 p-7 md:p-9">
                    <FeaturedHeading item={item} />
                    <p className="text-sm text-slate-700 leading-relaxed mt-5">
                        {bodyWithoutPullQuote(item)}
                    </p>
                    <WorkDetails item={item} />
                </div>
                {item.figure && (
                    <figure className="lg:col-span-2 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col">
                        <div className="relative flex-1 min-h-[280px]">
                            <img
                                src={item.figure.src}
                                alt={item.figure.alt}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                        </div>
                        <figcaption className="text-xs text-slate-500 leading-relaxed p-5 border-t border-slate-200/80">
                            {item.figure.caption}
                        </figcaption>
                    </figure>
                )}
            </div>
        </article>
    );
}

/** Featured tile for work with no photo available; typography carries it instead. */
function FeaturedTypographic({ item }: { item: WorkItem }) {
    return (
        <article
            className="rounded-3xl bg-white shadow-xl border border-slate-200/80 p-7 md:p-9"
        >
            <FeaturedHeading item={item} />
            <p className="text-sm text-slate-700 leading-relaxed mt-5">
                {bodyWithoutPullQuote(item)}
            </p>
            <WorkDetails item={item} />
        </article>
    );
}

/**
 * Tech4Silvers lives in the Extracurriculars section. This tile points at that card
 * instead of restating its content as a second entry.
 */
function Tech4SilversTile() {
    const t4s = tech4SilversFeature;

    return (
        <article
            className="rounded-3xl bg-white shadow-xl border border-slate-200/80 overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-5">
                <figure className="lg:col-span-2 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col">
                    <div className="relative flex-1 min-h-[240px]">
                        <img
                            src={t4s.image.src}
                            alt={t4s.image.alt}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </div>
                    <figcaption className="text-xs text-slate-500 p-5 border-t border-slate-200/80">
                        {t4s.image.caption}
                    </figcaption>
                </figure>
                <div className="lg:col-span-3 p-7 md:p-9 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-blue-100 text-blue-700 border-blue-200">
                            Civic &amp; Social Good
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-slate-200 bg-slate-50 text-slate-500">
                            {t4s.years}
                        </span>
                    </div>
                    <h3 className="font-libre text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                        {t4s.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2">{t4s.role}</p>
                    <p className="font-libre text-lg md:text-xl leading-relaxed text-slate-800 border-l-2 border-primary-500 pl-5 mt-5">
                        {t4s.pullQuote}
                    </p>
                    <a
                        href={t4s.href}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 self-start"
                    >
                        Read the full Tech4Silvers card in Extracurriculars
                        <span aria-hidden="true">↓</span>
                    </a>
                </div>
            </div>
        </article>
    );
}

function CondensedRow({ item }: { item: WorkItem }) {
    const [open, setOpen] = useState(false);
    const panelId = `work-panel-${item.id}`;
    const accent = domainAccents[item.domains[0]];

    return (
        <div className="relative">
            <span
                aria-hidden="true"
                className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${accent} transition-transform duration-300 ${open ? "scale-y-100" : "scale-y-50"
                    }`}
            ></span>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={panelId}
                className={`w-full text-left pl-7 pr-5 flex items-center gap-4 hover:bg-slate-50 transition-all duration-200 ${open ? "pt-6 pb-4 bg-slate-50/70" : "py-4"
                    }`}
            >
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="font-libre text-base md:text-lg font-semibold text-slate-900">
                            {item.title}
                        </h4>
                        {(item.dates || item.years) && (
                            <span className="text-xs text-slate-400">
                                {item.dates || item.years}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-600 leading-snug mt-1">{item.tagline}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2 sm:hidden">
                        <DomainPills domains={item.domains} />
                    </div>
                </div>
                <div className="hidden sm:flex flex-wrap justify-end gap-1.5 max-w-[240px]">
                    <DomainPills domains={item.domains} />
                </div>
                <svg
                    className={`w-4 h-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pl-7 pr-6 pb-7 pt-2 bg-gradient-to-r from-slate-50/90 to-white">
                            {(item.role || item.organization) && (
                                <p className="text-xs text-slate-500 mb-3">
                                    {[item.role, item.organization].filter(Boolean).join(" · ")}
                                    {item.hoursPerWeek ? ` · ${item.hoursPerWeek}` : ""}
                                </p>
                            )}
                            <p className="text-sm text-slate-700 leading-relaxed">
                                {item.description}
                            </p>
                            <WorkDetails item={item} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Work() {
    const [selectedDomain, setSelectedDomain] = useState<WorkDomain | "All">("All");

    const filtered =
        selectedDomain === "All"
            ? workItems
            : workItems.filter((item) => item.domains.includes(selectedDomain));

    const featured = filtered.filter((item) => item.featured).sort(orderFeatured);
    const featuredWithFigure = featured.filter((item) => item.figure);
    const featuredTypographic = featured.filter((item) => !item.figure);
    const rest = filtered.filter((item) => !item.featured);
    // Tech4Silvers isn't a Work entry, so it only belongs in the unfiltered view.
    const showTech4Silvers = selectedDomain === "All";

    return (
        <section id="work" className="pt-16 pb-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal className="text-center mb-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600 mb-3">
                        Research, systems, and impact
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Work</h2>
                    <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        This is the 3 AM version of me from the story above, six years later. Almost
                        none of it started as a research plan. It started as a problem that bothered
                        me and wouldn&apos;t leave. So instead of splitting these into
                        &ldquo;projects&rdquo; and &ldquo;research,&rdquo; they&apos;re grouped by what
                        they&apos;re actually about.
                    </p>
                </ScrollReveal>

                {/* Domain filter */}
                <ScrollReveal className="flex flex-wrap justify-center gap-2.5 mb-12" distance={18}>
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
                </ScrollReveal>

                {(featured.length > 0 || showTech4Silvers) && (
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 flex-shrink-0">
                                Start here
                            </h3>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>

                        <ScrollRevealGroup
                            dependencyKey={selectedDomain}
                            className="space-y-6"
                            stagger={0.1}
                        >
                            {featuredWithFigure.map((item) => (
                                <div key={item.id} data-reveal-item>
                                    <FeaturedWithFigure item={item} />
                                </div>
                            ))}
                            {showTech4Silvers && (
                                <div data-reveal-item>
                                    <Tech4SilversTile />
                                </div>
                            )}
                            {featuredTypographic.length > 0 && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                    {featuredTypographic.map((item) => (
                                        <div key={item.id} data-reveal-item>
                                            <FeaturedTypographic item={item} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollRevealGroup>
                    </div>
                )}

                {rest.length > 0 && (
                    <div>
                        <div className="flex items-center gap-4 mb-5">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 flex-shrink-0">
                                {featured.length > 0 ? "Everything else" : "Projects & research"}
                            </h3>
                            <div className="h-px bg-slate-200 flex-1"></div>
                            <span className="text-xs text-slate-400 flex-shrink-0">
                                {rest.length} {rest.length === 1 ? "project" : "projects"} · expand
                                for details
                            </span>
                        </div>

                        <ScrollRevealGroup
                            dependencyKey={selectedDomain}
                            className="rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-md overflow-hidden"
                            stagger={0.065}
                        >
                            {rest.map((item) => (
                                <div
                                    key={`${selectedDomain}-${item.id}`}
                                    data-reveal-item
                                    className="border-b border-slate-200/70 last:border-b-0"
                                >
                                    <CondensedRow item={item} />
                                </div>
                            ))}
                        </ScrollRevealGroup>
                    </div>
                )}
            </div>
        </section>
    );
}
