"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type LoaderProps = {
  setLoading: (value: boolean) => void;
};

const letters = [
  "/aspect-sakana-font/A.svg",
  "/aspect-sakana-font/S.svg",
  "/aspect-sakana-font/P.svg",
  "/aspect-sakana-font/E.svg",
  "/aspect-sakana-font/C.svg",
  "/aspect-sakana-font/T.svg",
  "/aspect-sakana-font/2.svg",
  "/aspect-sakana-font/5.svg",
];

export default function Loader({ setLoading }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLParagraphElement | null>(null);
  const lettersRef = useRef<(HTMLImageElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      
      tl.to(loaderRef.current,{ opacity: 1, duration: 0.5 });

      
      tl.fromTo(counterRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

     
      tl.to(
        {},
        {
          duration: 2,
          onUpdate: function () {
            const newProgress = Math.round(this.progress() * 100);
            setProgress(newProgress);
          },
        }
      );

      tl.to(counterRef.current, { opacity: 0, duration: 0.5 });

      
      tl.fromTo(
        lettersRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        }
      );

     
      tl.to(loaderRef.current, { opacity: 0, duration: 0.8, delay: 0.5 });
    }, loaderRef);

    return () => ctx.revert();
  }, [setLoading]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white opacity-0"
    >
    
      <p
        ref={counterRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xl font-mono"
      >
        {progress}%
      </p>

     
      <div className="flex flex-wrap justify-center items-center -space-x-1 md:-space-x-5">
        {letters.map((src, i) => (
          <img
            key={i}
            ref={(el) => {(lettersRef.current[i] = el)}}
            src={src}
            alt={`letter-${i}`}
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        ))}
      </div>
    </div>
  );
}
