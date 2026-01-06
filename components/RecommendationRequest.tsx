"use client";

import { motion } from "framer-motion";
import { personalInfo, leadershipPositions, serviceActivities } from "@/data/personal";

export default function RecommendationRequest() {
  return (
    <section id="recommendation" className="relative py-24 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-purple text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-soft-light filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/20 rounded-full mix-blend-soft-light filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
              Request for Letter of Recommendation
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Dear Teacher,
          </h2>
          <div className="w-32 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            I would be honored if you could write a letter of recommendation for my application to this program.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-2xl">✉️</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">My Request</h3>
            </div>
            <p className="leading-relaxed mb-4 text-lg text-white/95">
              Thank you for taking the time to learn about me through this interactive website. I am applying to this program, and I would be honored if you could write a letter of recommendation for me.
            </p>
            <p className="leading-relaxed mb-4 text-lg text-white/95">
              This website showcases my academic achievements, research projects, extracurricular activities, and personal growth throughout high school. I hope it provides you with a comprehensive understanding of who I am as a student and person.
            </p>
            <p className="leading-relaxed text-lg text-white/95">
              Your support means the world to me, and I am grateful for the opportunity to have you as my teacher and mentor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Key Highlights</h3>
            </div>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start bg-white/5 rounded-xl p-4 backdrop-blur-sm"
              >
                <span className="text-3xl mr-4">🎓</span>
                <div>
                  <div className="font-bold text-lg">Class Rank #1</div>
                  <div className="text-sm opacity-90">Out of 506 students</div>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start bg-white/5 rounded-xl p-4 backdrop-blur-sm"
              >
                <span className="text-3xl mr-4">🔬</span>
                <div>
                  <div className="font-bold text-lg">Research Projects</div>
                  <div className="text-sm opacity-90">AI Game Development & ML Engineering</div>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start bg-white/5 rounded-xl p-4 backdrop-blur-sm"
              >
                <span className="text-3xl mr-4">🏆</span>
                <div>
                  <div className="font-bold text-lg">Multiple Awards</div>
                  <div className="text-sm opacity-90">USACO Silver, NASA SpaceApps Nominee, and more</div>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start bg-white/5 rounded-xl p-4 backdrop-blur-sm"
              >
                <span className="text-3xl mr-4">🤝</span>
                <div>
                  <div className="font-bold text-lg">Leadership & Service</div>
                  <div className="text-sm opacity-90">Founded Tech4Silvers, VP of Coding Club, NHS Leadership</div>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 mb-12 border border-white/20 shadow-2xl"
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
              <span className="text-2xl">👔</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Leadership Positions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadershipPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="font-bold text-lg mb-1">{position.title}</div>
                <div className="text-sm opacity-90 mb-2">{position.organization}</div>
                {position.type && (
                  <div className="text-xs opacity-75 mt-2 px-2 py-1 bg-white/10 rounded-full inline-block">{position.type}</div>
                )}
                {position.description && (
                  <div className="text-sm opacity-80 mt-2">{position.description}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 inline-block border border-white/20 shadow-2xl max-w-2xl"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Contact Information</h3>
            </div>
            <div className="space-y-4 text-left">
              <div className="flex items-center">
                <span className="font-semibold text-lg min-w-[100px]">Email:</span>
                <span className="text-lg opacity-90">[Your Email]</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg min-w-[100px]">School:</span>
                <span className="text-lg opacity-90">Granite Bay High School</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-lg min-w-[100px]">Grade:</span>
                <span className="text-lg opacity-90">Junior (11th Grade)</span>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-xl md:text-2xl font-medium"
          >
            Thank you for your time and consideration! 🙏
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

