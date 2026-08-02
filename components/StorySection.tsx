"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

interface TimelineEvent {
    id: string;
    title: string;
    content: string[];
    media?: {
        type: 'image' | 'video';
        path: string;
        caption?: string;
        width: number;
        height: number;
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
            caption: 'Young Squash Player',
            width: 1024,
            height: 576,
        }
    },
    {
        id: "the-whiff",
        title: "The Whiff",
        content: [
            "The same freeze followed me from the squash court onto the volleyball court, just with more people watching.",
            "High school volleyball nationals. Orlando Convention Center. The noise is a deafening roar of 500 whistles blowing at once. I’m standing on the court, knees bent, waiting for the serve.",
            "I’m not thinking 'I got this.' I’m thinking: “Please don't hit it to me. Please, God, don't let the ball come to me.”",
            "The serve comes. It floats right to my platform. I swing, and completely whiff. The ball hits the floor behind me. My teammate taps my shoulder, but the silence in my head is louder than the crowd. I wanted to dissolve into the hardwood. I wasn't playing to compete; I was playing not to lose.",
        ],
        media: {
            type: 'image',
            path: '/bench.jpg',
            caption: 'The Reserve Bench',
            width: 750,
            height: 790,
        }
    },
    {
        id: "3am-hum",
        title: "The 3 AM Hum",
        content: [
            "It took years before I found a place where that fear didn't show up at all.",
            "Junior year. 3 AM on a Tuesday. My room is dark except for the harsh blue glow of VS Code. No audience. No scoreboard. No parents. Just the hum of my laptop fan.",
            "I'm debugging a breathing detection algorithm for a friend with ASD. I hit 'Run'. The green box tracks my chest movement with surgical precision.",
            "I leaned back, not with relief, but with power. I realized: When I solve real problems, the fear disappears. I wasn't an imposter here. I wasn't performing for anyone. I was an engineer.",
        ],
        media: {
            type: 'image',
            path: '/3am_hum.jpg',
            caption: 'Late Night Coding',
            width: 1324,
            height: 1600,
        }
    },
    {
        id: "orange-skies",
        title: "Orange Skies Day",
        content: [
            "That newfound confidence in solving problems alone soon collided with a very public emergency.",
            "The smoke from the wildfires spread orange light across the horizon. We called it ‘Orange Skies Day.’ I was younger then, but I remember my neighbor clearly: a widower in his seventies, always out in his yard, reclusive but present.",
            "As the smoke rose, it became clear he had no idea an evacuation order existed. The alerts were all digital, and he, like a lot of seniors in our community, had never set them up.",
            "We walked over and knocked on his door like we were delivering news he needed to hear immediately. That was the moment I realized technology wasn’t just something I liked tinkering with. It was something that could leave people behind if no one showed them how to use it.",
            "That’s what started Tech4Silvers. Not a plan, not a club pitch, just a neighbor who didn’t get the alert.",
        ],
        media: {
            type: 'image',
            path: '/t4s_workshop.JPG',
            caption: 'Tech4Silvers workshop',
            width: 1600,
            height: 1205,
        }
    },
    {
        id: "the-arena",
        title: "The Arena",
        content: [
            "The sense of purpose I found in helping others eventually changed how I faced my own failures.",
            "Present day. I'm about to resubmit our 'Beyond Euler' research paper. The first version got rejected everywhere, inflated results from a cross-validation mistake I didn't catch. I rebuilt the entire analysis from scratch.",
            "The deadline is in 5 minutes. My heart is hammering, the same physical feeling as the squash court.",
            "But this time, I'm not looking for an exit. I'm grinning. The results are honest now. The paper is better because it failed first.",
            "I type the final sentence. Click.",
            "I don't just tolerate the pressure now; I hunt for it. The 'shaky guy' is gone. I've learned that fear is just fuel, and I have a lot of work left to do.",
        ],
        media: {
            type: 'video',
            path: '/pranil_city_speech.mp4',
            caption: 'Speaking with confidence',
            width: 1920,
            height: 1080,
        }
    },
];

// The story runs cold to warm: a frozen kid in a glass box, then orange wildfire light,
// then the arena. The section's lighting and the timeline rail follow that same arc as
// the reader descends, so the page warms up at the pace they're actually reading.
const beatColors = ["#475569", "#57534e", "#78716c", "#d97706", "#ea580c"];

export default function StorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const signatureRef = useRef<HTMLDivElement>(null);
    const signatureCardRef = useRef<HTMLDivElement>(null);
    const signatureGlowRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const coldOpacity = useTransform(sectionProgress, [0.05, 0.45], [1, 0]);
    const warmOpacity = useTransform(sectionProgress, [0.4, 0.8], [0, 1]);

    // The rail fills to however far down the timeline the reader has got, measured
    // against a "reading line" two-thirds down the viewport. Written straight to the
    // element so scrolling never triggers a React render.
    useEffect(() => {
        (window as any).__railEffect = { reduced: prefersReducedMotion, ran: true };
        if (prefersReducedMotion) return;

        let lastPct = -1;
        const measure = () => {
            const container = timelineRef.current;
            const rail = railRef.current;
            if (!container || !rail) return;
            const rect = container.getBoundingClientRect();
            if (rect.height === 0) return;
            const readingLine = window.innerHeight * 0.65;
            const progress = (readingLine - rect.top) / rect.height;
            const pct = Math.round(Math.min(100, Math.max(0, progress * 100)) * 2) / 2;
            if (pct === lastPct) return;
            lastPct = pct;
            const mask = `linear-gradient(to bottom, #000 ${pct}%, transparent ${pct}%)`;
            rail.style.maskImage = mask;
            rail.style.webkitMaskImage = mask;
        };

        measure();
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("scroll", measure);
            window.removeEventListener("resize", measure);
        };
    }, [prefersReducedMotion]);

    useLayoutEffect(() => {
        const signature = signatureRef.current;
        const card = signatureCardRef.current;
        const glow = signatureGlowRef.current;
        if (!signature || !card || !glow) return;

        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
            const media = gsap.matchMedia();

            media.add(
                "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
                () => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: signature,
                            start: "center center",
                            end: "+=560",
                            // Pin the stable wrapper, never the element whose transform is
                            // animated. Pinning and transforming the same node caused the
                            // card to snap back to its pre-pin position at release.
                            pin: signature,
                            pinSpacing: true,
                            scrub: 0.75,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    })
                        .fromTo(
                            card,
                            {
                                scale: 0.94,
                                y: 26,
                                willChange: "transform",
                            },
                            {
                                scale: 1,
                                y: 0,
                                duration: 0.28,
                                ease: "none",
                            },
                            0,
                        )
                        .fromTo(
                            glow,
                            {
                                opacity: 0,
                                scale: 0.72,
                                willChange: "transform, opacity",
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                duration: 0.32,
                                ease: "none",
                            },
                            0,
                        )
                        // A quiet hold keeps the reflection present while the next section
                        // approaches, then the final phase eases it upward into normal flow.
                        .to(card, { scale: 1, y: 0, duration: 0.4, ease: "none" }, 0.28)
                        .to(glow, { opacity: 1, scale: 1, duration: 0.36, ease: "none" }, 0.32)
                        .to(
                            card,
                            {
                                scale: 0.985,
                                y: -14,
                                duration: 0.32,
                                ease: "power1.inOut",
                                clearProps: "willChange",
                            },
                            0.68,
                        )
                        .to(
                            glow,
                            {
                                opacity: 0.42,
                                scale: 1.08,
                                duration: 0.32,
                                ease: "power1.inOut",
                                clearProps: "willChange",
                            },
                            0.68,
                        );
                },
            );

            media.add(
                "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
                () => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: signature,
                            start: "top 82%",
                            once: true,
                        },
                    })
                        .fromTo(
                            card,
                            {
                                scale: 0.94,
                                y: 24,
                                willChange: "transform",
                            },
                            {
                                scale: 1,
                                y: 0,
                                duration: 0.85,
                                ease: "power3.out",
                                clearProps: "willChange",
                            },
                            0,
                        )
                        .fromTo(
                            glow,
                            {
                                opacity: 0,
                                scale: 0.72,
                                willChange: "transform, opacity",
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                duration: 1,
                                ease: "power3.out",
                                clearProps: "willChange",
                            },
                            0,
                        );
                },
            );

            media.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set([card, glow], { clearProps: "all" });
            });

            return () => media.revert();
        }, signature);

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
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

            {/* Cold light at the top of the arc, warm light at the bottom. */}
            {!prefersReducedMotion && (
                <>
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none mix-blend-multiply"
                        style={{
                            opacity: coldOpacity,
                            background:
                                "linear-gradient(180deg, rgba(148,163,184,0.55) 0%, rgba(186,199,214,0.32) 55%, rgba(255,255,255,0) 100%)",
                        }}
                    />
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            opacity: warmOpacity,
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(251,191,36,0.16) 55%, rgba(234,88,12,0.24) 100%)",
                        }}
                    />
                </>
            )}

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
                <div className="relative" ref={timelineRef}>
                    {/* Vertical line - Adjusted position */}
                    {prefersReducedMotion ? (
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-300"></div>
                    ) : (
                        <>
                            <div
                                aria-hidden="true"
                                className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-slate-300/70"
                            ></div>
                            {/* Fills to wherever the reader has got to, cold at the top, ember at the end. */}
                            <div
                                ref={railRef}
                                aria-hidden="true"
                                className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5"
                                style={{
                                    background:
                                        "linear-gradient(180deg, #64748b 0%, #78716c 40%, #d97706 78%, #ea580c 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, #000 0%, transparent 0%)",
                                    maskImage:
                                        "linear-gradient(to bottom, #000 0%, transparent 0%)",
                                }}
                            />
                        </>
                    )}

                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="relative mb-20 ml-12 md:ml-16 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
                        >
                            {/* Timeline dot - lights up as the reader reaches this beat */}
                            {prefersReducedMotion ? (
                                <div
                                    aria-hidden="true"
                                    className="absolute -left-[26px] md:-left-[34px] top-8 w-4 h-4 rounded-full border-4 border-white shadow z-10"
                                    style={{ backgroundColor: beatColors[index] ?? "#334155" }}
                                ></div>
                            ) : (
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute -left-[26px] md:-left-[34px] top-8 w-4 h-4 rounded-full border-4 border-white shadow z-10"
                                    initial={{ backgroundColor: "#cbd5e1", scale: 0.75 }}
                                    whileInView={{
                                        backgroundColor: beatColors[index] ?? "#334155",
                                        scale: 1,
                                    }}
                                    viewport={{ once: true, margin: "-50% 0px -50% 0px" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                ></motion.div>
                            )}

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
                                                width={event.media.width}
                                                height={event.media.height}
                                                className="w-full h-auto"
                                            />
                                        ) : (
                                            <Image
                                                src={event.media.path}
                                                alt={event.media.caption || event.title}
                                                width={event.media.width}
                                                height={event.media.height}
                                                sizes="(min-width: 1024px) 32vw, 100vw"
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

            {/* Closing Reflection */}
            <div
                ref={signatureRef}
                className="relative z-10 text-center mt-16 max-w-4xl mx-auto px-6"
                data-signature-moment="story-reflection"
            >
                <div ref={signatureCardRef} className="relative">
                    <div
                        ref={signatureGlowRef}
                        aria-hidden="true"
                        className="absolute -inset-6 md:-inset-10 rounded-[3rem] bg-gradient-to-r from-primary-300/20 via-orange-300/25 to-primary-300/20 blur-2xl opacity-0 pointer-events-none"
                    ></div>
                    <div className="relative bg-white/85 backdrop-blur-md rounded-2xl p-8 shadow-xl shadow-slate-900/10 border border-slate-200/60">
                        <p className="text-xl text-slate-800 font-medium leading-relaxed font-libre">
                            Looking back, the progression is clear. I spent years fearing the spotlight and trying to avoid failure. I had to learn how to find calm in solitary problem-solving before I could realize that those same instincts could serve my community. Today, I don&apos;t just tolerate pressure. I actively choose to step into the arena.
                        </p>
                        <div className="mt-6">
                            <Link href="/story" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                Read the extended story <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
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
                    <Link href="#work" className="text-slate-800 font-semibold hover:underline">
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
