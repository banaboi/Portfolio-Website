// src/pages/BlogPost.tsx
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug, getNeighbors } from "../lib/posts";
import MarkdownRenderer from "../components/MarkdownRenderer";
import PrevNextLinks from "../components/PrevNextLinks";
import NotFound from "./NotFound";

const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const BlogPost = () => {
    const { slug = "" } = useParams<{ slug: string }>();
    const post = getPostBySlug(slug);
    const { prev, next } = getNeighbors(slug);

    useEffect(() => {
        if (post) document.title = `${post.title} · Luke Banicevic`;
    }, [post]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) return <NotFound />;

    return (
        <article className="section blog-post">
            <header className="blog-post-header">
                <h1 className="blog-post-title">{post.title}</h1>
                <p className="blog-post-meta">
                    {formatDate(post.date)} · {post.readingTime} min read
                </p>
                {post.tags.length > 0 && (
                    <ul className="blog-post-tags">
                        {post.tags.map((tag) => (
                            <li key={tag}>
                                <Link to={`/blog/tags/${tag}`} className="skill-chip">
                                    #{tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </header>

            <div className="blog-post-body">
                <MarkdownRenderer body={post.body} />
            </div>

            <PrevNextLinks prev={prev} next={next} />
        </article>
    );
};

export default BlogPost;
