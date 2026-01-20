"use client";

import { motion } from "framer-motion";
import { researchProjects } from "@/data/research";

export default function ResearchProjects() {
  return (
    <section id="research" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience & Research
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="space-y-6">
          {researchProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-200"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.title}
                    {project.role && (
                      <span className="text-lg text-gray-600 font-normal">
                        {" "}
                        — {project.role}
                      </span>
                    )}
                  </h3>
                  {project.tech && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Tech:</span> {project.tech}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {project.description}
              </p>

              {project.highlights && (
                <ul className="space-y-2 mb-4">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              {project.mentors && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Mentors:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.mentors.map((mentor, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200"
                      >
                        {/* @ts-ignore */}
                        {mentor.image && (
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-100"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {mentor.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {mentor.affiliation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.mentor && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Mentor:
                  </p>
                  <div className="flex items-center gap-3 text-sm bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 inline-flex">
                    {/* @ts-ignore */}
                    {project.mentor.image && (
                      <img
                        src={project.mentor.image}
                        alt={project.mentor.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {project.mentor.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {project.mentor.affiliation}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.paperTitle && (
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-primary-600">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Research Paper:
                  </p>
                  <p className="text-sm text-gray-900 mb-2">
                    {project.paperTitle}
                  </p>
                  {project.preprintLink && (
                    <a
                      href={project.preprintLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm underline"
                    >
                      View Preprint →
                    </a>
                  )}
                  {project.status && (
                    <span className="ml-3 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                      {project.status}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
