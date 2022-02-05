import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import ProjectCard from "../components/ProjectCard";

import projectData from "../constants/projectData";

const ProjectsSection = () => {
    return (
        <>
            <Container className="projectSection">
                <span className="sub-heading"> Projects</span>
                <Grid
                    className="projectGrid"
                    spacing={{ xs: 2, md: 3 }}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {projectData.map((project) => {
                        return (
                            <div className="project" key={1}>
                                <Grid xs>
                                    <Box>
                                        <ProjectCard data={project} />
                                    </Box>
                                </Grid>
                            </div>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};

export default ProjectsSection;
