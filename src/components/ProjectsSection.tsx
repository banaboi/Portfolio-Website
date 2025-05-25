import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import ProjectCard from "../components/ProjectCard";

import projectData from "../constants/projectData";
import FadeInSection from "./FadeInSection";

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

const ProjectsSection = () => {
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
                id="projectsSection"
                className={isMobile || isIpad ? "section-mobile" : "section"}
            >
                <FadeInSection props={{ children: undefined, delay: "1000ms" }}>
                    <span className="sub-heading"> Galactic Missions </span>
                    <Grid className="projectGrid" container xs={12} spacing={1}>
                        {projectData.map((project) => {
                            return (
                                <FadeInSection
                                    props={{
                                        children: undefined,
                                        delay: `${
                                            projectData.indexOf(project) + 2
                                        }000ms`,
                                    }}
                                >
                                    <div
                                        className="project"
                                        key={projectData.indexOf(project)}
                                    >
                                        <Grid item xs={12} md={6}>
                                            <Box>
                                                <ProjectCard data={project} />
                                            </Box>
                                        </Grid>
                                    </div>
                                </FadeInSection>
                            );
                        })}
                    </Grid>
                </FadeInSection>
            </Container>
        </>
    );
};

export default ProjectsSection;
