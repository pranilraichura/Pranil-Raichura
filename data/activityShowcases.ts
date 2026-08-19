import type { ActivityMedia } from "@/data/extracurriculars";

export type ActivityTheme =
  | "cosmos"
  | "volleyball"
  | "programming"
  | "flora"
  | "pranam"
  | "clearpolicy";

export interface ActivityShowcaseDefinition {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  theme: ActivityTheme;
  eyebrow: string;
  title: string;
  accentTitle: string;
  deck: string;
  hero: string;
  heroPosition?: string;
  brandMark?: string;
  brandMarkAlt?: string;
  facts: { value: string; label: string }[];
  introduction: {
    kicker: string;
    title: string;
    body: string[];
  };
  chapters: {
    number: string;
    kicker: string;
    title: string;
    body: string;
  }[];
  feature: {
    mediaIndex: number;
    kicker: string;
    title: string;
    body: string;
  };
  media: ActivityMedia[];
  links?: { label: string; href: string }[];
  closing: string;
}

export const activityShowcases: ActivityShowcaseDefinition[] = [
  {
    slug: "cosmos",
    navLabel: "COSMOS",
    metaTitle: "COSMOS at UCLA | Pranil Raichura",
    metaDescription: "A summer of theorem proving, behavioral consistency research, and life at UCLA COSMOS.",
    theme: "cosmos",
    eyebrow: "UCLA · Summer research",
    title: "Beyond the",
    accentTitle: "success rate.",
    deck: "At COSMOS, I tested whether AI theorem provers solve different problems with a stable strategy, not only whether they get the right answer.",
    hero: "/gallery/full/cosmos-fountain-group.jpg",
    heroPosition: "center 44%",
    brandMark: "/marks/ucla.svg",
    brandMarkAlt: "UCLA",
    facts: [
      { value: "260,103", label: "Lean proofs analyzed" },
      { value: "0.923", label: "Macro F1 on mutation recovery" },
      { value: "6", label: "Robustness checks" },
    ],
    introduction: {
      kicker: "The question",
      title: "Two provers can reach the same score in very different ways.",
      body: [
        "Success rate hides the route an agent takes. One system may use a repeatable plan across problems while another arrives through a scattered process. I wanted a way to tell those behaviors apart.",
        "Working with Prof. HTB at UCLA, I adapted the Behavioral Consistency Metric to Lean theorem-proving agents and turned each proof into a fingerprint of its tactics, structure, and errors.",
      ],
    },
    chapters: [
      {
        number: "01",
        kicker: "Represent",
        title: "From proof trees to fingerprints",
        body: "I extracted structural features from Lean proof attempts and converted them into attribution vectors. Those vectors made it possible to compare strategies geometrically across a large collection of problems.",
      },
      {
        number: "02",
        kicker: "Validate",
        title: "Make sure the signal is real",
        body: "Before trusting the metric, I tested it on 260,103 APRIL proofs with known mutation labels. A LightGBM classifier recovered those mutation types at 0.923 macro F1, showing that the fingerprints captured meaningful structure.",
      },
      {
        number: "03",
        kicker: "Compare",
        title: "Human and machine proof behavior",
        body: "The analysis found DeepSeek-Prover-V1 substantially more consistent across tasks than a large human Mathlib corpus, then separated it from Goedel-Prover-SFT across six robustness checks.",
      },
    ],
    feature: {
      mediaIndex: 2,
      kicker: "The summer around the work",
      title: "Research was only one part of COSMOS.",
      body: "The program mixed long sessions of debugging and analysis with a cohort living, learning, and exploring UCLA together. The result was equal parts research sprint and shared summer experience.",
    },
    media: [
      { type: "image", path: "/gallery/full/cosmos-fountain-group.jpg", thumbnail: "/gallery/thumb/cosmos-fountain-group.jpg", caption: "COSMOS cohort at UCLA" },
      { type: "image", path: "/gallery/full/cosmos-ucla-bruin.jpg", thumbnail: "/gallery/thumb/cosmos-ucla-bruin.jpg", caption: "COSMOS at UCLA" },
      { type: "image", path: "/gallery/full/cosmos-completion.jpg", thumbnail: "/gallery/thumb/cosmos-completion.jpg", caption: "COSMOS completion ceremony" },
      { type: "image", path: "/gallery/full/cosmos-dorm-life.jpg", thumbnail: "/gallery/thumb/cosmos-dorm-life.jpg", caption: "Dorm life at COSMOS" },
      { type: "image", path: "/gallery/full/cosmos-spider-man-night.jpg", thumbnail: "/gallery/thumb/cosmos-spider-man-night.jpg", caption: "An evening out with the COSMOS cohort" },
      { type: "image", path: "/gallery/full/summer-program-boba-group.jpg", thumbnail: "/gallery/thumb/summer-program-boba-group.jpg", caption: "Summer program friends" },
    ],
    closing: "A research summer that changed how I think about evaluating intelligent systems.",
  },
  {
    slug: "volleyball",
    navLabel: "Volleyball",
    metaTitle: "Volleyball Journey | Pranil Raichura",
    metaDescription: "Nine years of club volleyball, school teams, national competition, and the lessons behind the results.",
    theme: "volleyball",
    eyebrow: "Club and school · Nine-year journey",
    title: "Built through",
    accentTitle: "every rally.",
    deck: "Volleyball taught me to reset quickly, trust the people beside me, and keep contributing when a match stops going to plan.",
    hero: "/gallery/full/club-volleyball-double-block.jpg",
    heroPosition: "center 42%",
    facts: [
      { value: "9 years", label: "Playing club volleyball" },
      { value: "Silver", label: "USAV Nationals, 14 Open" },
      { value: "2× Gold", label: "SCVA and NCVA finishes" },
    ],
    introduction: {
      kicker: "The long game",
      title: "The point ends. Your response carries forward.",
      body: [
        "I started club volleyball years before high school and grew into an outside hitter competing in some of the strongest boys leagues on the West Coast.",
        "Long tournament days and tight elimination matches made one habit essential: learn from the last point without carrying it into the next one.",
      ],
    },
    chapters: [
      {
        number: "01",
        kicker: "Club",
        title: "Learning the pace",
        body: "Club seasons meant early warmups, travel, film, and full days inside packed gyms. Repetition made the technical skills automatic and left more room to read the court under pressure.",
      },
      {
        number: "02",
        kicker: "Competition",
        title: "Results earned together",
        body: "My teams earned silver at USAV Nationals in 14 Open, gold at the SCVA SoCal Cup, gold in the NCVA Power League, and multiple qualification medals.",
      },
      {
        number: "03",
        kicker: "Granite Bay",
        title: "A second team and a different role",
        body: "I played JV as a freshman and moved to varsity as a sophomore. The school team added a new kind of responsibility: balancing practices, film, travel, and postseason play with a full academic schedule.",
      },
    ],
    feature: {
      mediaIndex: 4,
      kicker: "Pressure",
      title: "Contribution is larger than the stat line.",
      body: "Some matches called for scoring. Others called for a clean pass, an aggressive serve, or steady energy after a rough rotation. Volleyball made me value the small actions that keep a team stable.",
    },
    media: [
      { type: "image", path: "/gallery/full/club-volleyball-double-block.jpg", thumbnail: "/gallery/thumb/club-volleyball-double-block.jpg", caption: "Club volleyball at the net" },
      { type: "image", path: "/gallery/full/volleyball-block-action.jpg", thumbnail: "/gallery/thumb/volleyball-block-action.jpg", caption: "Blocking in club competition" },
      { type: "image", path: "/gallery/full/volleyball-celebration.jpg", thumbnail: "/gallery/thumb/volleyball-celebration.jpg", caption: "Celebrating a point with the team" },
      { type: "image", path: "/gallery/full/granite-bay-jersey-swap.jpg", thumbnail: "/gallery/thumb/granite-bay-jersey-swap.jpg", caption: "Granite Bay volleyball" },
      { type: "image", path: "/gallery/full/granite-bay-spike.jpg", thumbnail: "/gallery/thumb/granite-bay-spike.jpg", caption: "Attacking for Granite Bay" },
      { type: "image", path: "/gallery/full/granite-bay-volleyball-net.jpg", thumbnail: "/gallery/thumb/granite-bay-volleyball-net.jpg", caption: "Granite Bay at the net" },
      { type: "image", path: "/gallery/full/aspire-volleyball-huddle.jpg", thumbnail: "/gallery/thumb/aspire-volleyball-huddle.jpg", caption: "Aspire team huddle" },
      { type: "image", path: "/gallery/full/volleyball-first-place.jpg", thumbnail: "/gallery/thumb/volleyball-first-place.jpg", caption: "A first-place finish" },
      { type: "image", path: "/gallery/full/youth-volleyball-action.jpg", thumbnail: "/gallery/thumb/youth-volleyball-action.jpg", caption: "An early season on the court" },
    ],
    links: [{ label: "Read the team news article", href: "https://goldcountrymedia.com/news/261272/aspire-14-boys-earn-bid-to-jr-nationals/" }],
    closing: "Nine years, hundreds of practices, and a habit of returning ready for the next point.",
  },
  {
    slug: "competitive-programming",
    navLabel: "Programming",
    metaTitle: "Competitive Programming | Pranil Raichura",
    metaDescription: "USACO, HPE CodeWars, hackathons, and building a competitive programming community at Granite Bay.",
    theme: "programming",
    eyebrow: "USACO · CodeWars · Hackathons",
    title: "Think clearly.",
    accentTitle: "Ship quickly.",
    deck: "Competitive programming turns abstract algorithms into decisions made under a clock. I learned the craft, then rebuilt a club around teaching it.",
    hero: "/codewars-hpe.jpg",
    heroPosition: "center 30%",
    facts: [
      { value: "Gold", label: "USACO division" },
      { value: "2nd", label: "HPE CodeWars regional finish" },
      { value: "6 years", label: "Programming" },
    ],
    introduction: {
      kicker: "The discipline",
      title: "A good solution has to survive both complexity and the clock.",
      body: [
        "I have programmed for six years and competed for three, training in Python and Java across graph algorithms, dynamic programming, and implementation-heavy problems.",
        "Qualifying for USACO Gold was one milestone. Learning to explain a solution clearly enough for a teammate or a new club member to use it became the more valuable skill.",
      ],
    },
    chapters: [
      {
        number: "01",
        kicker: "Practice",
        title: "Build a library of patterns",
        body: "Past contests became a training ground for recognizing graph structure, designing states, proving complexity, and writing reliable code without losing time to avoidable errors.",
      },
      {
        number: "02",
        kicker: "Compete",
        title: "Solve as a team",
        body: "NASA Space Apps, HPE CodeWars, and the YoungWonks National Coding Challenge added collaboration to the clock. Our teams earned a NASA Global Nominee and a second-place regional finish at CodeWars.",
      },
      {
        number: "03",
        kicker: "Lead",
        title: "Turn a club into a training room",
        body: "As president, I rebuilt a casual Coding Club into the Competitive Programming Olympiad Club, with weekly practices, live Python and Java solutions, and organized teams for all four USACO contests.",
      },
    ],
    feature: {
      mediaIndex: 1,
      kicker: "The room",
      title: "Competition became community.",
      body: "At a school where many STEM students lean toward medicine, the club became a home for students who wanted to stretch themselves in computer science and learn from one another.",
    },
    media: [
      { type: "image", path: "/codewars-hpe.jpg", caption: "HPE CodeWars" },
      { type: "image", path: "/gallery/full/group-coding-session.jpg", thumbnail: "/gallery/thumb/group-coding-session.jpg", caption: "A team coding session" },
      { type: "image", path: "/extracurriculars/coding/coding_club_new.jpg", caption: "Competitive Programming Club" },
      { type: "image", path: "/coding_club_pic.JPG", caption: "Teaching a club session" },
      { type: "image", path: "/exoscope_ai.png", caption: "Exoscope, a competition project", fit: "contain" },
    ],
    closing: "The fastest solution matters less if no one else can understand it. The best teams do both.",
  },
  {
    slug: "flora-frontier",
    navLabel: "Flora Frontier",
    metaTitle: "Flora Frontier | Pranil Raichura",
    metaDescription: "The design and research story behind a computer vision powered serious game for adolescents with autism.",
    theme: "flora",
    eyebrow: "Game design · Computer vision · Health research",
    title: "A game designed",
    accentTitle: "to help regulate.",
    deck: "Flora Frontier is a garden-themed resource management game with guided breathing sessions and computer vision support for adolescents with autism.",
    hero: "/breath_background.png",
    heroPosition: "center",
    brandMark: "/marks/flora-frontier.webp",
    brandMarkAlt: "Flora Frontier",
    facts: [
      { value: "12–16", label: "Target age range" },
      { value: "OpenCV", label: "Breathing detection" },
      { value: "JMIR", label: "Paper submitted" },
    ],
    introduction: {
      kicker: "The origin",
      title: "Game mechanics became a research question.",
      body: [
        "At UCI GSET, I studied how reward schedules, difficulty curves, and adaptive systems can shape player behavior. Our Unity prototype and final presentation became the foundation for a more focused project.",
        "Flora Frontier applies those ideas to emotional regulation. Players manage a garden, pause for guided breathing, and receive an experience built around steadiness instead of urgency.",
      ],
    },
    chapters: [
      {
        number: "01",
        kicker: "Design",
        title: "Make calm part of the game loop",
        body: "The project combines resource management with guided breathing so regulation is not a separate lecture or interruption. It is part of how the experience progresses.",
      },
      {
        number: "02",
        kicker: "Detect",
        title: "Use the camera with restraint",
        body: "An OpenCV pipeline detects diaphragmatic breathing from a webcam during guided sessions. The computer vision supports the exercise without turning the screen into a clinical dashboard.",
      },
      {
        number: "03",
        kicker: "Study",
        title: "Measure more than engagement",
        body: "The IRB-aligned study tracks heart-rate variability and self-reported anxiety across weekly gameplay, with the resulting paper submitted to JMIR Serious Games.",
      },
    ],
    feature: {
      mediaIndex: 1,
      kicker: "From prototype to project",
      title: "The first presentation was a beginning.",
      body: "The UCI program supplied the mechanics, technical foundation, and confidence to present an early prototype. Flora Frontier grew by asking how those tools could serve a specific group with a specific need.",
    },
    media: [
      { type: "image", path: "/breath_background.png", caption: "Flora Frontier game world" },
      { type: "image", path: "/extracurriculars/uci_gati/pic1_new.jpg", caption: "UCI GSET presentation" },
      { type: "image", path: "/extracurriculars/uci_gati/pic2_new.jpg", caption: "Presenting the prototype" },
      { type: "image", path: "/gallery/full/gset-closing-ceremony.jpg", thumbnail: "/gallery/thumb/gset-closing-ceremony.jpg", caption: "GSET closing ceremony" },
      { type: "image", path: "/gallery/full/gset-closing-group.jpg", thumbnail: "/gallery/thumb/gset-closing-group.jpg", caption: "GSET cohort" },
      { type: "image", path: "/gallery/full/night-flight-laptop.jpg", thumbnail: "/gallery/thumb/night-flight-laptop.jpg", caption: "Continuing the build while traveling" },
    ],
    links: [{ label: "Play Flora Frontier", href: "https://pranil.itch.io/flora-frontier" }],
    closing: "A prototype from one summer became a multi-year effort to design, build, and evaluate with care.",
  },
  {
    slug: "pranam",
    navLabel: "PraNam",
    metaTitle: "PraNam Community Service | Pranil Raichura",
    metaDescription: "The story behind PraNam, Rotary service projects, collection drives, and community recognition.",
    theme: "pranam",
    eyebrow: "Community service · Since 2022",
    title: "Collect locally.",
    accentTitle: "Deliver with purpose.",
    deck: "PraNam began as a project with my brother Naman and grew into a practical network of drives, partners, and community service.",
    hero: "/gallery/full/clothing-donation.jpg",
    heroPosition: "center 48%",
    facts: [
      { value: "1,000+", label: "Items collected and donated" },
      { value: "600+", label: "Eyeframes donated" },
      { value: "500+", label: "Warm clothing items" },
    ],
    introduction: {
      kicker: "The model",
      title: "A drive works when every handoff is clear.",
      body: [
        "My brother Naman and I started PraNam in summer 2022. Instead of treating donation as a single collection day, we learned to think through the entire chain: what is needed, who can collect it, where it goes, and how it reaches people.",
        "That structure has supported clothing, eyeframe, book, and shoe drives, often in collaboration with school groups and the Rotary E-Club of Silicon Valley.",
      ],
    },
    chapters: [
      {
        number: "01",
        kicker: "Organize",
        title: "Turn a broad goal into a specific drive",
        body: "PraNam has collected more than 1,000 items, including 500 warm clothing items, 600 eyeframes, and 100 educational books. Each drive began with a defined recipient and collection plan.",
      },
      {
        number: "02",
        kicker: "Partner",
        title: "Work through trusted networks",
        body: "With Rotary, we ran a shoe drive that sent 150 pairs to families in Africa and a warm-clothes drive for students at Kinney High School in Rancho Cordova.",
      },
      {
        number: "03",
        kicker: "Speak",
        title: "Represent the work publicly",
        body: "The Rancho Cordova drive received mayoral recognition. Speaking at City Hall made me explain the project in human terms and credit the community that made it possible.",
      },
    ],
    feature: {
      mediaIndex: 1,
      kicker: "Recognition",
      title: "The certificate was not the finish line.",
      body: "Recognition mattered because it brought more attention to the need and to the people who responded. The lasting result was the collection network we could use again.",
    },
    media: [
      { type: "image", path: "/gallery/full/clothing-donation.jpg", thumbnail: "/gallery/thumb/clothing-donation.jpg", caption: "A PraNam clothing donation" },
      { type: "image", path: "/gallery/full/recognition-ceremony.jpg", thumbnail: "/gallery/thumb/recognition-ceremony.jpg", caption: "Recognition at Rancho Cordova City Hall" },
      { type: "image", path: "/gallery/full/award-presentation.jpg", thumbnail: "/gallery/thumb/award-presentation.jpg", caption: "Community recognition" },
      { type: "video", path: "/pranil_city_speech.mp4", thumbnail: "/posters/pranil-city-speech.webp", caption: "Speaking at Rancho Cordova City Hall" },
      { type: "image", path: "/extracurriculars/nhs/me_holding_book_new.jpg", caption: "Helping lead a school service effort" },
      { type: "image", path: "/extracurriculars/nhs/book_picture_new.jpg", caption: "Books collected for donation" },
      { type: "image", path: "/extracurriculars/nhs/full_with_people_new.jpg", caption: "The student service team" },
    ],
    links: [{ label: "Visit PraNam", href: "https://www.pra-nam.com" }],
    closing: "Good service is not a photo at the end. It is the system that gets the right help to the right place.",
  },
  {
    slug: "clearpolicy",
    navLabel: "ClearPolicy",
    metaTitle: "ClearPolicy Case Study | Pranil Raichura",
    metaDescription: "A behind-the-build case study of ClearPolicy, a sourced guide to ballot measures and legislation.",
    theme: "clearpolicy",
    eyebrow: "Civic technology · Product case study",
    title: "Policy clarity,",
    accentTitle: "with receipts.",
    deck: "ClearPolicy turns dense ballot measures and legislation into readable summaries while keeping the original sources close at hand.",
    hero: "/gallery/full/clearpolicy-conversation.jpg",
    heroPosition: "center 42%",
    brandMark: "/marks/clearpolicy.webp",
    brandMarkAlt: "ClearPolicy",
    facts: [
      { value: "2 APIs", label: "OpenStates and Congress.gov" },
      { value: "Full stack", label: "Concept through deployment" },
      { value: "Live", label: "Used by local community members" },
    ],
    introduction: {
      kicker: "The problem",
      title: "Important information is often buried under institutional language.",
      body: [
        "Ballot measures and legislative records are public, but reading them still demands time and context. ClearPolicy makes that material easier to navigate without asking users to trust a source-free summary.",
        "I built the product from the data layer through the interface, using government APIs for current information and attaching sources so people can check the wording themselves.",
      ],
    },
    chapters: [
      {
        number: "01",
        kicker: "Source",
        title: "Start with official records",
        body: "OpenStates and Congress.gov provide live legislative data. The application structures those records into a consistent layer that the interface can use across measures and jurisdictions.",
      },
      {
        number: "02",
        kicker: "Translate",
        title: "Reduce friction without hiding nuance",
        body: "The interface presents clear summaries and keeps source material visible. The aim is not to tell a voter what to think. It is to make the next informed step easier.",
      },
      {
        number: "03",
        kicker: "Ship",
        title: "Own the full product loop",
        body: "I took ClearPolicy from concept to deployment with TypeScript, React, Prisma, and Tailwind, then shared it with local community members and began building a waitlist for wider use.",
      },
    ],
    feature: {
      mediaIndex: 0,
      kicker: "In conversation",
      title: "Presenting ClearPolicy to Congressman Kevin Kiley.",
      body: "A product about public information gets better when it leaves the laptop. Presenting the work created a chance to explain the design choices, hear questions, and test whether the core idea was immediately understandable.",
    },
    media: [
      { type: "image", path: "/gallery/full/clearpolicy-conversation.jpg", thumbnail: "/gallery/thumb/clearpolicy-conversation.jpg", caption: "Presenting ClearPolicy to Congressman Kevin Kiley" },
      { type: "image", path: "/gallery/full/clearpolicy-presentation-board.jpg", thumbnail: "/gallery/thumb/clearpolicy-presentation-board.jpg", caption: "The ClearPolicy project display" },
      { type: "video", path: "/ClearPolicy_Animation.mp4", thumbnail: "/gallery/thumb/clearpolicy-presentation-board.jpg", caption: "ClearPolicy product animation" },
    ],
    links: [{ label: "Visit ClearPolicy", href: "https://clearpolicy.org" }],
    closing: "Civic software should make public information easier to use and easier to verify.",
  },
];

export const activityShowcaseBySlug = Object.fromEntries(
  activityShowcases.map((showcase) => [showcase.slug, showcase]),
) as Record<string, ActivityShowcaseDefinition>;
