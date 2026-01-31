"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface TimelineEvent {
    id: string;
    title: string;
    content: string[];
    media?: {
        type: 'image' | 'video';
        path: string;
        caption?: string;
    };
}

const timelineEvents: TimelineEvent[] = [
    {
        id: "glass-box",
        title: "The Glass Box",
        content: [
            "Fifth grade. I’m standing inside a glass-walled squash court. The air smells like rubber soles and expensive cologne. My parents are watching from the gallery. My coach is watching with his arms crossed. And I am freezing.",
            "I’m not thinking about the game. I’m thinking: “If I miss this shot, they’ll all know I’m a fraud.”",
            "I lost. I ran to the locker room, locked the stall, and sat on the cold tile for twenty minutes. I didn't want to win; I just wanted to survive the gaze. That was my relationship with pressure: a spotlight I wanted to smash.",
        ],
        media: {
            type: 'image',
            path: '/squash-young.jpg',
            caption: 'Young Squash Player'
        }
    },
    {
        id: "the-whiff",
        title: "The Whiff",
        content: [
            "High school volleyball nationals. Orlando Convention Center. The noise is a deafening roar of 500 whistles blowing at once. I’m standing on the court, knees bent, waiting for the serve.",
            "I’m not thinking 'I got this.' I’m thinking: “Please don't hit it to me. Please, God, don't let the ball come to me.”",
            "The serve comes. It floats right to my platform. I swing—and completely whiff. The ball hits the floor behind me. My teammate taps my shoulder, but the silence in my head is louder than the crowd. I wanted to dissolve into the hardwood. I wasn't playing to compete; I was playing not to lose.",
        ],
        media: {
            type: 'image',
            path: '/bench.jpg',
            caption: 'The Reserve Bench'
        }
    },
    {
        id: "3am-hum",
        title: "The 3 AM Hum",
        content: [
            "Junior year. 3 AM on a Tuesday. My room is dark except for the harsh blue glow of VS Code. No audience. No scoreboard. No parents. Just the hum of my laptop fan.",
            "I'm debugging a breathing detection algorithm for a friend with ASD. I hit 'Run'. The green box tracks my chest movement with surgical precision.",
            "I leaned back—not with relief, but with power. I realized: When I solve real problems, the fear disappears. I wasn't an imposter here. I wasn't performing for anyone. I was an engineer.",
        ],
        media: {
            type: 'image',
            path: '/3am_hum.jpg',
            caption: 'Late Night Coding'
        }
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
        media: {
            type: 'image',
            path: '/margaret_t4s.JPG',
            caption: 'Tech4Silvers Moment'
        }
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
        media: {
            type: 'video',
            path: '/pranil_city_speech.mp4',
            caption: 'Speaking with confidence'
        }
    },
];

export default function StorySection() {
    return (
        <section
            id="story"
            className="py-24 relative"
            style={{
                backgroundImage: 'url(/backgrounds/turkey_ocean.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            {/* Overlay for readability - Adjusted to favor the right side */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm lg:bg-gradient-to-r lg:from-transparent lg:via-white/50 lg:to-white/80"></div>

            {/* Top Gradient for Smooth Transition from Hero */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>

            {/* Header - Centered on Viewport */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center mb-16 max-w-7xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                    My Story
                </h2>
                <div className="w-24 h-1 bg-slate-700 mx-auto mb-6"></div>
            </motion.div>

            <div className="relative w-full lg:w-[82%] ml-auto px-4 sm:px-6 lg:px-12">
                {/* Timeline with Cards */}
                <div className="relative">
                    {/* Vertical line - Adjusted position */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-300"></div>

                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="relative mb-20 ml-12 md:ml-16 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[26px] md:-left-[34px] top-8 w-4 h-4 rounded-full bg-slate-700 border-4 border-white shadow z-10"></div>

                            {/* Content card - Left Side (Wider) */}
                            <motion.div
                                whileHover={{ x: 4, scale: 1.01 }}
                                className="lg:col-span-3 bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 shadow-md border border-slate-200 hover:shadow-lg transition-all"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                                    {event.title}
                                </h3>
                                <div className="space-y-4">
                                    {event.content.map((paragraph, idx) => (
                                        <p key={idx} className="text-slate-700 leading-relaxed text-base md:text-lg">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Media Slot - Right Side (Narrower) */}
                            <div className="hidden lg:block lg:col-span-2">
                                {event.media ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
                                    >
                                        {event.media.type === 'video' ? (
                                            <video
                                                src={event.media.path}
                                                controls
                                                className="w-full h-auto"
                                            />
                                        ) : (
                                            <img
                                                src={event.media.path}
                                                alt={event.media.caption || event.title}
                                                className="w-full h-auto object-cover"
                                            />
                                        )}
                                    </motion.div>
                                ) : (
                                    <div className="h-48 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-white/30">
                                        <p className="text-slate-400 font-medium">Image coming soon</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bridge to Evidence - Centered on Viewport */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center mt-12 pb-12 max-w-7xl mx-auto"
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

            {/* Bottom Gradient for Smooth Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50 pointer-events-none"></div>
        </section>
    );
}
