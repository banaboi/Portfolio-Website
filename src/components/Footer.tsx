import { Box } from "@mui/material";
import React from "react";

import Socials from "../components/Socials";

const Footer = () => {
    return (
        <>
            <footer id="footer" className="footer-container">
                <Box sx={{ ml: 1 }}>
                    <Box className="footer">
                        <p>
                            {" "}
                            Made with 🤖 by Luke Banicevic, sprite made by{" "}
                            <a
                                target="_blank"
                                href="https://www.instagram.com/re_entry.design/" rel="noreferrer"
                            >
                                {" "}
                                Re-Entry Design
                            </a>
                        </p>
                    </Box>
                    <p
                        style={{
                            fontSize: 11,
                            marginTop: 0,
                            color: "grey",
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
