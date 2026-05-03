"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "portfolio-theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const stored = (typeof window !== "undefined" &&
            (localStorage.getItem(STORAGE_KEY) as Theme | null)) || null;
        if (stored === "light" || stored === "dark") {
            setTheme(stored);
            return;
        }
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: light)").matches
        ) {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch {
                // ignore storage failures (private mode, etc.)
            }
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
};
