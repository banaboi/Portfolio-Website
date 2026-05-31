export interface Frontmatter {
    title: string;
    date: string;
    summary: string;
    slug?: string;
    tags?: string[];
    draft?: boolean;
    cover?: string;
    updated?: string;
    noindex?: boolean;
}

export interface Post {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    draft: boolean;
    cover?: string;
    // Last meaningful edit. Falls back to `date` when absent so freshness
    // signals (JSON-LD dateModified, sitemap lastModified) stay honest.
    updated: string;
    // Keep the page crawlable but out of the index (thin/placeholder posts).
    noindex: boolean;
    body: string;
    readingTime: number;
}
