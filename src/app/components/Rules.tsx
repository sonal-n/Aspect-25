"use client";

import { FileText, Users2, GraduationCap, BadgeCheck, ShieldCheck, Lightbulb, ChevronRight } from "lucide-react";

const stat =
  "group relative rounded-2xl border border-white/10 bg-white/[.05] p-5 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_70px_rgba(0,0,0,.5)] hover:border-[#E65F4E]/40";
const card =
  "group relative rounded-2xl border border-white/10 bg-white/[.06] p-7 ring-1 ring-white/5 shadow-[0_18px_80px_rgba(0,0,0,.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E65F4E]/40";
const ring =
  "after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:p-[1px] after:bg-[linear-gradient(120deg,transparent,rgba(230,95,78,.35),transparent)] after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300";

export default function Rules() {
  return (
    <section id="rules" className="bg-[#160e0e] scroll-mt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(253,180,75,.10),transparent_60%)]" />
      <div className="container mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10 text-red-50/80 w-max mx-auto">
  <FileText className="w-4 h-4" /> Competition Details
</div>
        <div className="text-center mt-6">
          <h2 className="text-5xl md:text-6xl font-l tracking-tight text-red-100">RULES &amp; REGULATIONS</h2>
          <p className="mt-3 text-red-50/75">Everything you need to know to participate in ASPECT’25</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
          <div className={`${stat} ${ring}`}>
            <div className="flex items-center gap-3 text-red-100">
              <Users2 className="w-5 h-5 transition-all duration-300 group-hover:text-[#E65F4E] group-hover:scale-110" />
              <p className="font-semibold">One Category Only</p>
            </div>
            <p className="mt-1 text-sm text-red-50/70 pl-8">Compete under a single category</p>
          </div>

          <div className={`${stat} ${ring}`}>
            <div className="flex items-center gap-3 text-red-100">
              <GraduationCap className="w-5 h-5 transition-all duration-300 group-hover:text-[#E65F4E] group-hover:scale-110" />
              <p className="font-semibold">Grades 6–13</p>
            </div>
            <p className="mt-1 text-sm text-red-50/70 pl-8">Bandaranayake College students only</p>
          </div>

          <div className={`${stat} ${ring}`}>
            <div className="flex items-center gap-3 text-red-100">
              <BadgeCheck className="w-5 h-5 transition-all duration-300 group-hover:text-[#E65F4E] group-hover:scale-110" />
              <p className="font-semibold">Divisions</p>
            </div>
            <div className="mt-2 ml-8 inline-flex items-center rounded-full border border-white/10 bg-white/[.06] text-xs text-red-50/85 overflow-hidden">
              <span className="px-3 py-1 transition-colors group-hover:bg-[#E65F4E]/10">Junior 6–9</span>
              <span className="px-3 py-1 border-l border-white/10 transition-colors group-hover:bg-[#E65F4E]/10">Senior 10–13</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 text-left">
          <div className={`${card} ${ring}`}>
            <div className="flex items-center gap-2 text-red-100">
              <ShieldCheck className="w-5 h-5 transition-all duration-300 group-hover:text-[#E65F4E] group-hover:scale-110" />
              <h3 className="text-xl font-semibold">Eligibility</h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">The competition is held under five categories and a participant may compete in only one.</span>
              </li>
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">Participants must be students currently studying in Grades 6–13 at Bandaranayake College.</span>
              </li>
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">Graphic Designing, Video Editing, Programming, and Quiz have two age divisions.</span>
              </li>
            </ul>
          </div>

          <div className={`${card} ${ring}`}>
            <div className="flex items-center gap-2 text-red-100">
              <Lightbulb className="w-5 h-5 transition-all duration-300 group-hover:text-[#E65F4E] group-hover:scale-110" />
              <h3 className="text-xl font-semibold">Innovation</h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">Ideas must focus on the theme “ … ”.</span>
              </li>
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">All submissions must be original and created by the participants.</span>
              </li>
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">Plagiarism is strictly prohibited and results in immediate disqualification.</span>
              </li>
            </ul>
          </div>

          <div className={`${card} ${ring}`}>
            <div className="flex items-center gap-2 text-red-100">
              <FileText className="w-5 h-5 transition-all duration-300 group-hover:text-[#E65F4E] group-hover:scale-110" />
              <h3 className="text-xl font-semibold">Submission Process</h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">All entries must be submitted before the deadline.</span>
              </li>
              <li className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]">
                <ChevronRight className="w-4 h-4 mt-1 shrink-0 text-red-50/50 transition-all duration-200 group-hover:text-[#FDB44B] group-hover:translate-x-0.5 group-hover:scale-125" />
                <span className="text-red-50/85 transition-colors group-hover:text-red-100">Late submissions will not be accepted under any circumstance.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
