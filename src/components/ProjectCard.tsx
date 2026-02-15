import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
    faDesktop,
    faUserSecret,
    faBan,
} from "@fortawesome/free-solid-svg-icons";

interface ProjectData {
    title: string;
    tech: string[];
    desc: string;
    src: string;
    demo: string;
}

const ProjectCard = ({ data }: { data: ProjectData }) => {
    return (
        <>
            <Card className="project-card">
                <CardActionArea>
                    <CardContent>
                        <Box
                            style={{
                                marginLeft: 9,
                            }}
                        >
                            <h1>{data.title}</h1>
                            <p>{data.desc}</p>
                        </Box>

                        <CardActions disableSpacing>
                            <Box
                                sx={{
                                    mr: 2,
                                }}
                            >                                {data.demo !== "" ? (
                                    <p>
                                        🚀 Launch mission{" "}
                                        <a target="_blank" href={data.demo} rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faDesktop} />
                                        </a>
                                    </p>
                                ) : (
                                    <p>
                                        🔒 Mission classified{" "}
                                        <FontAwesomeIcon icon={faBan} />
                                    </p>
                                )}
                            </Box>
                            <Box>
                                {data.src !== "" ? (
                                    <p>
                                        📡 Access databank{" "}
                                        <a target="_blank" href={data.src} rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faGithub} />
                                        </a>
                                    </p>
                                ) : (
                                    <p>
                                        🛡️ Imperial secrets{" "}
                                        <FontAwesomeIcon icon={faUserSecret} />
                                    </p>
                                )}
                            </Box>
                        </CardActions>
                    </CardContent>
                    {data.tech.map((technology, index) => {
                        return (
                            <p
                                key={index}
                                style={{
                                    display: "inline",
                                    marginLeft: 25,
                                    color: "var(--text-secondary)",
                                    fontSize: "0.8rem",
                                    textShadow: "0 0 5px var(--shadow-color)",
                                }}
                            >
                                ⚡ {technology.trim()}
                            </p>
                        );
                    })}
                </CardActionArea>
            </Card>
        </>
    );
};

export default ProjectCard;
