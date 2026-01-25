export interface Extracurricular {
  id: string;
  title: string;
  years: string;
  hoursPerWeek?: string;
  category: "Research" | "Sports" | "Service" | "Tech" | "Music" | "Leadership";
  description: string;
  achievements?: string[];
  links?: { text: string; url: string }[];
  leadership?: string;
  media?: {
    type: 'image' | 'video';
    path: string;
    caption?: string;
    thumbnail?: string;
  }[];
}

export const extracurriculars: Extracurricular[] = [
  {
    id: "competitive-programming-club",
    title: "Competitive Programming Club",
    years: "9th, 10th, 11th Grade (Leadership)",
    category: "Tech",
    leadership: "Vice President",
    description: "When I joined “Coding Club” as a freshman, it met once a week to casually solve a few problems before HPE CodeWars. As VP, I helped rebuild it into the Competitive Programming Olympiad Club. I design weekly practices on algorithms and data structures, teach Python/Java solutions live, and organize our teams for all four USACO contests, NASA Space Apps, HPE CodeWars, and other hackathons. Under this new structure, our members earned a NASA Space Apps Global Nominee, multiple CodeWars trophies, and a big jump in USACO participation. At a school where most STEM kids lean pre-med, this club has become the main hub for students who want to push themselves in CS and competitive coding.",
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
    description: "NHS is the main service hub at my school, and as Sergeant at Arms I help plan and run projects instead of just showing up to volunteer hours. I’ve helped coordinate drives under our PraNam nonprofit umbrella, including a warm-clothes collection that delivered 300+ items to students at Kinney High School and a shoe drive that shipped over 150 pairs to families in Africa. I also help manage meeting logistics and keep events running smoothly. NHS has been where I practice turning big, vague goals—“help the community”—into specific, organized events that actually deliver.",
    media: [
      { type: 'image', path: '/extracurriculars/nhs/me_holding_book_new.jpg', caption: 'NHS Leadership' },
      { type: 'image', path: '/extracurriculars/nhs/book_picture_new.jpg', caption: 'NHS Book Collection' },
      { type: 'image', path: '/extracurriculars/nhs/full_with_people_new.jpg', caption: 'NHS Team' },
      { type: 'image', path: '/nhs_pic4.HEIC', caption: 'NHS Event' },
    ],
  },
  {
    id: "usaco-coding",
    title: "USACO & Coding Hackathons",
    years: "9th, 10th, 11th Grade",
    category: "Tech",
    hoursPerWeek: "2-3 hours/week",
    description: "I’ve been programming for six years and competing for three. I qualified for the USACO Gold division and train year-round by solving past contests in Python and Java, focusing on graph algorithms, DP, and implementation speed. Outside USACO, I’ve led or joined teams for events like NASA Space Apps, HPE CodeWars, and the YoungWonks National Coding Challenge, where we’ve earned a Global Nominee in Space Apps and a 2nd-place regional finish at CodeWars. These contests force me to write clean, efficient code under time pressure and to communicate clearly with teammates when the clock is ticking.",
    media: [
      { type: 'image', path: '/extracurriculars/coding/hackathon_team_new.jpg', caption: 'Hackathon Team' },
      { type: 'image', path: '/codewars-hpe.jpg', caption: 'HPE CodeWars' },
    ],
  },
  {
    id: "uci-gati",
    title: "Game Development and Sciences Research – UCI x GATI (GSET)",
    years: "9th Summer → 10th",
    category: "Research",
    description: "At UCI x GATI’s GSET program, I spent a summer exploring the science of game design and its applications to education and behavior. Working in Unity with C#, my team built a prototype game that combined reward schedules, difficulty curves, and machine-learning-driven customization. We also learned how to pitch like founders: writing a lightweight business plan, crafting a problem–solution narrative, and presenting our demo to a panel of faculty and “investors.” The experience turned game design from a hobby into a research interest and directly paved the way for my later Flora Frontier autism project.",
    media: [
      { type: 'image', path: '/extracurriculars/uci_gati/pic1_new.jpg', caption: 'UCI GATI Program' },
      { type: 'image', path: '/extracurriculars/uci_gati/pic2_new.jpg', caption: 'Final Presentation' },
    ],
  },
  {
    id: "tech4silvers",
    title: "Tech4Silvers",
    years: "9th, 10th, 11th Grade",
    category: "Service",
    hoursPerWeek: "2-3 hours/week",
    leadership: "Founder & President",
    description: "I started Tech4Silvers after realizing many seniors in our community were missing digital wildfire and emergency alerts. What began as one small workshop is now a student-run organization and GBHS club that partners with senior centers across Sacramento and Northern California. I recruit and train volunteers, design slides and handouts, and lead sessions on smartphones, scams and phishing, online safety, telehealth, and local alert systems. We’ve helped dozens of seniors set up alerts, avoid fraud, and reconnect with family over video calls. Coordinating venues, outreach, and Q&A has turned my interest in tech into a long-term commitment to digital inclusion.",
    media: [
      { type: 'image', path: '/extracurriculars/tech4silvers/presentation_pic_new.jpg', caption: 'Tech4Silvers Presentation' },
      { type: 'video', path: '/t4s_video.MP4', caption: 'Tech4Silvers Session', thumbnail: '/extracurriculars/tech4silvers/presentation_pic_new.jpg' },
      { type: 'image', path: '/t4s_1.JPG', caption: 'Tech4Silvers 1' },
      { type: 'image', path: '/t4s_2.JPG', caption: 'Tech4Silvers 2' },
    ],
  },
  {
    id: "national-volleyball",
    title: "National Volleyball (Club)",
    years: "9th, 10th",
    category: "Sports",
    description: "I’ve played club volleyball for nine years, competing in some of the most competitive boys’ leagues on the West Coast. As an outside hitter, I’ve helped my teams earn silver at USAV Nationals (14 Open, Salt Lake City), gold at SCVA SoCal Cup in Anaheim, gold in NCVA Power League, and multiple qualification medals. Long tournament days—from 7 a.m. warm-ups to late-night bracket finals—taught me how to handle pressure, bounce back from mistakes, and contribute even when I’m not the star of the court. Club volleyball is where I first learned that discipline and chemistry matter as much as raw talent.",
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
    ],
  },
  {
    id: "varsity-volleyball",
    title: "Varsity Volleyball (School)",
    years: "9th JV, 10th-11th Var",
    category: "Sports",
    description: "At Granite Bay, I played JV in 9th grade and made Varsity as a sophomore. Our JV team won league and the Stockton JV tournament, and on Varsity I’ve contributed as both a starter and role player in league and postseason play. Balancing practices, film sessions, and travel with AP/IB coursework forced me to get serious about time management. Being one of the few “tech kids” on an athletic team also pushed me to bridge very different social circles on campus.",
    media: [
      { type: 'image', path: '/extracurriculars/varsity_volleyball/pic1.jpg', caption: 'Varsity Volleyball' },
      { type: 'image', path: '/extracurriculars/varsity_volleyball/pic2.jpg', caption: 'Team Photo' },
    ],
  },
  {
    id: "un-gyel",
    title: "United Nations GYEL Program",
    years: "Spring 25 (10th)",
    category: "Leadership",
    description: "In 10th grade I was selected for the Global Youth Excellence & Leadership (GYEL) program, affiliated with the UN’s Economic and Social Council (ECOSOC). Over several months I joined students worldwide in workshops on the Sustainable Development Goals, particularly public health, education, and digital equity. We heard from entrepreneurs and leaders—including Kevin O’Leary, Jessica Nabongo, and NASA engineer Kenneth Harris II—then worked in teams to design projects addressing local needs. I used the program to refine my vision for Tech4Silvers and to frame digital literacy for seniors as part of SDG 4: Quality Education and SDG 10: Reduced Inequalities.",
    media: [
      { type: 'image', path: '/extracurriculars/gyel/gyel_pic_new.jpg', caption: 'UN GYEL Program' },
    ],
  },
  {
    id: "inspirit-ai",
    title: "Inspirit AI Scholars",
    years: "Summer 23 (8th → 9th)",
    category: "Tech",
    description: "The summer before high school, I joined Inspirit AI’s Scholars program, working in a small team mentored by a Stanford alumnus. We learned the foundations of machine learning—neural networks, embeddings, evaluation metrics—and then applied them to build a fake-news detection web app. I focused on model training and evaluation, using NLP techniques and confusion matrices to compare our models, and then helped deploy the project on Streamlit so anyone could test URLs in real time. Our project earned the “Best Presentation” award in our cohort and gave me my first experience shipping an end-to-end AI tool with real users in mind.",
    links: [
      {
        text: "Fake News Detection App",
        url: "https://inspirit-ai-weekday2-allhands3-fake-news-detection.streamlit.app/",
      },
    ],
    media: [
      { type: 'image', path: '/extracurriculars/inspirit_ai/inspirit_ai_new.png', caption: 'Inspirit AI Scholars' },
    ],
  },
  {
    id: "chess",
    title: "USCF Competitive Chess",
    years: "9th, 10th, 11th Grade",
    category: "Tech",
    description: "I picked up chess in middle school and started playing USCF-rated tournaments soon after. Over seven tournaments, I’ve climbed to a 730 rating, around the 64th percentile for juniors, and spent countless hours analyzing my own blunders and learning classic tactics. Chess gives me a different kind of focus than coding or sports: slow, quiet calculation, accepting that one careless move can undo twenty good ones. The pattern recognition and patience I’ve built here spill over directly into algorithm design and debugging.",
    media: [
      { type: 'image', path: '/extracurriculars/chess/chess_new.png', caption: 'USCF Chess' },
      { type: 'image', path: '/chess_pic1.JPG', caption: 'Chess Tournament' },
    ],
  },
  {
    id: "violin",
    title: "Musical Instrument – Violin / Sacramento Youth Symphony",
    years: "9th, 10th",
    category: "Music",
    description: "I’ve played violin for five years, starting in school orchestra and later joining the Sacramento Youth Symphony. Between rehearsals, sectionals, and concerts, I’ve performed in over fifty events across California. Playing in an ensemble taught me how to listen as carefully as I play: adjusting intonation, matching phrasing, and staying locked to the conductor even when my mind is elsewhere. Music has been the long, slow counterbalance to my tech life—a place where progress happens measure by measure, not in sudden “aha” moments.",
    media: [
      { type: 'image', path: '/extracurriculars/violin/violin_new.jpg', caption: 'Violin Performance' },
      { type: 'image', path: '/pranil_violin.jpeg', caption: 'Violin Performance 2' },
      { type: 'image', path: '/pranil_violin2.jpeg', caption: 'Violin Performance 3' },
      { type: 'image', path: '/pranil_violin3.jpeg', caption: 'Violin Performance 4' },
    ],
  },
];
