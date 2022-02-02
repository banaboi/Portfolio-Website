import React from "react";
import "../src/styles/App.scss";
import "bootstrap/dist/css/bootstrap.css";

import TitlePage from "../src/components/TitlePage";
import ContactMe from "./components/ContactMe";

const App = () => {
    return (
        <div className="App">
            <TitlePage />
            <ContactMe />
        </div>
    );
};

export default App;
