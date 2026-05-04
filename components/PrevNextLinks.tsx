import Link from "next/link";
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
                    <Link href={`/blog/${prev.slug}`}>
                        <span className="prev-next-label">← Older</span>
                        <span className="prev-next-title">{prev.title}</span>
                    </Link>
                )}
            </div>
            <div className="prev-next-cell prev-next-right">
                {next && (
                    <Link href={`/blog/${next.slug}`}>
                        <span className="prev-next-label">Newer →</span>
                        <span className="prev-next-title">{next.title}</span>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default PrevNextLinks;
