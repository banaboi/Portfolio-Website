import React, { useState } from "react";
import useWindowDimensions from "../utilities/useWindowDimensions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typed from "react-typed";

const Introduction = () => {
    const { height, width } = useWindowDimensions();
    return (
        <Container className="contactContainer">
            <Box
                sx={{
                    mb: 1,
                    textAlign: "left",
                }}
            >
                <h1 className="name">
                    Hey, I'm <span className="special">{"<"}</span>Luke
                    <span className="special">{"/>"}</span>
                </h1>
            </Box>
            <br />
            <h3 className="headline">
                A software engineer who loves using technology to bring joy to
                people
                <span className="cursorBlink">|</span>
            </h3>
        </Container>
    );
};

export default Introduction;
