import ProjectCard from "./ProjectCard";
import projectData from "../constants/projectData";

const ProjectsSection = () => (
    <section id="projectsSection" className="section">
        <h2 className="sub-heading">Projects</h2>
        <div className="project-grid">
            {projectData.map((project) => (
                <ProjectCard key={project.title} data={project} />
            ))}
        </div>
    </section>
);

export default ProjectsSection;
