import React from "react";
import useWindowDimensions from "../utilities/useWindowDimensions";
import Particles from "react-tsparticles";
import options from "../tsparticlesconfig";
import Container from "@mui/material/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const TitlePage = () => {
    const { height, width } = useWindowDimensions();

    return (
        <Container component="main" maxWidth="sm" className="contactContainer">
            <img
                src="https://pbs.twimg.com/profile_images/1459843489097609218/uU_QIrdt_400x400.jpg"
                alt="displayPicture"
                className="display-pic"
            ></img>
            <h1 className="name">Hey, I'm Luke</h1>
            <h3 className="sub-heading">
                Im a software engineer who loves creating things which bring joy
                to people
            </h3>
            <h3 className="sub-heading">A bit about me</h3>
            <ul>
                <li className="list-item">
                    {" "}
                    Undergraduate in computer science and engineering at UNSW
                </li>
                <li className="list-item">
                    {" "}
                    Wrote some code that makes a car move -- Sunswift Racing
                    <a
                        id="small-link"
                        className="link"
                        target="_blank"
                        href="https://www.sunswift.com/"
                    >
                        🔗
                    </a>
                </li>
                <li className="list-item">
                    {" "}
                    Writing code to help people breath -- ResMed
                    <a
                        id="small-link"
                        className="link"
                        target="_blank"
                        href="https://www.resmed.com.au/"
                    >
                        🔗
                    </a>
                </li>
                <li className="list-item">
                    {" "}
                    Co-founded a small venture called Hyope which specializes in
                    mobile app development
                    <a
                        id="small-link"
                        className="link"
                        target="_blank"
                        href="https://hyope.com/"
                    >
                        🔗
                    </a>
                </li>
            </ul>
            <h3 className="sub-heading">Here are my socials</h3>
            <div className="socials">
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

                <a className="link" href="mailto:lukebanicevic@gmail.com">
                    <FontAwesomeIcon className="favicon" icon={faEnvelope} />
                </a>

                <a
                    className="link"
                    target="_blank"
                    href="https://github.com/banaboi/banaboi/blob/main/Luke%20Banicevic%20Resume%202022.pdf"
                >
                    <FontAwesomeIcon className="favicon" icon={faFilePdf} />
                </a>
            </div>
        </Container>
    );
};

export default TitlePage;
