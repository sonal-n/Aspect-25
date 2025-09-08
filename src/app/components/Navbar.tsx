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
    <nav
      aria-label="Primary"
      className="
        sticky top-0 z-50 w-full
        bg-[#160e0e]/90 backdrop-blur
        border-b border-white/10
        shadow-[0_10px_30px_-15px_rgba(0,0,0,0.85)]
      "
    >
      <div className="flex w-full items-center justify-between py-4 px-3 sm:px-4 md:px-6 lg:px-8">
        <button
          onClick={() => scrollTo("home")}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          aria-label="Go to home"
        >
          <Image
            src="/aspect-logo.svg"
            alt="Aspect '25 Logo"
            width={130}
            height={40}
            priority
            className="h-10 w-auto cursor-pointer"
          />
        </button>

        <ul className="flex items-center gap-8 text-lg font-medium text-red-50">
          {items.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="
                  hover:text-red-300 transition-colors
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300
                "
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
