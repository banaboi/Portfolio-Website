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

// ── Build-time loading (Vite) ──
type RawModule = string;

const rawModules = import.meta.glob<RawModule>("../posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});

const allParsed: Post[] = Object.entries(rawModules).map(([path, raw]) =>
    parsePost(path, raw as string)
);

const visiblePosts: Post[] = sortPosts(filterDrafts(allParsed, import.meta.env.PROD));

export const getAllPosts = (): Post[] => visiblePosts;

export const getPostBySlug = (slug: string): Post | undefined =>
    visiblePosts.find((p) => p.slug === slug);

export const getPostsByTag = (tag: string): Post[] =>
    visiblePosts.filter((p) => p.tags.includes(tag));

export const getAllTags = (): string[] => {
    const set = new Set<string>();
    for (const p of visiblePosts) for (const t of p.tags) set.add(t);
    return Array.from(set).sort();
};

export const getNeighbors = (slug: string): { prev?: Post; next?: Post } => {
    const idx = visiblePosts.findIndex((p) => p.slug === slug);
    if (idx === -1) return {};
    return {
        next: idx > 0 ? visiblePosts[idx - 1] : undefined,
        prev: idx < visiblePosts.length - 1 ? visiblePosts[idx + 1] : undefined,
    };
};
