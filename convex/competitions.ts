import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    const doc = await db
      .query("competitions")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    return doc;
  },
});

export const seed = mutation({
  args: {},
  handler: async ({ db }) => {
    const now = Date.now();
    const items = [
      { slug: "web", title: "Web Developing" },
      { slug: "video", title: "Video Editing" },
      { slug: "graphic", title: "Graphic Design" },
    ];
    let created = 0;
    for (const it of items) {
      const exists = await db
        .query("competitions")
        .withIndex("by_slug", (q) => q.eq("slug", it.slug))
        .unique();
      if (!exists) {
        await db.insert("competitions", {
          slug: it.slug,
          title: it.title,
          isOpen: true,
          cap: undefined,
          rulesUrl: undefined,
          createdAt: now,
          updatedAt: now,
        });
        created++;
      }
    }
    return { created };
  },
});
