import React from "react";

import Box from "@mui/material/Box";
import Socials from "./Socials";

const Nav = () => {
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
};

export default Nav;
