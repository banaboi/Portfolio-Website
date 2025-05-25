import React, { memo } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FadeInSection from './FadeInSectionOptimized'
import TypeWriter from './TypeWriter'
import { useMediaQuery } from '../hooks/useMediaQuery'

const Introduction = memo(() => {
    const { isMobile, isTablet } = useMediaQuery();

    return (
        <Container
            id="intro"
            className={isMobile || isTablet ? "intro-mobile" : "intro"}
        >
            <Box
                sx={{
                    mb: 1,
                    textAlign: "left",
                }}
            >
                <span
                    style={{
                        color: "var(--text-primary)",
                        fontSize: 20,
                        fontFamily: "Space Mono, monospace",
                        textShadow: "0 0 10px var(--shadow-color)",
                        transition: "color 0.3s ease, text-shadow 0.3s ease",
                    }}
                >
                    {" "}
                    <b>A long time ago, in a galaxy far, far away... my name is </b>
                </span>
                <h1 className="name">
                    <span className="special">
                        <TypeWriter
                            text="&lt;<b>Luke</b>/&gt;"
                            delay={150}
                            className="typewriter-wrapper"
                        />
                    </span>
                </h1>
            </Box>                <FadeInSection delay={800}> {/* Reduced from 3000ms to 800ms */}
                <br />
                <h3 className="headline">
                    A Jedi software engineer who uses the Force of technology to bring balance and joy
                    to the galaxy... and people's lives
                </h3>
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        color: 'var(--accent-secondary)',
                        fontSize: '1.2rem',
                        textShadow: '0 0 10px var(--shadow-color)',
                        fontFamily: 'Orbitron, monospace',
                        transition: 'color 0.3s ease, text-shadow 0.3s ease'
                    }}>
                        ✨ "Do or do not, there is no try" - Master Yoda
                    </span>
                </div>
                </FadeInSection>
        </Container>    );
});

Introduction.displayName = 'Introduction';

export default Introduction;
