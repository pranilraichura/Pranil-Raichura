"use client";

import Image from "next/image";
import { personalInfo } from "@/data/personal";
import { ScrollReveal, ScrollRevealGroup } from "./ScrollReveal";

const themes = [
  {
    number: "01",
    title: "Service & Community",
    body: personalInfo.about.service,
    accent: "text-primary-700",
    line: "bg-primary-500",
  },
  {
    number: "02",
    title: "Technology & Innovation",
    body: personalInfo.about.techPassion,
    accent: "text-violet-700",
    line: "bg-violet-500",
  },
  {
    number: "03",
    title: "What I'm Working Toward",
    body: personalInfo.about.goals,
    accent: "text-orange-700",
    line: "bg-orange-500",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary-100/50 blur-3xl pointer-events-none"
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600 mb-3">
            Underneath the work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The threads that run underneath everything else on this page.
          </p>
        </ScrollReveal>

        <ScrollRevealGroup className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div
            data-reveal-item
            className="relative lg:col-span-5 min-h-[410px] sm:min-h-[500px]"
          >
            <div className="absolute inset-x-3 top-0 bottom-24 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/15 border border-white">
              <Image
                src="/gallery/full/group-coding-session.jpg"
                alt="Students working together around a table with laptops"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-white/5"></div>
              <span className="absolute left-5 top-5 rounded-full bg-white/90 backdrop-blur px-3.5 py-2 text-xs font-semibold text-slate-800 shadow">
                Technology &amp; Innovation
              </span>
            </div>

            <div className="absolute left-0 bottom-0 z-10 w-[44%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white -rotate-3">
              <Image
                src="/gallery/full/raspberry-pi-prototype.jpg"
                alt="Raspberry Pi and sensor prototype for an assistive technology project"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 42vw, 19vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent"></div>
              <span className="absolute left-3 bottom-3 text-[10px] sm:text-[11px] font-semibold text-white">
                What I&apos;m Working Toward
              </span>
            </div>

            <div className="absolute right-0 bottom-0 z-20 w-[52%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3">
              <Image
                src="/gallery/full/clothing-donation.jpg"
                alt="Standing beside boxes of donated clothing outside a community building"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 52vw, 24vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
              <span className="absolute left-3 bottom-3 text-[11px] font-semibold text-white">
                Service &amp; Community
              </span>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {themes.map((theme) => (
                <article
                  key={theme.number}
                  data-reveal-item
                  className="group relative py-7 md:py-8 pl-6 md:pl-8"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-8 bottom-8 w-1 rounded-full ${theme.line} transition-transform duration-300 group-hover:scale-y-110`}
                  ></div>
                  <div className="flex items-start gap-4 md:gap-6">
                    <span className="font-libre text-sm font-bold text-slate-300 pt-1">
                      {theme.number}
                    </span>
                    <div>
                      <h3 className={`text-2xl font-bold mb-3 ${theme.accent}`}>
                        {theme.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{theme.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div data-reveal-item className="pt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Outside of school
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {personalInfo.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 shadow-sm"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
