"use client";

import React, { useEffect, useRef, useState } from "react";

let mermaidPromise: Promise<typeof import("mermaid")> | null = null;
const loadMermaid = () => {
    if (!mermaidPromise) mermaidPromise = import("mermaid");
    return mermaidPromise;
};

const buildThemeVars = () => {
    const cs = getComputedStyle(document.documentElement);
    return {
        background: cs.getPropertyValue("--bg-elev").trim(),
        primaryColor: cs.getPropertyValue("--bg-elev").trim(),
        primaryTextColor: cs.getPropertyValue("--text").trim(),
        primaryBorderColor: cs.getPropertyValue("--border-strong").trim(),
        lineColor: cs.getPropertyValue("--text-muted").trim(),
        textColor: cs.getPropertyValue("--text").trim(),
    };
};

let idCounter = 0;
const nextId = () => `mermaid-${++idCounter}`;

const replaceWithSvg = (host: HTMLElement, svgText: string) => {
    const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const svgEl = parsed.documentElement;
    while (host.firstChild) host.removeChild(host.firstChild);
    host.appendChild(document.importNode(svgEl, true));
};

const MermaidBlock = ({ code }: { code: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const render = async () => {
            try {
                const { default: mermaid } = await loadMermaid();
                mermaid.initialize({
                    startOnLoad: false,
                    theme: "base",
                    themeVariables: buildThemeVars(),
                    securityLevel: "strict",
                });
                const { svg } = await mermaid.render(nextId(), code);
                if (!cancelled && ref.current) replaceWithSvg(ref.current, svg);
            } catch (e) {
                if (!cancelled) setError(String(e));
            }
        };
        render();
        return () => {
            cancelled = true;
        };
    }, [code]);

    if (error) {
        return (
            <pre className="mermaid-fallback">
                <code>{code}</code>
            </pre>
        );
    }
    return <div ref={ref} className="mermaid-block" aria-label="diagram" />;
};

export default MermaidBlock;
