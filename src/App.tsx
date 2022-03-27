import React, { useEffect } from "react";
import "../src/styles/App.scss";
import Container from "@mui/material/Container";
import Introduction from "./components/Introduction";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import ProjectsSection from "./components/ProjectsSection";
import ContactMe from "./components/ContactMe";
import Nav from "./components/Nav";
import Skills from "./components/Skills";
import Socials from "./components/Socials";

const App = () => {
    // Start at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log("These aren't the bits you're looking for");

    return (
        <div className="App">
            <Container component="main" className="contactContainer">
                <Nav />
                <Introduction />
                <AboutMe />
                <Skills />
                <ProjectsSection />
                <ContactMe />
            </Container>
            <Footer />
        </div>
    );
};

export default App;
