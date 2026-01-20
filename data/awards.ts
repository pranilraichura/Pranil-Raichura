export interface Award {
  id: string;
  title: string;
  category: "Academic" | "Competition" | "Service" | "Research";
  year: string;
  description?: string;
  link?: string;
  imagePath?: string;
}

export const awards: Award[] = [
  {
    id: "nasa-spaceapps",
    title: "Global Nominee, International NASA SpaceApps Competition",
    category: "Competition",
    year: "2025",
  },
  {
    id: "usaco-gold",
    title: "Gold, USA Computing Olympiad",
    category: "Competition",
    year: "9th, 10th, 11th Grade",
  },
  {
    id: "hpe-codewars",
    title: "2nd Place, Hewlett-Packard Enterprise Codewars Competition",
    category: "Competition",
    year: "2025",
  },
  {
    id: "uci-gati-award",
    title: "UCI × GATI Award for Research & Innovation Leadership",
    category: "Research",
    year: "10th Grade",
    description: "336 hours on-campus",
  },
];
