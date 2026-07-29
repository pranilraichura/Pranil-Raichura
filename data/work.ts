// Unified replacement for the former data/portfolio.ts + data/research.ts split.
// Items are tagged by domain (what the work is about) rather than by format,
// because most of these are simultaneously a shipped project and a research effort.

export type WorkDomain =
  | "AI Safety & Evaluation"
  | "AI & Education"
  | "Civic & Social Good"
  | "Accessibility & Health"
  | "Applied ML & Systems";

export interface WorkItem {
  id: string;
  title: string;
  tagline: string;
  domains: WorkDomain[];
  role?: string;
  organization?: string;
  years?: string;
  dates?: string;
  hoursPerWeek?: string;
  description: string;
  status?: string;
  recognition?: string;
  highlights?: string[];
  tech?: string[];
  mentors?: { name: string; affiliation: string; image?: string }[];
  paperTitle?: string;
  preprintLink?: string;
  link?: string;
  linkLabel?: string;
  github?: string;
  backgroundMedia?: {
    type: "image" | "video";
    src: string;
    opacity?: number;
    className?: string;
  };
}

export const domainOrder: WorkDomain[] = [
  "AI Safety & Evaluation",
  "Applied ML & Systems",
  "Accessibility & Health",
  "Civic & Social Good",
  "AI & Education",
];

export const workItems: WorkItem[] = [
  {
    id: "mantis-kellis-lab",
    title: "Mantis — AI Reasoning Visualization",
    tagline: "Making AI reasoning traceable, and measuring whether agents stay consistent",
    domains: ["AI Safety & Evaluation"],
    role: "Research Assistant",
    organization: "Kellis Lab, MIT CSAIL (remote)",
    tech: ["TypeScript", "React", "Python"],
    mentors: [
      {
        name: "Prof. Manolis Kellis",
        affiliation: "MIT CSAIL",
      },
    ],
    paperTitle: "Measuring Cross-Task Behavioral Consistency in Language Model Agents",
    status: "Submitted, COLM 2026 AI Measurement Science (AIMS) Workshop",
    description:
      "Cold-emailed Prof. Manolis Kellis about his work on Mantis, a platform that visualizes AI reasoning and makes it traceable to real data. Joined as a remote research assistant, contributing production features across 28 merged pull requests to the Mantis and MantisAPI codebases — expanding real-time 3D map rendering, collaboration tools, and backend reliability.",
    highlights: [
      "Co-developed the Behavioral Consistency Metric (BCM) with Prof. Kellis — evaluates whether an AI agent behaves consistently across tasks, not just whether it succeeds",
      "Validated the metric across 9,191 SWE-bench agent trajectories from six different systems",
      "Found that consistency and success rate are separable: two agents with similar success rates can differ by an order of magnitude in behavioral consistency",
    ],
  },
  {
    id: "ml-structural-engineering",
    title: "Beyond Euler ML Framework",
    tagline: "Rebuilding a rejected paper into an honest, leakage-safe result",
    domains: ["Applied ML & Systems"],
    role: "Research Author",
    organization: "Johns Hopkins Explore Engineering Innovation",
    years: "10th Summer, 11th Grade",
    dates: "July 2025 - October 2025",
    hoursPerWeek: "6 hours/week",
    tech: [
      "Python",
      "XGBoost",
      "Scikit-Learn",
      "SHAP",
      "GroupKFold Cross-Validation",
      "Data Analysis",
    ],
    mentors: [
      {
        name: "Abdiel Rivera, PhD",
        affiliation: "UConn, Associate Professor at Polytechnic University, Orlando",
        image: "/abdiel_pfp.jpeg",
      },
    ],
    paperTitle:
      "Beyond Euler: An Explainable ML Framework for Predicting Buckling Instabilities in Non-Ideal Materials",
    preprintLink:
      "https://www.researchgate.net/publication/395824075_Beyond_Euler_An_Explainable_Machine_Learning_Framework_for_Predicting_and_Interpreting_Buckling_Instabilities_in_Non-Ideal_Materials",
    status: "Under review, IEEE Access",
    description:
      "Ran 147 physical buckling tests on dried pasta strands (7 lengths × 4 diameters) to test where Euler's 250-year-old buckling formula breaks down for non-ideal materials. The first version of this project used cross-validation that leaked information between train and test sets, producing an inflated R² of 0.97 — and was rejected by every venue it was submitted to for superficial novelty. Rebuilt the entire analysis from scratch with proper GroupKFold validation: honest results show a direct ML model collapses to RMSE 0.350N, while a stratified correction layer on top of the classical Euler formula improves RMSE from 0.180N to 0.108N, holding up even under out-of-distribution diameter extrapolation.",
    highlights: [
      "Discovered data leakage in the original cross-validation — the inflated R²=0.97 was an artifact, not a real finding",
      "Rebuilt the entire analysis with GroupKFold validation; honest direct ML model collapses to RMSE 0.350N",
      "Stratified Euler correction layer improves RMSE from 0.180N to 0.108N, validated on out-of-distribution diameters",
    ],
    backgroundMedia: {
      type: "image",
      src: "/figure1_bucklingtest.png",
      opacity: 0.2,
    },
  },
  {
    id: "ai-game-asd",
    title: "Computer Vision Powered Serious Game for ASD",
    tagline: "Improving emotional regulation for adolescents with autism",
    domains: ["Accessibility & Health"],
    role: "Lead Developer & Researcher",
    organization: "Polygence",
    years: "9th, 10th, 11th Grade",
    dates: "August 2024 - February 2026",
    hoursPerWeek: "4-5 hours/week",
    tech: ["Python", "C#", "Unity", "OpenCV", "Machine Learning"],
    mentors: [
      {
        name: "Nolan Miranda, M.S.",
        affiliation: "Stanford University",
        image: "/nolan_pfp.jpeg",
      },
      {
        name: "Dr. Nouchine Hadjikhani",
        affiliation: "Harvard Medical School",
        image: "/nouchine_pfp.jpeg",
      },
    ],
    status: "Submitted to JMIR Serious Games",
    description:
      "Designed and published a garden-themed, AI-assisted resource-management game with integrated guided breathing sessions for adolescents (12–16) with Autism Spectrum Disorder (ASD), aimed at improving emotional regulation and reducing state anxiety. The breathing sessions use OpenCV to detect diaphragmatic breathing from a webcam. Coauthored with Dr. Nouchine Hadjikhani (Harvard Medical School) and Nolan Miranda, M.S. (Stanford University).",
    highlights: [
      "Conducting an IRB-aligned study with HRV and STAI-State evaluations across weekly gameplay",
      "Authoring research paper with Dr. Nouchine Hadjikhani and Nolan Miranda, M.S.",
    ],
    link: "https://pranil.itch.io/flora-frontier",
    linkLabel: "Play Flora Frontier",
    backgroundMedia: {
      type: "image",
      src: "/breath_background.png",
      opacity: 0.2,
      className: "object-bottom",
    },
  },
  {
    id: "glioblastoma-peptide",
    title: "AI Pipeline for Glioblastoma Peptide Drug Screening",
    tagline: "Ranking peptide drug candidates before they reach the lab bench",
    domains: ["Accessibility & Health", "Applied ML & Systems"],
    role: "Second Author",
    status: "Accepted, IEEE CIBCB 2026",
    description:
      "Built an AI pipeline that screens candidate peptide drugs for glioblastoma by predicting 3D structure and scoring binding affinity to the tumor and blood-brain-barrier crossover potential. Co-designed a new ranking metric intended to reduce costly lab testing of low-potential candidates.",
  },
  {
    id: "meridian",
    title: "MERIDIAN — Fair AI-Text Detection for ESL Writers",
    tagline: "Cutting the ESL false-accusation rate from 29% to 3.9%",
    domains: ["AI Safety & Evaluation", "AI & Education"],
    role: "Lead Researcher",
    tech: ["Python", "PyTorch", "DistilGPT-2", "LSTM"],
    status: "Targeting NLP4PI and PANDORA workshops",
    description:
      "Built a dual-stream AI-text detector after learning that commercial AI detectors systematically misclassify writing by English-as-a-Second-Language (ESL) speakers as machine-generated. Combines a Native-Expert stream (sub-word perplexity) with an ESL-Expert stream (character-level LSTM trained on learner corpora), grounded in second-language-acquisition theory.",
    highlights: [
      "93–95% accuracy with an 8.3% false-positive rate under 5-fold cross-validation",
      "Cut the ESL false-positive rate from 29% to 3.9% on held-out TOEFL11 data in a zero-shot setting — outperforming single-stream baselines (0% for low-proficiency writers)",
      "Live demo on Hugging Face Spaces",
    ],
  },
  {
    id: "clearpolicy",
    title: "ClearPolicy",
    tagline: "Policy clarity, with sources you can check",
    domains: ["Civic & Social Good"],
    role: "Founder",
    years: "11th Grade",
    dates: "October 2025 - Present",
    tech: [
      "TypeScript",
      "React",
      "Prisma",
      "Tailwind CSS",
      "OpenStates API",
      "Congress.gov API",
    ],
    description:
      "Built and shipped a full-stack web app that transforms confusing ballot measures into clear summaries with non-biased sources you can check yourself. Integrates the OpenStates and Congress.gov APIs for real-time legislative data. Used by local community members; currently growing a waitlist prior to public launch.",
    highlights: [
      "Full-stack development from conception to deployment",
      "Integrates government APIs for real-time legislative data",
    ],
    link: "https://clearpolicy.org",
    linkLabel: "Visit clearpolicy.org",
    backgroundMedia: {
      type: "video",
      src: "/ClearPolicy_Animation.mp4",
      opacity: 0.1,
    },
  },
  {
    id: "torch-measure",
    title: "Torch_Measure — AI Evaluation Toolkit",
    tagline: "Finding the flawed questions inside AI benchmark datasets",
    domains: ["AI Safety & Evaluation"],
    role: "Contributor and Researcher",
    organization: "Stanford AI Measurement Science Lab (remote)",
    dates: "March 2026 - Present",
    tech: ["Python"],
    mentors: [
      {
        name: "Sang Truong",
        affiliation: "Stanford Ph.D. researcher",
      },
    ],
    status: "Coauthor",
    description:
      "Coauthored Torch_Measure with Stanford Ph.D. researcher Sang Truong, a paper and psychometric toolkit that helps researchers identify flawed items in AI evaluation datasets.",
  },
  {
    id: "usc-isi-agentic-ai",
    title: "Agentic AI Applications",
    tagline: "Emergent LLM behavior and responsible AI in health and crisis settings",
    domains: ["AI Safety & Evaluation"],
    role: "Researcher, AICS Lab",
    organization:
      "USC Information Sciences Institute, Artificial Intelligence and Complex Systems Group",
    dates: "February 2026 - May 2026",
    tech: ["Python", "PyTorch"],
    mentors: [
      {
        name: "Prof. Mayank Kejriwal",
        affiliation: "USC Information Sciences Institute",
      },
    ],
    description:
      "Conducted research under Prof. Mayank Kejriwal in the Artificial Intelligence and Complex Systems Group, investigating emergent LLM behavior and responsible-AI applications in healthcare, crisis informatics, and social systems.",
  },
  {
    id: "prism-ai-writing",
    title: "PRISM: Profiles of AI Use, Creativity, and Authorship",
    tagline: "What happens to creativity and ownership when students write with AI",
    domains: ["AI & Education"],
    role: "Lead Author",
    years: "11th Grade",
    dates: "November 2025 - January 2026",
    tech: ["Python", "K-means clustering", "Statistical Analysis"],
    mentors: [
      {
        name: "Dr. Nouchine Hadjikhani",
        affiliation: "Harvard Medical School",
        image: "/nouchine_pfp.jpeg",
      },
      {
        name: "Natalie Elkin",
        affiliation: "Granite Bay High School",
        image: "/elkin_pfp.jpeg",
      },
    ],
    paperTitle:
      "PRISM: Profiles of AI Use, Creativity, and Authorship in High School Writing",
    preprintLink: "https://osf.io/preprints/psyarxiv/dx4bf_v1",
    status: "Submitted Jan 2026",
    description:
      "Conducted a correlational survey of 246 high school students to examine the relationship between AI tool usage, self-reported creativity, and perceived authorship. Identified three distinct student profiles (PRISM) using K-means clustering, revealing that frequent AI use correlates with lower creativity but higher perceived authorship.",
    highlights: [
      "Surveyed 246 students on AI habits and writing perceptions",
      "Used K-means clustering to identify 3 distinct user profiles",
      "Found inverse correlation between AI frequency and creativity",
    ],
  },
  {
    id: "exoscope-ai",
    title: "Exoscope AI",
    tagline: "NASA-nominated exoplanet detection tool",
    domains: ["Applied ML & Systems"],
    tech: ["Python", "Streamlit", "Machine Learning", "Data Science"],
    recognition: "Global Nominee, International NASA SpaceApps Competition 2025",
    description:
      "An AI-powered application for detecting and analyzing exoplanets using machine learning. Built with Python and Streamlit, this tool leverages advanced algorithms to identify potential exoplanets from astronomical data.",
    link: "https://exoscope-ai.streamlit.app",
    linkLabel: "Try Exoscope AI",
    backgroundMedia: {
      type: "image",
      src: "/exoscope_ai.png",
      opacity: 0.1,
    },
  },
  {
    id: "fake-news-detection",
    title: "Fake News Detection App",
    tagline: "AI-powered misinformation detection using NLP",
    domains: ["Applied ML & Systems", "Civic & Social Good"],
    tech: ["Python", "Streamlit", "Natural Language Processing", "Neural Networks"],
    recognition: "Best Presentation Award – Inspirit AI Scholars",
    description:
      "Machine learning application using NLP and neural networks to detect fake news articles. Built during the Inspirit AI Scholars program under Stanford alumnus mentorship. Employs confusion matrices to classify news authenticity with high accuracy.",
    link: "https://inspirit-ai-weekday2-allhands3-fake-news-detection.streamlit.app/",
    linkLabel: "Try the app",
    backgroundMedia: {
      type: "image",
      src: "/fake_news.png",
      opacity: 0.1,
    },
  },
  {
    id: "cosmos-2026",
    title: "COSMOS Summer Program — UCLA",
    tagline: "Computational neuroscience and PyTorch, implemented from scratch",
    domains: ["Applied ML & Systems"],
    role: "Participant",
    organization:
      "UCLA COSMOS, mentored by Prof. Hugh Tad Blair (computational neuroscience)",
    description:
      "Coursework and independent research under Prof. Blair's mentorship, including PyTorch fundamentals (from-scratch SLP/MLP implementations) and computer vision work with GoogLeNet on the Stanford Dogs dataset.",
  },
];
