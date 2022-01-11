import React, { useState } from "react";
import "../App.scss";
import "bootstrap/dist/css/bootstrap.css";
import useWindowDimensions from "../utilities/useWindowDimensions";

const ExperiencePage = () => {
    const { height, width } = useWindowDimensions();

    const experiencePageStyle = {
        width: width,
        color: "red",
    };

    return (
        <div className="experiencePage" style={experiencePageStyle}>
            Hello
        </div>
    );
};

export default ExperiencePage;
