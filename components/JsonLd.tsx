// Server component — emits a JSON-LD <script> for structured data.
//
// JSON-LD is the canonical Next.js pattern for structured data and the Next
// docs recommend the React raw-HTML escape hatch for it (see
// https://nextjs.org/docs/app/guides/json-ld). The payload is built from
// server-side objects, but the values include author-authored frontmatter
// (post title/summary/tags), so we still escape the HTML-significant
// characters that JSON.stringify leaves untouched. JSON.stringify does NOT
// escape `<`, `>`, `&`, or the JS line terminators U+2028/U+2029, so a value
// containing the literal `</script>` would otherwise break out of the script
// element. Escaping each to its \uXXXX form keeps the JSON valid while making
// a script breakout impossible.

// Built from char codes so no raw U+2028/U+2029 glyphs live in this source file
// (they are invisible and easily mangled by editors/formatters).
const UNSAFE_JSONLD = new RegExp(
    "[<>&" + String.fromCharCode(0x2028, 0x2029) + "]",
    "g",
);

const escapeJsonLd = (data: Record<string, unknown>): string =>
    JSON.stringify(data).replace(
        UNSAFE_JSONLD,
        (ch) => "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0"),
    );

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // This is the one intentional raw-HTML sink in the codebase; the
            // payload is escaped by escapeJsonLd above. Kept explicit (rather
            // than an obfuscated prop name) so audits and lint can see it.
            dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }}
        />
    );
}
