"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NolanPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-4">
            <div className="max-w-2xl w-full">
                {/* 'Now' Button (Top) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex justify-between items-center"
                >
                    <Link href="/#portfolio">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-full shadow-lg hover:bg-primary-700 transition-all group"
                        >
                            Now, explore my work
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Card Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative p-8 md:p-12"
                >
                    {/* Visual Header (Clean, whitespace based) */}
                    <div className="flex justify-center items-center mb-10">
                        <div className="flex items-center gap-6 md:gap-10">
                            {/* Pranil */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative"
                            >
                                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-100 shadow-md">
                                    <Image
                                        src="/remove_bg_pranil.png"
                                        alt="Pranil"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* Connection Symbol (Subtle) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                                className="text-gray-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                            </motion.div>

                            {/* Nolan */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative"
                            >
                                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-100 shadow-md">
                                    <Image
                                        src="/nolan_pfp.jpeg"
                                        alt="Nolan"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-serif">
                        Dear Nolan,
                    </h1>

                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                        <p>
                            Thank you so much for agreeing to write me a letter of rec!
                        </p>

                        <p>
                            It’s hard to believe it’s already been a year since we started working together. Even though our collaboration has been entirely asynchronous, I’ve genuinely enjoyed every specific sync and code review. Getting to know you and working on this research has been a highlight of my high school experience—honestly, you’re incredibly inspiring to me.
                        </p>

                        <p>
                            You actually introduced me to the world of formal research. From those first literature reviews to our deep dives into the data, you’ve helped shape not just this project, but my entire interest in the field. I often find myself hoping to follow a similar path in my own undergraduate years and beyond.
                        </p>

                        <p>
                            While I&apos;m currently confirming the exact deadline for the summer program (likely <strong>mid-to-late February</strong>), I wanted to reach out and formally thank you for supporting me in this next step. I originally wanted to apply there because of the fast-paced research environment they nurture you with for your subject of interest.
                        </p>

                        <p>
                            I know things are definitely busy for you, so I really appreciate your time and bandwidth in helping me aim for this!
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-end">
                        <p className="text-xl font-handwriting text-primary-600 font-medium">
                            Best,<br />
                            Pranil
                        </p>
                        <span className="text-4xl">🚀</span>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
