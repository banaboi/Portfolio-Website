import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "../../lib/posts";
import PostCard from "../../components/PostCard";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Notes from Luke Banicevic on device-to-cloud comms, embedded software, and engineering opinions.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Blog · Luke Banicevic",
        description:
            "Notes on device-to-cloud comms, embedded software, and engineering opinions.",
        url: "/blog",
    },
};

export default async function BlogIndex() {
    const posts = await getAllPosts();
    const tags = await getAllTags();

    return (
        <section className="section blog-index">
            <h1 className="sub-heading">Writing</h1>

            {tags.length > 0 && (
                <ul className="blog-tag-row" aria-label="Filter by tag">
                    {tags.map((tag) => (
                        <li key={tag}>
                            <Link
                                href={`/blog/tags/${tag}`}
                                className="skill-chip"
                            >
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
}
