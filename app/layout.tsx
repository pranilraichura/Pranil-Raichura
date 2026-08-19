import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import MouseSpotlight from "@/components/MouseSpotlight";
import { LightboxProvider } from "@/components/LightboxContext";


import { FlashlightProvider } from "@/components/FlashlightContext";
import PasswordProtection from "@/components/PasswordProtection";
import ScrollRestoration from "@/components/ScrollRestoration";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Pranil Raichura's Website",
  description: "Interactive portfolio showcasing academic achievements, research projects, and extracurriculars",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
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
      <body className={`${inter.className} ${libreBaskerville.variable} text-gray-900`}>
        <FlashlightProvider>
          <LightboxProvider>
            <PasswordProtection>
              <MouseSpotlight />
              <ScrollRestoration />
              {children}
            </PasswordProtection>
          </LightboxProvider>
        </FlashlightProvider>
      </body>
    </html>
  );
}
