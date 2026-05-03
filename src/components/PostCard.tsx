// src/components/PostCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Post } from "../lib/types";

interface Props {
    post: Post;
}

const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const PostCard = ({ post }: Props) => (
    <article className="post-card">
        <Link to={`/blog/${post.slug}`} className="post-card-link">
            <p className="post-card-meta">
                {formatDate(post.date)} · {post.readingTime} min read
            </p>
            <h3 className="post-card-title">{post.title}</h3>
            <p className="post-card-summary">{post.summary}</p>
            {post.tags.length > 0 && (
                <ul className="post-card-tags">
                    {post.tags.map((tag) => (
                        <li key={tag} className="skill-chip">{tag}</li>
                    ))}
                </ul>
            )}
        </Link>
    </article>
);

export default PostCard;
