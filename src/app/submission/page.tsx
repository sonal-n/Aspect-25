"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useState } from "react";

type CategorySlug = "web" | "video" | "graphic";
const LABEL: Record<CategorySlug, string> = {
  web: "Web Developing",
  video: "Video Editing",
  graphic: "Graphic Design",
};

function normalizeCategory(sp: URLSearchParams): CategorySlug | null {
  const raw = sp.get("category") || sp.get("track") || "";
  const v = raw.toLowerCase();
  if (v === "web" || v === "video" || v === "graphic") return v as CategorySlug;
  if (v === "web-development") return "web";
  if (v === "video-editing") return "video";
  if (v === "graphic-design") return "graphic";
  return null;
}

const Drive = z
  .string()
  .url("Enter a valid URL")
  .refine(
    (v) => /^https?:\/\/(drive\.google\.com|docs\.google\.com)\//i.test(v),
    "Paste a Google Drive link"
  );
const FormSchema = z.object({
  indexNo: z.string().min(1, "Enter your class index number"),
  text: z.string().min(5, "Add a short description"),
  driveUrl: Drive,
  grade: z.string().optional(),
  classLetter: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;
const classes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const grades = Array.from({ length: 8 }, (_, i) => (i + 6).toString());

export default function SubmitPage() {
  const sp = useSearchParams();
  const slug = (normalizeCategory(sp) || "web") as CategorySlug;
  const title = LABEL[slug];
  const create = useMutation(api.submissions.create);

  const [serverError, setServerError] = useState<string | null>(null);
  const [needDisambiguation, setNeedDisambiguation] = useState(false);
  const [success, setSuccess] = useState<{ ref?: string } | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const indexNo = watch("indexNo") || "";
  const text = watch("text") || "";
  const driveUrl = watch("driveUrl") || "";
  const grade = watch("grade") || "";
  const classLetter = watch("classLetter") || "";

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setNeedDisambiguation(false);
    try {
      await create({
        categorySlug: slug,
        indexNo: data.indexNo,
        text: data.text,
        driveUrl: data.driveUrl,
        grade: data.grade ? Number(data.grade) : undefined,
        classLetter: data.classLetter || undefined,
      });
      setSuccess({});
      reset();
    } catch (e: any) {
      const msg = String(e?.message || "");
      if (msg === "REG_AMBIGUOUS") {
        setNeedDisambiguation(true);
        setServerError(
          "Multiple students share this index. Select grade and class."
        );
      } else if (msg === "REG_NOT_FOUND") {
        setServerError("Registration not found for this index.");
      } else if (msg === "INVALID_DRIVE_URL") {
        setServerError("Please paste a valid Google Drive link.");
      } else if (msg === "COMP_NOT_FOUND") {
        setServerError("Competition not found.");
      } else {
        setServerError("Submission failed. Try again.");
      }
    }
  };

  const field = (
    id: string,
    label: string,
    node: React.ReactNode,
    error?: string
  ) => (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white/80"
      >
        {label}
      </label>
      {node}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-white">
      <div className="mb-6 text-center">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-sakana)" }}
        >
          {title} Submission
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Enter your Index No., description, and a Google Drive link.
        </p>
      </div>

      {serverError && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {serverError}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Submission received.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        {field(
          "index",
          "Index No.",
          <input
            id="index"
            value={indexNo}
            onChange={(e) =>
              setValue("indexNo", e.target.value, { shouldValidate: true })
            }
            placeholder="e.g. 12345"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/20 focus:bg-white/10"
          />,
          errors.indexNo?.message
        )}

        {needDisambiguation && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {field(
              "grade",
              "Grade",
              <select
                id="grade"
                value={grade}
                onChange={(e) =>
                  setValue("grade", e.target.value, { shouldValidate: true })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/20"
              >
                <option value="" hidden>
                  Select grade
                </option>
                {grades.map((g) => (
                  <option key={g} value={g} className="bg-black">
                    {g}
                  </option>
                ))}
              </select>,
              errors.grade?.message
            )}
            {field(
              "class",
              "Class",
              <select
                id="class"
                value={classLetter}
                onChange={(e) =>
                  setValue("classLetter", e.target.value, {
                    shouldValidate: true,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/20"
              >
                <option value="" hidden>
                  Select class
                </option>
                {classes.map((c) => (
                  <option key={c} value={c} className="bg-black">
                    {c}
                  </option>
                ))}
              </select>,
              errors.classLetter?.message
            )}
          </div>
        )}

        {field(
          "text",
          "Submission Notes",
          <textarea
            id="text"
            value={text}
            onChange={(e) =>
              setValue("text", e.target.value, { shouldValidate: true })
            }
            placeholder="What did you submit?"
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/20 focus:bg-white/10"
          />,
          errors.text?.message
        )}

        {field(
          "drive",
          "Google Drive Link",
          <input
            id="drive"
            value={driveUrl}
            onChange={(e) =>
              setValue("driveUrl", e.target.value, { shouldValidate: true })
            }
            placeholder="https://drive.google.com/..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/20 focus:bg-white/10"
          />,
          errors.driveUrl?.message
        )}

        <div className="text-xs text-white/60">
          Set sharing to “Anyone with the link – Viewer”.
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold text-white disabled:opacity-60"
        >
          <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 opacity-90" />
          <span className="absolute inset-[2px] -z-10 rounded-2xl bg-[#121012]" />
          <span>Submit</span>
        </button>
      </form>
    </section>
  );
}
