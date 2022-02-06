import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFilePdf } from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
import resume from "../documents/resume.pdf";
import FadeInSection from "./FadeInSection";

const listItems = [
    <li className="list-item">
        <p>
            Currently studying <b>Computer Science </b> and <b>Engineering </b>@{" "}
            <b>University of New South Wales</b>
        </p>
    </li>,
    <li className="list-item">
        <p>
            Wrote code that powers a solar car @
            <a target="_blank" href="https://www.sunswift.com/">
                {" "}
                <b>Sunswift Racing</b>
            </a>
        </p>
    </li>,
    <li className="list-item">
        <p>
            Currently writing code that helps people breath @
            <a target="_blank" href="https://www.resmed.com.au/">
                {" "}
                <b>ResMed</b>
            </a>
        </p>
    </li>,
    <li className="list-item">
        <p>
            Co-founded a small venture called{" "}
            <a target="_blank" href="https://hyope.com/">
                {" "}
                <b>Hyope </b>
            </a>
            which specializes in <b>mobile app development</b>
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
    return (
        <>
            <Container id="guideBegin" className="section">
                <FadeInSection props={{ children: undefined, delay: "1000ms" }}>
                    <span className="sub-heading">A bit about me </span>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12} md={6}>
                            <ul>
                                {listItems.map((item) => {
                                    return (
                                        <FadeInSection
                                            props={{
                                                children: undefined,
                                                delay: `${
                                                    listItems.indexOf(item) + 1
                                                }000ms`,
                                            }}
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
                                    src="https://pbs.twimg.com/profile_images/1459843489097609218/uU_QIrdt_400x400.jpg"
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
