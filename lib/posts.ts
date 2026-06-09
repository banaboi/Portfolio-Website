import "server-only";
import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "./types";
import { readingTime } from "./readingTime";

const POSTS_DIR = path.join(process.cwd(), "posts");
const REQUIRED = ["title", "date", "summary"] as const;

const slugFromFilename = (filename: string): string =>
    filename.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

const parsePost = (filename: string, raw: string): Post => {
    const { data, content } = matter(raw);
    for (const field of REQUIRED) {
        if (!data[field]) {
            throw new Error(
                `Post ${filename}: missing required frontmatter field "${field}"`,
            );
        }
    }
    const slug =
        (data.slug as string | undefined) ?? slugFromFilename(filename);
    const toIso = (v: unknown): string =>
        typeof v === "string"
            ? v
            : new Date(v as string).toISOString().slice(0, 10);
    const date = toIso(data.date);
    return {
        slug,
        title: data.title,
        date,
        summary: data.summary,
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: data.draft === true,
        cover: data.cover,
        updated: data.updated ? toIso(data.updated) : date,
        noindex: data.noindex === true,
        body: content,
        readingTime: readingTime(content),
    };
};

// React `cache()` dedupes per-request in RSC; in build (SSG) it is essentially
// per-build. No manual module-level cache, so dev edits are picked up on each
// reload and prod/dev draft visibility is always derived fresh.
const loadAll = cache(async (): Promise<Post[]> => {
    const files = await fs.readdir(POSTS_DIR);
    const md = files.filter((f) => f.endsWith(".md"));
    const posts = await Promise.all(
        md.map(async (file) => {
            const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
            return parsePost(file, raw);
        }),
    );
    const visible = posts.filter(
        (p) => process.env.NODE_ENV !== "production" || !p.draft,
    );
    visible.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return visible;
});

export const getAllPosts = async (): Promise<Post[]> => loadAll();

export const getPostBySlug = async (
    slug: string,
): Promise<Post | undefined> => {
    const posts = await loadAll();
    return posts.find((p) => p.slug === slug);
};

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
    const posts = await loadAll();
    return posts.filter((p) => p.tags.includes(tag));
};

export const getAllTags = async (): Promise<string[]> => {
    const posts = await loadAll();
    const set = new Set<string>();
    for (const p of posts) for (const t of p.tags) set.add(t);
    return Array.from(set).sort();
};

export const getNeighbors = async (
    slug: string,
): Promise<{ prev?: Post; next?: Post }> => {
    const posts = await loadAll();
    const idx = posts.findIndex((p) => p.slug === slug);
    if (idx === -1) return {};
    return {
        next: idx > 0 ? posts[idx - 1] : undefined,
        prev: idx < posts.length - 1 ? posts[idx + 1] : undefined,
    };
};
