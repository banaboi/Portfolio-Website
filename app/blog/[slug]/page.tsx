import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getNeighbors } from "../../../lib/posts";
import MarkdownRenderer from "../../../components/MarkdownRenderer";
import PrevNextLinks from "../../../components/PrevNextLinks";
import AuthorBio from "../../../components/AuthorBio";
import JsonLd from "../../../components/JsonLd";

const SITE_URL = "https://lukebanicevic.com";

const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

interface Params {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: "Not found", robots: { index: false } };
    return {
        title: post.title,
        description: post.summary,
        alternates: { canonical: `/blog/${post.slug}` },
        ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
        openGraph: {
            type: "article",
            title: post.title,
            description: post.summary,
            url: `/blog/${post.slug}`,
            publishedTime: post.date,
            modifiedTime: post.updated,
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.summary,
        },
    };
}

export default async function BlogPostPage({ params }: Params) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) notFound();
    const { prev, next } = await getNeighbors(slug);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.summary,
        datePublished: post.date,
        dateModified: post.updated,
        author: {
            "@type": "Person",
            name: "Luke Banicevic",
            url: SITE_URL,
            sameAs: [
                "https://github.com/banaboi",
                "https://www.linkedin.com/in/luke-banicevic-30860115b/",
            ],
        },
        publisher: { "@type": "Person", name: "Luke Banicevic", url: SITE_URL },
        image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
        },
        url: `${SITE_URL}/blog/${post.slug}`,
        wordCount: post.body.trim().split(/\s+/).length,
        inLanguage: "en-AU",
        keywords: post.tags.join(", "),
    };

    return (
        <article className="section blog-post">
            <JsonLd data={articleJsonLd} />
            <header className="blog-post-header">
                <h1 className="blog-post-title">{post.title}</h1>
                <p className="blog-post-meta">
                    {formatDate(post.date)} · {post.readingTime} min read
                </p>
                {post.tags.length > 0 && (
                    <ul className="blog-post-tags">
                        {post.tags.map((tag) => (
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
            </header>

            <div className="blog-post-body">
                <MarkdownRenderer body={post.body} />
            </div>

            <AuthorBio />
            <PrevNextLinks prev={prev} next={next} />
        </article>
    );
}
