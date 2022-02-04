import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

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
                href="https://github.com/banaboi/banaboi/blob/main/Luke%20Banicevic%20Resume%202022.pdf"
            >
                <FontAwesomeIcon className="favicon" icon={faFilePdf} />
            </a>
        </>
    );
};

export default Socials;
