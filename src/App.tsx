import React, { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";

import TitlePage from "../src/components/TitlePage";
import ExperiencePage from "../src/components/ExperiencePage";

const App = () => {
    return (
        <div className="App">
            <Container>
                <TitlePage />
                <ExperiencePage />
            </Container>
        </div>
    );
};

export default App;
