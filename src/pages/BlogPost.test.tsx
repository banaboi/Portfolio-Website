// src/pages/BlogPost.test.tsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("../lib/posts", () => ({
    getPostBySlug: (slug: string) =>
        slug === "hello"
            ? {
                  slug: "hello",
                  title: "Hello",
                  date: "2026-05-10",
                  summary: "S",
                  tags: ["meta"],
                  draft: false,
                  body: "Body content here.",
                  readingTime: 1,
              }
            : undefined,
    getNeighbors: () => ({}),
}));

import BlogPost from "./BlogPost";

const renderAt = (path: string) =>
    render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
        </MemoryRouter>
    );

describe("BlogPost", () => {
    it("renders title, date, reading time, and body for a known slug", () => {
        renderAt("/blog/hello");
        expect(screen.getByRole("heading", { name: "Hello" })).toBeTruthy();
        expect(screen.getByText(/1 min read/)).toBeTruthy();
        expect(screen.getByText(/Body content here\./)).toBeTruthy();
    });

    it("renders NotFound when slug is unknown", () => {
        renderAt("/blog/missing");
        expect(screen.getByRole("heading", { name: /Not found/i })).toBeTruthy();
    });
});
