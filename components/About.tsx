"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white relative">
      {/* Top gradient bridges the gray-50 tail of the story section into this white one */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The two threads that run underneath everything else on this page.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              Service & Community
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.about.service}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-accent-purple/10 to-accent-purple/20 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-accent-purple mb-4">
              Technology & Innovation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.about.techPassion}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
