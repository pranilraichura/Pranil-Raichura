"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
    const [showIntro, setShowIntro] = useState(true);
    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "Who am I?";

    // Typing animation effect
    useEffect(() => {
        if (showIntro) {
            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                if (currentIndex <= fullText.length) {
                    setTypedText(fullText.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    // Wait a moment after typing completes, then reveal
                    setTimeout(() => {
                        setShowIntro(false);
                    }, 800);
                }
            }, 120);

            return () => clearInterval(typingInterval);
        }
    }, [showIntro]);

    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    // Wave animation timing (left → center → right)
    const waveDelays = {
        left: 0.1,      // Left photos appear first
        center: 0.5,    // Center content appears second
        right: 0.9,     // Right photos appear last
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-purple/10">
            {/* Intro Screen - "Who am I?" typing animation */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-white"
                    >
                        <div className="text-center">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900">
                                {typedText}
                                <span
                                    className={`inline-block w-1 h-12 md:h-16 lg:h-20 bg-primary-600 ml-2 ${showCursor ? "opacity-100" : "opacity-0"
                                        }`}
                                    style={{ verticalAlign: "middle" }}
                                />
                            </h1>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content - appears after intro with wave effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showIntro ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
            >
                {/* Photo Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* LEFT SIDE PHOTOS - Wave starts here */}

                    {/* Young Me Photo - Top Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -80, scale: 0.9 }}
                        animate={!showIntro ? { opacity: 1, x: 0, scale: 1, rotate: -8 } : {}}
                        transition={{ type: "spring", stiffness: 60, damping: 15, delay: waveDelays.left }}
                        whileHover={{ scale: 1.05, rotate: -5, transition: { duration: 0.3 } }}
                        className="absolute top-8 left-8 md:top-12 md:left-12 w-48 h-48 md:w-64 md:h-80 lg:w-80 lg:h-96"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                            <Image
                                src="/young-me.jpg"
                                alt="Young Pranil"
                                fill
                                className="object-cover object-center"
                                style={{ filter: "brightness(0.9)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Young Volleyball Photo - Bottom Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -80, scale: 0.9 }}
                        animate={!showIntro ? { opacity: 1, x: 0, scale: 1, rotate: 6 } : {}}
                        transition={{ type: "spring", stiffness: 60, damping: 15, delay: waveDelays.left + 0.1 }}
                        whileHover={{ scale: 1.05, rotate: 8, transition: { duration: 0.3 } }}
                        className="absolute bottom-24 left-8 md:bottom-28 md:left-12 w-48 h-48 md:w-64 md:h-80 lg:w-80 lg:h-96"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                            <Image
                                src="/volleyball-young.jpg"
                                alt="Young volleyball player"
                                fill
                                className="object-cover object-center"
                                style={{ filter: "brightness(0.9)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/20 to-transparent" />
                        </div>
                    </motion.div>

                    {/* 2008 Label - Left Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={!showIntro ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: waveDelays.left + 0.2, duration: 0.6 }}
                        className="absolute bottom-8 left-8 text-left z-20"
                    >
                        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800/80">
                            2008
                        </span>
                        <p className="text-sm text-gray-500 mt-1">The Beginning</p>
                    </motion.div>

                    {/* CENTER CONTENT - Wave middle */}

                    {/* Violin Orchestra Photo - Left-Center */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={!showIntro ? { opacity: 1, y: 0, scale: 1, rotate: 3 } : {}}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: waveDelays.center }}
                        whileHover={{ scale: 1.08, rotate: 6, y: -5, transition: { duration: 0.3 } }}
                        className="absolute top-[2%] md:top-[4%] left-[14%] md:left-[23%] lg:left-[28%] w-[221px] h-[294px] md:w-[258px] md:h-[331px] lg:w-[294px] lg:h-[405px]"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                            <Image
                                src="/violin-orchestra.jpg"
                                alt="Orchestra violin performance"
                                fill
                                className="object-cover object-center"
                                style={{ filter: "brightness(0.95)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/15 to-transparent" />
                        </div>
                    </motion.div>

                    {/* HPE Codewars Photo - Top Center */}
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={!showIntro ? { opacity: 1, y: 0, scale: 1, rotate: -3 } : {}}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: waveDelays.center + 0.15 }}
                        whileHover={{ scale: 1.08, rotate: 0, y: -5, transition: { duration: 0.3 } }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 w-56 h-56 md:w-72 md:h-96 lg:w-96 lg:h-[28rem]"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                            <Image
                                src="/codewars-hpe.jpg"
                                alt="HPE Codewars 2nd Place"
                                fill
                                className="object-cover object-center"
                                style={{ filter: "brightness(0.95)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 to-transparent" />
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE PHOTOS - Wave ends here */}

                    {/* Recent Team Photo - Top Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 80, scale: 0.9 }}
                        animate={!showIntro ? { opacity: 1, x: 0, scale: 1, rotate: 8 } : {}}
                        transition={{ type: "spring", stiffness: 60, damping: 15, delay: waveDelays.right }}
                        whileHover={{ scale: 1.05, rotate: 10, transition: { duration: 0.3 } }}
                        className="absolute top-8 right-8 md:top-12 md:right-12 w-48 h-48 md:w-64 md:h-80 lg:w-80 lg:h-96"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                            <Image
                                src="/volleyball-team-recent.jpg"
                                alt="Granite Bay Grizzlies team celebration"
                                fill
                                className="object-cover object-center"
                                style={{ filter: "brightness(0.95)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/15 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Recent Team Huddle - Bottom Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 80, scale: 0.9 }}
                        animate={!showIntro ? { opacity: 1, x: 0, scale: 1, rotate: -6 } : {}}
                        transition={{ type: "spring", stiffness: 60, damping: 15, delay: waveDelays.right + 0.1 }}
                        whileHover={{ scale: 1.05, rotate: -4, transition: { duration: 0.3 } }}
                        className="absolute bottom-24 right-8 md:bottom-28 md:right-12 w-48 h-48 md:w-64 md:h-80 lg:w-80 lg:h-96"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                            <Image
                                src="/volleyball-team-huddle.jpg"
                                alt="Granite Bay team huddle"
                                fill
                                className="object-cover"
                                style={{ filter: "brightness(0.95)", objectPosition: "70% top" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 to-transparent" />
                        </div>
                    </motion.div>

                    {/* 2025 Label - Right Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={!showIntro ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: waveDelays.right + 0.2, duration: 0.6 }}
                        className="absolute bottom-8 right-8 text-right z-20"
                    >
                        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800/80">
                            2025
                        </span>
                        <p className="text-sm text-gray-500 mt-1">Present Day</p>
                    </motion.div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

                    {/* Subtle white overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/35 to-white/25"></div>
                </div>
            </motion.div>

            {/* Center Content - Wave middle timing */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showIntro ? 0 : 1 }}
                transition={{ duration: 0.3, delay: waveDelays.center }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: waveDelays.center + 0.1 }}
                    className="mb-8"
                >
                    {/* Profile Picture */}
                    <div className="flex justify-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={!showIntro ? { opacity: 1, scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: waveDelays.center + 0.2 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-primary-100"
                        >
                            <Image
                                src="/remove_bg_pranil.png"
                                alt="Pranil Raichura"
                                fill
                                className="object-cover"
                                priority
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.3 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 inline-block px-8 py-4 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 20px rgba(255,255,255,0.1)'
                        }}
                    >
                        <span className="bg-gradient-to-r from-gray-900 via-primary-600 to-accent-purple bg-clip-text text-transparent">
                            Pranil Raichura
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.4 }}
                        className="inline-block px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl mb-3"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1), inset 0 0 15px rgba(255,255,255,0.1)'
                        }}
                    >
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-800 font-semibold">
                            Junior · Research & CS · Granite Bay High School
                        </p>
                    </motion.div>

                    {/* Quote - De-emphasized */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.5 }}
                        className="mb-5"
                    >
                        <p className="text-lg md:text-xl italic text-gray-500 font-light">
                            &quot;A picture is worth 1000 words&quot;
                        </p>
                    </motion.div>

                    {/* At a Glance - For Teachers & Recommenders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.55 }}
                        className="mb-6 px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/50 shadow-lg max-w-xl mx-auto text-left"
                    >
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3 text-center">At a Glance</p>
                        <ul className="space-y-2 text-sm md:text-base text-slate-700">
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span><strong>Academics:</strong> 4.0 UW / 4.53 W GPA, rank 1/502; AP CS A & Principles, AP Calculus AB/BC, AP Physics 1, AP Statistics</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span><strong>Research & CS:</strong> NASA Space Apps Global Nominee 2025, &quot;Beyond Euler&quot; physics-informed ML preprint (XGBoost, SHAP), ASD serious game with OpenCV breathing detection</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span><strong>Service & Leadership:</strong> Founder of Tech4Silvers, NHS Sergeant at Arms, UN GYEL participant, USAV national-level volleyball</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        href="#portfolio"
                        initial={{ opacity: 0, y: 20 }}
                        animate={!showIntro ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.65 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block px-8 py-4 rounded-full bg-slate-800 text-white font-semibold text-lg shadow-xl hover:bg-slate-700 hover:shadow-2xl transition-all duration-300"
                    >
                        View Projects & Impact
                    </motion.a>
                </motion.div>


            </motion.div>
        </section>
    );
}
