"use client";

import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Image from "next/image";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import CategoryCard from "./components/Categorycard";
import { tracks } from "./data/tracks";
import { Sparkles, Calendar, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Rules from "./components/Rules";
import RegisterModal from "./components/RegisterModal";

const ACCENTS: Record<string, string> = {
  "web-development": "#49b816",
  "video-editing": "#A12C2C",
  quiz: "#2F68FF",
  gaming: "#F59E0B",
  "graphic-design": "#FDB44B",
};

type CatSlug = "web" | "video" | "graphic" | "quiz" | "gaming";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [regOpen, setRegOpen] = useState(false);
  const [regCat, setRegCat] = useState<CatSlug | undefined>();

  function toCat(slug: string): CatSlug {
    switch (slug) {
      case "web-development":
        return "web";
      case "video-editing":
        return "video";
      case "graphic-design":
        return "graphic";
      case "quiz":
        return "quiz";
      case "gaming":
        return "gaming";
      default:
        return "web";
    }
  }

  const openRegister = (trackSlug: string) => {
    setRegCat(toCat(trackSlug));
    setRegOpen(true);
  };

 useEffect(() => {
  const t = setTimeout(() => setLoading(false), 5500); 
  return () => clearTimeout(t);
}, []);

  useEffect(() => {
    if (
      !loading &&
      typeof window !== "undefined" &&
      window.location.hash === "#categories"
    ) {
      document
        .getElementById("categories")
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [loading]);

  const REVEAL_AT = "2025-09-19T18:00:00+05:30";

  return (
    <>
      {loading && <Loader setLoading={setLoading} />}
      {!loading && (
        <>
          <main
            id="home"
            className="relative isolate h-[calc(100dvh-var(--nav-h))] overflow-hidden bg-[#160e0e]"
          >
            <Image
              src="/aspect-launch.jpg"
              alt="ASPECT launch"
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_68%] brightness-[.72] contrast-[1.05] pointer-events-none select-none"
              onLoadingComplete={() => setLoading(false)}
               onError={() => setLoading(false)}
            />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/50 to-[#160e0e]/75" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_20%,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            <div className="relative z-20 mx-auto max-w-7xl px-6 h-full">
              <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left flex flex-col items-center md:items-start max-w-xl">
                  <Image
                    src="/aspect-logo.svg"
                    alt="ASPECT’25"
                    width={240}
                    height={64}
                    className="h-16 w-auto mx-auto md:mx-0"
                  />
                  <p className="mt-4 text-[15px] tracking-[.18em] uppercase text-white/85">
                    The Intra-School ICT Competition
                  </p>
                  <p className="mt-1 text-[13px] text-white/70">
                    Bandaranayake College Gampaha
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <a
                      href="#categories"
                      className="rounded-full px-7 py-3 text-base font-semibold text-black bg-gradient-to-r from-[#FDB44B] via-[#FF8A3D] to-[#E65F4E] shadow-[0_10px_40px_rgba(230,95,78,0.45)] hover:shadow-[0_14px_60px_rgba(230,95,78,0.6)] hover:scale-[1.02] active:scale-[.99] transition"
                    >
                      Register Now
                    </a>
                    <a
                      href="#timeline"
                      className="rounded-full px-7 py-3 text-base font-semibold text-white/90 border border-white/20 bg-white/10 backdrop-blur hover:bg-white/[.15] transition"
                    >
                      View Timeline
                    </a>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end">
                  <div className="relative w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] aspect-[3/4]">
                    <div className="absolute -inset-6 -z-10 rounded-[1.5rem] bg-amber-500/18 blur-2xl" />
                    <Image
                      src="/aspect-launch.jpg"
                      alt="Launch poster"
                      fill
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, (min-width: 640px) 300px, 240px"
                      className="rounded-2xl ring-1 ring-white/15 shadow-[0_18px_80px_rgba(0,0,0,.55)] object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-amber-400/45" />
                  </div>
                </div>
              </div>
            </div>
          </main>

          <section
            id="about"
            className="scroll-mt-24 relative isolate bg-[#160e0e] overflow-hidden"
          >
            <div className="relative z-10 container mx-auto max-w-6xl px-6 py-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10 text-red-50/80">
                <Sparkles className="w-4 h-4" /> About ASPECT’25
              </div>
              <h2 className="font-heading mt-6 text-5xl md:text-6xl font-l tracking-tight text-red-100">
                Launch ideas into orbit
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-red-50/80">
                ASPECT’25, presented by the dedicated minds of the Computer
                Society of Bandaranayake College Gampaha, is a platform for
                students to engage with cutting-edge concepts, develop critical
                skills, and connect with peers who share a passion for the
                digital realm.
              </p>
            </div>
          </section>

          <section
            id="categories"
            className="scroll-mt-24 relative isolate bg-[#160e0e]"
          >
            <div className="relative z-10 container mx-auto max-w-6xl px-6 py-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10 text-red-50/80">
                <LayoutGrid className="w-4 h-4" /> Pick Your Path
              </div>
              <h2 className="mt-6 text-center text-5xl md:text-6xl font-l tracking-tight text-red-100">
                Choose a category
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {tracks.map((t) => {
                  const isMystery = t.slug === "gaming";
                  const accent =
                    ACCENTS[t.slug] ?? (t as any).color ?? "#E65F4E";
                  const img =
                    (t as any).heroImg ??
                    (t as any).img ??
                    "/covers/placeholder.jpg";
                  return (
                    <CategoryCard
                      key={t.slug}
                      slug={t.slug}
                      title={t.title}
                      img={img}
                      detailsHref={`/categories/${t.slug}`}
                      accent={accent}
                      mystery={isMystery}
                      revealAt={isMystery ? REVEAL_AT : undefined}
                      onRegister={t.slug === "quiz" ? undefined : openRegister}
                    />
                  );
                })}
              </div>
            </div>

            <RegisterModal
              open={regOpen}
              onClose={() => setRegOpen(false)}
              cat={regCat}
            />
          </section>

          <section
            id="timeline"
            className="scroll-mt-24 relative isolate bg-[#1b1414]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-10 h-12 [background:linear-gradient(to_bottom,#160e0e_0%,#1b1414_70%,#1b1414_100%)]"
            />
            <div className="relative z-10 container mx-auto max-w-6xl px-6 pt-20 pb-2 text-center">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10 text-red-50/80">
                <Calendar className="w-4 h-4" /> Competition Timeline
              </div>
              <div>
                <Timeline />
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-10 h-12 [background:linear-gradient(to_top,#160e0e_0%,#1b1414_70%,#1b1414_100%)]"
            />
          </section>

          <section className="bg-[#160e0e]">
            <Rules />
            <Contact />
            <FAQ />
            <Footer />
          </section>
        </>
      )}
    </>
  );
}
