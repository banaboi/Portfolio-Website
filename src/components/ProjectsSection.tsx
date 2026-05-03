import React, { memo } from "react";
import ProjectCard from "./ProjectCard";
import projectData from "../constants/projectData";

const ProjectsSection = memo(() => {
    return (
        <section id="projectsSection" className="section">
            <h2 className="sub-heading">Projects</h2>
            <div className="project-grid">
                {projectData.map((project) => (
                    <ProjectCard key={project.title} data={project} />
                ))}
            </div>
        </section>
    );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
