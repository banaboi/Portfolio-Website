import React from "react";
import { Container } from "react-bootstrap";
import useWindowDimensions from "../utilities/useWindowDimensions";

const ContactMePage = () => {
    const { height, width } = useWindowDimensions();

    const contactMePageStyle = {
        height: height * 0.5,
        width: width,
        color: "red",
        backgroundColor: "blue",
        display: "block",
    };

    return (
        <div className="contactMePage" style={contactMePageStyle}>
            <Container>
                <div>Hi</div>
            </Container>
        </div>
    );
};

export default ContactMePage;
