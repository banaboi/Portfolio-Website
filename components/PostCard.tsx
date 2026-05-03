import Link from "next/link";
import type { Post } from "../lib/types";

const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const PostCard = ({ post }: { post: Post }) => (
    <article className="post-card">
        <Link href={`/blog/${post.slug}`} className="post-card-link">
            <p className="post-card-meta">
                {formatDate(post.date)} · {post.readingTime} min read
            </p>
            <h3 className="post-card-title">{post.title}</h3>
            <p className="post-card-summary">{post.summary}</p>
            {post.tags.length > 0 && (
                <ul className="post-card-tags">
                    {post.tags.map((tag) => (
                        <li key={tag} className="skill-chip">
                            {tag}
                        </li>
                    ))}
                </ul>
            )}
        </Link>
    </article>
);

export default PostCard;
