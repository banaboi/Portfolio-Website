import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import FadeInSection from "./FadeInSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
    faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

import backendSkillsElements from "../constants/backendSkillElements";
import Skill from "./Skill";

interface SkillsElement {
    svg: React.SVGProps<SVGSVGElement>;
    title: string;
    popoverMsg: string;
}

const BackendSkillGrid = () => {
    return (
        <FadeInSection
            props={{
                children: undefined,
                delay: "1000ms",
            }}
        >
            <Grid className="skill-grid" container xs={12}>
                <Grid item xs={12}>
                    <span
                        style={{
                            color: "white",
                            fontSize: ".7em",
                        }}
                    >
                        {" "}
                        Backend{" "}
                    </span>
                    <FontAwesomeIcon icon={faLinkedin} />
                </Grid>
                <Grid item xs={12}>
                    <Grid className="skillsGrid" container xs={12} spacing={1}>
                        {backendSkillsElements.map((skillElement, index) => {
                            return <Skill data={skillElement} key={index} />;
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </FadeInSection>
    );
};

export default BackendSkillGrid;
