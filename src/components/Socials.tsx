import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
    faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

const Socials = () => {
    return (
        <>
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
                <FontAwesomeIcon className="favicon" icon={faGithub} />
            </a>

            <a
                className="link"
                target="_blank"
                href="https://twitter.com/banaboi_io"
            >
                <FontAwesomeIcon className="favicon" icon={faTwitterSquare} />
            </a>
        </>
    );
};

export default Socials;
