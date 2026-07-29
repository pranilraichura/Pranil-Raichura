import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import StorySection from "@/components/StorySection";
import About from "@/components/About";
import Work from "@/components/Work";
import AcademicAchievements from "@/components/AcademicAchievements";
import Extracurriculars from "@/components/Extracurriculars";
import BackToTop from "@/components/BackToTop";

export default function MePage() {
    return (
        <main className="min-h-screen">
            <Navigation />
            <Hero />
            <StorySection />
            <About />
            <AcademicAchievements />
            <Extracurriculars />
            <Work />
            <BackToTop />
        </main>
    );
}
