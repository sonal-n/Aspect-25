"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  img: string;
  detailsHref: string;
  registerHref?: string;
};

export default function CategoryCard({
  title,
  img,
  detailsHref,
  registerHref = "/register",
}: Props) {
  return (
    <article className="group relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-black/10 shadow-[0_18px_60px_-12px_rgba(0,0,0,0.55)] transition md:hover:-translate-y-1 md:hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <Image
        src={img}
        alt=""
        width={700}
        height={900}
        className="w-full h-auto object-cover transition-transform duration-700 md:group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-black/45 backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative flex w-full max-w-xs flex-col items-center gap-4 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
          <h3 className="text-white text-xl font-semibold tracking-wide text-center drop-shadow-sm">{title}</h3>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <Link
            href={registerHref}
            className="w-full inline-flex items-center justify-center rounded-full h-10 text-sm font-semibold text-black bg-gradient-to-r from-[#FDB44B] via-[#FF8A3D] to-[#E65F4E] shadow-[0_12px_30px_rgba(230,95,78,0.35)] hover:shadow-[0_16px_40px_rgba(230,95,78,0.55)] hover:scale-[1.02] active:scale-95 transition"
          >
            Register
          </Link>
          <Link
            href={detailsHref}
            className="w-full inline-flex items-center justify-center rounded-full h-10 text-sm font-medium text-white/90 border border-white/20 bg-white/10 backdrop-blur hover:bg-white/15 hover:text-white transition"
          >
            View details
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 md:group-hover:ring-white/20" />
    </article>
  );
}
