// src/lib/posts.test.ts
import { describe, it, expect } from "vitest";
import { parsePost, sortPosts, filterDrafts } from "./posts";

const validRaw = `---
title: Hello
date: 2026-05-10
summary: A test post
tags: ["a", "b"]
---
Body text.
`;

const draftRaw = `---
title: Draft
date: 2026-05-11
summary: Hidden
draft: true
---
Hidden body.
`;

const missingFieldRaw = `---
title: Missing summary
date: 2026-05-09
---
Body.
`;

describe("parsePost", () => {
    it("parses frontmatter and body", () => {
        const post = parsePost("2026-05-10-hello.md", validRaw);
        expect(post.title).toBe("Hello");
        expect(post.date).toBe("2026-05-10");
        expect(post.summary).toBe("A test post");
        expect(post.tags).toEqual(["a", "b"]);
        expect(post.body.trim()).toBe("Body text.");
        expect(post.readingTime).toBeGreaterThanOrEqual(1);
        expect(post.draft).toBe(false);
    });

    it("derives slug from filename when not in frontmatter", () => {
        const post = parsePost("2026-05-10-hello.md", validRaw);
        expect(post.slug).toBe("hello");
    });

    it("uses frontmatter slug when present", () => {
        const raw = validRaw.replace("title: Hello", "title: Hello\nslug: custom-slug");
        const post = parsePost("2026-05-10-hello.md", raw);
        expect(post.slug).toBe("custom-slug");
    });

    it("throws when required field missing", () => {
        expect(() => parsePost("2026-05-09-x.md", missingFieldRaw)).toThrow(/summary/);
    });

    it("defaults tags to empty array", () => {
        const raw = validRaw.replace(/tags:.*\n/, "");
        const post = parsePost("2026-05-10-hello.md", raw);
        expect(post.tags).toEqual([]);
    });
});

describe("sortPosts", () => {
    it("sorts by date descending", () => {
        const a = parsePost("2026-05-10-hello.md", validRaw);
        const b = parsePost("2026-05-11-draft.md", draftRaw);
        const sorted = sortPosts([a, b]);
        expect(sorted[0].slug).toBe("draft");
        expect(sorted[1].slug).toBe("hello");
    });
});

describe("filterDrafts", () => {
    it("removes drafts when isProd is true", () => {
        const a = parsePost("2026-05-10-hello.md", validRaw);
        const b = parsePost("2026-05-11-draft.md", draftRaw);
        expect(filterDrafts([a, b], true).map((p) => p.slug)).toEqual(["hello"]);
    });

    it("keeps drafts when isProd is false", () => {
        const a = parsePost("2026-05-10-hello.md", validRaw);
        const b = parsePost("2026-05-11-draft.md", draftRaw);
        expect(filterDrafts([a, b], false)).toHaveLength(2);
    });
});
