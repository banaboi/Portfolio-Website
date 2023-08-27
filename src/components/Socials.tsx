import React from "react";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";

const Socials = () => {
    return (
        <Box className="bar">
            <a
                className="link"
                target="_blank"
                href="https://www.linkedin.com/in/luke-banicevic-30860115b/" rel="noreferrer"
            >
                <FontAwesomeIcon className="favicon" icon={faLinkedin} />
            </a>
            <a
                className="link"
                target="_blank"
                href="https://github.com/banaboi" rel="noreferrer"
            >
                <FontAwesomeIcon className="favicon" icon={faGithubSquare} />
            </a>
        </Box>
    );
};

export default Socials;
