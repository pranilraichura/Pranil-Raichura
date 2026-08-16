"use client";

import { academicStats } from "@/data/academic";
import { ScrollReveal, ScrollRevealGroup } from "./ScrollReveal";

const coursework = [
  "AP CS Principles & A (Java)",
  "AP Calculus BC & AB",
  "AP Physics 1 & 2",
  "AP Statistics",
  "DE/AP Psychology",
  "Multivariable Calculus",
  "Machine Learning Specialization",
];

export default function AcademicAchievements() {
  return (
    <section
      id="academic"
      className="py-24 md:py-28 relative overflow-hidden"
      style={{
        backgroundImage: "url(/starry_night.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600 mb-3">
            Academic foundation
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Education
          </h2>
          <div className="w-16 h-1 bg-slate-800 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
            Graduating from{" "}
            <span className="font-semibold text-slate-900">Granite Bay High School</span>{" "}
            in 2027.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-14" stagger={0.12}>
          <article
            data-reveal-item
            className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-10 text-white shadow-2xl shadow-slate-900/20"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10"
            ></div>
            <div
              aria-hidden="true"
              className="absolute right-10 bottom-8 h-24 w-24 rounded-full bg-primary-500/20 blur-2xl"
            ></div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-12">
              Class standing
            </p>
            <p className="font-libre text-6xl sm:text-7xl md:text-8xl font-bold leading-none">
              1st
            </p>
            <p className="mt-5 text-2xl md:text-3xl font-light text-slate-200">
              Ranked <span className="font-semibold text-white">1st of 504</span>
            </p>
          </article>

          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-5">
            <article
              data-reveal-item
              className="rounded-3xl bg-white/90 border border-slate-200 p-6 md:p-8 shadow-xl shadow-slate-900/5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
                Weighted GPA
              </p>
              <p className="font-libre text-4xl sm:text-5xl font-bold text-primary-700">
                {academicStats.weightedGPA}
              </p>
              <p className="mt-2 text-sm text-slate-500">4.0 Unweighted</p>
            </article>

            <article
              data-reveal-item
              className="rounded-3xl bg-white/90 border border-slate-200 p-6 md:p-8 shadow-xl shadow-slate-900/5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
                SAT Superscore
              </p>
              <p className="font-libre text-4xl sm:text-5xl font-bold text-orange-600">
                1530
              </p>
              <p className="mt-2 text-sm text-slate-500">
                790 Math • 740 Reading &amp; Writing
              </p>
            </article>
          </div>
        </ScrollRevealGroup>

        <ScrollRevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
          <article data-reveal-item className="rounded-2xl bg-white/70 border border-white p-7 md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.18em]">
                Relevant Coursework
              </h3>
              <span className="text-3xl font-libre text-slate-300">
                {coursework.length.toString().padStart(2, "0")}
              </span>
            </div>
            <ol className="space-y-4">
              {coursework.map((course, index) => (
                <li key={course} className="flex items-baseline gap-4 text-slate-700">
                  <span className="text-xs font-semibold text-primary-500">
                    0{index + 1}
                  </span>
                  <span className="text-lg">
                    {course}
                    {course === "Multivariable Calculus" && (
                      <span className="text-slate-500 text-sm"> (Sierra College)</span>
                    )}
                    {course === "Machine Learning Specialization" && (
                      <span className="text-slate-500 text-sm"> (Stanford)</span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <article data-reveal-item className="rounded-2xl bg-white/70 border border-white p-7 md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.18em]">
                At a glance
              </h3>
              <span className="text-3xl font-libre text-slate-300">03</span>
            </div>
            <dl className="space-y-7">
              <div>
                <dt className="text-sm text-slate-500 mb-1">Class rank</dt>
                <dd className="text-2xl font-bold text-slate-900">
                  {academicStats.classRank} of {academicStats.classSize}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 mb-1">SAT breakdown</dt>
                <dd className="text-2xl font-bold text-slate-900">
                  790 <span className="text-sm font-medium text-slate-500">Math</span>
                  <span className="mx-3 text-slate-300">/</span>
                  740{" "}
                  <span className="text-sm font-medium text-slate-500">
                    Reading &amp; Writing
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 mb-1">Unweighted GPA</dt>
                <dd className="text-2xl font-bold text-slate-900">4.0</dd>
              </div>
            </dl>
          </article>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
