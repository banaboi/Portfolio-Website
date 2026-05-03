// src/components/MarkdownRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import MermaidBlock from "./MermaidBlock";

interface Props {
    body: string;
}

const MarkdownRenderer = ({ body }: Props) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            rehypeHighlight,
        ]}
        components={{
            code({ className, children, ...rest }) {
                const match = /language-(\w+)/.exec(className ?? "");
                const lang = match?.[1];
                if (lang === "mermaid") {
                    return <MermaidBlock code={String(children).trim()} />;
                }
                return (
                    <code className={className} {...rest}>
                        {children}
                    </code>
                );
            },
        }}
    >
        {body}
    </ReactMarkdown>
);

export default MarkdownRenderer;
