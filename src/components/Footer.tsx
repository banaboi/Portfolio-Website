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
                            Crafted with the Force ⚡ by Jedi Master Luke Banicevic, holographic designs by{" "}                            <a
                                target="_blank"
                                href="https://www.instagram.com/re_entry.design/" 
                                rel="noopener noreferrer"
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
                            color: "#e0e0e0",
                            textShadow: "0 0 5px rgba(224, 224, 224, 0.3)",
                        }}
                    >
                        May the Force be with you. All rights reserved across the galaxy.© {new Date().getFullYear()}
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
