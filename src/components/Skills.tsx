import { Grid2 as Grid, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FadeInSection from './FadeInSection'
import DeathStarLoader from './DeathStarLoader'
import skillsElements from '../constants/skillsElements'
import Skill from './Skill'

const debounce = (fn: () => void, ms: number) => {
    let timer: NodeJS.Timeout | null = null
    return () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn()
        }, ms)
    }
}

const Skills = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900)
    const [isIpad, setIsIpad] = useState<boolean>(
        window.innerWidth < 1050 && window.innerHeight < 1400
    )
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setIsMobile(window.innerWidth < 900)
            setIsIpad(window.innerWidth < 1050 && window.innerHeight < 1400)
        }, 1000)

        window.addEventListener('resize', debouncedHandleResize)

        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    }, [])

    // Simulate loading skills (in a real app, this might be an API call)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500) // Show loader for 1.5 seconds

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <Container
                id="skills"
                className={isMobile || isIpad ? 'section-mobile' : 'section'}
            >
                <FadeInSection delay="1000ms">
                    <span className="sub-heading">Force Powers & Abilities </span>

                    {isLoading ? (
                        <DeathStarLoader
                            size={70}
                            message="Channeling the Force..."
                        />
                    ) : (
                        <Grid className="skillsGrid" container spacing={1}>
                            {skillsElements.map((skillElement: any, index: number) => {
                                return <Skill data={skillElement} key={index} />
                            })}
                        </Grid>
                    )}
                </FadeInSection>
            </Container>
        </>
    )
};

export default Skills;
