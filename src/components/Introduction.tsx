import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FadeInSection from "./FadeInSection";
import Typist from "react-typist";
import Button from "@mui/material/Button";

const Introduction = () => {
    const isMobile = window.innerWidth < 900;

    return (
        <Container className={isMobile ? "intro-mobile" : "intro"}>
            <Box
                sx={{
                    mb: 1,
                    textAlign: "left",
                }}
            >
                <span
                    style={{
                        color: "grey",
                        fontSize: 20,
                    }}
                >
                    {" "}
                    <b>Hey, my name is </b>
                </span>
                <h1 className="name">
                    <span className="special">
                        <Typist avgTypingDelay={150}>
                            <b>
                                {"<"}Luke{"/>"}
                            </b>
                        </Typist>
                    </span>
                </h1>
            </Box>
            <FadeInSection props={{ children: undefined, delay: "5000ms" }}>
                <br />
                <h3 className="headline">
                    A software engineer who loves using technology to bring joy
                    to people
                    <span className="cursorBlink">|</span>
                </h3>
            </FadeInSection>
        </Container>
    );
};

export default Introduction;
