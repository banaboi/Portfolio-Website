import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Not found",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <section className="section not-found">
            <h1 className="sub-heading">Not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/">← back home</Link>
        </section>
    );
}
