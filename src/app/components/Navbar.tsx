"use client";

import Image from "next/image";

const items = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "categories", label: "Categories" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
   <nav aria-label="Primary" className="sticky top-0 z-50 w-full bg-[#160e0e]/90 backdrop-blur">
  <div className="relative flex w-full items-center justify-between h-20 px-3 sm:px-4 md:px-6 lg:px-8">
    <button
      onClick={() => scrollTo("home")}
      className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
      aria-label="Go to home"
    >
      <Image
        src="/aspect-logo.svg"
        alt="Aspect '25 Logo"
        width={120}
        height={32}
        priority
        className="block h-7 md:h-8 w-auto opacity-90"  
      />
    </button>

    <ul className="flex items-center gap-6 md:gap-8 text-base md:text-lg font-medium text-red-50 leading-none">
      {items.map(({ id, label }) => (
        <li key={id}>
          <button
            onClick={() => scrollTo(id)}
            className="hover:text-red-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          >
            {label}
          </button>
        </li>
      ))}
    </ul>

    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
  </div>
</nav>
  );
}
