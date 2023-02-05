import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
import resume from "../documents/resume.pdf";
import FadeInSection from "./FadeInSection";
import profilePicture from "../assets/profilePicture.png";

const debounce = (fn: () => void, ms: number) => {
    let timer: any;
    return () => {
        clearTimeout(timer);
        timer = setTimeout((_) => {
            timer = null;
            fn.apply(this);
        }, ms);
    };
};

const listItems = [
    <li className="list-item">
        <p>
            Completed a Bachelor of <b>Computer Science </b> and <b>Engineering </b>@{" "}
            <a target="_blank" href="https://www.unsw.edu.au/" rel="noreferrer">
                {" "}
                <b>University of New South Wales </b>
            </a>
        </p>
    </li>,
    <li className="list-item">
        <p>
            Wrote code that powers a solar car @
            <a target="_blank" href="https://www.sunswift.com/" rel="noreferrer">
                {" "}
                <b>Sunswift Racing</b>
            </a>
        </p>
    </li>,
    <li className="list-item">
        <p>
            Currently writing code that helps people breath @
            <a target="_blank" href="https://www.resmed.com.au/" rel="noreferrer">
                {" "}
                <b>ResMed</b>
            </a>
        </p>
    </li>,
    <li className="list-item">
        <p>
            Vacationed in the Cloud Managed Services team @{" "}
            <a target="_blank" href="https://deloitte.com/" rel="noreferrer">
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
        View my resume{" "}
        <FontAwesomeIcon
            style={{
                marginLeft: 5,
            }}
            icon={faFilePdf}
        />
    </Button>,
];

const AboutMe = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);
    const [isIpad, setIsIpad] = useState<boolean>(
        window.innerWidth < 1050 && window.innerHeight < 1400
    );

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setIsMobile(window.innerWidth < 900);
            setIsIpad(window.innerWidth < 1050 && window.innerHeight < 1400);
        }, 1000);

        window.addEventListener("resize", debouncedHandleResize);

        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    });

    return (
        <>
            <Container
                id="aboutMe"
                className={isMobile || isIpad ? "section-mobile" : "section"}
            >
                <FadeInSection props={{ children: undefined, delay: "1000ms" }}>
                    <span className="sub-heading">A bit about me </span>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12} md={6}>
                            <ul>
                                {listItems.map((item, index) => {
                                    return (
                                        <FadeInSection
                                            props={{
                                                children: undefined,
                                                delay: `${
                                                    listItems.indexOf(item) + 1
                                                }000ms`,
                                            }}
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
                                    alt="displayPicture"
                                    className="display-pic"
                                ></img>
                            </FadeInSection>
                        </Grid>
                    </Grid>
                </FadeInSection>
            </Container>
        </>
    );
};

export default AboutMe;
