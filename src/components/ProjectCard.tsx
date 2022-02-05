import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions, IconButton } from "@mui/material";
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
    useEffect(() => {
        console.log(data);
    }, []);

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
                            >
                                {data.demo !== "" ? (
                                    <p>
                                        View demo{" "}
                                        <a target="_blank" href={data.demo}>
                                            <FontAwesomeIcon icon={faDesktop} />
                                        </a>
                                    </p>
                                ) : (
                                    <p>
                                        Demo limited{" "}
                                        <FontAwesomeIcon icon={faBan} />
                                    </p>
                                )}
                            </Box>
                            <Box>
                                {data.src !== "" ? (
                                    <p>
                                        View source{" "}
                                        <a target="_blank" href={data.src}>
                                            <FontAwesomeIcon icon={faGithub} />
                                        </a>
                                    </p>
                                ) : (
                                    <p>
                                        Source private{" "}
                                        <FontAwesomeIcon icon={faUserSecret} />
                                    </p>
                                )}
                            </Box>
                        </CardActions>
                    </CardContent>
                    {data.tech.map((technology) => {
                        return (
                            <p
                                style={{
                                    display: "inline",
                                    marginLeft: 25,
                                    color: "grey",
                                }}
                            >
                                {technology}
                            </p>
                        );
                    })}
                </CardActionArea>
            </Card>
        </>
    );
};

export default ProjectCard;
