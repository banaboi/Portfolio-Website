export interface Frontmatter {
    title: string;
    date: string;
    summary: string;
    slug?: string;
    tags?: string[];
    draft?: boolean;
    cover?: string;
}

export interface Post {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    draft: boolean;
    cover?: string;
    body: string;
    readingTime: number;
}
