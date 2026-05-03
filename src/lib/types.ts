// src/lib/types.ts
export interface Frontmatter {
    title: string;
    date: string;            // ISO date, e.g. "2026-05-10"
    summary: string;
    slug?: string;
    tags?: string[];
    draft?: boolean;
    cover?: string;
}

export interface Post {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    draft: boolean;
    cover?: string;
    body: string;            // raw markdown body, image paths rewritten
    readingTime: number;     // minutes, integer >= 1
}
