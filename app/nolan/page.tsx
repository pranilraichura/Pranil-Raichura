"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NolanPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 py-20 px-4">
            <div className="max-w-2xl w-full">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </motion.div>

                {/* Card Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative"
                >
                    {/* Visual Header */}
                    <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 p-8 flex justify-center items-center">
                        <div className="flex items-center gap-4 md:gap-8">
                            {/* Pranil */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative"
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                                    <Image
                                        src="/remove_bg_pranil.png"
                                        alt="Pranil"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* Connection Symbol */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                                className="text-primary-300 flex items-center justify-center"
                            >
                                <div className="bg-white p-3 rounded-full shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                                        <polyline points="16 18 22 12 16 6"></polyline>
                                        <polyline points="8 6 2 12 8 18"></polyline>
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Nolan */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative"
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
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

                    <div className="h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>

                    <div className="p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
                            Dear Nolan,
                        </h1>

                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                            <p>
                                Thank you so much for offering to write me a letter of rec!
                            </p>

                            <p>
                                It’s hard to believe it’s already been a year since we started working together. Even though our collaboration has been entirely asynchronous, I’ve genuinely enjoyed every specific sync and code review. Getting to know you and working on this research has been a highlight of my high school experience—honestly, you’re incredibly inspiring to me.
                            </p>

                            <p>
                                You actually introduced me to the world of formal research. From those first literature reviews to our deep dives into the data, you’ve helped shape not just this project, but my entire interest in the field. I often find myself hoping to follow a similar path in my own undergraduate years and beyond.
                            </p>

                            <p>
                                I know things are definitely busy for you, but would you be willing to write me a letter of recommendation for a summer research program I’m planning to apply to? I originally wanted to apply there because of the fast-paced research environment they nurture you with for your subject of interest.
                            </p>

                            <p>
                                It’s due <strong>Feb 27</strong>. If you don’t have the bandwidth, I completely understand, but I wanted to reach out and share what I’m aiming for!
                            </p>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-end">
                            <p className="text-xl font-handwriting text-primary-600 font-medium">
                                Best,<br />
                                Pranil
                            </p>
                            <span className="text-4xl">🚀</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
