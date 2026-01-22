import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MouseSpotlight from "@/components/MouseSpotlight";
import { LightboxProvider } from "@/components/LightboxContext";


import { FlashlightProvider } from "@/components/FlashlightContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pranil Raichura's Website",
  description: "Interactive portfolio showcasing academic achievements, research projects, and extracurriculars",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <FlashlightProvider>
          <LightboxProvider>
            <MouseSpotlight />
            {children}
          </LightboxProvider>
        </FlashlightProvider>
      </body>
    </html>
  );
}


