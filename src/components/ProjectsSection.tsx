import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const ProjectsSection = () => {
    return (
        <>
            <Container>
                <h3 className="sub-heading"> Projects</h3>
                <hr />
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Box> Project 1</Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box> Project 2</Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box> Project 3</Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ProjectsSection;
