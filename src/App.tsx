import React, { useEffect } from "react";
import "../src/styles/App.scss";

import TitlePage from "../src/components/TitlePage";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";

const App = () => {
    // Start at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="App">
            <TitlePage />
            <ContactMe />
            <Footer />
        </div>
    );
};

export default App;
