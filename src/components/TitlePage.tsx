import React from "react";
import "../App.scss";
import "bootstrap/dist/css/bootstrap.css";
import useWindowDimensions from "../utilities/useWindowDimensions";
import Particles from "react-tsparticles";
import options from "../tsparticlesconfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Container } from "react-bootstrap";

const TitlePage = () => {
    const { height, width } = useWindowDimensions();

    return (
        <div className="titlePage">
            <Container>
                <Particles className="particles" options={options}></Particles>
                <div className="headline">
                    <h1 className="name">Luke Banicevic</h1>
                    <h2 className="profession">
                        Undergraduate Software Engineer
                    </h2>
                    <div className="socials">
                        <a
                            className="link"
                            target="_blank"
                            href="https://www.linkedin.com/in/luke-banicevic-30860115b/"
                        >
                            <FontAwesomeIcon
                                className="favicon"
                                icon={faLinkedin}
                            />
                        </a>
                        <a
                            className="link"
                            target="_blank"
                            href="https://github.com/banaboi"
                        >
                            <FontAwesomeIcon
                                className="favicon"
                                icon={faGithub}
                            />
                        </a>

                        <a className="link">
                            <FontAwesomeIcon
                                className="favicon"
                                icon={faEnvelope}
                            />
                        </a>

                        <a
                            className="link"
                            target="_blank"
                            href="https://github.com/banaboi/banaboi/blob/main/Luke%20Banicevic%20Resume2021.pdf"
                        >
                            <FontAwesomeIcon
                                className="favicon"
                                icon={faFilePdf}
                            />
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TitlePage;
