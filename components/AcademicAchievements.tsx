"use client";

import { motion } from "framer-motion";
import { academicStats } from "@/data/academic";

export default function AcademicAchievements() {
  return (
    <section
      id="academic"
      className="py-20 relative"
      style={{
        backgroundImage: 'url(/starry_night.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      {/* Top Gradient Transition (from White) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>

      {/* Bottom Gradient Transition (to Gray-50) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          <p className="text-xl text-gray-600 mt-4">
            Granite Bay High School — Graduating May 2027
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-200"
          >
            <div className="text-sm font-semibold text-gray-600 mb-2">Class Rank</div>
            <div className="text-4xl font-bold text-primary-600 mb-1">1/502</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-accent-purple/30"
          >
            <div className="text-sm font-semibold text-gray-600 mb-2">Unweighted GPA</div>
            <div className="text-4xl font-bold text-accent-purple mb-1">
              {academicStats.unweightedGPA}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-accent-orange/30"
          >
            <div className="text-sm font-semibold text-gray-600 mb-2">Weighted GPA</div>
            <div className="text-4xl font-bold text-accent-orange mb-1">
              {academicStats.weightedGPA}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Relevant Coursework</h3>
            <p className="text-gray-700">
              AP CS Principles & A (Java), AP Calculus BC & AB, AP Physics 1, AP Statistics
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Standardized Testing</h3>
            <p className="text-gray-700">
              PSAT/NMSQT 1460 (760 Math, 700 ERW) • SAT: 1510 (790 Math, 720 English)
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Outside Courses</h3>
            <p className="text-gray-700">
              Multivariable Calculus (Sierra College), Machine Learning Specialization (Stanford), et al.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
