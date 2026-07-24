"use client";

import { motion } from "framer-motion";
import { academicStats } from "@/data/academic";

export default function AcademicAchievements() {
  return (
    <section
      id="academic"
      className="py-24 relative"
      style={{
        backgroundImage: 'url(/starry_night.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for readability - Slightly stronger for text contrast */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

      {/* Top Gradient Transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>

      {/* Subtle Bottom Divider Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10"></div>



      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Education
          </h2>
          <div className="w-16 h-1 bg-slate-800 mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
            Graduating from <span className="font-semibold text-slate-900">Granite Bay High School</span> in 2027.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <p className="text-3xl md:text-4xl font-light text-slate-900 leading-tight">
            Ranked <span className="font-bold border-b-2 border-slate-300">1st of 504</span> with a <span className="font-bold border-b-2 border-slate-300">{academicStats.weightedGPA} GPA</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
              Relevant Coursework
            </h3>
            <ul className="space-y-3 text-lg text-slate-700">
              <li>AP CS Principles & A (Java)</li>
              <li>AP Calculus BC & AB</li>
              <li>AP Physics 1 & Statistics</li>
              <li>Multivariable Calculus <span className="text-slate-500 text-sm">(Sierra College)</span></li>
              <li>Machine Learning Specialization <span className="text-slate-500 text-sm">(Stanford)</span></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
              Standardized Testing
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-2xl font-bold text-slate-900">1530</span>
                  <span className="text-slate-500 font-medium">SAT (Superscore)</span>
                </div>
                <p className="text-slate-600">790 Math • 740 Reading & Writing</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-2xl font-bold text-slate-900">{academicStats.weightedGPA}</span>
                  <span className="text-slate-500 font-medium">Weighted GPA</span>
                </div>
                <p className="text-slate-600">Rank {academicStats.classRank} of {academicStats.classSize} • 4.0 Unweighted</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
