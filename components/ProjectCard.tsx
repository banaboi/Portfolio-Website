import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface ProjectData {
    title: string;
    tech: string[];
    desc: string;
    src: string;
    demo: string;
    year: string;
    role: string;
}

const ProjectCard = ({ data }: { data: ProjectData }) => (
    <article className="project-card">
        <header className="project-card-header">
            <h3>{data.title}</h3>
            <div className="project-card-links">
                {data.src && (
                    <a
                        href={data.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${data.title} source`}
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                )}
                {data.demo && (
                    <a
                        href={data.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${data.title} live demo`}
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                )}
            </div>
        </header>
        <p className="project-card-meta">
            {data.year} · {data.role}
        </p>
        <p className="project-card-desc">{data.desc}</p>
        <ul className="project-card-tech">
            {data.tech.map((t) => (
                <li key={t}>{t.trim()}</li>
            ))}
        </ul>
    </article>
);

export default ProjectCard;
