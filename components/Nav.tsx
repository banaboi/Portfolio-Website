"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeProvider";
import lukeDark from "../public/assets/profile.png";
import lukeLight from "../public/assets/profile_lightmode.png";

// Nav renders both sprite + both toggle labels; CSS hides the wrong one based
// on `data-theme` on <html>. This keeps the rendered HTML theme-independent so
// the server can render a fixed shape and the client can hydrate without
// mismatches even though `theme` JS value differs on first paint.

interface PageLink {
    name: string;
    href: string;
    sectionId?: string;
    matchPrefix?: string;
}

const pages: PageLink[] = [
    { name: "About", href: "/#aboutMe", sectionId: "aboutMe" },
    { name: "Skills", href: "/#skills", sectionId: "skills" },
    { name: "Projects", href: "/#projectsSection", sectionId: "projectsSection" },
    { name: "Contact", href: "/#contact", sectionId: "contact" },
    { name: "Blog", href: "/blog", matchPrefix: "/blog" },
];

const Nav = () => {
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const [activeSectionId, setActiveSectionId] = useState<string>("");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSectionId("");
            return;
        }
        const sectionIds = pages
            .filter((p): p is PageLink & { sectionId: string } => !!p.sectionId)
            .map((p) => p.sectionId);
        const lastSectionId = sectionIds[sectionIds.length - 1];

        // Pick the section whose top has most recently crossed a line ~30%
        // down the viewport. This is direction-agnostic (works when scrolling
        // up or down) and tolerant of short sections that wouldn't reliably
        // enter a narrow IntersectionObserver band.
        const computeActive = () => {
            const line = window.innerHeight * 0.3;
            let current = sectionIds[0];
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                if (top - line <= 0) current = id;
            }
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4;
            if (atBottom && lastSectionId) current = lastSectionId;
            setActiveSectionId(current);
        };

        window.addEventListener("scroll", computeActive, { passive: true });
        window.addEventListener("resize", computeActive);
        computeActive();

        return () => {
            window.removeEventListener("scroll", computeActive);
            window.removeEventListener("resize", computeActive);
        };
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const isActive = (page: PageLink): boolean => {
        if (page.matchPrefix) return pathname.startsWith(page.matchPrefix);
        if (pathname !== "/") return false;
        return page.sectionId === activeSectionId;
    };

    const handleHashClick = (e: React.MouseEvent, href: string) => {
        if (!href.startsWith("/#") || pathname !== "/") return;
        e.preventDefault();
        const target = document.querySelector(href.slice(1));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        setMenuOpen(false);
    };

    return (
        <nav className="site-nav" aria-label="Primary">
            <Link
                href="/"
                className="site-nav-brand"
                aria-label="Home"
                onClick={() => setMenuOpen(false)}
            >
                <Image
                    src={lukeDark}
                    alt=""
                    className="brand-sprite brand-sprite-dark"
                    width={36}
                    height={36}
                    priority
                />
                <Image
                    src={lukeLight}
                    alt=""
                    className="brand-sprite brand-sprite-light"
                    width={36}
                    height={36}
                    priority
                />
            </Link>

            <ul className={`site-nav-links ${menuOpen ? "is-open" : ""}`}>
                {pages.map((page, i) => {
                    const prev = pages[i - 1];
                    const showDivider = !!prev && !prev.matchPrefix && !!page.matchPrefix;
                    return (
                        <React.Fragment key={page.href}>
                            {showDivider && (
                                <li className="nav-divider" aria-hidden="true" />
                            )}
                            <li>
                                <Link
                                    href={page.href}
                                    onClick={(e) => {
                                        handleHashClick(e, page.href);
                                        setMenuOpen(false);
                                    }}
                                    aria-current={isActive(page) ? "true" : undefined}
                                >
                                    {page.name}
                                </Link>
                            </li>
                        </React.Fragment>
                    );
                })}
                <li>
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        suppressHydrationWarning
                        title={
                            theme === "light"
                                ? "Switch to Return of the Jedi"
                                : "Switch to A New Hope"
                        }
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                    >
                        {/* Both icons rendered, stacked. CSS crossfades +
                            rotates between them based on data-theme. Keeps
                            HTML identical for SSR/client hydration. */}
                        <span className="theme-toggle-stack" aria-hidden="true">
                            <FontAwesomeIcon
                                icon={faMoon}
                                className="toggle-icon toggle-icon-moon"
                            />
                            <FontAwesomeIcon
                                icon={faSun}
                                className="toggle-icon toggle-icon-sun"
                            />
                        </span>
                    </button>
                </li>
            </ul>

            <button
                type="button"
                className="nav-hamburger"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
            >
                <span className={`bar ${menuOpen ? "open" : ""}`} />
                <span className={`bar ${menuOpen ? "open" : ""}`} />
                <span className={`bar ${menuOpen ? "open" : ""}`} />
            </button>
        </nav>
    );
};

export default Nav;
