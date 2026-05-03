// src/components/Nav.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import lukeDark from "../assets/profile.png";
import lukeLight from "../assets/profile_lightmode.png";

interface PageLink {
    name: string;
    to: string;
    sectionId?: string;
    matchPrefix?: string;
}

const pages: PageLink[] = [
    { name: "About", to: "/#aboutMe", sectionId: "aboutMe" },
    { name: "Skills", to: "/#skills", sectionId: "skills" },
    { name: "Projects", to: "/#projectsSection", sectionId: "projectsSection" },
    { name: "Blog", to: "/blog", matchPrefix: "/blog" },
    { name: "Contact", to: "/#contact", sectionId: "contact" },
];

const Nav = () => {
    const { theme, toggleTheme } = useTheme();
    const { pathname } = useLocation();
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

    const scrollToHashIfHome = (e: React.MouseEvent, to: string) => {
        if (!to.startsWith("/#") || pathname !== "/") return;
        e.preventDefault();
        const hashOnly = to.slice(1);
        const target = document.querySelector(hashOnly);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        setMenuOpen(false);
    };

    return (
        <nav className="site-nav" aria-label="Primary">
            <Link
                to="/"
                className="site-nav-brand"
                aria-label="Home"
                onClick={() => setMenuOpen(false)}
            >
                <img
                    src={theme === "light" ? lukeLight : lukeDark}
                    alt="Luke pixel sprite"
                    className="brand-sprite"
                />
            </Link>

            <ul className={`site-nav-links ${menuOpen ? "is-open" : ""}`}>
                {pages.map((page) => (
                    <li key={page.to}>
                        <Link
                            to={page.to}
                            onClick={(e) => {
                                scrollToHashIfHome(e, page.to);
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
                        title={
                            theme === "light"
                                ? "Switch to Return of the Jedi"
                                : "Switch to A New Hope"
                        }
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                    >
                        {theme === "light" ? "Jedi" : "Hope"}
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
