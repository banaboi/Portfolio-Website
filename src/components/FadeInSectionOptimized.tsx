import React, { useRef, useCallback, memo } from "react";

interface FadeInSectionProps {
    delay?: number;
    children: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
}

const FadeInSection = memo(({ 
    delay = 0, 
    children, 
    threshold = 0.05,  // Reduced from 0.1 for earlier triggering
    rootMargin = "50px 0px"  // Start animations 50px before entering viewport
}: FadeInSectionProps) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
            setVisible(true);
            // Disconnect observer after first intersection for performance
            if (observerRef.current && domRef.current) {
                observerRef.current.unobserve(domRef.current);
            }
        }
    }, [isVisible]);

    React.useEffect(() => {
        const currentRef = domRef.current;
        if (!currentRef) return;

        // Create observer only once
        observerRef.current = new IntersectionObserver(observerCallback, {
            threshold,
            rootMargin
        });

        observerRef.current.observe(currentRef);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [observerCallback, threshold, rootMargin]);

    return (
        <div
            className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
            style={{ 
                transitionDelay: `${delay}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`  // Reduced from 0.6s to 0.4s
            }}
            ref={domRef}
        >
            {children}
        </div>
    );
});

FadeInSection.displayName = 'FadeInSection';

export default FadeInSection;
