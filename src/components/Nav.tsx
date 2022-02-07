import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Socials from "./Socials";

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

const Nav = () => {
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
    if (isMobile) {
        return (
            <Box
                sx={{
                    height: "1.4em",
                }}
                className="nav-wrapper-mobile"
            >
                <Socials />
            </Box>
        );
    } else {
        return (
            <Box className="nav-wrapper">
                <Box className="nav">
                    <span className="special">
                        {" "}
                        <a href="#intro">/home</a>{" "}
                    </span>
                    <span className="special">
                        {" "}
                        <a href="#aboutMe">/about me</a>{" "}
                    </span>
                    <span className="special">
                        {" "}
                        <a href="#projectsSection">/projects</a>{" "}
                    </span>
                    <span className="special">
                        {" "}
                        <a href="#footer">/contact me</a>{" "}
                    </span>
                </Box>
                <Socials />
            </Box>
        );
    }
};

export default Nav;
