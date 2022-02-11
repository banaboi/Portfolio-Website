import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import FadeInSection from "./FadeInSection";
import Popover from "@mui/material/Popover";

interface SkillsElement {
    svg: React.SVGProps<SVGSVGElement>;
    title: string;
    popoverMsg: string;
}

const Skill = ({ data, key }: { data: SkillsElement; key: number }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <FadeInSection
            props={{
                children: undefined,
                delay: `${key + 2}000ms`,
            }}
        >
            <Grid className="skill" item xs={12} key={key}>
                <Box
                    onClick={handlePopoverOpen}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    {data.svg}
                </Box>

                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: "none",
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <b
                        style={{
                            fontSize: "1em",
                        }}
                    >
                        {data.title}
                    </b>
                    <p>{data.popoverMsg}</p>
                </Popover>
            </Grid>
        </FadeInSection>
    );
};

export default Skill;
