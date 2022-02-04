import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Socials from "../components/Socials";

const AboutMe = () => {
    return (
        <>
            <Box
                sx={{
                    mt: 10,
                    mb: 10,
                }}
            >
                <Container>
                    <h3 className="sub-heading">
                        A bit about me{" "}
                        <span className="special">
                            <hr />
                        </span>
                    </h3>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12} md={6}>
                            <ul>
                                <li className="list-item">
                                    {" "}
                                    An undergraduate in Computer Science and
                                    Engineering @ UNSW
                                </li>
                                <li className="list-item">
                                    {" "}
                                    Wrote code that powers a solar car @
                                    Sunswift Racing
                                    <a
                                        id="small-link"
                                        className="link"
                                        target="_blank"
                                        href="https://www.sunswift.com/"
                                    >
                                        🔗
                                    </a>
                                </li>
                                <li className="list-item">
                                    {" "}
                                    Writing code that helps people breath @
                                    ResMed
                                    <a
                                        id="small-link"
                                        className="link"
                                        target="_blank"
                                        href="https://www.resmed.com.au/"
                                    >
                                        🔗
                                    </a>
                                </li>
                                <li className="list-item">
                                    {" "}
                                    Co-founded a small venture called Hyope
                                    which specializes in mobile app development
                                    <a
                                        id="small-link"
                                        className="link"
                                        target="_blank"
                                        href="https://hyope.com/"
                                    >
                                        🔗
                                    </a>
                                </li>
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
                            <img
                                src="https://pbs.twimg.com/profile_images/1459843489097609218/uU_QIrdt_400x400.jpg"
                                alt="displayPicture"
                                className="display-pic"
                            ></img>
                            <Box
                                className="socials"
                                sx={{ mt: 3, textAlign: "left" }}
                            >
                                <Socials />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default AboutMe;
