import React from "react";
import "../App.scss";
import "bootstrap/dist/css/bootstrap.css";
import useWindowDimensions from "../utilities/useWindowDimensions";
import Particles from "react-tsparticles";
import options from "../tsparticlesconfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const TitlePage = () => {
    const { height, width } = useWindowDimensions();

    const titlePageStyle = {
        color: "white",
        width: width,
        height: height * 0.2,
        top: "30%",
        left: 0,
    };

    const professionStyle = {
        fontStyle: "italic",
        fontWeight: 10,
        fontSize: "5vw",
    };

    const nameStyle = {
        fontSize: "10vw",
        fontStyle: "bold",
    };

    const socialsStlye = {
        width: width,
        height: height * 0.2,
        color: "white",
    };

    const fontAwesomeIconStyles = {
        height: "4vw",
        width: "4vw",
        padding: "0.4vw",
    };

    return (
        <div className="titlePage" style={titlePageStyle}>
            <Particles className="particles" options={options}></Particles>
            <h1 style={nameStyle}>Luke Banicevic</h1>
            <h2 style={professionStyle}>Software Engineer</h2>
            <div className="socials" style={socialsStlye}>
                <a
                    className="link"
                    target="_blank"
                    href="https://www.linkedin.com/in/luke-banicevic-30860115b/"
                >
                    <FontAwesomeIcon
                        style={fontAwesomeIconStyles}
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
                        icon={faGithub}
                    />
                </a>
                <FontAwesomeIcon
                    style={fontAwesomeIconStyles}
                    icon={faEnvelope}
                />
            </div>
        </div>
    );
};

export default TitlePage;
