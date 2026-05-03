// src/lib/readingTime.test.ts
import { describe, it, expect } from "vitest";
import { readingTime } from "./readingTime";

describe("readingTime", () => {
    it("returns at least 1 minute for short content", () => {
        expect(readingTime("hello world")).toBe(1);
    });

    it("computes minutes from word count at 200 wpm", () => {
        const text = Array(600).fill("word").join(" ");
        expect(readingTime(text)).toBe(3);
    });

    it("strips markdown syntax before counting", () => {
        const md = "# heading\n\n**bold** text and `code` and [link](http://x)";
        expect(readingTime(md)).toBe(1);
    });

    it("rounds up partial minutes", () => {
        const text = Array(250).fill("word").join(" ");
        expect(readingTime(text)).toBe(2);
    });
});
