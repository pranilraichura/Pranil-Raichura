"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface TimelineEvent {
    id: string;
    title: string;
    content: string[];
}

const timelineEvents: TimelineEvent[] = [
    {
        id: "glass-box",
        title: "The Glass Box",
        content: [
            "Fifth grade. Squash court. The air smells like rubber soles and expensive cologne. My coach has his arms crossed. My parents are watching from the gallery.",
            "I’m freezing. Not because it’s cold, but because I’m doing the math: “If I miss this shot, I’m a fraud.”",
            "I lost that match. I locked myself in a stall for twenty minutes to hide. I wasn't weak—I was terrified of being imperfect. I treated pressure like a verdict on my worth, and that fear paralyzed me.",
        ],
    },
    {
        id: "the-whiff",
        title: "The Whiff",
        content: [
            "High school volleyball nationals. The convention center is a deafening roar of 500 whistles. I’m on the court, knees bent, praying: “Please don't hit it to me.”",
            "The ball floats to my platform. I swing—and completely whiff. It hits the floor behind me.",
            "In that dead silence, something snapped. I realized I had spent my entire life playing 'not to lose' instead of playing to win. I was done being the kid who shrank in the spotlight. I needed a new way to fight.",
        ],
    },
    {
        id: "3am-hum",
        title: "The 3 AM Hum",
        content: [
            "Junior year. 3 AM. My room is dark, lit only by the VS Code terminal. No audience. No scoreboard. Just me and a breathing detection algorithm I was building for a friend with ASD.",
            "I wasn't freezing up. I was locked in. I rewrote the detection logic three times until the latency dropped to zero.",
            "I hit 'Run'. The green box tracked my chest movement with surgical precision. I leaned back—not with relief, but with power. I realized: When I solve real problems, the fear disappears. I wasn't an imposter here. I was an engineer.",
        ],
    },
    {
        id: "margaret-moment",
        title: "The Margaret Moment",
        content: [
            "Tech4Silvers workshop. A room full of seniors staring at blank screens. The old me would have panicked.",
            "The new me saw a problem I knew how to solve.",
            "I walked up to Margaret, a 70-year-old grandmother. I didn't stutter. I guided her hand to the mouse. We connected the video call, and her grandson’s face appeared. She grabbed my hand, weeping with joy.",
            "In that moment, I stood taller. I wasn't the kid hiding in the stall anymore. I was the one opening the door for someone else.",
        ],
    },
    {
        id: "the-arena",
        title: "The Arena",
        content: [
            "Present day. I’m about to submit our 'Beyond Euler' research paper. The deadline is in 5 minutes. My heart is hammering—the same physical feeling as the squash court.",
            "But this time, I’m not looking for an exit. I’m grinning.",
            "I type the final sentence. Click.",
            "I don't just tolerate the pressure now; I hunt for it. The 'shaky guy' is gone. I’ve learned that fear is just fuel, and I have a lot of work left to do.",
        ],
    },
];

export default function StorySection() {
    return (
        <section
            id="story"
            className="py-20 relative"
            style={{
                backgroundImage: 'url(/backgrounds/turkey_ocean.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        My Story
                    </h2>
                    <div className="w-24 h-1 bg-slate-700 mx-auto mb-6"></div>

                </motion.div>

                {/* Timeline with Cards */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-300"></div>

                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="relative mb-8 ml-12 md:ml-16"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[26px] md:-left-[34px] top-2 w-4 h-4 rounded-full bg-slate-700 border-4 border-white shadow"></div>

                            {/* Content card */}
                            <motion.div
                                whileHover={{ x: 4, scale: 1.01 }}
                                className="bg-white rounded-xl p-5 md:p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all"
                            >
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                                    {event.title}
                                </h3>
                                <div className="space-y-3">
                                    {event.content.map((paragraph, idx) => (
                                        <p key={idx} className="text-slate-700 leading-relaxed text-sm md:text-base">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Bridge to Evidence */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-600 text-lg">
                        That mindset now shows up in projects like{" "}
                        <Link href="#portfolio" className="text-slate-800 font-semibold hover:underline">
                            Beyond Euler
                        </Link>{" "}
                        and{" "}
                        <Link href="#extracurriculars" className="text-slate-800 font-semibold hover:underline">
                            Tech4Silvers
                        </Link>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
