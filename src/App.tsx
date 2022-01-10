import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Particles from "react-tsparticles";
import useWindowDimensions from "./utilities/useWindowDimensions";
import { Container } from "react-bootstrap";
import options from "../src/tsparticlesconfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const App = () => {
    const [counter, setCounter] = useState(0);

    const { height, width } = useWindowDimensions();

    const headlineStyle = {
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
        <div className="App">
            <Particles className="particles" options={options}></Particles>
            <Container>
                <div className="headline" style={headlineStyle}>
                    <h1 style={nameStyle}>Luke Banicevic</h1>
                    <h2 style={professionStyle}>Software Engineer</h2>
                    <div className="socials" style={socialsStlye}>
                        <a
                            className="link"
                            href="https://www.linkedin.com/in/luke-banicevic-30860115b/"
                        >
                            <FontAwesomeIcon
                                style={fontAwesomeIconStyles}
                                icon={faLinkedin}
                            />
                        </a>
                        <a className="link" href="https://github.com/banaboi">
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
            </Container>
        </div>
    );
};

export default App;
