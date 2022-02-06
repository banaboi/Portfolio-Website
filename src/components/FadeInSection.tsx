import React from "react";

const FadeInSection = (props: any) => {
    const [isVisible, setVisible] = React.useState(false);
    const domRef: any = React.useRef();
    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: `${props.delay | 0}` }}
            ref={domRef}
        >
            {props.children}
        </div>
    );
};

export default FadeInSection;
