"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import StorySection from "@/components/StorySection";
import Portfolio from "@/components/Portfolio";
import ResearchProjects from "@/components/ResearchProjects";
import AcademicAchievements from "@/components/AcademicAchievements";
import Extracurriculars from "@/components/Extracurriculars";
import BackToTop from "@/components/BackToTop";

// The passcode - you can change this to anything you want
const PASSCODE = "pranil2025";

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    // Check localStorage on mount
    useEffect(() => {
        const auth = localStorage.getItem("portfolio_auth");
        setIsAuthenticated(auth === "true");
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode === PASSCODE) {
            localStorage.setItem("portfolio_auth", "true");
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            setPasscode("");
        }
    };

    // Show nothing while checking auth status
    if (isAuthenticated === null) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </main>
        );
    }

    // Show full portfolio if authenticated
    if (isAuthenticated) {
        return (
            <main className="min-h-screen">
                <Navigation />
                <Hero />
                <StorySection />
                <Portfolio />
                <ResearchProjects />
                <AcademicAchievements />
                <Extracurriculars />
                <BackToTop />
            </main>
        );
    }

    // Show passcode screen
    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Subtle animated background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                        top: "-200px",
                        right: "-100px",
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
                        bottom: "-150px",
                        left: "-100px",
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Main heading */}
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    visible to a select few for now
                </motion.h1>

                <motion.p
                    className="text-slate-400 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Enter the access code to continue
                </motion.p>

                {/* Passcode form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className={`space-y-4 ${isShaking ? 'animate-shake' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{
                        animation: isShaking ? 'shake 0.5s ease-in-out' : 'none'
                    }}
                >
                    <input
                        type="password"
                        value={passcode}
                        onChange={(e) => {
                            setPasscode(e.target.value);
                            setError(false);
                        }}
                        placeholder="Enter access code"
                        className={`w-full px-6 py-4 rounded-xl bg-slate-800/50 border ${error ? 'border-red-500' : 'border-slate-700'
                            } text-white placeholder-slate-500 text-center text-lg tracking-widest focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm`}
                        autoFocus
                    />
                    {error && (
                        <motion.p
                            className="text-red-400 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Incorrect code. Please try again.
                        </motion.p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-lg transition-colors"
                    >
                        Enter
                    </button>
                </motion.form>
            </motion.div>

            {/* Footer text */}
            <motion.p
                className="absolute bottom-8 text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                © 2025 Pranil Raichura
            </motion.p>

            {/* Shake animation styles */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `}</style>
        </main>
    );
}
