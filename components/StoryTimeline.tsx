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
        title: "What I Thought Mastery Meant",
        phase: "Beginning",
        content: [
            "For most of my childhood, I believed effort and outcomes followed a simple formula. If I worked hard enough, success would arrive.",
            "That belief made me disciplined, but it also made every result feel like a verdict. When the formula stopped working, I did not know how to separate a failed outcome from a failed self.",
        ],
    },
    {
        id: "squash",
        title: "The Shirt I Didn’t Earn",
        phase: "Fifth Grade",
        year: "The first rupture",
        content: [
            "I trained for six months expecting to earn a Squash Gold Division shirt. To me, it was not simply a shirt. It was the promised return on every practice and every hour I had invested.",
            "Then I lost the match that would have earned it. The effort was real, but the result I had treated as inevitable never came.",
            "That was the first time I remember pressure becoming physical. My palms began to sweat before situations where other people could watch me fall short.",
        ],
    },
    {
        id: "avoidance",
        title: "A Smaller and Smaller Stage",
        phase: "The pattern",
        content: [
            "The sweating itself was manageable. What followed mattered more: I began steering away from courts, podiums, and the front of classrooms whenever the outcome felt uncertain.",
            "Avoidance protected me from visible failure, but it also quietly removed every chance to discover that I could survive it.",
        ],
    },
    {
        id: "gset",
        title: "Nowhere Left to Hide",
        phase: "UCI GSET",
        year: "Presentation day",
        content: [
            "At UC Irvine’s GSET program, every team had to present. I memorized my section and repeated it internally while a teammate spoke first.",
            "When my turn came, the words flowed until they did not. I forgot part of the script, stumbled through the rest, and sat down believing I had wasted all the preparation that came before it.",
            "On the ride to the airport, my mom asked what I had expected to happen. I had no answer, but the question stayed with me.",
        ],
    },
    {
        id: "reframe",
        title: "Two Kinds of Control",
        phase: "Reframing",
        content: [
            "My mom’s question brought back a principle from the Bhagavad Gita that I had heard at spiritual gatherings since childhood: I was responsible for doing the work, but not entitled to its fruits.",
            "I once heard that as indifference. Now I understand it as a boundary. Aspiration asks me to prepare seriously; attachment insists that the work only counts if reality returns the exact outcome I imagined.",
            "I could master my preparation, choices, and response without pretending to master the score, applause, or result.",
        ],
    },
    {
        id: "tech4silvers",
        title: "Practice in Public",
        phase: "Tech4Silvers",
        content: [
            "At a Tech4Silvers workshop, my palms dampened around the microphone in front of a hall of older adults. I delivered the session anyway, then stayed to answer every question.",
            "While helping participants use their devices afterward, I noticed how tightly some of them held their phones and laptops. They were uncertain too, but they had shown up to learn.",
            "The goal was no longer to prove that I felt no fear. It was to remain useful while feeling it.",
        ],
    },
    {
        id: "volleyball",
        title: "The Next Point",
        phase: "Volleyball",
        content: [
            "During a volleyball timeout, I noticed a teammate’s hand shaking just before he was subbed in. I recognized the feeling, encouraged him, and watched him step onto the court.",
            "The tremor did not mean he was unprepared. It showed that the moment mattered to him.",
            "My palms still dampen before games and presentations. They just do not cool me away anymore. Confidence now means acting fully before I know how the story will end.",
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
                        How I learned to own my choices without trying to own every outcome.
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
                            The outcome is still uncertain.
                        </p>
                        <p className="text-gray-600">
                            I am learning to step forward anyway.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
