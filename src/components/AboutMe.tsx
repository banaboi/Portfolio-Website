import React, { memo } from "react";
import resume from "../documents/resume.pdf";
import profilePicture from "../assets/profilePicture.png";

const AboutMe = memo(() => {
    return (
        <section id="aboutMe" className="section about-section">
            <h2 className="sub-heading">About</h2>
            <div className="about-grid">
                <div className="about-copy">
                    <p>
                        I&rsquo;m a Software Engineer II at{" "}
                        <a
                            href="https://www.resmed.com.au/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ResMed
                        </a>
                        , working on the device-to-cloud communication stack
                        that connects respiratory medical devices to our
                        backend services. My focus is the protocols, transport,
                        and edge logic that move telemetry reliably from
                        patients&rsquo; devices to the systems clinicians depend
                        on.
                    </p>
                    <p>
                        Before ResMed I wrote firmware for solar-powered race
                        cars at{" "}
                        <a
                            href="https://www.sunswift.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sunswift Racing
                        </a>{" "}
                        and worked in cloud consulting at{" "}
                        <a
                            href="https://deloitte.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Deloitte
                        </a>
                        . I studied Computer Science &amp; Engineering at{" "}
                        <a
                            href="https://www.unsw.edu.au/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            UNSW
                        </a>
                        .
                    </p>
                    <a
                        className="resume-link"
                        href={resume}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View resume →
                    </a>
                </div>
                <div className="about-image">
                    <img
                        src={profilePicture}
                        alt="Luke Banicevic"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
});

AboutMe.displayName = "AboutMe";

export default AboutMe;
