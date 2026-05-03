import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const EMAIL = "lukebanicevic@gmail.com";

const ContactMe = () => {
    return (
        <section id="contact" className="section contact-section">
            <h2 className="sub-heading">Contact</h2>
            <p className="contact-copy">
                Best place to reach me is email. I check it daily.
            </p>
            <a className="contact-email" href={`mailto:${EMAIL}`}>
                {EMAIL}
            </a>
            <ul className="contact-socials">
                <li>
                    <a
                        href={`mailto:${EMAIL}`}
                        aria-label="Email Luke"
                    >
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/luke-banicevic-30860115b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/banaboi"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default ContactMe;
