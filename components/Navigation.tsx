"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";

const navItems = [
  { name: "Story", href: "#story" },
  { name: "About", href: "#about" },
  { name: "Academics", href: "#academic" },
  { name: "Extracurriculars", href: "#extracurriculars" },
  { name: "Work", href: "#work" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLightboxOpen } = useLightbox();

  useEffect(() => {
    // Only track scroll on home page
    if (pathname !== "/") return;

    let frame = 0;
    const sectionIds = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.substring(1));
    const visibleSections = new Set<string>();

    const updateScrolled = () => {
      frame = 0;
      const next = window.scrollY > 50;
      setIsScrolled((current) => (current === next ? current : next));
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrolled);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.add(entry.target.id);
          else visibleSections.delete(entry.target.id);
        });

        const current = sectionIds.find((id) => visibleSections.has(id));
        if (current) setActiveSection((active) => (active === current ? active : current));
      },
      { rootMargin: "-88px 0px -72% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
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
      className={`fixed top-0 left-0 right-0 z-[10000] transition-[background-color,border-color,box-shadow,opacity] duration-300 ${isLightboxOpen
        ? "bg-transparent pointer-events-none opacity-0"
        : (isScrolled || pathname !== "/")
          ? "bg-white/95 shadow-lg border-b border-gray-100"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <motion.div
              className="text-xl md:text-2xl font-bold text-slate-900 font-libre"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: "pointer" }}
            >
              Pranil Raichura
            </motion.div>
          </Link>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = item.href.startsWith("#")
                ? activeSection === item.href.substring(1)
                : pathname === item.href || pathname === `${item.href}/`;

              if (item.href.startsWith("#")) {
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`px-4 py-2 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 rounded-lg ${isActive
                      ? "text-primary-600 bg-primary-50 border border-primary-100 shadow-sm"
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
                      className={`px-4 py-2 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 rounded-lg ${isActive
                        ? "text-primary-600 bg-primary-50 border border-primary-100 shadow-sm"
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
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">

              {navItems.map((item, index) => {
                const isActive = item.href.startsWith("#")
                  ? activeSection === item.href.substring(1)
                  : pathname === item.href || pathname === `${item.href}/`;

                if (item.href.startsWith("#")) {
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                        ? "text-primary-600 bg-primary-50 border border-primary-100 shadow-sm"
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
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                          ? "text-primary-600 bg-primary-50 border border-primary-100 shadow-sm"
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
