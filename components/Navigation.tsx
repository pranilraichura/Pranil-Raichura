"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";
import { useFlashlight } from "./FlashlightContext";

const navItems = [
  { name: "Story", href: "#story" },
  { name: "Projects", href: "#portfolio" },
  { name: "Research", href: "#research" },
  { name: "Academics", href: "#academic" },
  { name: "Extracurriculars", href: "#extracurriculars" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLightboxOpen } = useLightbox();
  const { isEnabled, toggleFlashlight } = useFlashlight();

  useEffect(() => {
    // Only track scroll on home page
    if (pathname !== "/") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems
        .filter(item => item.href.startsWith("#"))
        .map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // Scroll to section on same page
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
      }
    } else {
      // Navigate to different page
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 ${isLightboxOpen
        ? "bg-transparent pointer-events-none opacity-0"
        : isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <motion.div
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: "pointer" }}
            >
              Pranil Raichura
            </motion.div>
          </Link>
          <div className="hidden md:flex space-x-1">
            <motion.button
              onClick={toggleFlashlight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 mr-2 text-gray-700 hover:text-primary-600 transition-colors bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-white/40 focus:outline-none"
              title={isEnabled ? "Turn off spotlight" : "Turn on spotlight"}
            >
              {isEnabled ? (
                /* Flashlight ON - Clearer Shape with Beams */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6l-7 7" />
                  <path d="M14 6l-4 4" />
                  <path d="M10.5 15.5L8 18a2 2 0 01-2.83 0 2 2 0 010-2.83l.26-.26" />
                  <path d="M12.44 13.56L18 8a2 2 0 000-2.83 2 2 0 00-2.83 0l-1.3 1.3" />
                  <path d="M22 2l-1.5 1.5" />
                  <path d="M19 5l-1.5 1.5" />
                </svg>
              ) : (
                /* Flashlight OFF - Crossed Out */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="2" x2="22" y2="22" />
                  <path d="M10.5 15.5L8 18a2 2 0 01-2.83 0 2 2 0 010-2.83l.26-.26" />
                  <path d="M14.5 11.5L18 8a2 2 0 000-2.83 2 2 0 00-2.83 0l-1.3 1.3" />
                </svg>
              )}
            </motion.button>
            {navItems.map((item) => {
              const isActive = item.href.startsWith("#")
                ? activeSection === item.href.substring(1)
                : pathname === item.href;

              if (item.href.startsWith("#")) {
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${isActive
                      ? "text-primary-600 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                      }`}
                  >
                    {item.name}
                  </motion.button>
                );
              } else {
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.button
                      onClick={() => handleNavClick(item.href)}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${isActive
                        ? "text-primary-600 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                        }`}
                    >
                      {item.name}
                    </motion.button>
                  </Link>
                );
              }
            })}
          </div>

          <motion.button
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={toggleFlashlight}
                className="flex items-center w-full px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <div className="mr-3 p-1 bg-white/50 rounded-full border border-gray-100">
                  {isEnabled ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 6l-7 7" />
                      <path d="M14 6l-4 4" />
                      <path d="M10.5 15.5L8 18a2 2 0 01-2.83 0 2 2 0 010-2.83l.26-.26" />
                      <path d="M12.44 13.56L18 8a2 2 0 000-2.83 2 2 0 00-2.83 0l-1.3 1.3" />
                      <path d="M22 2l-1.5 1.5" />
                      <path d="M19 5l-1.5 1.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="2" y1="2" x2="22" y2="22" />
                      <path d="M10.5 15.5L8 18a2 2 0 01-2.83 0 2 2 0 010-2.83l.26-.26" />
                      <path d="M14.5 11.5L18 8a2 2 0 000-2.83 2 2 0 00-2.83 0l-1.3 1.3" />
                    </svg>
                  )}
                </div>
                {isEnabled ? "Turn Off Flashlight" : "Turn On Flashlight"}
              </motion.button>
              {navItems.map((item, index) => {
                const isActive = item.href.startsWith("#")
                  ? activeSection === item.href.substring(1)
                  : pathname === item.href;

                if (item.href.startsWith("#")) {
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive
                        ? "text-primary-600 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                        }`}
                    >
                      {item.name}
                    </motion.button>
                  );
                } else {
                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavClick(item.href)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive
                          ? "text-primary-600 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg"
                          : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                          }`}
                      >
                        {item.name}
                      </motion.button>
                    </Link>
                  );
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

