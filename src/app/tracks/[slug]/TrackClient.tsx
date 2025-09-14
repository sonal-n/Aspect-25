"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Track } from "../../data/tracks";
import {
  Info,
  Package,
  ListChecks,
  ShieldCheck,
  Scale,
  FileText,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import GuidelinesSection from "../../components/GuidelinesSection";

type ClientTrack = Pick<
  Track,
  | "slug"
  | "title"
  | "short"
  | "heroImg"
  | "heroBg"
  | "color"
  | "overview"
  | "whatToBuild"
  | "deliverables"
  | "rules"
  | "judging"
  | "eligibility"
  | "resources"
>;

const EMOJI_BY_SLUG: Record<string, string> = {
  "web-development": "🌐",
  "graphic-design": "🎨",
  "video-editing": "🎬",
  gaming: "🕹️",
  quiz: "🧠",
};

export default function TrackClient({ track }: { track: ClientTrack }) {
  useEffect(() => {
    try {
      window.history.scrollRestoration = "manual";
    } catch {}
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      try {
        window.history.scrollRestoration = "auto";
      } catch {}
    };
  }, []);

  const t = track;
  const ACCENT = t.color || "#58baff";
  const SHOW_SUBTITLE = true;

  const tabs = useMemo(() => {
    const base = [
      { key: "overview", label: "Overview", icon: Info },
      { key: "what", label: "What to Build", icon: Package },
      { key: "deliverables", label: "Deliverables", icon: ListChecks },
      { key: "rules", label: "Rules & Regulations", icon: ShieldCheck },
      { key: "judging", label: "Judging", icon: Scale },
    ] as const;
    return Array.isArray(t.eligibility) && t.eligibility.length
      ? [...base, { key: "eligibility", label: "Eligibility", icon: FileText }]
      : base;
  }, [t.eligibility]);

  const [tab, setTab] = useState<string>(tabs[0]?.key ?? "overview");

  const rulesArr = Array.isArray(t.rules) ? t.rules : [];
  const deliverablesArr = Array.isArray(t.deliverables) ? t.deliverables : [];
  const judgingArr = Array.isArray(t.judging) ? t.judging : [];
  const whatArr = Array.isArray(t.whatToBuild) ? t.whatToBuild : [];

  const teamRules = rulesArr.filter((r) => /team|members|cross-school/i.test(r));
  const innovation = rulesArr.filter((r) => /original|ai|plagiarism|nsfw/i.test(r));
  const judgingBullets = judgingArr.map((c) => `${c.label} — ${c.weight}%`);

  const groups = [
    {
      key: "team",
      title: "Team Rules",
      icon: "astronaut" as const,
      bullets: teamRules.length ? teamRules : ["Team requirements as stated."],
    },
    {
      key: "innovation",
      title: "Innovation",
      icon: "lightbulb" as const,
      bullets: innovation.length ? innovation : ["Originality matters."],
    },
    {
      key: "deliver",
      title: "Deliverables",
      icon: "wrench" as const,
      bullets: deliverablesArr,
    },
    {
      key: "judging",
      title: "Judging",
      icon: "scale" as const,
      bullets: judgingBullets,
    },
  ];

  const emoji = EMOJI_BY_SLUG[t.slug] ?? "✨";

  function GlowList({ items }: { items: string[] }) {
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <ul className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/[.04] divide-y divide-white/8">
        {items.map((d, i) => (
          <li key={i} className="flex items-start gap-3 px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--acc)]/90" />
            <span className="text-white/92">{d}</span>
          </li>
        ))}
      </ul>
    );
  }

  function JudgingBlock({
    items,
    accent = "var(--acc)",
  }: {
    items: { label: string; weight: number }[];
    accent?: string;
  }) {
    const total = items.reduce((s, x) => s + (x?.weight ?? 0), 0);
    return (
      <div className="rounded-2xl bg-black/60 ring-1 ring-white/10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl text-white">Judging</h3>
          <span
            className={`text-sm ${total === 100 ? "text-white/50" : "text-amber-300"}`}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            Total: {total}%{total !== 100 ? " (should be 100%)" : ""}
          </span>
        </div>

        <ul className="space-y-3">
          {items.map((c, i) => (
            <li key={i} className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/[.04]">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-white/92">{c.label}</span>
                <span className="text-white/80" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {c.weight}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10">
                <div
                  className="h-full origin-left transition-[width] duration-500 ease-out"
                  style={{ width: `${c.weight}%`, background: accent }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="relative isolate" style={{ ["--acc" as any]: ACCENT }}>
      <div className="relative w-full h-[320px] md:h-[400px]">
        <Image
          src={t.heroBg || t.heroImg || "/stars-fallback.jpg"}
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />

        <div className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 pt-14">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                scroll
                onClick={() => {
                  try {
                    sessionStorage.setItem("ASPECT_scrollToCategories", "1");
                  } catch {}
                }}
                className="
                  group relative inline-flex items-center gap-2
                  rounded-full bg-black/55 px-3 py-2 text-m text-white
                  ring-1 ring-white/20 hover:ring-[var(--acc)]/60
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc)]/80
                  active:scale-[.98] transition cursor-pointer select-none
                  overflow-hidden
                "
                aria-label="Back to Categories"
              >
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute -inset-px rounded-full
                    [background:linear-gradient(115deg,transparent,rgba(255,255,255,.28),transparent)]
                    opacity-0 group-hover:opacity-100 transition-opacity
                    animate-[btnShine_1600ms_linear_infinite]
                    motion-ok:animate-none
                  "
                />
                <ArrowLeft
                  className="
                    h-4 w-4 relative z-10
                    transition-transform duration-300 ease-out
                    group-hover:-translate-x-1
                  "
                />
                <span className="relative z-10">Back</span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: "inset 0 0 0 999px rgba(255,255,255,0.04)" }}
                />
              </Link>

              <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-m text-white ring-1 ring-white/15">
                <span className="text-base leading-none">{emoji}</span>
                <span className="tracking-wide">{t.title}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-end px-6 pb-10">
            <div>
              <h2 className=" mt-3 text-[40px] leading-[1.05] md:text-[58px] xl:text-[64px] text-red-50 tracking-tight">
                {t.title}
              </h2>
              <p className="mt-2 max-w-3xl text-white/90 text-base md:text-lg">{SHOW_SUBTITLE ? t.short : null}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="sticky top-16 z-10 -mx-2 overflow-x-auto px-2">
          <div className="inline-flex gap-2 rounded-2xl bg-black/50 ring-1 ring-white/12 p-2 backdrop-blur">
            {tabs.map((x) => {
              const Icon = x.icon;
              const active = tab === x.key;
              return (
                <button
                  key={x.key}
                  onClick={() => setTab(x.key)}
                  className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
                    active ? "text-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-xl bg-[var(--acc)]/18 ring-1 ring-[var(--acc)]/40" />
                  )}
                  <Icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{x.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.995 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="grid gap-6"
            >
              {tab === "overview" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Overview</h2>
                  <p className="leading-relaxed text-white/92">{t.overview}</p>
                </Card>
              )}

              {tab === "what" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">What to Build</h2>
                  <GlowList items={whatArr} />
                </Card>
              )}

              {tab === "deliverables" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Deliverables</h2>
                  <GlowList items={deliverablesArr} />
                </Card>
              )}

              {tab === "rules" && <GuidelinesSection groups={groups} accent={ACCENT} />}

              {tab === "eligibility" && Array.isArray(t.eligibility) && t.eligibility.length > 0 && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Eligibility</h2>
                  <GlowList items={t.eligibility} />
                </Card>
              )}

              {tab === "judging" && <JudgingBlock items={judgingArr} accent={ACCENT} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-black/60 p-6 ring-1 ring-white/15 backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}
