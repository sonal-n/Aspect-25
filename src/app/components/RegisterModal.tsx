"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import RegistrationForm from "./RegistrationForm";

type CategorySlug = "web" | "video" | "graphic" | "quiz" | "gaming";

type Props = {
  open: boolean;
  onClose: () => void;
  cat?: CategorySlug;
};

export default function RegisterModal({ open, onClose, cat }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
   const [hideClose, setHideClose] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />

          <motion.div
            key="dialog"
            className="fixed inset-0 z-[71] grid place-items-center p-4"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            aria-modal
            role="dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-3xl">
                {!hideClose && (
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close"
                className="absolute right-8 top-10 z-10 cursor-pointer rounded-full border border-white/10 bg-white/10 p-2 text-white/90 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <X className="h-5 w-5" />
              </button>
                )}

              <div className="rounded-2xl ring-1 ring-white/12 bg-transparent shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
                <RegistrationForm initialSlug={cat} inModal onThanksOpenChange={setHideClose}/>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
