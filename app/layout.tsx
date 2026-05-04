import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.scss";
import { ThemeProvider } from "../components/ThemeProvider";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// FA's runtime CSS injection doesn't work with SSR (icons render 0x0 until
// hydrate). We import the stylesheet manually and tell FA not to inject it.
faConfig.autoAddCss = false;

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

const SITE_URL = "https://lukebanicevic.com";
const DESCRIPTION =
    "Luke Banicevic — Software Engineer II at ResMed, working on the device-to-cloud comms layer between medical devices and the cloud. Notes on embedded, comms, and engineering.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Luke Banicevic — Software Engineer",
        template: "%s · Luke Banicevic",
    },
    description: DESCRIPTION,
    authors: [{ name: "Luke Banicevic" }],
    creator: "Luke Banicevic",
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: "Luke Banicevic",
        title: "Luke Banicevic — Software Engineer",
        description: DESCRIPTION,
        locale: "en_AU",
    },
    twitter: {
        card: "summary_large_image",
        title: "Luke Banicevic — Software Engineer",
        description: DESCRIPTION,
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/logo192.png",
    },
    alternates: {
        canonical: "/",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
        { media: "(prefers-color-scheme: dark)", color: "#0b0d0c" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
            <head>
                <Script src="/theme-init.js" strategy="beforeInteractive" />
            </head>
            <body>
                <ThemeProvider>
                    <div className="App">
                        <a href="#intro" className="skip-to-content">
                            Skip to main content
                        </a>
                        <Nav />
                        <main className="page">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
