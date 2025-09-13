"use client";
import { useMemo, useState } from "react";
import type { Track } from "../../data/tracks";
import Image from "next/image";

type ClientTrack = Pick<
  Track,
  | "slug" | "title" | "short" | "heroImg" | "heroBg" | "color" | "icon"
  | "overview" | "whatToBuild" | "deliverables" | "rules"
  | "judging" | "eligibility" | "rulesDoc" | "resources" | "faq"
> & { rounds?: { title: string; bullets: string[] }[] };

export default function TrackClient({ track }: { track: ClientTrack }) {
  const t = track;
  const tabs = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "what", label: "What to Build" },
      { key: "deliverables", label: "Deliverables" },
      { key: "rules", label: "Rules & Regulations" },
      { key: "judging", label: "Judging" },
      ...(t.eligibility?.length ? [{ key: "eligibility", label: "Eligibility" }] : []),
      ...(t.faq?.length ? [{ key: "faq", label: "FAQ" }] : []),
    ],
    [t.eligibility?.length, t.faq?.length]
  );
  const [tab, setTab] = useState<string>(tabs[0]?.key ?? "overview");

  return (
    <section className="relative">
      {!!t.heroBg && (
        <div className="absolute inset-0 -z-10">
          <Image src={t.heroBg} alt="" fill className="object-cover opacity-10" />
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-white/70">{t.short}</p>

        <div className="mt-8 flex gap-2 overflow-x-auto">
          {tabs.map((x) => (
            <button
              key={x.key}
              onClick={() => setTab(x.key)}
              className={`rounded-full px-4 py-2 text-sm ring-1 ring-white/10 ${tab === x.key ? "bg-white/10" : "bg-white/5"}`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {tab === "overview" ? <p className="text-white/80">{t.overview}</p> : null}

          {tab === "what" ? (
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              {t.whatToBuild.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          ) : null}

          {tab === "deliverables" ? (
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              {t.deliverables.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          ) : null}

          {tab === "rules" ? (
            <div className="space-y-4">
              <ul className="list-decimal pl-6 space-y-2 text-white/80">
                {t.rules.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              {t.rulesDoc ? (
                <a href={t.rulesDoc} target="_blank" className="inline-block rounded-md bg-white/10 px-4 py-2 ring-1 ring-white/15">
                  Download full rules (PDF)
                </a>
              ) : null}
            </div>
          ) : null}

          {tab === "judging" ? (
            <div className="space-y-3">
              {t.judging.map((c, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div className="text-white/85">{c.label}</div>
                  <div className="text-white/60">{c.weight}%</div>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "eligibility" && t.eligibility?.length ? (
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              {t.eligibility.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          ) : null}

          {tab === "faq" && t.faq?.length ? (
            <div className="space-y-6">
              {t.faq.map((f, i) => (
                <div key={i}>
                  <div className="font-medium">{f.q}</div>
                  <div className="text-white/80">{f.a}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
