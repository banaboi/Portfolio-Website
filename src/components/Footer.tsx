import { Box, Container } from "@mui/material";
import React, { useState, ChangeEvent } from "react";

const Footer = () => {
    return (
        <>
            <footer className="footer-container">
                <Box ml={1}>
                    <Box className="footer">
                        <p> Made with 💕 by Luke Banicevic</p>
                    </Box>
                </Box>
            </footer>
        </>
    );
};

export default Footer;
