import React from "react";
import Box from "@mui/material/Box";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithubSquare,
    faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

const Socials = () => {
    return (
        <Box className="bar">
            <a
                className="link"
                target="_blank"
                href="https://www.linkedin.com/in/luke-banicevic-30860115b/"
            >
                <FontAwesomeIcon className="favicon" icon={faLinkedin} />
            </a>
            <a
                className="link"
                target="_blank"
                href="https://github.com/banaboi"
            >
                <FontAwesomeIcon className="favicon" icon={faGithubSquare} />
            </a>

            <a
                className="link"
                target="_blank"
                href="https://twitter.com/banaboi_io"
            >
                <FontAwesomeIcon className="favicon" icon={faTwitterSquare} />
            </a>
        </Box>
    );
};

export default Socials;
