"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  UserRound,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type CategorySlug = "web" | "video" | "graphic" | "quiz" | "gaming";
const CATEGORY_LABEL: Record<CategorySlug, string> = {
  web: "Web Developing",
  video: "Video Editing",
  graphic: "Graphic Design",
  quiz: "Quiz",
  gaming: "Gaming",
};

function normalizeCategory(sp: URLSearchParams): CategorySlug | null {
  const raw = sp.get("cat") || sp.get("category") || sp.get("track") || "";
  const v = raw.toLowerCase();
  if (v === "web" || v === "video" || v === "graphic" || v === "quiz" || v === "gaming") {
    return v as CategorySlug; 
  }
  if (v === "web-development") return "web";
  if (v === "video-editing") return "video";
  if (v === "graphic-design") return "graphic";
  if (v === "quiz") return "quiz";
  if (v === "gaming" || v === "gaming") return "gaming";
  return null;
}


const SriLankaPhone = z
  .string()
  .min(9, "Too short")
  .max(15, "Too long")
  .transform((s) => s.replace(/[\s-]/g, ""))
  .refine((s) => /^(?:0|\+94)\d{9}$/.test(s), "Use 0XXXXXXXXX or +94XXXXXXXXX");

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your name with intials"),
  indexNo: z.string().min(1, "Enter your class index number"),
  grade: z.string().min(1, "Select grade"),
  classLetter: z.string().min(1, "Select class"),
  email: z.string().email("Enter a valid email"),
  whatsapp: SriLankaPhone,
});

type FormValues = z.infer<typeof FormSchema>;

const grades = Array.from({ length: 8 }, (_, i) => (i + 6).toString());
const classes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 140, damping: 16 },
  },
};

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-white/80"
    >
      {children}
    </label>
  );
}

function InputBase({
  leftIcon,
  children,
}: {
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.05] px-3 py-2 ring-offset-0 transition focus-within:bg-white/[.08] focus-within:ring-2 focus-within:ring-rose-400/50 hover:border-white/20">
      <div className="shrink-0 text-white/70 group-focus-within:text-white">
        {leftIcon}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Select(props: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const { id, value, onChange, options, placeholder } = props;
  return (
    <select
      id={id}
      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled hidden>
        {placeholder ?? "Select"}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#151314]">
          {o.label}
        </option>
      ))}
    </select>
  );
}

function TextInput(props: {
  id?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  const {
    id,
    type = "text",
    value,
    onChange,
    placeholder,
    autoComplete,
  } = props;
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
    />
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 opacity-90" />
      <span className="absolute inset-[2px] -z-10 rounded-xl bg-[#121012]" />
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {loading ? "Submitting…" : "Submit Registration"}
    </button>
  );
}

export default function RegisterForm({
  initialSlug,
  inModal = false,
  onThanksOpenChange,
}: {
  initialSlug?: CategorySlug;
  inModal?: boolean;
  onThanksOpenChange?: (open: boolean) => void;
}) {
  const sp = useSearchParams();
  const slug = initialSlug ?? normalizeCategory(sp) ?? "web";
  const catLabel = CATEGORY_LABEL[slug];

  const createRegistration = useMutation(api.registrations.create);

  const [submitted, setSubmitted] = useState<null | {
    id: string;
    name: string;
    cat: string;
    ref: string;
  }>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { grade: "", classLetter: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setFormError(null);
    try {
      const res = (await createRegistration({
        categorySlug: slug,
        name: data.name,
        indexNo: data.indexNo,
        grade: Number(data.grade),
        classLetter: data.classLetter,
        email: data.email,
        whatsapp: data.whatsapp,
      } as any)) as any;

      setSubmitted({
        id: String(res?.id ?? ""),
        name: data.name,
        cat: catLabel,
        ref: String(res?.referenceCode ?? "—"),
      });
      onThanksOpenChange?.(true);
      reset({ grade: "", classLetter: "" });
    } catch (e: any) {
      setFormError(e?.message || "Submission failed");
    }
  };

  const grade = watch("grade") || "";
  const classLetter = watch("classLetter") || "";
  const name = watch("name") || "";
  const indexNo = watch("indexNo") || "";
  const email = watch("email") || "";
  const whatsapp = watch("whatsapp") || "";

  const gradeClass = useMemo(
    () => (grade && classLetter ? `${grade}-${classLetter}` : ""),
    [grade, classLetter]
  );

  return (
    <section
      className={`relative isolate mx-auto max-w-3xl ${inModal ? "px-4 py-6" : "px-4 py-10"}`}
    >
      {!inModal && (
        <>
          <div className="pointer-events-none absolute inset-0 -z-20">
            <div className="absolute -inset-40 -z-20 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(244,63,94,0.25),transparent)]" />
            <div className="absolute -inset-32 -z-20 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(239,68,68,0.08),transparent_40%)]" />
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-2xl p-[1px] shadow-[0_24px_96px_-28px_rgba(0,0,0,0.55)]`}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/20 via-white/5 to-white/20 opacity-10" />

        <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] border border-white/10 bg-[#151314]/85 backdrop-blur">
          <div className="relative border-b border-white/10 px-6 py-5">
            <h2
              style={{ fontFamily: "var(--font-sakana)" }}
              className="text-center text-xl md:text-2xl font-bold tracking-tight text-white"
            >
              {catLabel} Registration
            </h2>
            <p className="mt-1 text-center text-xs md:text-sm text-white/60">
              Fill in your details below. We’ll confirm via email/WhatsApp.
            </p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {formError && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {formError}
              </div>
            )}

            <motion.div
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.05 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <motion.div variants={fieldVariants}>
                <Label htmlFor="name">Name</Label>
                <InputBase leftIcon={<UserRound className="h-4 w-4" />}>
                  <TextInput
                    id="name"
                    placeholder="Your name with initials"
                    value={name}
                    onChange={(v) =>
                      setValue("name", v, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    autoComplete="name"
                  />
                </InputBase>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fieldVariants}>
                <Label htmlFor="index">Index No.</Label>
                <InputBase>
                  <TextInput
                    id="index"
                    placeholder="e.g. 256738"
                    value={indexNo}
                    onChange={(v) =>
                      setValue("indexNo", v, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    autoComplete="off"
                  />
                </InputBase>
                {errors.indexNo && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.indexNo.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fieldVariants}>
                <Label htmlFor="grade">Grade</Label>
                <InputBase leftIcon={<GraduationCap className="h-4 w-4" />}>
                  <Select
                    id="grade"
                    value={grade}
                    onChange={(v) =>
                      setValue("grade", v, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    options={grades.map((g) => ({ value: g, label: g }))}
                    placeholder="Select grade"
                  />
                </InputBase>
                {errors.grade && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.grade.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fieldVariants}>
                <Label htmlFor="class">Class</Label>
                <InputBase leftIcon={<GraduationCap className="h-4 w-4" />}>
                  <Select
                    id="class"
                    value={classLetter}
                    onChange={(v) =>
                      setValue("classLetter", v, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    options={classes.map((c) => ({ value: c, label: c }))}
                    placeholder="Select class"
                  />
                </InputBase>
                {errors.classLetter && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.classLetter.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fieldVariants}>
                <Label htmlFor="email">Mail</Label>
                <InputBase leftIcon={<Mail className="h-4 w-4" />}>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(v) =>
                      setValue("email", v, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    autoComplete="email"
                  />
                </InputBase>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fieldVariants}>
                <Label htmlFor="wa">WhatsApp Number</Label>
                <InputBase leftIcon={<Phone className="h-4 w-4" />}>
                  <TextInput
                    id="wa"
                    type="tel"
                    placeholder="0XXXXXXXXX or +94XXXXXXXXX"
                    value={whatsapp}
                    onChange={(v) =>
                      setValue("whatsapp", v, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    autoComplete="tel"
                  />
                </InputBase>
                {errors.whatsapp && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.whatsapp.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fieldVariants} className="sm:col-span-2">
                <div className="mt-1 text-xs text-white/55">
                  <span className="font-medium text-white/70">
                    Grade/Class:
                  </span>{" "}
                  {gradeClass || "—"}
                </div>
              </motion.div>
            </motion.div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <SubmitButton loading={isSubmitting} />
              <div className="text-xs text-white/50">
                By submitting, you agree to the event rules.
              </div>
            </div>
          </form>
        </div>
      </motion.div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 14, opacity: 0, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="relative w-[92%] max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#141214] p-6 text-center shadow-2xl"
            >
              <div className="relative mx-auto mb-3 grid place-items-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Registration received
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Thank you,{" "}
                <span className="font-medium text-white">{submitted.name}</span>
                ! You’re registered for
                <span className="font-medium text-white"> {submitted.cat}</span>
                .
              </p>
              <p className="mt-2 text-xs text-white/50">
                Reference ID: {submitted.ref}
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    setSubmitted(null);
                    onThanksOpenChange?.(false); 
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
