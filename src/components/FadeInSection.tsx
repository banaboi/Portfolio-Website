import React from "react";

interface FadeInSectionProps {
    delay?: number;
    children: React.ReactNode;
}

const FadeInSection = (props: FadeInSectionProps) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef<HTMLDivElement>(null);    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        }, {
            threshold: 0.05, // Reduced from default 0 for earlier triggering
            rootMargin: '50px 0px' // Start animations 50px before entering viewport
        });
        if (domRef.current) {
            observer.observe(domRef.current);
        }
        return () => observer.disconnect();
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: `${props.delay || 0}ms` }}
            ref={domRef}
        >
            {props.children}
        </div>
    );
};

export default FadeInSection;
