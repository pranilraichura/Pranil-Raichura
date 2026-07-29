"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    // Wave animation timing (left → center → right)
    const waveDelays = {
        left: 0.1,      // Left photos appear first
        center: 0.5,    // Center content appears second
        right: 0.9,     // Right photos appear last
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-orange/10 pt-32">
            {/* Main Content - appears directly */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
            >
                {/* Photo Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* LEFT SIDE PHOTOS - Wave starts here */}

                    {/* Young Me Photo - Top Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -80, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: -8 }}
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
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: 6 }}
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
                        animate={{ opacity: 1, x: 0 }}
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
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 3 }}
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
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: -3 }}
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
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: 8 }}
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
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: -6 }}
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
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: waveDelays.right + 0.2, duration: 0.6 }}
                        className="absolute bottom-8 right-8 text-right z-20"
                    >
                        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800/80">
                            2026
                        </span>
                        <p className="text-sm text-gray-500 mt-1">Present Day</p>
                    </motion.div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

                    {/* Subtle white overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/35 to-white/25"></div>

                    {/* Bottom Gradient for Seamless Transition to Story Section */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
                </div>
            </motion.div>

            {/* Center Content - Wave middle timing */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: waveDelays.center }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: waveDelays.center + 0.1 }}
                    className="mb-8"
                >
                    {/* Profile Picture */}
                    <div className="flex justify-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: waveDelays.center + 0.2 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-primary-100"
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.3 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 inline-block px-8 py-4 rounded-md bg-white/85 border-b-4 border-accent-orange shadow-[0_10px_30px_-12px_rgba(15,23,42,0.4)]"
                    >
                        <span className="text-gray-900 font-libre">
                            Pranil Raichura
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.4 }}
                        className="inline-block px-5 py-2 rounded-full bg-white/70 border border-slate-900/10 shadow-sm mb-3"
                    >
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-800 font-semibold">
                            Senior · Research & CS · Granite Bay High School
                        </p>
                    </motion.div>

                    {/* Quote - De-emphasized */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: waveDelays.center + 0.55 }}
                        className="mb-6 px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/50 shadow-lg max-w-xl mx-auto text-left"
                    >
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3 text-center">At a Glance</p>
                        <ul className="space-y-2 text-sm md:text-base text-slate-700">
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span className="leading-relaxed"><strong>Academics:</strong> 4.0 UW / 4.69 W GPA, rank 1/504; AP CS A & Principles, AP Calculus AB/BC, AP Physics 1, AP Statistics</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span className="leading-relaxed"><strong>Research & CS:</strong> AI safety research assistant at a lab in MIT CSAIL, NASA Space Apps Global Nominee 2025, &quot;Beyond Euler&quot; ML paper under review at IEEE Access, MERIDIAN ESL-fair AI-text detector, ASD serious game with OpenCV breathing detection</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span className="leading-relaxed"><strong>Service:</strong> Founder of Tech4Silvers, co-founder of PraNam Innovations (1,000+ items donated), Rotary E-Club project lead, serving meals at Placer County shelters most Sundays</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span className="leading-relaxed"><strong>Leadership & Athletics:</strong> President of Competitive Programming Club, elected GBHS Student Senator, JKYog Bay Area Youth Co-Coordinator, NHS Sergeant at Arms, UN GYEL participant, USAV national-level volleyball</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-slate-500 mt-0.5">•</span>
                                <span className="leading-relaxed"><strong>Online Presence:</strong> LinkedIn: 8.5k followers, 1.66M+ impressions; Instagram: 1.5k+ followers</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        href="#work"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
