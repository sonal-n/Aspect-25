"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "categories", label: "Categories" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const click = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname !== "/") return;
    const el = document.getElementById(id === "home" ? "home" : id);
    if (id === "home" && !el) {
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    if (el) {
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <nav
      aria-label="Primary"
      className={[
        "fixed inset-x-0 top-0 z-[100] transition-shadow align-middle py-3",
        scrolled ? "shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)] border-b border-white/10" : "border-b border-transparent"
      ].join(" ")}
    >
      <div className="absolute inset-0 -z-10 bg-[#160e0e]/80 supports-[backdrop-filter]:bg-[#160e0e]/60 backdrop-blur-md backdrop-saturate-150" />
      <div className="relative mx-auto flex h-[var(--nav-h)] w-full max-w-none items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/#home" aria-label="Go to home" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300">
          <Image src="/aspect-logo.svg" alt="Aspect ’25" width={120} height={32} priority className="block h-7 md:h-8 w-auto opacity-90" />
        </Link>

        <ul className="hidden md:flex items-center gap-6 md:gap-8 text-base md:text-lg font-medium text-red-50 leading-none">
          {items.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={id === "home" ? "/" : `/#${id}`}
                onClick={(e) => click(e, id)}
                className="hover:text-red-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-red-50/90 hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
        >
          <Menu className={`absolute h-6 w-6 transition-all duration-300 ${open ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />
          <X className={`absolute h-6 w-6 transition-all duration-300 ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`} />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      <div
        className={[
          "md:hidden overflow-hidden border-t border-white/10 bg-[#160e0e]/90 supports-[backdrop-filter]:bg-[#160e0e]/70 backdrop-blur-md",
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        ].join(" ")}
      >
        <ul className="overflow-hidden px-4 py-3 text-base font-medium text-red-50">
          {items.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={id === "home" ? "/" : `/#${id}`}
                onClick={(e) => click(e, id)}
                className="block rounded-lg px-3 py-2 hover:bg-white/10 hover:text-red-200 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
