// src/pages/BlogIndex.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, getAllTags } from "../lib/posts";
import PostCard from "../components/PostCard";

const BlogIndex = () => {
    const posts = getAllPosts();
    const tags = getAllTags();

    useEffect(() => {
        document.title = "Blog · Luke Banicevic";
    }, []);

    return (
        <section className="section blog-index">
            <h1 className="sub-heading">Writing</h1>

            {tags.length > 0 && (
                <ul className="blog-tag-row" aria-label="Filter by tag">
                    {tags.map((tag) => (
                        <li key={tag}>
                            <Link to={`/blog/tags/${tag}`} className="skill-chip">
                                #{tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {posts.length === 0 ? (
                <p className="blog-empty">No posts yet.</p>
            ) : (
                <div className="post-list">
                    {posts.map((p) => (
                        <PostCard key={p.slug} post={p} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BlogIndex;
