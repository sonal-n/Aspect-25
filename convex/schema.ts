import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  competitions: defineTable({
    slug: v.string(),
    title: v.string(),
    isOpen: v.boolean(),
    cap: v.optional(v.number()),
    rulesUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  registrations: defineTable({
    competitionId: v.id("competitions"),
    competitionTitle: v.string(),
    name: v.string(),
    indexNo: v.string(),
    grade: v.number(),
    classLetter: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    referenceCode: v.string(),
    submittedAt: v.number(),
  })
    .index("by_competition_time", ["competitionId", "submittedAt"])
    .index("by_dedupe_roll", [
      "competitionId",
      "grade",
      "classLetter",
      "indexNo",
    ])
    .index("by_email_competition", ["competitionId", "email"])
    .index("by_reference_code", ["referenceCode"])
    .index("by_competition_index", ["competitionId", "indexNo"]),

  submissions: defineTable({
    registrationId: v.id("registrations"),
    text: v.string(),
    driveUrl: v.string(),
    createdAt: v.number(),
    status: v.union(
      v.literal("submitted"),
      v.literal("replaced"),
      v.literal("withdrawn")
    ),
    isCurrent: v.boolean(),
  })
    .index("by_registration_time", ["registrationId", "createdAt"])
    .index("by_registration_current", ["registrationId", "isCurrent"]),
});
