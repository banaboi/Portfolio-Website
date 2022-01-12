import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";

import TitlePage from "../src/components/TitlePage";
import ExperiencePage from "../src/components/ExperiencePage";
import ContactMePage from "./components/ContactMePage";

const App = () => {
    return (
        <div className="App">
            <TitlePage />
            <ExperiencePage />
            <ContactMePage />
        </div>
    );
};

export default App;
