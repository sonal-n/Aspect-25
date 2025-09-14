"use client";
import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { stages as defaultStages, Stage } from "../data/timeline";

type Props = { stages?: Stage[] };

function lastCompletedIndex(list: Stage[]) {
  let idx = -1;
  for (let i = 0; i < list.length; i++) if (list[i].status === "completed") idx = i;
  return idx;
}

export default function Timeline({ stages = defaultStages }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [rocketTop, setRocketTop] = useState<number>(0);

  const activeIndex = stages.findIndex((s) => s.status === "ongoing");
  const fallbackIndex = Math.max(lastCompletedIndex(stages), 0);
  const anchorIndex = stages.length ? (activeIndex !== -1 ? activeIndex : fallbackIndex) : 0;

  const measure = () => {
    const container = containerRef.current;
    const dot = dotRefs.current[anchorIndex] ?? null;
    if (!container || !dot) return;

    const cTop = container.getBoundingClientRect().top + window.scrollY;
    const dRect = dot.getBoundingClientRect();
    const centerY = dRect.top + window.scrollY + dRect.height / 2;
    setRocketTop(centerY - cTop);
  };

  useLayoutEffect(() => {
    measure();
    (document as any).fonts?.ready?.then(measure).catch(() => {});
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [anchorIndex, stages.length]);

  if (!stages.length) return null;

  return (
    <section id="timeline" className="mt-6 particles">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-l tracking-tight text-red-100">
          Journey Through Space
        </h2>

        <div className="relative mt-12 md:mt-16">
          <div ref={containerRef} className="relative mx-auto">
            <div className="hidden md:block absolute left-1/2 inset-y-0 -translate-x-1/2 w-[3px] rounded-full bg-gradient-to-b from-[#9A1B1D] via-[#E65F4E] to-[#FDB44B]" />
            <div className="hidden md:block absolute left-1/2 inset-y-0 -translate-x-1/2 w-[9px] rounded-full blur-md bg-[rgba(230,95,78,0.25)]" />

            <div className="md:hidden absolute left-5 inset-y-0 w-[3px] rounded-full bg-gradient-to-b from-[#9A1B1D] via-[#E65F4E] to-[#FDB44B]" />
            <div className="md:hidden absolute left-5 inset-y-0 w-[9px] rounded-full blur-md bg-[rgba(230,95,78,0.25)]" />

            <div
              className="absolute pointer-events-none hidden md:block"
              style={{ left: "calc(50% - 40px)", top: Math.max(0, rocketTop - 12) }}
            >
              <img src="/startup.svg" alt="rocket icon" className="h-6 w-6 drop-shadow" />
            </div>

            <div className="relative flex flex-col gap-6 sm:gap-10 md:gap-16 py-4">
              {stages.map((s, i) => {
                const isPast = s.status === "completed";
                const isActive = s.status === "ongoing";
                const isUpcoming = s.status === "upcoming";
                const side = i % 2 === 0 ? "left" : "right";
                const dot = isPast
                  ? "bg-[#FDB44B]"
                  : isActive
                  ? "bg-white ring-2 ring-[#E65F4E]/60"
                  : "bg-[#5D3233]";

                return (
                  <div key={s.id} className="relative min-h-[110px] md:min-h-[120px] py-0.5">
                    <div
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className={[
                        "absolute top-1/2 h-5 w-5 md:h-6 md:w-6 rounded-full border border-[#E65F4E]",
                        "left-5 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2",
                        dot,
                        isActive ? "animate-pulse-ring" : "",
                      ].join(" ")}
                      title={s.title}
                    />

                    <div
                      className={[
                        "w-full md:w-[560px] pl-14 md:pl-0",
                        side === "left" ? "md:mr-auto md:pr-[72px]" : "md:ml-auto md:pl-[72px]",
                      ].join(" ")}
                    >
                      <article
                        className={[
                          "rounded-xl border p-4 sm:p-5 shadow-xl backdrop-blur transition lg:w-[460px] sm:w-[250px]",
                          isActive
                            ? "border-[#E65F4E] bg-[#2B0F16]/90 shadow-[0_0_24px_#E65F4E33]"
                            : isPast
                            ? "border-[#5D3233] bg-[#2B0F16]/90"
                            : "border-[#5D3233] bg-[#2B0F16]/80 opacity-90",
                        ].join(" ")}
                        aria-current={isActive ? "step" : undefined}
                      >
                        <time className="text-xs sm:text-[13px] text-red-50/70">
                          {s.date
                            ? new Date(s.date).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              })
                            : "TBA"}
                        </time>
                        <h3 className="mt-0.5 text-base sm:text-lg font-semibold text-red-100">
                          {s.title}
                        </h3>
                        <p className="mt-1 text-sm text-red-50/80">{s.description}</p>
                        {isUpcoming && (
                          <p className="mt-2 text-[12px] text-red-50/60">Upcoming checkpoint</p>
                        )}
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute bottom-6 left-[calc(50%+48px)] hidden md:block">
              <img
                src="/shooting-star.svg"
                alt="comet icon"
                className="h-6 w-6 animate-comet-vert will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
