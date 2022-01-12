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

    const professionStyle = {
        fontStyle: "bold",
        fontWeight: 10,
        fontSize: "4vw",
    };

    const nameStyle = {
        fontSize: "10vw",
        fontStyle: "bold",
    };

    const socialsStyle = {
        height: height * 0.2,
        color: "white",
    };

    const fontAwesomeIconStyles = {
        height: "10vw",
        width: "10vw",
        padding: "1vw",
    };

    return (
        <div className="titlePage">
            <Container>
                <Particles className="particles" options={options}></Particles>
                <div className="headline">
                    <h1 className="name" style={nameStyle}>
                        Luke Banicevic
                    </h1>
                    <h2 className="profession" style={professionStyle}>
                        Undergraduate Software Engineer
                    </h2>
                    <div className="socials" style={socialsStyle}>
                        <a
                            className="link"
                            target="_blank"
                            href="https://www.linkedin.com/in/luke-banicevic-30860115b/"
                        >
                            <FontAwesomeIcon
                                style={fontAwesomeIconStyles}
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
                                style={fontAwesomeIconStyles}
                                className="favicon"
                                icon={faGithub}
                            />
                        </a>

                        <FontAwesomeIcon
                            style={fontAwesomeIconStyles}
                            className="favicon"
                            icon={faEnvelope}
                        />
                        <a
                            className="link"
                            target="_blank"
                            href="https://github.com/banaboi/banaboi/blob/main/Luke%20Banicevic%20Resume2021.pdf"
                        >
                            <FontAwesomeIcon
                                style={fontAwesomeIconStyles}
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
