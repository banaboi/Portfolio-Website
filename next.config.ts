import type { NextConfig } from "next";

const SECURITY_HEADERS = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    // includeSubDomains only — `preload` is a hard-to-reverse commitment that
    // also requires submitting the domain to hstspreload.org. Add it manually
    // if/when you're sure no subdomain will ever need plain HTTP.
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
    },
];

const nextConfig: NextConfig = {
    reactStrictMode: true,
    sassOptions: {
        silenceDeprecations: ["legacy-js-api", "import"],
    },
    async headers() {
        return [{ source: "/:path*", headers: SECURITY_HEADERS }];
    },
};

export default nextConfig;
