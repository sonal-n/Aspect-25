import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Image from "next/image";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import CategoryCard from "./components/Categorycard";
import { Sparkles, Calendar, Download } from "lucide-react";

const categories = [
  { title: "Graphic Design", img: "/comp-covers/Graphic design web.png", details: "/tracks/graphic-design", register: "/register?track=graphic-design" },
  { title: "Web Development", img: "/comp-covers/programming web.png", details: "/tracks/web-development", register: "/register?track=web-development" },
  { title: "Video Editing", img: "/comp-covers/Video Editing web.png", details: "/tracks/video-editing", register: "/register?track=video-editing" },
  { title: "Gaming", img: "/comp-covers/gaming web.png", details: "/tracks/gaming", register: "/register?track=gaming" },
  { title: "Quiz", img: "/comp-covers/web quiz.png", details: "/tracks/quiz", register: "/register?track=quiz" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="home" className="relative isolate min-h-screen overflow-hidden">
        <Image
          src="/aspect-launch.jpg"
          alt="ASPECT launch"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover object-[50%_68%] brightness-[.72] contrast-[1.05]"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/65 via-black/50 to-[#160e0e]/75" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(1200px_600px_at_50%_20%,transparent_40%,rgba(0,0,0,0.75)_100%)]" />

        <div className="relative z-20 mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <Image src="/aspect-logo.svg" alt="ASPECT’25" width={240} height={64} className="h-16 w-auto" />
              <p className="mt-4 text-[15px] tracking-[.18em] uppercase text-white/80">The Intra-School ICT Competition</p>
              <p className="mt-1 text-[13px] text-white/60">Bandaranayake College Gampaha</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="rounded-full px-7 py-3 text-base font-semibold text-black bg-gradient-to-r from-[#FDB44B] via-[#FF8A3D] to-[#E65F4E] shadow-[0_10px_40px_rgba(230,95,78,0.45)] hover:shadow-[0_14px_60px_rgba(230,95,78,0.6)] hover:scale-[1.02] active:scale-[.99] transition">
                  Register Now
                </button>
                <a
                  href="#timeline"
                  className="rounded-full px-7 py-3 text-base font-semibold text-white/90 border border-white/20 bg-white/10 backdrop-blur hover:bg-white/[.15] transition"
                >
                  View Timeline
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-[1.5rem] bg-amber-500/18 blur-2xl" />
                <Image
                  src="/aspect-launch.jpg"
                  alt="Registration will open soon"
                  width={560}
                  height={560}
                  className="rounded-2xl ring-1 ring-white/15 shadow-[0_18px_80px_rgba(0,0,0,.55)]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-amber-400/45" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="about" className="scroll-mt-24 relative isolate">
        <div className="relative z-10 container mx-auto max-w-6xl px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10 text-red-50/80">
            <Sparkles className="w-4 h-4" />
            About ASPECT’25
          </div>
          <h2 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight text-red-100">Launch ideas into orbit</h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-red-50/80">
            ASPECT’25 is the Bandaranayake College Computer Society’s intra-school ICT competition. Open to Grades 06–13, it features five
            tracks—Graphic Design, Programming, Video Editing, Quiz, and Gaming—where ideas launch into real projects. Each track has its
            own rules, submissions, and judging; the site guides you from registration to finals.
          </p>
          <a href="#faq" className="mt-8 inline-flex items-center rounded-full border border-sky-50 px-6 py-3 text-red-50 hover:text-red-200 hover:bg-neutral-800 transition">
            <Download className="w-5 h-5 mr-2" />
            What is ASPECT’25?
          </a>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 relative isolate">
        <div className="relative z-10 container mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-red-100">Choose a category</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.title} title={c.title} img={c.img} detailsHref={c.details} registerHref={c.register} />
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="scroll-mt-24 relative isolate">
        <div className="relative z-10 container mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/10 text-red-50/80">
            <Calendar className="w-4 h-4" />
            Competition Timeline
          </div>
          <div className="mt-10">
            <Timeline />
          </div>
        </div>
      </section>

      <Contact />

      <FAQ />

      <Footer />
    </>
  );
}