// src/lib/posts.ts
import matter from "gray-matter";
import type { Post } from "./types";
import { readingTime } from "./readingTime";

const REQUIRED = ["title", "date", "summary"] as const;

const slugFromFilename = (filename: string): string => {
    const base = filename.replace(/^.*\//, "").replace(/\.md$/, "");
    return base.replace(/^\d{4}-\d{2}-\d{2}-/, "");
};

export const parsePost = (filename: string, raw: string): Post => {
    const { data, content } = matter(raw);
    for (const field of REQUIRED) {
        if (!data[field]) {
            throw new Error(`Post ${filename}: missing required frontmatter field "${field}"`);
        }
    }
    const slug = (data.slug as string | undefined) ?? slugFromFilename(filename);
    return {
        slug,
        title: data.title,
        date: typeof data.date === "string" ? data.date : new Date(data.date).toISOString().slice(0, 10),
        summary: data.summary,
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: data.draft === true,
        cover: data.cover,
        body: content,
        readingTime: readingTime(content),
    };
};

export const sortPosts = (posts: Post[]): Post[] =>
    [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const filterDrafts = (posts: Post[], isProd: boolean): Post[] =>
    isProd ? posts.filter((p) => !p.draft) : posts;
