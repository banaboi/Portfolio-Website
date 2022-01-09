import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import useWindowDimensions from "./utilities/useWindowDimensions";

import options from "../src/tsparticlesconfig";

const App = () => {
    const [counter, setCounter] = useState(0);
    const { height, width } = useWindowDimensions();
    return (
        <div className="App">
            <Particles options={options}></Particles>
            <div className="headline">
                <h1>Luke Banicevic</h1>
                <h2>Software Engineer</h2>
            </div>
        </div>
    );
};

export default App;
