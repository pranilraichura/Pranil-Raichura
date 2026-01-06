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
        id: "early-pressure",
        title: "Early Pressure",
        content: [
            "The glass wall behind me held a crowd of parents and kids, but I only saw one face: Samyak’s. Fifth grade. First squash tournament. I’d trained for months at an expensive Bay Area club my parents could barely justify, and I walked onto the court convinced I had to win.",
            "Point by point, game by game, I watched the score tilt his way. Every mistake felt louder than the last. By the final point, it didn’t feel like I was just losing a match; it felt like I was proving something ugly about myself—that when it really mattered, I would fall apart.",
            "When it was over, I ran straight to the bathroom, locked the door, and cried for twenty minutes. I stayed there partly because I didn’t want anyone to see my eyes, and partly because I didn’t know how to walk back out and pretend it was “just a game.” That memory became my first picture of pressure: bright lights, a glass wall, and a deep belief that I wasn’t built for big moments.",
        ],
    },
    {
        id: "pattern-continues",
        title: "The Pattern Follows",
        content: [
            "I convinced myself volleyball would fix it. In my head, a team sport meant six people sharing pressure instead of one person standing alone on a court. That idea worked…right up until it didn’t.",
            "When I joined one of the Bay Area’s most competitive clubs, everything changed. Tournaments meant flying to big convention centers packed with hundreds of courts, whistles, and constant shouting. During one match, a serve came straight at me and I completely whiffed it. My teammates tried to shake it off, and my coach masked his frustration with encouragement, but I felt the same hot shame I’d felt in that squash bathroom.",
            "Soon I wasn’t hoping to be put in; I was secretly hoping to stay on the bench, where you can’t mess up and no one expects you to be the difference-maker.",
            "The same pattern showed up in academics. At the UCI GSET summer research program, I flew straight from Volleyball Nationals in Orlando to present a game-science project with my team. When we stepped on stage for the final presentation, my mind went blank. My teammates picked up my part smoothly while I stood there in silence under the lights.",
            "That moment turned into what psychologists call a flashbulb memory—vivid, persistent, and tied to a strong emotion. For a long time, I treated it as proof of a fixed truth: when the stakes are high, I choke."
        ],
    },
    {
        id: "finding-purpose",
        title: "Finding Purpose",
        content: [
            "What started to change wasn’t the amount of pressure in my life; it was the reason I was stepping into it.",
            "Around that time, I began building a game to help autistic teens regulate emotions and focus, inspired by a childhood friend who had quietly been there for me when I was the awkward kid who didn’t fit in. He was often misunderstood, but in our little Minecraft world together I always felt accepted.",
            "I didn’t want to make just another “calming app.” I dove into research on breath regulation and emotional control, then used OpenCV-based computer vision to detect diaphragmatic breathing from a webcam—trying to distinguish shallow chest breaths from deeper belly breathing in real time. Most nights, I’d look up from debugging and realize hours had disappeared.",
            "The pressure was still there: models failed, code broke, and I worried about whether the game would actually help anyone. But the feeling changed. It wasn’t about proving I was good enough under the spotlight. It was about building something that might matter to someone else.",
        ],
    },
    {
        id: "testing-hypothesis",
        title: "Testing the Hypothesis",
        content: [
            "That led me to a new hypothesis: maybe pressure itself wasn’t the enemy. Maybe the problem was why I was showing up.",
            "I tested that idea at my first Tech4Silvers workshop, where my club teaches seniors how to use technology—phones, scams, alerts, telehealth. I walked into a room full of older adults with notebooks and their phones in hand, waiting for us to teach them. The familiar tightness in my chest came back.",
            "Then a seventy-year-old woman placed her first video call to her grandson. The moment he picked up and she saw his face on screen, her whole expression changed: surprise, joy, and a little disbelief that she had done it herself.",
            "The pressure didn’t vanish, but it shrank compared to what was in front of me. Her moment mattered more than my nerves.",
        ],
    },
    {
        id: "seeking-stakes",
        title: "Seeking High Stakes",
        content: [
            "Once I stopped treating pressure as a verdict on my worth and started treating it as a signal that something mattered, I stopped running from it.",
            "I ran for National Honor Society leadership and gave a short speech with my hands shaking. Instead of trying to sound impressive, I talked honestly about the kind of service culture I wanted to help build. I was elected Sergeant at Arms.",
            "At NASA Space Apps, my team hit a wall with minutes left before the submission deadline. Old me would’ve frozen or quietly hoped someone else would fix it. Instead, I found myself assigning last-minute tasks, keeping people focused, and pushing our project over the line. We submitted just in time—and ended up as a Global Nominee.",
            "Volleyball shifted too. The same sport that used to make me hope for bench time now has me competing on a team that placed second at USAV Nationals in Salt Lake City. I still feel a spike of nerves before every match, but I no longer read it as a prediction of failure. I read it as a reminder that I care about what happens next.",
        ],
    },
    {
        id: "research-readiness",
        title: "Research and Readiness",
        content: [
            "This fall, I co-authored a preprint that challenges how we think about Euler’s 250-year-old buckling formula for non-ideal materials. We built a physics-informed XGBoost model that reached an R² of 0.97 and used SHAP analysis to understand why it outperformed the classical theory—not just that it did.",
            "Submitting that work, revising it, and preparing to defend it carries a pressure that feels strangely familiar: elevated heart rate, narrowed focus, the sense that what I’m doing might be judged by people who know more than I do.",
            "The difference now is how I interpret that feeling. In fifth grade, it meant, “You’re about to fail.” Now it means, “You’re doing something that might actually matter—stay with it.”",
        ],
    },
    {
        id: "looking-forward",
        title: "The Person I’m Becoming",
        content: [
            "Pressure still shows up in my life: before a serve, before a presentation, before leading a workshop, before sending a paper out into the world. The difference is that it no longer feels like a spotlight designed to expose my weaknesses.",
            "Instead, it feels like a companion that appears whenever I’m stretching toward something important—to a teammate, a student, a research question, or a community I care about.",
            "The fifth-grader crying in the bathroom is still part of my story. He’s the reason I pay attention to how pressure feels in other people, not just in myself. But he doesn’t get the final say anymore.",
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
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        The context behind how I handle pressure in research, competitions, and leadership.
                    </p>
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
