export const researchProjects = [
  {
    id: "ai-game-development",
    title: "Computer Vision Powered Serious Game for ASD",
    role: "Lead Developer & Researcher",
    tech: "Python, C#",
    years: "9th, 10th, 11th Grade",
    hoursPerWeek: "4-5 hours/week",
    mentors: [
      {
        name: "Dr. Nouchine Hadjikhani",
        affiliation: "Harvard Medical School",
        image: "/nouchine_pfp.jpeg",
      },
      {
        name: "Nolan Miranda, M.S.",
        affiliation: "Stanford University",
        image: "/nolan_pfp.jpeg",
      },
    ],
    organization: "Polygence",
    description: "Designed and published a garden-themed, AI-assisted resource-management game with integrated guided breathing sessions for adolescents (12–16) with Autism Spectrum Disorder (ASD), aimed at improving emotional regulation and reducing state anxiety.",
    highlights: [
      "Conducting an IRB-aligned study with HRV and STAI-State evaluations across weekly gameplay",
      "Authoring research paper with Dr. Nouchine Hadjikhani and Nolan Miranda, M.S.",
    ],
  },
  {
    id: "ml-structural-engineering",
    title: "Machine Learning for Structural Engineering",
    role: "Research Author",
    tech: "Python (XGBoost), Scikit-Learn",
    years: "10th Summer, 11th Grade",
    hoursPerWeek: "6 hours/week",
    organization: "Johns Hopkins Explore Engineering Innovation",
    mentor: {
      name: "Abdiel Rivera, PhD",
      affiliation: "UConn, Associate Professor at Polytechnic University, Orlando",
      image: "/abdiel_pfp.jpeg",
    },
    paperTitle: "Beyond Euler: An Explainable ML Framework for Predicting Buckling Instabilities in Non-Ideal Materials",
    preprintLink: "https://www.researchgate.net/publication/395824075_Beyond_Euler_An_Explainable_Machine_Learning_Framework_for_Predicting_and_Interpreting_Buckling_Instabilities_in_Non-Ideal_Materials",
    status: "Preprint published; under review for journal submission",
    description: "Authored research paper under UConn PhD mentorship; preprint published on ResearchGate.",
    highlights: [
      "Developed an interpretable ML model (XGBoost) with SHAP analysis to predict structural buckling behavior",
      "Extended experimental framework from JHU EEI program, combining engineering and computer science",
    ],
  },
  {
    id: "clearpolicy",
    title: "ClearPolicy.org",
    role: "Founder",
    tech: "TypeScript, React, Prisma, Tailwind, OpenStates & Congress.gov APIs",
    years: "11th Grade",
    description: "Built & shipped a full-stack web app that transforms confusing ballot measures into clear summaries with non-biased sources you can check. Gathering users on the waitlist prior to public release.",
    highlights: [
      "Full-stack development from conception to deployment",
      "Integrates government APIs for real-time legislative data",
    ],
  },
];
