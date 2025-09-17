"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Info, Lock, Clock } from "lucide-react"; // ⬅️ add Clock
import * as React from "react";

type Props = {
  slug: "graphic-design" | "web-development" | "video-editing" | "gaming" | "quiz";
  title?: string;
  img: string;
  detailsHref?: string;
  registerHref?: string;
  accent?: string;
  mystery?: boolean;
  revealAt?: string;
  onRegister?: (slug: Props["slug"]) => void;
};

export default function CategoryCard({
  slug,
  onRegister,
  title = "Category cover",
  img,
  detailsHref,
  registerHref = "/register",
  accent = "#E65F4E",
  mystery = false,
  revealAt,
}: Props) {
  const [broken, setBroken] = React.useState(false);

  const locked = React.useMemo(() => {
    if (!mystery) return false;
    if (!revealAt) return true;
    const d = new Date(revealAt);
    return isNaN(d.getTime()) ? true : Date.now() < d.getTime();
  }, [mystery, revealAt]);

  const isQuiz = slug === "quiz";
  const showDetails = Boolean(detailsHref) && !locked;
  const showImage = !locked && !broken;

  return (
    <article className="group relative aspect-square overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/20 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.65)] transform-gpu transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_90px_-24px_rgba(0,0,0,0.7)] [&_a]:no-underline">
      {showImage ? (
        <Image
          src={img}
          alt={title}
          fill
          onError={() => setBroken(true)}
          className="object-cover transform-gpu transition duration-500 origin-center group-hover:scale-[1.05]"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(120% 80% at 50% 20%, ${accent}55, transparent 60%),
              linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.9))
            `,
          }}
        />
      )}

      {locked && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-5xl font-black tracking-widest text-white/90">???</div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
        {isQuiz ? (
          <button
            type="button"
            disabled
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white opacity-60 cursor-not-allowed shadow-[0_6px_24px_-10px_rgba(0,0,0,0.6)]"
            style={{ backgroundColor: accent }}
          >
            <Clock className="h-4 w-4" />
            Coming soon
          </button>
        ) : onRegister ? (
          <button
            type="button"
            onClick={locked ? undefined : () => onRegister(slug)}
            disabled={locked}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.6)] active:translate-y-[1px] ${locked ? "pointer-events-none opacity-60" : ""}`}
            style={{ backgroundColor: accent }}
          >
            {locked ? <Lock className="h-4 w-4" /> : <BadgeCheck className="h-4 w-4" />}
            {locked ? "Coming soon" : "Register"}
          </button>
        ) : (
          <Link
            href={locked ? "#" : registerHref}
            aria-disabled={locked}
            tabIndex={locked ? -1 : 0}
            className={`no-underline flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.6)] active:translate-y-[1px] ${locked ? "pointer-events-none opacity-60" : ""}`}
            style={{ backgroundColor: accent }}
          >
            {locked ? <Lock className="h-4 w-4" /> : <BadgeCheck className="h-4 w-4" />}
            {locked ? "Coming soon" : "Register"}
          </Link>
        )}

        {showDetails && (
          <Link
            href={detailsHref!}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium bg-transparent hover:bg-white/5 border transition"
            style={{ borderColor: accent, color: accent }}
          >
            <Info className="h-4 w-4" />
            Details
          </Link>
        )}
      </div>
    </article>
  );
}
