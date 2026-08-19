"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import LazyVideo from "./LazyVideo";

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
        id: "the-shirt",
        title: "The Shirt I Didn’t Earn",
        content: [
            "For years, I treated effort like a contract: set a goal, work hard enough, and the result would follow.",
            "After six months and 150 hours of squash practice, I expected to earn a Gold Division shirt. Then I lost the match that would have earned it.",
            "The loss made pressure physical. My palms began to sweat before courts, podiums, and classrooms where the outcome might reveal something about me.",
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
        id: "nowhere-to-hide",
        title: "Nowhere Left to Hide",
        content: [
            "After the loss, I found ways to lower the stakes: the shared pressure of volleyball and the back of the room during hackathon presentations.",
            "At UC Irvine’s GSET program, there was nowhere to hide. I memorized my part, walked onstage, and froze halfway through the presentation.",
            "I had prepared obsessively. Still, the outcome I expected never arrived.",
        ],
        media: {
            type: 'image',
            path: '/extracurriculars/uci_gati/pic1_new.jpg',
            caption: 'UCI GSET closing ceremony',
            width: 1205,
            height: 1600,
        }
    },
    {
        id: "control",
        title: "What I Could Control",
        content: [
            "My mom brought me back to a line from the Bhagavad Gita: I had a right to my actions, not to their fruits. At first, that sounded like an argument against ambition.",
            "Eventually, I understood the distinction. Aspiration asks me to prepare fully. Attachment says the work is worthless unless it produces the exact result I imagined.",
            "My preparation, choices, and response afterward were mine. The score, applause, and final outcome never fully were.",
        ],
        media: {
            type: 'image',
            path: '/3am_hum.jpg',
            caption: 'Focusing on the work in front of me',
            width: 1324,
            height: 1600,
        }
    },
    {
        id: "practice-in-public",
        title: "Practice in Public",
        content: [
            "I tested that idea at a Tech4Silvers session for 30 seniors at a local center. My palms dampened around the microphone, but I delivered the workshop and stayed for every question.",
            "The goal was not to prove that I felt no fear. It was to help the people in front of me. By the next session, 50 more seniors wanted to join.",
            "Standing up became a choice to remain useful while feeling uncertain.",
        ],
        media: {
            type: 'image',
            path: '/gallery/full/tech4silvers-community-presentation-2026.jpg',
            caption: 'Leading a Tech4Silvers workshop',
            width: 1920,
            height: 1446,
        }
    },
    {
        id: "the-next-point",
        title: "The Next Point",
        content: [
            "During a timeout against Jesuit High School, I noticed my teammate Colin’s hand shaking as he waited to be subbed in. I recognized the feeling immediately.",
            "I told him, “You got this, bro,” and meant it. We won that game and later won the state championship.",
            "My palms still dampen before games and presentations. They just do not decide whether I step forward anymore.",
        ],
        media: {
            type: 'image',
            path: '/gallery/full/granite-bay-spike.jpg',
            caption: 'Competing for Granite Bay',
            width: 1317,
            height: 1920,
        }
    },
];

// The story runs from outcome-focused certainty to a steadier sense of agency.
// The section lighting and timeline rail warm as that distinction becomes clearer.
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
        let frame = 0;
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

        const scheduleMeasure = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                frame = 0;
                measure();
            });
        };

        measure();
        window.addEventListener("scroll", scheduleMeasure, { passive: true });
        window.addEventListener("resize", scheduleMeasure, { passive: true });
        return () => {
            window.removeEventListener("scroll", scheduleMeasure);
            window.removeEventListener("resize", scheduleMeasure);
            if (frame) window.cancelAnimationFrame(frame);
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
                                className="lg:col-span-3 bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 shadow-md border border-slate-200 hover:shadow-lg transition-[transform,box-shadow]"
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
                                            <LazyVideo
                                                src={event.media.path}
                                                controls
                                                poster="/posters/pranil-city-speech.webp"
                                                aria-label={event.media.caption || event.title}
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
                            I still set ambitious goals and prepare hard. The difference is that I no longer treat an outcome as proof that the work mattered. I can own my choices without pretending to own every result.
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
                    That mindset now shapes how I approach{" "}
                    <Link href="#work" className="text-slate-800 font-semibold hover:underline">
                        research setbacks
                    </Link>{" "}
                    and{" "}
                    <Link href="#extracurriculars" className="text-slate-800 font-semibold hover:underline">
                        service and competition
                    </Link>.
                </p>
            </motion.div>

            {/* Bottom Gradient for Smooth Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50 pointer-events-none"></div>
        </section>
    );
}
