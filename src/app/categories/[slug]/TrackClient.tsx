"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Track } from "../../data/tracks";
import { Info, Package, ListChecks, ShieldCheck, Scale, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import GuidelinesSection from "../../components/GuidelinesSection";

type ClientTrack = Pick<
  Track,
  "slug" | "title" | "short" | "heroImg" | "heroBg" | "color" | "overview" | "whatToBuild" | "deliverables" | "rules" | "judging" | "eligibility" | "resources"
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
    try { window.history.scrollRestoration = "manual"; } catch {}
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => { try { window.history.scrollRestoration = "auto"; } catch {} };
  }, []);

  const t = track;
  const ACCENT = t.color || "#58baff";
  const SHOW_SUBTITLE = true;
  const prefersReducedMotion = useReducedMotion();

  const isGraphic = t.slug === "graphic-design";
  const isWeb = t.slug === "web-development";
  const isVideo = t.slug === "video-editing";
  const isQuiz = t.slug === "quiz";

  const rulesArr = Array.isArray(t.rules) ? t.rules : [];
  const deliverablesArr = Array.isArray(t.deliverables) ? t.deliverables : [];
  const judgingArr = Array.isArray(t.judging) ? t.judging : [];
  const whatArr = Array.isArray(t.whatToBuild) ? t.whatToBuild : [];

  const tabs = useMemo(() => {
    const base: { key: string; label: string; icon: any }[] = [{ key: "overview", label: "Overview", icon: Info }];
    if (!isQuiz) {
      base.push({ key: "what", label: "What to Build", icon: Package });
      base.push({ key: "deliverables", label: t.slug === "graphic-design" ? "What to Submit" : "Deliverables", icon: ListChecks });
      base.push({ key: "rules", label: "Rules & Regulations", icon: ShieldCheck });
      base.push({ key: "judging", label: "Judging", icon: Scale });
    } else {
      base.push({ key: "teamelig", label: "Team & Eligibility", icon: ListChecks });
      base.push({ key: "format", label: "Competition Format", icon: FileText });
      base.push({ key: "participation", label: "Participation", icon: ListChecks });
      base.push({ key: "rules", label: "Rules & Guidelines", icon: ShieldCheck });
      base.push({ key: "judging", label: "Judging", icon: Scale });
    }
  const includeEligibilityTab = !isQuiz && Array.isArray(t.eligibility) && t.eligibility.length > 0;
    return includeEligibilityTab ? [...base, { key: "eligibility", label: "Eligibility", icon: FileText }] : base;
  }, [isQuiz, t.slug, t.eligibility]);

  const [tab, setTab] = useState<string>(tabs[0]?.key ?? "overview");

  const strip = (s: string) => s.replace(/^(Team|Category|Format|Guideline|Judging|Participation):\s*/i, "").trim();

  const themeBullets = useMemo(() => rulesArr.filter((r) => /space aspects|theme/i.test(r)), [rulesArr]);
  const penaltyBullets = useMemo(
    () => rulesArr.filter((r) => /(copyright|offensive|violent|inappropriate|external help|cheat|ai)/i.test(r)),
    [rulesArr]
  );
  const requirementBullets = useMemo(() => {
    const out = [
      whatArr.find((s) => /three|3\+|at least/i.test(s)) || "Minimum three still images",
      deliverablesArr.find((s) => /png|jpg/i.test(s)) || "Formats: PNG or JPG",
      deliverablesArr.find((s) => /1800|1500/i.test(s)) || "Resolutions: 1800×2240 and 1500×1500",
    ].filter(Boolean) as string[];
    return out;
  }, [whatArr, deliverablesArr]);

  const conductBullets = useMemo(
    () => rulesArr.filter((r) => /(original|plagiarism|nsfw|hate|ai|cheat|hack|exploit|offensive|abusive|misconduct|referee)/i.test(r)),
    [rulesArr]
  );
  const submissionBullets = useMemo(
    () => rulesArr.filter((r) => /(deadline|late|submit|submission|hand ?over|register|registration|form)/i.test(r)),
    [rulesArr]
  );

  const webGroups = useMemo(
    () => [
      {
        key: "disq",
        title: "Disqualification Rules",
        icon: "shield" as const,
        bullets: [
          "Using pre-made templates or copied code leads to immediate disqualification.",
          "Plagiarism or unmodified AI-generated code is not allowed.",
          "All work must be original and authentic.",
        ],
      },
      {
        key: "submit",
        title: "Submission Process",
        icon: "wrench" as const,
        bullets: [
          "Submit your project before the deadline.",
          "Include a 2–10 minute video showing website features & functionality.",
          "Explain theme alignment (Space Elevator).",
          "Demonstrate the user experience.",
          "Upload the video to YouTube/Google Drive and share the link along with project files.",
        ],
      },
    ],
    []
  );

  const videoThemeBullets = useMemo(() => rulesArr.filter((r) => /space elevator|theme/i.test(r)), [rulesArr]);
  const videoPenaltyBullets = useMemo(
    () => rulesArr.filter((r) => /(copyright|offensive|violent|inappropriate|cheat|external help)/i.test(r)),
    [rulesArr]
  );
  const videoSubmissionBullets = useMemo(() => rulesArr.filter((r) => /(submit|deadline|form)/i.test(r)), [rulesArr]);

  const videoGroups = useMemo(
    () => [
      {
        key: "theme",
        title: "Theme",
        icon: "lightbulb" as const,
        bullets: videoThemeBullets.length ? videoThemeBullets : ['The content should align with the theme "Space Elevator".'],
      },
      {
        key: "submit",
        title: "Submission Process",
        icon: "wrench" as const,
        bullets: videoSubmissionBullets.length ? videoSubmissionBullets : ["Submit your entry via the official form before the deadline."],
      },
      {
        key: "penalty",
        title: "Disqualification & Penalties",
        icon: "shield" as const,
        bullets: videoPenaltyBullets.length
          ? videoPenaltyBullets
          : ["Use of copyrighted materials without permission.", "Offensive, violent, or inappropriate content.", "Any form of cheating or external help."],
      },
    ],
    [videoThemeBullets, videoSubmissionBullets, videoPenaltyBullets]
  );

  const defaultGroups = useMemo(
    () => [
      {
        key: "conduct",
        title: "Conduct & Originality",
        icon: "lightbulb" as const,
        bullets: conductBullets.length ? conductBullets : ["Originality and fair play are required."],
      },
      {
        key: "submission",
        title: "Submission Process",
        icon: "wrench" as const,
        bullets: submissionBullets.length ? submissionBullets : ["All entries must be submitted before the deadline.", "Late submissions will not be accepted."],
      },
    ],
    [conductBullets, submissionBullets]
  );

  const groups = useMemo(() => {
    if (isGraphic) {
      return [
        { key: "theme", title: "Theme", icon: "lightbulb" as const, bullets: themeBullets.length ? themeBullets : ['The content must align with "Space Aspects".'] },
        { key: "tools", title: "Tools Allowed", icon: "tool" as const, bullets: ["Any designing software can be used."] },
        { key: "req", title: "Requirements", icon: "wrench" as const, bullets: requirementBullets },
        { key: "penalty", title: "Disqualification & Penalties", icon: "shield" as const, bullets: penaltyBullets },
      ];
    }
    if (isWeb) return webGroups;
    if (isVideo) return videoGroups;
    return defaultGroups;
  }, [isGraphic, isWeb, isVideo, themeBullets, requirementBullets, penaltyBullets, webGroups, videoGroups, defaultGroups]);

  const quizTeam = useMemo(() => {
    const fromRules = rulesArr.filter((r) => /^Team:/i.test(r)).map(strip);
    return fromRules.length ? fromRules : ["Each team must have 5 members.", "All members must be current students of Bandaranayake College Gampaha."];
  }, [rulesArr]);

  const quizEligibility = useMemo(() => {
    const catFromRules = rulesArr.filter((r) => /^Category:/i.test(r)).map(strip);
    const fromEligibility = (t.eligibility ?? []).slice();
    const out = [...catFromRules, ...fromEligibility];
    return out.length ? out : ["Junior Division: Grades 6–9", "Senior Division: Grades 10–13"];
  }, [rulesArr, t.eligibility]);

  const quizTeamAndEligibility = useMemo(() => [...quizTeam, ...quizEligibility], [quizTeam, quizEligibility]);

  const quizFormat = useMemo(() => {
    const fromRules = rulesArr.filter((r) => /^Format:/i.test(r)).map(strip);
    return fromRules.length ? fromRules : ["Round 1: Online preliminary quiz.", "Semi-Final: Online session for selected teams.", "Final Round: Grand Finale held live at the main ASPECT’25 event."];
  }, [rulesArr]);

  const quizParticipation = useMemo(() => {
    const fromRules = rulesArr.filter((r) => /^Participation:/i.test(r)).map(strip);
    return fromRules.length ? fromRules : ["Teams must register before the deadline.", "Further details will be shared with team leaders via email."];
  }, [rulesArr]);

  const quizGuidelines = useMemo(() => {
    const fromRules = rulesArr.filter((r) => /^Guideline:/i.test(r)).map(strip);
    return fromRules.length
      ? fromRules
      : ["Dates and schedules will be informed in advance.", "Online rounds will be conducted via Zoom breakout rooms.", "Teams must ensure a stable internet connection during online rounds.", "Any form of malpractice or external assistance will result in disqualification.", "Decisions made by the judges are final."];
  }, [rulesArr]);

  const quizJudgingNotes = useMemo(() => {
    const fromRules = rulesArr.filter((r) => /^Judging:/i.test(r)).map(strip);
    return fromRules.length
      ? fromRules
      : [
          "Round 1 scores decide who moves to the semi-final.",
          "Semi-final winners advance to the grand finale.",
          "Judges’ decisions will be based on accuracy, speed, and teamwork.",
        ];
  }, [rulesArr]);

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

  function JudgingBlock({ items, accent = "var(--acc)" }: { items: { label: string; weight: number }[]; accent?: string }) {
    const total = items.reduce((s, x) => s + (x?.weight ?? 0), 0);
    return (
      <div className="rounded-2xl bg-black/60 ring-1 ring-white/10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl text-white">Judging</h3>
          <span className={`text-sm ${total === 100 ? "text-white/50" : "text-amber-300"}`} style={{ fontVariantNumeric: "tabular-nums" }}>
            Total: {total}%{total !== 100 ? " (should be 100%)" : ""}
          </span>
        </div>
        <ul className="space-y-3">
          {items.map((c, i) => (
            <li key={i} className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/[.04]">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-white/92">{c.label}</span>
                <span className="text-white/80" style={{ fontVariantNumeric: "tabular-nums" }}>{c.weight}%</span>
              </div>
              <div className="h-1.5 bg-white/10">
                <div className="h-full origin-left transition-[width] duration-500 ease-out" style={{ width: `${c.weight}%`, background: accent }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const motionProps = prefersReducedMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 10, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -6, scale: 0.995 }, transition: { duration: 0.18, ease: "easeOut" } };

  return (
    <section className="relative isolate" style={{ ["--acc" as any]: ACCENT }}>
      <div className="relative w-full h-[320px] md:h-[400px]">
        <Image src={t.heroBg || t.heroImg || "/stars-fallback.jpg"} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 pt-14">
            <div className="flex items-center gap-3">
              <Link
                href="/#categories"
                scroll
                className="group relative inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-m text-white ring-1 ring-white/20 hover:ring-[var(--acc)]/60 focus:outline-none active:scale-[.98] transition overflow-hidden isolate"
                aria-label="Back to Categories"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-px rounded-full z-0 [background:linear-gradient(115deg,transparent,rgba(255,255,255,.28),transparent)] opacity-0 group-hover:opacity-100 transition-opacity animate-[btnShine_3200ms_linear_infinite] motion-reduce:animate-none"
                />
                <ArrowLeft className="h-4 w-4 relative z-10 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
                <span className="relative z-10">Back</span>
                <span aria-hidden className="pointer-events-none absolute inset-px rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: "inset 0 0 0 999px rgba(255,255,255,0.04)" }} />
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
              <h2 className="mt-3 text-[40px] leading-[1.05] md:text-[58px] xl:text-[64px] text-red-50 tracking-tight">{t.title}</h2>
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
                  className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${active ? "text-white" : "text-white/75 hover:text-white"}`}
                >
                  {active && <span className="absolute inset-0 rounded-xl bg-[var(--acc)]/18 ring-1 ring-[var(--acc)]/40" />}
                  <Icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{x.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} {...motionProps} className="grid gap-6">
              {tab === "overview" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Overview</h2>
                  <p className="leading-relaxed text-white/92">{t.overview}</p>
                </Card>
              )}

              {!isQuiz && tab === "what" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">What to Build</h2>
                  <GlowList items={whatArr} />
                </Card>
              )}

              {!isQuiz && tab === "deliverables" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">{t.slug === "graphic-design" ? "What to Submit" : "Deliverables"}</h2>
                  <GlowList items={deliverablesArr} />
                </Card>
              )}

              {isQuiz && tab === "teamelig" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Team & Eligibility</h2>
                  <GlowList items={quizTeamAndEligibility} />
                </Card>
              )}

              {isQuiz && tab === "format" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Competition Format</h2>
                  <GlowList items={quizFormat} />
                </Card>
              )}

              {isQuiz && tab === "participation" && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Participation</h2>
                  <GlowList items={quizParticipation} />
                </Card>
              )}

              {tab === "rules" && (isQuiz ? (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Rules & Guidelines</h2>
                  <GlowList items={quizGuidelines} />
                </Card>
              ) : (
                <GuidelinesSection groups={groups} accent={ACCENT} />
              ))}

              {tab === "eligibility" && !isQuiz && Array.isArray(t.eligibility) && t.eligibility.length > 0 && (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Eligibility</h2>
                  <GlowList items={t.eligibility} />
                </Card>
              )}

              {tab === "judging" && (isQuiz ? (
                <Card>
                  <h2 className="text-2xl md:text-3xl text-red-50 mb-3">Judging & Selection</h2>
                  <GlowList items={quizJudgingNotes} />
                </Card>
              ) : (
                <JudgingBlock items={judgingArr} accent={ACCENT} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl bg-black/60 p-6 ring-1 ring-white/15 backdrop-blur-md ${className}`}>{children}</div>;
}
