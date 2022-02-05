import { Box } from "@mui/material";
import React from "react";

import Socials from "../components/Socials";
import ContactMe from "../components/ContactMe";

const Footer = () => {
    return (
        <>
            <footer className="footer-container">
                <ContactMe />
                <Box ml={1}>
                    <Box className="footer">
                        <p> Made with 🤖 by Luke Banicevic</p>
                    </Box>
                    <p
                        style={{
                            fontSize: 11,
                            marginTop: 0,
                        }}
                    >
                        All rights reserved.©
                    </p>
                    <Box className="footer-socials">
                        <Socials />
                    </Box>
                </Box>
            </footer>
        </>
    );
};

export default Footer;
