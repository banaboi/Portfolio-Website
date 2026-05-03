import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "../lib/posts";

const SITE = "https://lukebanicevic.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();
    const tags = await getAllTags();
    const now = new Date();

    const staticEntries: MetadataRoute.Sitemap = [
        { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
        { url: `${SITE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ];

    const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
        url: `${SITE}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: "yearly",
        priority: 0.7,
    }));

    const tagEntries: MetadataRoute.Sitemap = tags.map((t) => ({
        url: `${SITE}/blog/tags/${t}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
    }));

    return [...staticEntries, ...postEntries, ...tagEntries];
}
