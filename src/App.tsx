import React, { useEffect } from "react";
import "../src/styles/App.scss";

import TitlePage from "../src/components/TitlePage";
import ContactMe from "./components/ContactMe";

const App = () => {
    // Start at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="App">
            <TitlePage />
            <ContactMe />
        </div>
    );
};

export default App;
