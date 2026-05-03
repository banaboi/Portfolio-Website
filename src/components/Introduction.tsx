import React, { memo } from "react";

const Introduction = memo(() => {
    return (
        <section id="intro" className="intro">
            <p className="intro-eyebrow">Hi, my name is</p>
            <h1 className="name">Luke Banicevic.</h1>
            <h2 className="headline">
                Software Engineer II at{" "}
                <span className="accent">ResMed</span> — building the{" "}
                <span className="accent">device-to-cloud</span> comms layer
                between medical devices and the cloud.
            </h2>
        </section>
    );
});

Introduction.displayName = "Introduction";

export default Introduction;
