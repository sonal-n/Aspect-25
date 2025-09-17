"use client";

import {
  UserRound,
  Lightbulb,
  Wrench,
  ShieldAlert,
  Scale,
  Hammer,
  CheckCircle2,
} from "lucide-react";

type Group = {
  key: string;
  title: string;
  icon?: "astronaut" | "lightbulb" | "wrench" | "shield" | "scale" | "tool";
  bullets: string[];
  /** If true, span both columns on md+ screens */
  wide?: boolean;
};

export default function GuidelinesSection({
  groups,
  accent = "#E65F4E",
}: {
  groups: Group[];
  accent?: string;
}) {
  const IconFor = (name?: Group["icon"]) => {
    switch (name) {
      case "astronaut":
        return UserRound;
      case "lightbulb":
        return Lightbulb;
      case "wrench":
        return Wrench;
      case "shield":
        return ShieldAlert;
      case "scale":
        return Scale;
      case "tool":
        return Hammer;
      default:
        return UserRound;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((g) => {
        const Icon = IconFor(g.icon);
        return (
          <div
            key={g.key}
            className={`rounded-2xl bg-black/60 ring-1 ring-white/12 p-6 ${
              g.wide ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center gap-2 text-red-100">
              <Icon className="w-5 h-5" />
              <h3 className="text-xl font-semibold">{g.title}</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {g.bullets.map((b, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-3 rounded-lg px-3 py-2 border border-transparent origin-left transition hover:border-white/10 hover:bg-white/[.05] hover:scale-[1.02]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: accent }}
                  />
                  <span className="text-red-50/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
