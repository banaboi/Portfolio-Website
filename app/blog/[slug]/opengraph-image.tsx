import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";

// Per-post Open Graph / Twitter card. Renders the post title on the site's
// dark card so shares to Slack/X/LinkedIn show a real preview, not a blank.
export const alt = "Luke Banicevic — blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    const title = post?.title ?? "Luke Banicevic";

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "80px",
                background: "#0b0d0c",
                color: "#f7f7f5",
                fontFamily: "monospace",
            }}
        >
            <div style={{ fontSize: 26, color: "#6f7771" }}>
                lukebanicevic.com / blog
            </div>
            <div
                style={{
                    marginTop: "auto",
                    fontSize: 64,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: -1,
                    display: "flex",
                }}
            >
                {title}
            </div>
            <div style={{ marginTop: 32, fontSize: 28, color: "#8a928c" }}>
                Luke Banicevic — Software Engineer
            </div>
        </div>,
        { ...size },
    );
}
