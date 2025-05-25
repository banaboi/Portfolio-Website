import { Grid2 as Grid, Container } from '@mui/material'
import React, { useEffect, useState, memo, useMemo } from 'react'
import FadeInSection from './FadeInSectionOptimized'
import DeathStarLoader from './DeathStarLoader'
import skillsElements from '../constants/skillsElements'
import Skill from './Skill'
import { useMediaQuery } from '../hooks/useMediaQuery'

// Import the type
interface SkillsElement {
    svg: React.SVGProps<SVGSVGElement>;
    title: string;
    popoverMsg: string;
}

const Skills = memo(() => {
    const { isMobile, isTablet } = useMediaQuery();
    const [isLoading, setIsLoading] = useState<boolean>(true);    // Memoize skills grid to prevent unnecessary re-renders
    const skillsGrid = useMemo(() => {
        return skillsElements.map((skillElement: SkillsElement, index: number) => (
            <Skill data={skillElement} key={index} />
        ));
    }, []);

    // Reduce loading time for better UX
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // Reduced from 1500ms

        return () => clearTimeout(timer);
    }, []);

    return (        <>
            <Container
                id="skills"
                className={isMobile || isTablet ? 'section-mobile' : 'section'}
            >
                <FadeInSection delay={300}> {/* Reduced from 500ms to 300ms */}
                    <span className="sub-heading">Force Powers & Abilities </span>

                    {isLoading ? (
                        <DeathStarLoader
                            size={70}
                            message="Channeling the Force..."
                        />
                    ) : (
                        <Grid className="skillsGrid" container spacing={1}>
                            {skillsGrid}
                        </Grid>
                    )}
                </FadeInSection>
            </Container>
        </>
    )
});

Skills.displayName = 'Skills';

export default Skills;
