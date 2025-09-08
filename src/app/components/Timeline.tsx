"use client";
import { useMemo } from "react";
import { stages as defaultStages, Stage } from "../data/timeline";

type props = {stages?: Stage[]; height?: number };

export default function Timeline({ stages = defaultStages, height=820 }: props) {
    const activeIndex = stages.findIndex(s => s.status === "ongoing");
    const lastPastIndex =
    activeIndex === -1
      ? Math.max(stages.findIndex(s => s.status === "completed" && s), 0)
      : activeIndex;

  const progressPct = useMemo(
    () => (lastPastIndex / (stages.length - 1)) * 100,
    [lastPastIndex, stages.length]
  );

  return (
    <section id="timeline" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-red-100">
          Journey Through Space
        </h2>

            <div className="relative mt-16">
            <div className="relative mx-auto" style={{ height }}>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[3px] rounded-full bg-gradient-to-b from-[#9A1B1D] via-[#E65F4E] to-[#FDB44B]" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[9px] rounded-full blur-md bg-[rgba(230,95,78,0.25)]" />
  
          <div
            className="absolute left-1/2 -translate-x-1/2 -ml-5"
            style={{ top: `calc(${progressPct}% - 10px)` }}
            aria-label="Mission progress"
            >
            <img src="/startup.svg" alt="rocket icon" className="h-6 w-6 drop-shadow" />
          </div>

          <div className="relative h-full flex flex-col justify-between">
              {stages.map((s, i) => {
                const isPast = s.status === "completed";
                const isActive = s.status === "ongoing";
                const dot = isPast ? "bg-[#FDB44B]" : isActive ? "bg-white" : "bg-[#5D3233]";
                const side = i % 2 === 0 ? "left" : "right";

                return (
                  <div key={s.id} className="relative">
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-[#E65F4E] ${dot} ${
                        isActive ? "animate-pulse-ring" : ""
                      }`}
                    />
                    <div
                      className={`w-[46%] ${
                        side === "left"
                          ? "pr-10 text-right ml-0 mr-auto"
                          : "pl-10 text-left  mr-0 ml-auto"
                      }`}
                    >
                      <div className="inline-block rounded-xl border border-[#5D3233] bg-[#2B0F16]/90 p-4 shadow-xl backdrop-blur">
                        <div className="text-xs text-red-50/70">{s.date ?? "TBA"}</div>
                        <div className="mt-0.5 font-semibold text-red-100">{s.title}</div>
                        <div className="mt-1 text-sm text-red-50/80">{s.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute bottom-6 left-[calc(50%+48px)]">
            <img
                src="/shooting-star.svg"
                alt="comet icon"
                className="h-6 w-6 animate-comet-vert will-change-transform"
            />
            </div>
          </div>

          {lastPastIndex >= stages.length - 1 && (
            <div className="mx-auto mt-8 w-fit rounded-2xl border border-[#5D3233] bg-[#2B0F16]/70 px-5 py-3 text-center text-lg font-semibold text-red-100 shadow-lg">
              🌟 MISSION ACCOMPLISHED
            </div>
          )}
        </div>
      </div>
    </section>
  );
}