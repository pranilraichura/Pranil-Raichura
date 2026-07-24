export interface PortfolioProject {
    id: string;
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    link?: string;
    github?: string;
    category: "AI/ML" | "Web Development" | "Research" | "Game Development";
    featured: boolean;
    recognition?: string;
    backgroundMedia?: {
        type: "image" | "video";
        src: string;
        opacity?: number;
        className?: string;
    };
}

export const portfolioProjects: PortfolioProject[] = [
    {
        id: "clearpolicy",
        title: "ClearPolicy",
        tagline: "Policy clarity, with sources you can check",
        description: "Full-stack web app transforming ballot measures into clear summaries with verifiable, non-biased sources. Integrates with OpenStates and Congress.gov APIs for real-time legislative data. Used by local community members; currently growing waitlist prior to public launch.",
        tech: ["TypeScript", "React", "Prisma", "Tailwind CSS", "OpenStates API", "Congress.gov API"],
        link: "https://clearpolicy.org",
        category: "Web Development",
        featured: true,
        backgroundMedia: {
            type: "video",
            src: "/ClearPolicy_Animation.mp4",
            opacity: 0.10,
        },
    },
    {
        id: "exoscope-ai",
        title: "Exoscope AI",
        tagline: "NASA-Nominated Exoplanet Detection Tool",
        description: "An AI-powered application for detecting and analyzing exoplanets using machine learning. Built with Python and Streamlit, this tool leverages advanced algorithms to identify potential exoplanets from astronomical data.",
        tech: ["Python", "Streamlit", "Machine Learning", "Data Science"],
        link: "https://exoscope-ai.streamlit.app",
        category: "AI/ML",
        featured: true,
        recognition: "Global Nominee, International NASA SpaceApps Competition 2025",
        backgroundMedia: {
            type: "image",
            src: "/exoscope_ai.png",
            opacity: 0.10,
        },
    },
    {
        id: "fake-news-detection",
        title: "Fake News Detection App",
        tagline: "AI-powered misinformation detection using NLP",
        description: "Machine learning application using NLP and neural networks to detect fake news articles. Built during the Inspirit AI Scholars program under Stanford alumnus mentorship. Employs confusion matrices to classify news authenticity with high accuracy.",
        tech: ["Python", "Streamlit", "Natural Language Processing", "Neural Networks"],
        link: "https://inspirit-ai-weekday2-allhands3-fake-news-detection.streamlit.app/",
        category: "AI/ML",
        featured: true,
        recognition: "Best Presentation Award – Inspirit AI Scholars",
        backgroundMedia: {
            type: "image",
            src: "/fake_news.png",
            opacity: 0.10,
        },
    },
    {
        id: "ai-game-asd",
        title: "ASD Serious Game with Computer Vision",
        tagline: "Improving emotional regulation for adolescents with autism",
        description: "Garden-themed AI game with guided breathing sessions for adolescents (12–16) with ASD. Uses OpenCV to detect diaphragmatic breathing from webcam. Conducting IRB-aligned study with HRV and STAI-State evaluations under Harvard and Stanford mentors.",
        tech: ["Python", "C#", "Unity", "OpenCV", "Machine Learning"],
        link: "https://pranil.itch.io/flora-frontier",
        category: "Game Development",
        featured: true,
        recognition: "Preprint in progress; aiming for journal submission in 2026",
        backgroundMedia: {
            type: "image",
            src: "/breath_background.png",
            opacity: 0.20,
            className: "object-bottom",
        },
    },
    {
        id: "ml-structural-engineering",
        title: "Beyond Euler ML Framework",
        tagline: "Rebuilding a rejected paper into an honest, leakage-safe result",
        description: "Ran 147 physical buckling tests on dried pasta strands (7 lengths × 4 diameters) to test where Euler's 250-year-old buckling formula breaks down for non-ideal materials. The first version of this project used cross-validation that leaked information between train and test sets, producing an inflated R² of 0.97 — and was rejected by every venue it was submitted to for superficial novelty. Rebuilt the entire analysis from scratch with proper GroupKFold validation: honest results show a direct ML model collapses to RMSE 0.350N, while a stratified correction layer on top of the classical Euler formula improves RMSE from 0.180N to 0.108N, holding up even under out-of-distribution diameter extrapolation. Currently under review at IEEE Access.",
        tech: ["Python", "XGBoost", "Scikit-Learn", "SHAP", "GroupKFold Cross-Validation", "Data Analysis"],
        github: "https://www.researchgate.net/publication/395824075",
        category: "Research",
        featured: true,
        recognition: "Manuscript under review, IEEE Access",
        backgroundMedia: {
            type: "image",
            src: "/figure1_bucklingtest.png",
            opacity: 0.20,
        },
    },
];
