import { Grid, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import FadeInSection from "./FadeInSection";

import skillsElements from "../constants/skillsElements";
import Skill from "./Skill";

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

const Skills = () => {
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
        <>
            <Container
                id="skills"
                className={isMobile || isIpad ? "section-mobile" : "section"}
            >
                <FadeInSection props={{ children: undefined, delay: "1000ms" }}>
                    <span className="sub-heading">My Skills </span>
                    <Grid className="skillsGrid" container spacing={1}>
                        {skillsElements.map((skillElement, index) => {
                            return <Skill data={skillElement} key={index} />;
                        })}
                    </Grid>
                </FadeInSection>
            </Container>
        </>
    );
};

export default Skills;
