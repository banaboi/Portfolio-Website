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
    { name: "Blog", href: "/blog", matchPrefix: "/blog" },
    { name: "Contact", href: "/#contact", sectionId: "contact" },
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
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setActiveSectionId(visible[0].target.id);
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
        );
        for (const p of pages) {
            if (!p.sectionId) continue;
            const el = document.getElementById(p.sectionId);
            if (el) observer.observe(el);
        }
        return () => observer.disconnect();
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
                {pages.map((page) => (
                    <li key={page.href}>
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
                ))}
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
                        {/* Render both icons; CSS shows the one for the
                            current theme. Avoids any hydration divergence. */}
                        <FontAwesomeIcon
                            icon={faMoon}
                            className="toggle-icon toggle-label-when-light"
                            aria-hidden="true"
                        />
                        <FontAwesomeIcon
                            icon={faSun}
                            className="toggle-icon toggle-label-when-dark"
                            aria-hidden="true"
                        />
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
