import type { NextConfig } from "next";

// Content-Security-Policy.
//
// `script-src` uses 'unsafe-inline' rather than a nonce: Next's App Router emits
// ~35 inline hydration/RSC-streaming scripts (`self.__next_f.push(...)`) per
// page, and a nonce would force per-request dynamic rendering — defeating this
// site's static (SSG) caching. Given the site has no visitor-controlled input
// surface (no API routes, no forms; content is author-authored markdown), the
// XSS exposure a strict script-src would buy is minimal. The framing, object,
// base-uri and form-action directives below are still strict and free.
// `style-src` needs 'unsafe-inline' for mermaid's rendered-SVG <style> blocks.
const CSP = [
    "default-src 'self'",
    "base-uri 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "form-action 'self'",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
    { key: "Content-Security-Policy", value: CSP },
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Legacy clickjacking backstop; CSP frame-ancestors above is the primary
    // control and supersedes this in modern browsers.
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value:
            "camera=(), microphone=(), geolocation=(), interest-cohort=(), " +
            "browsing-topics=(), payment=(), usb=(), magnetometer=(), " +
            "accelerometer=(), gyroscope=(), midi=(), fullscreen=(self)",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    // same-site (not same-origin) so social/link-preview crawlers can still
    // fetch the Open Graph image cross-origin.
    { key: "Cross-Origin-Resource-Policy", value: "same-site" },
    { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
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
    // Don't advertise the framework/version in responses.
    poweredByHeader: false,
    // Explicit (also the default): never ship browser source maps to prod.
    productionBrowserSourceMaps: false,
    sassOptions: {
        silenceDeprecations: ["legacy-js-api", "import"],
    },
    async headers() {
        return [{ source: "/:path*", headers: SECURITY_HEADERS }];
    },
};

export default nextConfig;
