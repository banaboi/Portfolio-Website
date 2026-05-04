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

// SSR has no way to know the user's saved theme, so the server always emits
// "dark". On the client, /theme-init.js (loaded beforeInteractive) sets the
// resolved theme on <html data-theme="..."> before paint. We read that here so
// the first client render matches reality, avoiding a hydration mismatch on
// the sprite + toggle label for users whose actual theme is "light".
const readResolvedTheme = (): Theme => {
    if (typeof document === "undefined") return "dark";
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "light" ? "light" : "dark";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(readResolvedTheme);

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
