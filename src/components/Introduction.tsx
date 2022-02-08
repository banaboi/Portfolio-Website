import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FadeInSection from "./FadeInSection";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const debounce = (fn: () => void, ms: number) => {
    let timer: any;
    return () => {
        clearTimeout(timer);
        timer = setTimeout((_) => {
            timer = null;
            fn.apply(this);
        }, ms);
    };
};

const Introduction = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);
    const [isIpad, setIsIpad] = useState<boolean>(
        window.innerWidth < 1050 && window.innerHeight < 1400
    );

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setIsMobile(window.innerWidth < 900);
            setIsIpad(window.innerWidth < 1050 && window.innerHeight < 1400);
        }, 1000);

        window.addEventListener("resize", debouncedHandleResize);

        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    });

    return (
        <Container
            id="intro"
            className={isMobile || isIpad ? "intro-mobile" : "intro"}
        >
            <Box
                sx={{
                    mb: 1,
                    textAlign: "left",
                }}
            >
                <span
                    style={{
                        color: "grey",
                        fontSize: 20,
                    }}
                >
                    {" "}
                    <b>Hey, my name is </b>
                </span>
                <h1 className="name">
                    <span className="special">
                        <Typist avgTypingDelay={150}>
                            {"<"}
                            <b>Luke</b>
                            {"/>"}
                        </Typist>
                    </span>
                </h1>
            </Box>
            <FadeInSection props={{ children: undefined, delay: "5000ms" }}>
                <br />
                <h3 className="headline">
                    A software engineer who loves using technology to bring joy
                    to people
                </h3>
            </FadeInSection>
        </Container>
    );
};

export default Introduction;
