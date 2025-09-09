"use client";
import { useState, useRef } from "react";

type QA = { q: string; a: string };

const faqs: QA[] = [
  { q: "Question title #1", a: "Short placeholder answer text…" },
  { q: "Question title #2", a: "Short placeholder answer text…" },
  { q: "Question title #3", a: "Short placeholder answer text…" },
  { q: "Question title #4", a: "Short placeholder answer text…" },
  { q: "Question title #5", a: "Short placeholder answer text…" },
  { q: "Question title #6", a: "Short placeholder answer text…" },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-24 particles">
      <div className="container mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-red-50/80">FAQ</div>
        <h2 className="mt-6 text-center text-5xl md:text-6xl font-extrabold tracking-tight text-red-100">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-red-50/70">Everything you need to know about ASPECT’25.</p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
          <ul className="divide-y divide-white/10">
            {faqs.map((item, i) => (
              <AccordionRow
                key={i}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
                q={item.q}
                a={item.a}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AccordionRow({
  index,
  open,
  onToggle,
  q,
  a,
}: {
  index: number;
  open: boolean;
  onToggle: () => void;
  q: string;
  a: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const maxH = open ? `${ref.current?.scrollHeight ?? 0}px` : "0px";

  return (
    <li>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-red-50/90 select-none focus:outline-none"
      >
        <span className="font-medium">{q}</span>
        <svg
          className={`h-5 w-5 shrink-0 opacity-80 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        style={{ maxHeight: maxH }}
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
      >
        <div
          ref={ref}
          className={`px-6 pb-6 pt-0 text-red-50/70 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        >
          {a}
        </div>
      </div>
    </li>
  );
}