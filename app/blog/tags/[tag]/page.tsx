import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "../../../../lib/posts";
import PostCard from "../../../../components/PostCard";

// Below this post count a tag page is thin (mostly duplicating /blog) — keep
// it crawlable but out of the index until it carries enough unique value.
const TAG_INDEX_THRESHOLD = 5;

interface Params {
    params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
    const tags = await getAllTags();
    return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { tag } = await params;
    const posts = await getPostsByTag(tag);
    const description = `Posts tagged #${tag} on Luke Banicevic's blog.`;
    return {
        title: `#${tag}`,
        description,
        alternates: { canonical: `/blog/tags/${tag}` },
        ...(posts.length < TAG_INDEX_THRESHOLD
            ? { robots: { index: false, follow: true } }
            : {}),
        openGraph: {
            title: `#${tag} · Luke Banicevic`,
            description,
            url: `/blog/tags/${tag}`,
        },
    };
}

export default async function TagPage({ params }: Params) {
    const { tag } = await params;
    const posts = await getPostsByTag(tag);
    if (posts.length === 0) notFound();

    return (
        <section className="section tag-page">
            <h1 className="sub-heading">tag: {tag}</h1>
            <Link href="/blog" className="tag-page-back">
                ← all posts
            </Link>
            <div className="post-list">
                {posts.map((p) => (
                    <PostCard key={p.slug} post={p} />
                ))}
            </div>
        </section>
    );
}
