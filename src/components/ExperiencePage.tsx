import React from "react";
import "../App.scss";
import "bootstrap/dist/css/bootstrap.css";
import useWindowDimensions from "../utilities/useWindowDimensions";
import { Container } from "react-bootstrap";

const ExperiencePage = () => {
    const { height, width } = useWindowDimensions();

    return (
        <div className="experiencePage">
            <Container>
                <div>hello</div>
            </Container>
        </div>
    );
};

export default ExperiencePage;
