import React, { memo, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import ProjectCard from "../components/ProjectCard";

import projectData from "../constants/projectData";
import FadeInSection from "./FadeInSectionOptimized";
import { useMediaQuery } from '../hooks/useMediaQuery';

const ProjectsSection = memo(() => {
    const { isMobile, isTablet } = useMediaQuery();

    // Memoize project cards to prevent unnecessary re-renders
    const projectCards = useMemo(() => {        return projectData.map((project, index) => (
            <FadeInSection
                key={project.title} // Use title as key instead of index
                delay={Math.min(index * 100, 400)} // Faster: 100ms increments, max 400ms
            >
                <div className="project">
                    <Grid item xs={12} md={6}>
                        <Box>
                            <ProjectCard data={project} />
                        </Box>
                    </Grid>
                </div>
            </FadeInSection>
        ));
    }, []);
    return (        <>
            <Container
                id="projectsSection"
                className={isMobile || isTablet ? "section-mobile" : "section"}
            >
                <FadeInSection delay={300}> {/* Reduced from 500ms to 300ms */}
                    <span className="sub-heading"> Galactic Missions </span>
                    <Grid className="projectGrid" container xs={12} spacing={1}>
                        {projectCards}
                    </Grid>
                </FadeInSection>
            </Container>
        </>
    );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
