// src/components/MermaidBlock.tsx
import React, { useEffect, useRef, useState } from "react";

interface Props {
    code: string;
}

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

const MermaidBlock = ({ code }: Props) => {
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
                const id = nextId();
                const { svg } = await mermaid.render(id, code);
                if (!cancelled && ref.current) ref.current.innerHTML = svg;
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
        return <pre className="mermaid-fallback"><code>{code}</code></pre>;
    }
    return <div ref={ref} className="mermaid-block" aria-label="diagram" />;
};

export default MermaidBlock;
