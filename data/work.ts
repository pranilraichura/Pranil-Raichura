// Unified replacement for the former data/portfolio.ts + data/research.ts split.
// Items are tagged by domain (what the work is about) rather than by format,
// because most of these are simultaneously a shipped project and a research effort.

export type WorkDomain =
  | "AI Safety & Evaluation"
  | "AI & Education"
  | "Civic & Social Good"
  | "Accessibility & Health"
  | "Applied ML & Systems";

export type WorkBrandTone =
  | "blue"
  | "cardinal"
  | "crimson"
  | "gold"
  | "indigo"
  | "navy"
  | "slate";

export interface WorkBrand {
  /** Short fallback shown only if an artwork file is unavailable. */
  shortLabel: string;
  /** Full affiliation or project name shown on larger cards and to assistive tech. */
  label: string;
  tone: WorkBrandTone;
  /** Sourced institution or project artwork. See public/marks/SOURCES.md. */
  logoSrc?: string;
}

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
  mentors?: {
    name: string;
    affiliation: string;
    image?: string;
    credit?: "Mentor" | "Acknowledgment";
  }[];
  paperTitle?: string;
  preprintLink?: string;
  link?: string;
  linkLabel?: string;
  detailPage?: { href: string; label: string };
  github?: string;
  backgroundMedia?: {
    type: "image" | "video";
    src: string;
    opacity?: number;
    className?: string;
  };
  brand?: WorkBrand;
  // Featured items get a larger, quieter-around-them treatment at the top of the
  // Work section. Everything else stays in the condensed list below it.
  featured?: boolean;
  // Must be a verbatim sentence lifted from `description` or `highlights`.
  pullQuote?: string;
  // A real photo shown inline at readable size, not as a background watermark.
  figure?: {
    src: string;
    alt: string;
    caption: string;
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
    id: "ai-reasoning-visualization",
    title: "AI Reasoning Visualization",
    tagline: "Making AI reasoning traceable, and measuring whether agents stay consistent",
    domains: ["AI Safety & Evaluation"],
    featured: true,
    pullQuote:
      "Cold-emailed Prof. MK at MIT about research on making AI reasoning traceable to real data.",
    role: "Research Assistant",
    organization: "Massachusetts Institute of Technology (remote)",
    brand: {
      shortLabel: "MIT",
      label: "Massachusetts Institute of Technology",
      tone: "crimson",
      logoSrc: "/marks/mit.webp",
    },
    tech: ["TypeScript", "React", "Python"],
    mentors: [{ name: "Prof. MK", affiliation: "MIT" }],
    paperTitle: "Research on measuring behavioral consistency in AI agents",
    status: "Submitted to an academic AI workshop",
    description:
      "Cold-emailed Prof. MK at MIT about research on making AI reasoning traceable to real data. Joined as a remote research assistant, contributing production features across dozens of merged pull requests to a visualization platform and API, expanding real-time 3D map rendering, collaboration tools, and backend reliability.",
    highlights: [
      "Co-developed a new metric for evaluating whether an AI agent behaves consistently across tasks, separate from whether it succeeds",
      "Validated the metric across thousands of real AI agent task recordings drawn from six different systems",
      "Found that consistency and success rate are separable: two agents with similar success rates can differ by an order of magnitude in behavioral consistency",
    ],
  },
  {
    id: "ml-structural-engineering",
    title: "Beyond Euler ML Framework",
    tagline: "Rebuilding a rejected paper into an honest, leakage-safe result",
    domains: ["Applied ML & Systems"],
    featured: true,
    pullQuote:
      "The first version of this project used cross-validation that leaked information between train and test sets, producing results that looked far stronger than they really were, and was rejected by every venue it was submitted to for superficial novelty.",
    role: "Research Author",
    organization: "Johns Hopkins University",
    brand: {
      shortLabel: "JHU",
      label: "Johns Hopkins University",
      tone: "blue",
      logoSrc: "/marks/johns-hopkins.svg",
    },
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
        name: "Dr. AR",
        affiliation: "UConn; Associate Professor at Polytechnic University, Orlando",
        image: "/abdiel_pfp.jpeg",
      },
    ],
    paperTitle:
      "Beyond Euler: An Explainable ML Framework for Predicting Buckling Instabilities in Non-Ideal Materials",
    preprintLink:
      "https://www.researchgate.net/publication/395824075_Beyond_Euler_An_Explainable_Machine_Learning_Framework_for_Predicting_and_Interpreting_Buckling_Instabilities_in_Non-Ideal_Materials",
    status: "Under review, IEEE Access",
    description:
      "Ran 147 physical buckling tests on dried pasta strands (7 lengths × 4 diameters) to test where Euler's 250-year-old buckling formula breaks down for non-ideal materials. The first version of this project used cross-validation that leaked information between train and test sets, producing results that looked far stronger than they really were, and was rejected by every venue it was submitted to for superficial novelty. Rebuilt the entire analysis from scratch with validation that keeps the test data genuinely unseen: the honest results show that throwing machine learning at the problem directly does worse than the classical formula, while a correction layer built on top of that formula cuts the remaining error by about 40%, and holds up even on strand thicknesses it was never trained on.",
    highlights: [
      "Discovered data leakage in the original cross-validation. The headline result was an artifact, not a real finding",
      "Rebuilt the entire analysis with validation that keeps train and test data properly separated",
      "A correction layer on the classical formula cut the remaining error by about 40%, and held up on unseen strand thicknesses",
    ],
    figure: {
      src: "/figure1_bucklingtest.png",
      alt: "A hand pressing a single dried pasta strand vertically down onto a digital kitchen scale until it bends.",
      caption:
        "The physical setup behind the dataset: a dried pasta strand loaded by hand against a digital kitchen scale, run 147 times across 7 lengths and 4 diameters.",
    },
  },
  {
    id: "ai-game-asd",
    title: "Computer Vision Powered Serious Game for ASD",
    tagline: "Improving emotional regulation for adolescents with autism",
    domains: ["Accessibility & Health"],
    role: "Lead Developer & Researcher",
    organization: "Polygence",
    brand: {
      shortLabel: "FF",
      label: "Flora Frontier",
      tone: "slate",
      logoSrc: "/marks/flora-frontier.webp",
    },
    years: "9th, 10th, 11th Grade",
    dates: "August 2024 - February 2026",
    hoursPerWeek: "4-5 hours/week",
    tech: ["Python", "C#", "Unity", "OpenCV", "Machine Learning"],
    mentors: [
      {
        name: "Dr. NH",
        affiliation: "Harvard Medical School",
        image: "/nouchine_pfp.jpeg",
        credit: "Mentor",
      },
      {
        name: "NM, M.S.",
        affiliation: "Stanford University",
        image: "/nolan_pfp.jpeg",
        credit: "Acknowledgment",
      },
    ],
    status: "Submitted to JMIR Serious Games",
    description:
      "Designed and published a garden-themed, AI-assisted resource-management game with integrated guided breathing sessions for adolescents (12-16) with Autism Spectrum Disorder (ASD), aimed at improving emotional regulation and reducing state anxiety. The breathing sessions use OpenCV to detect diaphragmatic breathing from a webcam.",
    highlights: [
      "Conducting an IRB-aligned study measuring heart-rate variability and self-reported anxiety across weekly gameplay",
      "Authoring the resulting research paper alongside both coauthors",
    ],
    link: "https://pranil.itch.io/flora-frontier",
    linkLabel: "Play Flora Frontier",
    detailPage: { href: "/activities/flora-frontier/", label: "Explore the full story" },
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
    brand: {
      shortLabel: "IEEE",
      label: "Accepted · IEEE CIBCB 2026",
      tone: "blue",
      logoSrc: "/marks/ieee.svg",
    },
    recognition: "Accepted to IEEE CIBCB 2026",
    status: "Accepted, IEEE CIBCB 2026",
    description:
      "Built an AI pipeline that screens candidate peptide drugs for glioblastoma by predicting 3D structure and scoring binding affinity to the tumor and blood-brain-barrier crossover potential. Co-designed a new ranking metric intended to reduce costly lab testing of low-potential candidates.",
  },
  {
    id: "meridian",
    title: "MERIDIAN: Fair AI-Text Detection for ESL Writers",
    tagline: "Cutting the ESL false-accusation rate from 29% to 3.9%",
    domains: ["AI Safety & Evaluation", "AI & Education"],
    featured: true,
    pullQuote:
      "Built a dual-stream AI-text detector after learning that commercial AI detectors systematically misclassify writing by English-as-a-Second-Language (ESL) speakers as machine-generated.",
    role: "Lead Researcher",
    tech: ["Python", "PyTorch", "DistilGPT-2", "LSTM"],
    status: "Targeting NLP4PI and PANDORA workshops",
    description:
      "Built a dual-stream AI-text detector after learning that commercial AI detectors systematically misclassify writing by English-as-a-Second-Language (ESL) speakers as machine-generated. Combines a Native-Expert stream (sub-word perplexity) with an ESL-Expert stream (character-level LSTM trained on learner corpora), grounded in second-language-acquisition theory.",
    highlights: [
      "93-95% accuracy with an 8.3% false-positive rate under 5-fold cross-validation",
      "Cut the ESL false-positive rate from 29% to 3.9% on held-out TOEFL11 data in a zero-shot setting, outperforming single-stream baselines (0% for low-proficiency writers)",
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
    brand: {
      shortLabel: "CP",
      label: "ClearPolicy",
      tone: "indigo",
      logoSrc: "/marks/clearpolicy.webp",
    },
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
    detailPage: { href: "/activities/clearpolicy/", label: "Read the case study" },
    backgroundMedia: {
      type: "video",
      src: "/ClearPolicy_Animation.mp4",
      opacity: 0.1,
    },
  },
  {
    id: "torch-measure",
    title: "Torch_Measure: AI Evaluation Toolkit",
    tagline: "Finding the flawed questions inside AI benchmark datasets",
    domains: ["AI Safety & Evaluation"],
    role: "Contributor and Researcher",
    organization: "Stanford University (remote)",
    brand: {
      shortLabel: "S",
      label: "Stanford University",
      tone: "cardinal",
      logoSrc: "/marks/stanford.webp",
    },
    dates: "March 2026 - Present",
    tech: ["Python"],
    mentors: [{ name: "ST", affiliation: "Stanford Ph.D. researcher" }],
    status: "Coauthor",
    description:
      "Coauthored Torch_Measure with ST, a Stanford Ph.D. researcher: a paper and psychometric toolkit that helps researchers identify flawed items in AI evaluation datasets.",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Applications",
    tagline: "Emergent LLM behavior and responsible AI in health and crisis settings",
    domains: ["AI Safety & Evaluation"],
    role: "Researcher",
    organization: "University of Southern California",
    brand: {
      shortLabel: "USC",
      label: "University of Southern California",
      tone: "gold",
      logoSrc: "/marks/usc.webp",
    },
    dates: "February 2026 - May 2026",
    tech: ["Python", "PyTorch"],
    mentors: [
      {
        name: "Prof. MK",
        affiliation: "USC",
      },
    ],
    description:
      "Conducted research under Prof. MK at USC, investigating emergent LLM behavior and responsible-AI applications in healthcare, crisis informatics, and social systems.",
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
        name: "Dr. NH",
        affiliation: "Harvard Medical School",
        image: "/nouchine_pfp.jpeg",
      },
      {
        name: "Ms. NE",
        affiliation: "Teacher, Granite Bay High School",
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
    brand: {
      shortLabel: "NASA",
      label: "NASA Space Apps · Global Nominee",
      tone: "navy",
      logoSrc: "/marks/nasa.webp",
    },
    description:
      "A Python and Streamlit application that uses machine learning to identify possible exoplanets in astronomical data.",
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
    recognition: "Best Presentation Award, Inspirit AI Scholars",
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
    title: "COSMOS Summer Program at UCLA",
    tagline: "Measuring whether AI theorem provers reason consistently, rather than only whether they succeed",
    domains: ["AI Safety & Evaluation", "Applied ML & Systems"],
    role: "Student Researcher",
    organization: "University of California, Los Angeles",
    brand: {
      shortLabel: "UCLA",
      label: "UCLA",
      tone: "blue",
      logoSrc: "/marks/ucla.svg",
    },
    mentors: [{ name: "Prof. Hugh Tad Blair", affiliation: "UCLA" }],
    detailPage: { href: "/activities/cosmos/", label: "Explore the COSMOS research story" },
    description:
      "Working with Professor Hugh Tad Blair, I adapted the Behavioral Consistency Metric to Lean theorem-proving agents. I represented proofs as attribution-based fingerprints of tactics, structure, and errors, then used LightGBM and cosine similarity to test whether those fingerprints captured repeatable reasoning strategies. The method recovered known mutation types in 260,103 APRIL proofs (0.923 macro-F1), found DeepSeek-Prover-V1 substantially more consistent across tasks than a large human Mathlib corpus, and distinguished its proof-writing behavior from Goedel-Prover-SFT across six robustness checks.",
    tech: ["Python", "Lean", "LightGBM", "Machine Learning"],
  },
];

// Tech4Silvers is one of the two projects the Story section closes on, so it belongs
// in the featured tier, but its content lives in data/extracurriculars.ts and is
// deliberately not duplicated here. This is a pointer to that card, not a second entry.
export const tech4SilversFeature = {
  title: "Tech4Silvers",
  role: "Founder & President",
  years: "9th, 10th, 11th Grade",
  // Verbatim first sentence of the Tech4Silvers description in data/extracurriculars.ts.
  pullQuote:
    "I started Tech4Silvers after realizing many seniors in our community were missing digital wildfire and emergency alerts.",
  image: {
    src: "/gallery/full/tech4silvers-hands-on.jpg",
    alt: "Pranil and other Tech4Silvers volunteers helping senior-center residents one-on-one with their devices.",
    caption: "Hands-on help at a Tech4Silvers workshop",
  },
  href: "/tech4silvers/",
};
