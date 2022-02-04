import React, { useEffect } from "react";
import "../src/styles/App.scss";
import Container from "@mui/material/Container";

import Introduction from "./components/Introduction";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import ProjectsSection from "./components/ProjectsSection";

const App = () => {
    // Start at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="App">
            <Container component="main" className="contactContainer">
                <Introduction />
                <AboutMe />
                <ProjectsSection />
            </Container>
            <Footer />
        </div>
    );
};

export default App;
