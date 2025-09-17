import { v } from "convex/values";
import { mutation } from "./_generated/server";

function isDriveUrl(u: string) {
  return /^https?:\/\/(drive\.google\.com|docs\.google\.com)\/.+/i.test(
    u.trim()
  );
}
function normUrl(u: string) {
  return u.trim();
}

export const create = mutation({
  args: {
    categorySlug: v.string(),
    indexNo: v.string(),
    text: v.string(),
    driveUrl: v.string(),
    grade: v.optional(v.number()),
    classLetter: v.optional(v.string()),
  },
  handler: async ({ db }, args) => {
    const comp = await db
      .query("competitions")
      .withIndex("by_slug", (q) => q.eq("slug", args.categorySlug))
      .unique();
    if (!comp) throw new Error("COMP_NOT_FOUND");
    if (!isDriveUrl(args.driveUrl)) throw new Error("INVALID_DRIVE_URL");

    const driveUrl = normUrl(args.driveUrl);
    const indexNo = args.indexNo.trim();

    const byIndex = await db
      .query("registrations")
      .withIndex("by_competition_index", (q) =>
        q.eq("competitionId", comp._id).eq("indexNo", indexNo)
      )
      .collect();

    if (byIndex.length === 0) throw new Error("REG_NOT_FOUND");
    let target = byIndex[0];

    if (byIndex.length > 1) {
      if (args.grade == null || !args.classLetter)
        throw new Error("REG_AMBIGUOUS");
      const g = Math.max(6, Math.min(13, args.grade!));
      const cls = args.classLetter.trim().toUpperCase();
      const exact = await db
        .query("registrations")
        .withIndex("by_dedupe_roll", (q) =>
          q
            .eq("competitionId", comp._id)
            .eq("grade", g)
            .eq("classLetter", cls)
            .eq("indexNo", indexNo)
        )
        .unique();
      if (!exact) throw new Error("REG_NOT_FOUND");
      target = exact;
    }

    const current = await db
      .query("submissions")
      .withIndex("by_registration_current", (q) =>
        q.eq("registrationId", target._id).eq("isCurrent", true)
      )
      .unique();
    if (current)
      await db.patch(current._id, { isCurrent: false, status: "replaced" });

    const id = await db.insert("submissions", {
      registrationId: target._id,
      text: args.text.trim(),
      driveUrl,
      createdAt: Date.now(),
      status: "submitted",
      isCurrent: true,
    });

    return { id, registrationId: target._id };
  },
});
