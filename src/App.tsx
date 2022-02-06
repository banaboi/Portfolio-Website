import React, { useEffect } from "react";
import "../src/styles/App.scss";
import Container from "@mui/material/Container";
import Introduction from "./components/Introduction";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import ProjectsSection from "./components/ProjectsSection";
import Nav from "./components/Nav";

const App = () => {
    // Start at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="App">
            <Container component="main" className="contactContainer">
                <Nav />
                <Introduction />
                <AboutMe />
                <ProjectsSection />
            </Container>
            <Footer />
        </div>
    );
};

export default App;
