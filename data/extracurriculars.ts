export interface ActivityMedia {
  type: 'image' | 'video';
  path: string;
  caption?: string;
  thumbnail?: string;
  // Use 'contain' for logos and slide screenshots, which get their text cropped by 'cover'.
  fit?: 'cover' | 'contain';
}

export interface Extracurricular {
  id: string;
  title: string;
  // Optional: some roles have no year/grade range recorded, and guessing one would be inventing a fact.
  years?: string;
  hoursPerWeek?: string;
  category: "Research" | "Sports" | "Service" | "Tech" | "Music" | "Leadership";
  description: string;
  achievements?: string[];
  links?: { text: string; url: string }[];
  detailPage?: { href: string; label: string };
  leadership?: string;
  media?: ActivityMedia[];
}

export const extracurriculars: Extracurricular[] = [
  {
    id: "hair-fellowship",
    title: "Hope AI Research Fellowship (HAIR)",
    years: "11th Grade",
    category: "Leadership",
    leadership: "Co-Founder & Principal Investigator",
    description: "A free fellowship co-founded to give underprivileged high schoolers (including QuestBridge scholars) who lack access to scientific research mentorship a path into AI research. Over a four-month program, delivered weekly skill-building lectures and paper-review sessions for 20+ students across 4 teams, guiding them from an initial idea to a submitted paper.",
    media: [
      {
        type: 'image',
        path: '/extracurriculars/hair/cnn-foundations-lecture.webp',
        caption: 'Teaching the foundations of convolutional neural networks for medical image analysis',
        fit: 'contain',
      },
      {
        type: 'image',
        path: '/extracurriculars/hair/dataset-strategy-lecture.webp',
        caption: 'Walking fellows through leakage-safe training, validation, and test splits',
        fit: 'contain',
      },
      {
        type: 'image',
        path: '/extracurriculars/hair/fellow-introduction.webp',
        caption: 'Introducing my applied machine learning and research background to the fellowship cohort',
        fit: 'contain',
      },
      {
        type: 'image',
        path: '/extracurriculars/hair/medical-ai-lecture.webp',
        caption: 'Leading a medical AI and computer vision lecture for HAIR fellows',
        fit: 'contain',
      },
    ],
  },
  {
    id: "competitive-programming-club",
    title: "Competitive Programming Club",
    years: "9th, 10th, 11th Grade (Leadership)",
    category: "Tech",
    leadership: "President",
    detailPage: { href: "/activities/competitive-programming/", label: "Explore the competition story" },
    description: "When I joined “Coding Club” as a freshman, it met once a week to casually solve a few problems before HPE CodeWars. As President, I’ve rebuilt it into the Competitive Programming Olympiad Club. I design weekly practices on algorithms and data structures, teach Python/Java solutions live, and organize our teams for all four USACO contests, NASA Space Apps, HPE CodeWars, and other hackathons. Under this new structure, our members earned a NASA Space Apps Global Nominee, multiple CodeWars trophies, and a big jump in USACO participation. At a school where most STEM kids lean pre-med, this club has become the main hub for students who want to push themselves in CS and competitive coding.",
    media: [
      { type: 'image', path: '/extracurriculars/coding/coding_club_new.jpg', caption: 'Programming Club' },
      { type: 'image', path: '/coding_club_pic.JPG', caption: 'Coding Club Session' },
    ],
  },
  {
    id: "nhs",
    title: "National Honor Society",
    years: "10th, 11th Grade (Leadership)",
    category: "Leadership",
    hoursPerWeek: "30 mins per week",
    leadership: "Sergeant at Arms",
    detailPage: { href: "/activities/pranam/", label: "Explore the service story" },
    description: "NHS is the main service hub at my school, and as Sergeant at Arms I help plan and run projects instead of just showing up to volunteer hours. I’ve helped coordinate drives under our PraNam initiative, including a warm-clothes collection that delivered 500+ items to students at Kinney High School and a shoe drive that shipped over 150 pairs to families in Africa. I also help manage meeting logistics and keep events running smoothly. NHS has been where I practice turning big, vague goals like \"help the community\" into specific, organized events that actually deliver.",
    media: [
      { type: 'image', path: '/extracurriculars/nhs/me_holding_book_new.jpg', caption: 'NHS Leadership' },
      { type: 'image', path: '/extracurriculars/nhs/book_picture_new.jpg', caption: 'NHS Book Collection' },
      { type: 'image', path: '/extracurriculars/nhs/full_with_people_new.jpg', caption: 'NHS Team' },
      { type: 'image', path: '/nhs_pic4.webp', caption: 'NHS Event' },
    ],
  },
  {
    id: "usaco-coding",
    title: "USACO & Coding Hackathons",
    years: "9th, 10th, 11th Grade",
    category: "Tech",
    hoursPerWeek: "2-3 hours/week",
    detailPage: { href: "/activities/competitive-programming/", label: "Explore the competition story" },
    description: "I’ve been programming for six years and competing for three. I qualified for the USACO Gold division and train year-round by solving past contests in Python and Java, focusing on graph algorithms, DP, and implementation speed. Outside USACO, I’ve led or joined teams for events like NASA Space Apps, HPE CodeWars, and the YoungWonks National Coding Challenge, where we’ve earned a Global Nominee in Space Apps and a 2nd-place regional finish at CodeWars. These contests force me to write clean, efficient code under time pressure and to communicate clearly with teammates when the clock is ticking.",
    media: [
      { type: 'image', path: '/extracurriculars/coding/hackathon_team_new.jpg', caption: 'Hackathon Team' },
      { type: 'image', path: '/codewars-hpe.jpg', caption: 'HPE CodeWars' },
    ],
  },
  {
    id: "uci-gati",
    title: "Game Development and Sciences Research, UCI x GATI (GSET)",
    years: "9th Summer → 10th",
    category: "Research",
    detailPage: { href: "/activities/flora-frontier/", label: "Explore the Flora Frontier story" },
    description: "At UCI x GATI’s GSET program, I spent a summer studying how game design can support education and behavior. Working in Unity with C#, my team built a prototype that combined reward schedules, difficulty curves, and machine-learning-driven customization. We wrote a lightweight business plan and presented the demo to a panel of faculty and judges. The project later informed my work on Flora Frontier.",
    media: [
      { type: 'image', path: '/extracurriculars/uci_gati/pic1_new.jpg', caption: 'UCI GATI Program' },
      { type: 'image', path: '/extracurriculars/uci_gati/pic2_new.jpg', caption: 'Final Presentation' },
    ],
  },
  {
    id: "cosmos-ucla",
    title: "COSMOS Summer Program at UCLA",
    years: "Summer 2026",
    category: "Research",
    leadership: "Student Researcher",
    detailPage: { href: "/activities/cosmos/", label: "Explore the COSMOS research story" },
    description: "At UCLA COSMOS, I worked with Prof. HTB to study whether AI theorem provers use stable reasoning strategies across different problems, rather than only whether they reach the right answer. I represented Lean proofs as fingerprints of their tactics, structure, and errors, then used machine learning and similarity analysis to compare human and AI proof behavior. The work analyzed 260,103 proofs, validated the fingerprints at 0.923 macro F1, and tested the findings across six robustness checks.",
    achievements: [
      "Analyzed 260,103 Lean proof trees",
      "Validated proof fingerprints at 0.923 macro F1",
      "Compared human, DeepSeek-Prover-V1, and Goedel-Prover-SFT behavior",
      "Completed six robustness checks",
    ],
    media: [
      { type: 'image', path: '/gallery/full/cosmos-fountain-group.jpg', thumbnail: '/gallery/thumb/cosmos-fountain-group.jpg', caption: 'COSMOS cohort at UCLA' },
      { type: 'image', path: '/gallery/full/cosmos-ucla-bruin.jpg', thumbnail: '/gallery/thumb/cosmos-ucla-bruin.jpg', caption: 'COSMOS at UCLA' },
      { type: 'image', path: '/gallery/full/cosmos-completion.jpg', thumbnail: '/gallery/thumb/cosmos-completion.jpg', caption: 'COSMOS completion ceremony' },
      { type: 'image', path: '/gallery/full/cosmos-dorm-life.jpg', thumbnail: '/gallery/thumb/cosmos-dorm-life.jpg', caption: 'Dorm life at COSMOS' },
      { type: 'image', path: '/gallery/full/cosmos-spider-man-night.jpg', thumbnail: '/gallery/thumb/cosmos-spider-man-night.jpg', caption: 'An evening out with the COSMOS cohort' },
    ],
  },
  {
    id: "tech4silvers",
    title: "Tech4Silvers",
    years: "9th, 10th, 11th Grade",
    category: "Service",
    hoursPerWeek: "2-3 hours/week",
    leadership: "Founder & President",
    detailPage: { href: "/tech4silvers/", label: "Explore the Tech4Silvers story" },
    description: "I started Tech4Silvers after realizing many seniors in our community were missing digital wildfire and emergency alerts. It started with one workshop and has grown into a student-run organization and GBHS club that partners with senior centers across Sacramento and Northern California. I recruit and train volunteers, design slides and handouts, and lead sessions on smartphones, scams and phishing, online safety, telehealth, and local alert systems. We’ve helped dozens of seniors set up alerts, avoid fraud, and reconnect with family over video calls. The work has taught me how to organize community programs around practical needs.",
    media: [
      { type: 'image', path: '/gallery/full/tech4silvers-community-presentation-2026.jpg', thumbnail: '/gallery/thumb/tech4silvers-community-presentation-2026.jpg', caption: 'Leading a scam-call prevention workshop for older adults' },
      { type: 'image', path: '/gallery/full/tech4silvers-attendee-support-2026.jpg', thumbnail: '/gallery/thumb/tech4silvers-attendee-support-2026.jpg', caption: 'Helping attendees apply the workshop lessons to their own devices' },
      { type: 'image', path: '/gallery/full/tech4silvers-summer-workshop-team.jpg', thumbnail: '/gallery/thumb/tech4silvers-summer-workshop-team.jpg', caption: 'The Tech4Silvers summer workshop team' },
      { type: 'video', path: '/tech4silvers-scam-awareness-workshop.mp4', caption: 'A live scam-awareness exercise with the workshop audience', thumbnail: '/gallery/thumb/tech4silvers-community-presentation-2026.jpg' },
      { type: 'image', path: '/gallery/full/tech4silvers-hands-on.jpg', thumbnail: '/gallery/thumb/tech4silvers-hands-on.jpg', caption: 'Hands-on help at a Tech4Silvers workshop' },
      { type: 'image', path: '/gallery/full/tech4silvers-team-workshop.jpg', thumbnail: '/gallery/thumb/tech4silvers-team-workshop.jpg', caption: 'Leading a Tech4Silvers workshop with the team' },
      { type: 'image', path: '/gallery/full/tech4silvers-one-on-one.jpg', thumbnail: '/gallery/thumb/tech4silvers-one-on-one.jpg', caption: 'One-on-one phone guidance' },
      { type: 'video', path: '/t4s_video.MP4', caption: 'Tech4Silvers session', thumbnail: '/gallery/thumb/tech4silvers-team-workshop.jpg' },
      { type: 'image', path: '/gallery/full/tech4silvers-community-seminar.jpg', thumbnail: '/gallery/thumb/tech4silvers-community-seminar.jpg', caption: 'A community cybersecurity seminar' },
      { type: 'image', path: '/gallery/full/tech4silvers-guided-help.jpg', thumbnail: '/gallery/thumb/tech4silvers-guided-help.jpg', caption: 'Working through a device question together' },
      { type: 'image', path: '/gallery/full/tech4silvers-rotary-workshop.jpg', thumbnail: '/gallery/thumb/tech4silvers-rotary-workshop.jpg', caption: 'Tech4Silvers with the Rotary E-Club of Silicon Valley' },
      { type: 'image', path: '/t4s_1.JPG', caption: 'Explaining local emergency alerts at a senior-center workshop' },
      { type: 'image', path: '/t4s_2.JPG', caption: 'A senior-center workshop in progress' },
      { type: 'image', path: '/t4s_workshop.JPG', caption: 'Helping participants one-on-one after a workshop' },
    ],
  },
  {
    id: "pranam",
    title: "PraNam Innovations and Initiatives",
    years: "Since summer 2022",
    category: "Service",
    leadership: "Co-Founder",
    detailPage: { href: "/activities/pranam/", label: "Explore the service story" },
    description: "My brother Naman and I started PraNam in the summer of 2022 and built it into a network of collection drives, community partners, and practical service projects. We have collected and donated more than 1,000 items, including 500+ warm clothing items, 600+ eyeframes, and 100+ educational books. Working with the Rotary E-Club of Silicon Valley, I also led a 150-pair shoe drive for families in Africa and a warm-clothes drive for students at Kinney High School in Rancho Cordova. That local drive received mayoral recognition, and I spoke about the project at Rancho Cordova City Hall.",
    achievements: [
      "Donated over 1,000 items to underprivileged populations, and counting",
      "Led a Rotary-partnered drive that sent 150 pairs of shoes to families in Africa",
      "Received mayoral recognition and spoke at Rancho Cordova City Hall",
      "500+ warm clothing items donated",
      "600+ eyeframes donated",
      "100+ educational books collected and shipped",
      "Ongoing collaboration with the Rotary E-Club of Silicon Valley on volunteering and fundraisers",
    ],
    links: [
      {
        text: "pra-nam.com",
        url: "https://www.pra-nam.com",
      },
    ],
    media: [
      {
        type: 'image',
        path: '/gallery/full/clothing-donation.jpg',
        caption: 'PraNam clothing donation',
      },
      {
        type: 'image',
        path: '/gallery/full/recognition-ceremony.jpg',
        caption: 'Recognition at Rancho Cordova City Hall',
      },
      {
        type: 'image',
        path: '/gallery/full/award-presentation.jpg',
        caption: 'Community recognition for the Rancho Cordova drive',
      },
      {
        type: 'video',
        path: '/pranil_city_speech.mp4',
        thumbnail: '/posters/pranil-city-speech.webp',
        caption: 'Speaking about the clothing drive at Rancho Cordova City Hall',
      },
    ],
  },
  {
    id: "volleyball",
    title: "Club & Varsity Volleyball",
    years: "9 years club · 9th JV · 10th and 11th Varsity",
    category: "Sports",
    detailPage: { href: "/activities/volleyball/", label: "Explore the volleyball story" },
    description: "I have played club volleyball for nine years and school volleyball throughout high school. As an outside hitter, I helped club teams earn silver at USAV Nationals (14 Open), gold at the SCVA SoCal Cup, gold in the NCVA Power League, and multiple qualification medals. At Granite Bay, I played JV as a freshman, winning league and the Stockton JV tournament, then joined varsity as a sophomore. Moving between club and school teams taught me to reset after mistakes, contribute in different roles, and balance long practices, film, and travel with a demanding academic schedule.",
    links: [
      {
        text: "News Article",
        url: "https://goldcountrymedia.com/news/261272/aspire-14-boys-earn-bid-to-jr-nationals/",
      },
    ],
    media: [
      { type: 'image', path: '/volleyball-young.jpg', caption: 'Young Pranil' },
      { type: 'image', path: '/volleyball-team-huddle.jpg', caption: 'Team Huddle' },
      { type: 'image', path: '/volleyball-team-recent.jpg', caption: 'National Team' },
      { type: 'image', path: '/national_volleyball_pic.JPG', caption: 'National Volleyball 1' },
      { type: 'image', path: '/vb_1.JPG', caption: 'Volleyball Action 1' },
      { type: 'image', path: '/vb_2.JPG', caption: 'Volleyball Action 2' },
      { type: 'image', path: '/vb_3.JPG', caption: 'Volleyball Action 3' },
      { type: 'image', path: '/extracurriculars/varsity_volleyball/pic1.jpg', caption: 'Varsity Volleyball' },
      { type: 'image', path: '/extracurriculars/varsity_volleyball/pic2.jpg', caption: 'Team Photo' },
    ],
  },
  {
    id: "violin",
    title: "Musical Instrument: Violin / Sacramento Youth Symphony",
    years: "9th, 10th",
    category: "Music",
    description: "I’ve played violin for five years, starting in school orchestra and later joining the Sacramento Youth Symphony. Between rehearsals, sectionals, and concerts, I’ve performed in over fifty events across California. Playing in an ensemble taught me to listen carefully, adjust my intonation, match phrasing, and stay with the conductor. Violin gives me a steady routine outside my technical work.",
    media: [
      { type: 'image', path: '/extracurriculars/violin/violin_new.jpg', caption: 'Violin Performance' },
      { type: 'image', path: '/pranil_violin.jpeg', caption: 'Violin Performance 2' },
      { type: 'image', path: '/pranil_violin2.jpeg', caption: 'Violin Performance 3' },
      { type: 'image', path: '/pranil_violin3.jpeg', caption: 'Violin Performance 4' },
    ],
  },
];
