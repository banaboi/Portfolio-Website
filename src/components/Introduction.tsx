import React, { useState } from "react";
import useWindowDimensions from "../utilities/useWindowDimensions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Socials from "../components/Socials";

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
                <Grid container xs={12}>
                    <Grid item xs={12} md={6}>
                        <h1 className="name">
                            <span className="special">{"<"}</span>Hey, I'm{" "}
                            <span className="special">Luke{"/>"}</span>
                        </h1>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className="socials" sx={{ mt: 3 }}>
                            <Socials />
                        </Box>
                    </Grid>
                </Grid>
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
