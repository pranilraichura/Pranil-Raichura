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

export default function Home() {
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
