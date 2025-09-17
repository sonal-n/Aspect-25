import { v } from "convex/values";
import { mutation } from "./_generated/server";

function normalizeEmail(s: string) {
  return s.trim().toLowerCase();
}
function normalizeWhatsapp(s: string) {
  const raw = s.replace(/[\s-]/g, "");
  if (raw.startsWith("+94")) return raw;
  if (raw.startsWith("0")) return "+94" + raw.slice(1);
  if (/^\d{9}$/.test(raw)) return "+94" + raw;
  return raw;
}
function refCode(len = 6) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++)
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

export const create = mutation({
  args: {
    categorySlug: v.string(),
    name: v.string(),
    indexNo: v.string(),
    grade: v.number(),
    classLetter: v.string(),
    email: v.string(),
    whatsapp: v.string(),
  },
  handler: async ({ db }, args) => {
    const comp = await db
      .query("competitions")
      .withIndex("by_slug", (q) => q.eq("slug", args.categorySlug))
      .unique();
    if (!comp) throw new Error("Competition not found");
    if (!comp.isOpen)
      throw new Error("Registrations are closed for this competition");

    const name = args.name.trim();
    const indexNo = args.indexNo.trim();
    const grade = Math.max(6, Math.min(13, args.grade | 0));
    const classLetter = args.classLetter.trim().toUpperCase();
    const email = normalizeEmail(args.email);
    const whatsapp = normalizeWhatsapp(args.whatsapp);

    const dupRoll = await db
      .query("registrations")
      .withIndex("by_dedupe_roll", (q) =>
        q
          .eq("competitionId", comp._id)
          .eq("grade", grade)
          .eq("classLetter", classLetter)
          .eq("indexNo", indexNo)
      )
      .unique();
    if (dupRoll) throw new Error("Already registered with this class index");

    const dupEmail = await db
      .query("registrations")
      .withIndex("by_email_competition", (q) =>
        q.eq("competitionId", comp._id).eq("email", email)
      )
      .unique();
    if (dupEmail) throw new Error("Email already used for this competition");

    if (comp.cap != null) {
      const count = (
        await db
          .query("registrations")
          .withIndex("by_competition_time", (q) =>
            q.eq("competitionId", comp._id)
          )
          .collect()
      ).length;
      if (count >= comp.cap) throw new Error("Registration cap reached");
    }

    let referenceCode = refCode();
    for (let i = 0; i < 5; i++) {
      const refDup = await db
        .query("registrations")
        .withIndex("by_reference_code", (q) =>
          q.eq("referenceCode", referenceCode)
        )
        .unique();
      if (!refDup) break;
      referenceCode = refCode();
    }

    const id = await db.insert("registrations", {
      competitionId: comp._id,
      competitionTitle: comp.title,
      name,
      indexNo,
      grade,
      classLetter,
      email,
      whatsapp,
      referenceCode,
      submittedAt: Date.now(),
    });

    return { id, referenceCode };
  },
});
