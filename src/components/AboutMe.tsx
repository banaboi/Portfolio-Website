import React, { memo } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

import resume from "../documents/resume.pdf";
import FadeInSection from "./FadeInSectionOptimized";
import profilePicture from "../assets/profilePicture.png";
import { useMediaQuery } from "../hooks/useMediaQuery";

const listItems = [
    <li key="education" className="list-item">
        <p>
            🎓 Mastered the ancient arts of <b>Computer Science </b> and <b>Engineering </b>at the Jedi Academy of{" "}
            <a target="_blank" href="https://www.unsw.edu.au/" rel="noopener noreferrer">
                {" "}
                <b>University of New South Wales </b>
            </a>
        </p>
    </li>,
    <li key="sunswift" className="list-item">
        <p>
            ☀️ Harnessed the power of the sun, writing code for a solar-powered speeder @
            <a target="_blank" href="https://www.sunswift.com/" rel="noopener noreferrer">
                {" "}
                <b>Sunswift Racing</b>
            </a>
        </p>
    </li>,
    <li key="resmed" className="list-item">
        <p>
            💨 Currently using the Force to help beings across the galaxy breathe better @
            <a target="_blank" href="https://www.resmed.com.au/" rel="noopener noreferrer">
                {" "}
                <b>ResMed</b>
            </a>
        </p>
    </li>,
    <li key="deloitte" className="list-item">
        <p>
            ☁️ Explored the Cloud City's managed services during my padawan days @{" "}
            <a target="_blank" href="https://deloitte.com/" rel="noopener noreferrer">
                {" "}
                <b>Deloitte </b>
            </a>
        </p>
    </li>,
    <Button
        className="resume-button"
        target="_blank"
        href={resume}
        variant="outlined"
    >
        View my Jedi Archives{" "}
        <FontAwesomeIcon
            style={{
                marginLeft: 5,
            }}
            icon={faFilePdf}
        />
    </Button>,
];

const AboutMe = memo(() => {
    const { isMobile, isTablet } = useMediaQuery();

    return (
        <>
            <Container
                id="aboutMe"
                className={isMobile || isTablet ? "section-mobile" : "section"}
            >                <FadeInSection delay={400}> {/* Reduced from 1000ms to 400ms */}
                    <span className="sub-heading">My Jedi Training </span>
                    <Grid container item xs={12} spacing={1}>                        <Grid item xs={12} md={6}>
                            <ul>
                                {listItems.map((item, index) => {
                                    return (
                                        <FadeInSection
                                            delay={200 + (index * 150)}
                                            key={index}
                                        >
                                            {item}
                                        </FadeInSection>
                                    );
                                })}
                            </ul>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <FadeInSection>
                                <img
                                    src={profilePicture}
                                    alt="Luke Banicevic - Software Engineer"
                                    className="display-pic"
                                    style={{
                                        border: `3px solid var(--accent-primary)`,
                                        borderRadius: '8px',
                                        boxShadow: `0 0 20px var(--shadow-color)`,
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            </FadeInSection>
                        </Grid>
                    </Grid>
                </FadeInSection>
            </Container>
        </>
    );
});

AboutMe.displayName = 'AboutMe';

export default AboutMe;
