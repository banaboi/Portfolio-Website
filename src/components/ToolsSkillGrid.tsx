import { Grid }  from "@mui/material";
import React from "react";
import FadeInSection from "./FadeInSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import toolSkillElements from "../constants/toolSkillElements";
import Skill from "./Skill";

const ToolsSkillGrid = () => {
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
                        Tools{" "}
                    </span>
                    <FontAwesomeIcon icon={faLinkedin} />
                </Grid>
                <Grid item xs={12}>
                    <Grid className="skillsGrid" container xs={12} spacing={1}>
                        {toolSkillElements.map((skillElement, index) => {
                            return <Skill data={skillElement} key={index} />;
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </FadeInSection>
    );
};

export default ToolsSkillGrid;
