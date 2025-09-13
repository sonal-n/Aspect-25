// app/components/Categorycard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Info } from "lucide-react";
import * as React from "react";

type Props = {
  title?: string;
  img: string;
  detailsHref: string;
  registerHref?: string;
  accent?: string;
};

export default function CategoryCard({
  title = "Category cover",
  img,
  detailsHref,
  registerHref = "/register",
  accent = "#E65F4E",
}: Props) {
  const [broken, setBroken] = React.useState(false);

  return (
    <article
      className="
        group relative aspect-square overflow-hidden rounded-3xl
        ring-1 ring-white/10 bg-black/20
        shadow-[0_18px_60px_-20px_rgba(0,0,0,0.65)]
        transform-gpu will-change-transform
        transition-transform duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_26px_90px_-24px_rgba(0,0,0,0.7)]
      "
    >
      {/* Cover (scales on hover). Hidden if broken -> we show fallback */}
      {!broken && (
        <Image
          src={img}
          alt={title}
          fill
          priority={false}
          onError={() => setBroken(true)}
          className="
            object-cover
            transform-gpu will-change-transform
            transition-transform duration-500 ease-out
            origin-center group-hover:scale-[1.05]
          "
        />
      )}

      {/* Fallback if image 404s/missing */}
      {broken && (
        <div
          className="absolute inset-0"
          style={{
            background:
              `linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.6)),
               radial-gradient(120% 80% at 50% 20%, ${accent}33, transparent 60%),
               ${accent}`,
          }}
        />
      )}

      {/* Bottom vignette for readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

      {/* Buttons */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
        <Link
          href={registerHref}
          className="
            flex-1 inline-flex items-center justify-center gap-2
            rounded-full px-4 py-2.5 text-sm font-semibold text-white
            shadow-[0_6px_24px_-10px_rgba(0,0,0,0.6)]
            transition active:translate-y-[1px]
          "
          style={{ backgroundColor: accent }}
        >
          <BadgeCheck className="h-4 w-4" />
          Register
        </Link>

        <Link
          href={detailsHref}
          className="
            flex-1 inline-flex items-center justify-center gap-2
            rounded-full px-4 py-2.5 text-sm font-medium
            bg-transparent transition active:translate-y-[1px] hover:bg-white/5 border
          "
          style={{ borderColor: accent, color: accent }}
        >
          <Info className="h-4 w-4" />
          Details
        </Link>
      </div>
    </article>
  );
}
