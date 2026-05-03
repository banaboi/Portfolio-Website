// src/components/PrevNextLinks.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Post } from "../lib/types";

interface Props {
    prev?: Post;
    next?: Post;
}

const PrevNextLinks = ({ prev, next }: Props) => {
    if (!prev && !next) return null;
    return (
        <nav className="prev-next" aria-label="Post navigation">
            <div className="prev-next-cell">
                {prev && (
                    <Link to={`/blog/${prev.slug}`}>
                        <span className="prev-next-label">← Older</span>
                        <span className="prev-next-title">{prev.title}</span>
                    </Link>
                )}
            </div>
            <div className="prev-next-cell prev-next-right">
                {next && (
                    <Link to={`/blog/${next.slug}`}>
                        <span className="prev-next-label">Newer →</span>
                        <span className="prev-next-title">{next.title}</span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default PrevNextLinks;
