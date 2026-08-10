import type { Metadata } from "next";
import Tech4SilversShowcase from "@/components/Tech4SilversShowcase";

export const metadata: Metadata = {
  title: "Tech4Silvers | Digital confidence for older adults",
  description:
    "Tech4Silvers is a student-run initiative founded by Pranil Raichura that helps older adults use technology safely, confidently, and independently.",
  alternates: {
    canonical: "/tech4silvers/",
  },
  openGraph: {
    title: "Tech4Silvers",
    description: "Helping older adults feel safe, confident, and connected online.",
    type: "website",
    images: [
      {
        url: "/gallery/full/tech4silvers-community-presentation-2026.jpg",
        width: 2048,
        height: 1365,
        alt: "A Tech4Silvers workshop for older adults",
      },
    ],
  },
};

export default function Tech4SilversPage() {
  return <Tech4SilversShowcase />;
}
