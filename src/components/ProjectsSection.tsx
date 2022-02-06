import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import ProjectCard from "../components/ProjectCard";

import projectData from "../constants/projectData";
import FadeInSection from "./FadeInSection";

const ProjectsSection = () => {
    const isMobile = window.innerWidth < 900;
    const isIpad = window.innerWidth < 1050 && window.innerHeight < 1400;
    return (
        <>
            <Container
                className={isMobile || isIpad ? "section-mobile" : "section"}
            >
                <FadeInSection props={{ children: undefined, delay: "1000ms" }}>
                    <span className="sub-heading"> Projects</span>
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
