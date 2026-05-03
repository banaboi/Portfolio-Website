// src/pages/TagPage.tsx
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostsByTag } from "../lib/posts";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";

const TagPage = () => {
    const { tag = "" } = useParams<{ tag: string }>();
    const posts = getPostsByTag(tag);

    useEffect(() => {
        document.title = `#${tag} · Luke Banicevic`;
    }, [tag]);

    if (posts.length === 0) return <NotFound />;

    return (
        <section className="section tag-page">
            <h1 className="sub-heading">tag: {tag}</h1>
            <Link to="/blog" className="tag-page-back">← all posts</Link>
            <div className="post-list">
                {posts.map((p) => (
                    <PostCard key={p.slug} post={p} />
                ))}
            </div>
        </section>
    );
};

export default TagPage;
