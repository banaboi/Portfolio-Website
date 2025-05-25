import React, { useEffect } from "react";
import "../src/styles/App.scss";
import Container from "@mui/material/Container";
import Introduction from "./components/Introduction";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { ThemeProvider } from "./contexts/ThemeContext";
import { 
    LazyAboutMe, 
    LazySkills, 
    LazyProjectsSection, 
    LazyContactMe 
} from "./components/LazyComponents";
import PerformanceMonitor from "./components/PerformanceMonitor";

const App = () => {
    // Start at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ThemeProvider>
            <div className="App">
                <Container component="main" className="contactContainer">
                    <Nav />
                    <Introduction />
                    <LazyAboutMe />
                    <LazySkills />
                    <LazyProjectsSection />
                    <LazyContactMe />
                </Container>
                <Footer />
                <PerformanceMonitor />
            </div>
        </ThemeProvider>
    );
};

export default App;
