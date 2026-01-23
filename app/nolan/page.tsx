"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NolanPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 px-4">
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
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="h-2 bg-gradient-to-r from-primary-500 to-accent-purple"></div>

                    <div className="p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
                            Dear Nolan,
                        </h1>

                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
                            <p>
                                Thank you so much for offering to write me a letter of rec!
                            </p>

                            <p>
                                Although we&apos;ve been working asynchronously and meeting online for the past year (wow, time flies :P), I&apos;ve had a lot of fun getting to know you better and working on this project! You are also super cool and inspiring!
                            </p>

                            <p>
                                I was first introduced to research, actually, when I met you a year ago and started reading those literature reviews. Since then, I&apos;ve kept working on this project and taken on other research endeavors while exploring what I truly enjoy! I really hope to further this passion, and I definitely hope to follow in your footsteps when I think about my undergraduate years and beyond.
                            </p>

                            <p>
                                I know things are definitely busy for you, but would you be willing to write me a letter of recommendation to the summer research program I&apos;m planning to apply to? I originally wanted to apply there because of the fast-paced research environment they nurture you with for your subject of interest.
                            </p>

                            <p>
                                It&apos;s due <strong>Feb 27</strong>, I think, so if you don&apos;t have the bandwidth, I completely understand :) I just wanted to reach out and share what I&apos;m aiming for on the side!
                            </p>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <p className="text-xl font-handwriting text-primary-600">
                                Best,<br />
                                Pranil
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
