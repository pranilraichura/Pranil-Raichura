"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TimelineEvent {
    id: string;
    title: string;
    phase: string;
    content: string[];
    year?: string;
}

const timelineEvents: TimelineEvent[] = [
    {
        id: "intro",
        title: "Understanding Pressure",
        phase: "Beginning",
        content: [
            "Pressure has been a constant presence in my life, even before I understood what to call it.",
            "For a long time, I believed that I simply lacked the 'talent' to handle pressure—that I was inherently too anxious, too self-conscious, and too afraid of failure.",
        ],
    },
    {
        id: "squash",
        title: "The Squash Tournament",
        phase: "Fifth Grade",
        year: "First Challenge",
        content: [
            "In fifth grade, my parents enrolled me in squash at the Bay Club in Santa Clara. Squash wasn't a passion I had discovered on my own; my parents noticed that a family friend's son was excelling in the sport and winning national awards, and they hoped I could follow a similar path.",
            "On the morning of my first tournament, my mom told me, 'Don't worry about the outcome, just do your best.' I walked onto the court expecting to win. I knew my opponent, Samyak, from practice and believed I was better than him.",
            "But as the match began, I started losing—point by point, game by game—while a crowd watched from behind the glass wall. When it was over, I ran to the bathroom and cried for twenty minutes, too embarrassed to come out.",
            "That loss convinced me that maybe I was not someone who could perform under pressure.",
        ],
    },
    {
        id: "volleyball-start",
        title: "A Fresh Start: Volleyball",
        phase: "Middle School",
        content: [
            "Soon after, I quit squash and transitioned to volleyball, inspired by my best friend who played competitively. I convinced myself that a team sport would 'split' the pressure among teammates.",
            "In middle school, that illusion held. Everyone was still learning; winning and losing felt inconsequential, and the atmosphere was light.",
        ],
    },
    {
        id: "club-volleyball",
        title: "Joining Competitive Volleyball",
        phase: "High School",
        year: "The Pressure Returns",
        content: [
            "When I joined one of the Bay Area's most prestigious volleyball clubs on their 12s team, I discovered that volleyball carried its own intense pressure.",
            "Suddenly, tournaments meant traveling to Los Angeles, staying in hotels, and spending entire days in massive convention centers filled with hundreds of courts, squeaking shoes, and constant shouting.",
            "The first time my coach put me on the court, I felt fine—until I made my first mistake. In that instant, I felt the same shame I had felt in that Bay Club bathroom.",
            "I slowly stopped playing to improve; instead, I played to avoid letting others down. At 6'4\", people looked at me and assumed I must be a dominant athlete. Ironically, I began to feel safer on the bench than on the court.",
        ],
    },
    {
        id: "gset",
        title: "The GSET Presentation",
        phase: "Summer Program",
        year: "A Flashbulb Memory",
        content: [
            "I expected academics to be different, but the same pattern emerged. One of my clearest memories comes from the final day of presentations at the UCI × GATI Game Science, Entertainment, and Technology (GSET) program.",
            "I had left Volleyball Nationals in Orlando early to attend this summer research program, which only raised the stakes in my mind.",
            "When it was my turn to present with my team, I walked on stage and completely forgot my lines. The auditorium blurred. The crowd tried to encourage me with applause, but I stood there, embarrassed, beside teammates who had every reason to be disappointed.",
            "In a cohort of driven students, I felt like the only one who had crumbled under pressure.",
        ],
    },
    {
        id: "reframe",
        title: "Reframing the Experience",
        phase: "Growth",
        content: [
            "Experiences like these forced me to confront a difficult truth: pressure is not something I can escape by changing environments, activities, or roles.",
            "Only recently have I started reframing these experiences. Instead of viewing them as proof that I cannot handle pressure, I now see them as repeated opportunities to practice responding to it.",
            "In sports, that has meant asking for feedback, accepting playing time even when I'm nervous, and allowing myself to make—and learn from—mistakes in front of others.",
            "Academically, it has meant volunteering to present, pursuing rigorous programs, and reminding myself that my worth is not defined by a single performance, however public.",
        ],
    },
    {
        id: "transformation",
        title: "Becoming Different",
        phase: "Present Day",
        content: [
            "Friends from the Bay Area sometimes tell me I seem like a 'completely different person' now. On the outside, I may look transformed, but internally I am still the same person learning to live with, and grow through, pressure rather than run from it.",
            "My goal is not to eliminate pressure—that would be impossible—but to build the resilience and confidence to stand in it.",
        ],
    },
    {
        id: "future",
        title: "Looking Forward",
        phase: "The Goal",
        content: [
            "One day, I hope to test that growth on one of the most intimidating stages of all: delivering my school's valedictorian speech.",
            "If I earn that honor, I know the pressure will be immense. But by then, I also hope to be the person who can step up to the podium, take a breath, remember all the moments that brought me there, and speak—not in spite of the pressure, but alongside it.",
        ],
    },
];

export default function StoryTimeline() {
    const [expandedId, setExpandedId] = useState<string | null>("intro");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        What&apos;s My Story?
                    </h1>
                    <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A journey of learning to stand in pressure, not run from it.
                        <br/><span className="text-sm font-medium text-slate-500 mt-2 block">(This is the extended version of the story featured on the homepage.)</span>
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200"></div>

                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative mb-12 ${index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
                                }`}
                        >
                            <div className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse md:flex-row"} items-start gap-4`}>
                                {/* Timeline dot */}
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className="relative z-10 flex-shrink-0"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white border-4 border-primary-600 shadow-lg flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-primary-600"></div>
                                    </div>
                                </motion.div>

                                {/* Content card */}
                                <div className="flex-1 min-w-0">
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 cursor-pointer"
                                        onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                                    {event.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                                        {event.phase}
                                                    </span>
                                                    {event.year && (
                                                        <span className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm font-medium">
                                                            {event.year}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: expandedId === event.id ? "auto" : "0px",
                                                opacity: expandedId === event.id ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 space-y-4">
                                                {event.content.map((paragraph, idx) => (
                                                    <p
                                                        key={idx}
                                                        className="text-gray-700 leading-relaxed text-lg"
                                                    >
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </motion.div>

                                        <div className="mt-4 text-primary-600 font-medium text-sm">
                                            {expandedId === event.id ? "Click to collapse ▲" : "Click to read more ▼"}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block px-8 py-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-orange/10 border-2 border-primary-200 shadow-xl">
                        <p className="text-2xl font-semibold text-gray-800 mb-2">
                            The journey continues...
                        </p>
                        <p className="text-gray-600">
                            Not in spite of the pressure, but alongside it.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
