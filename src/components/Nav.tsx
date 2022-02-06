import React from "react";

import Box from "@mui/material/Box";
import Socials from "./Socials";
import { Grid } from "@mui/material";

const Nav = () => {
    const isMobile = window.innerWidth < 900;
    const isIpad = window.innerWidth < 1050 && window.innerHeight < 1400;
    if (isMobile) {
        return (
            <Box
                sx={{
                    height: "1.4em",
                }}
                className="nav-wrapper-mobile"
            >
                <Socials />
            </Box>
        );
    } else {
        return (
            <Box className="nav-wrapper">
                <Box className="nav">
                    <span className="special">
                        {" "}
                        <a href="#intro">/home</a>{" "}
                    </span>
                    <span className="special">
                        {" "}
                        <a href="#aboutMe">/about me</a>{" "}
                    </span>
                    <span className="special">
                        {" "}
                        <a href="#projectsSection">/projects</a>{" "}
                    </span>
                    <span className="special">
                        {" "}
                        <a href="#footer">/contact me</a>{" "}
                    </span>
                </Box>
                <Socials />
            </Box>
        );
    }
};

export default Nav;
