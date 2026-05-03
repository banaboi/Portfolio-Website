// src/pages/Home.tsx
import React, { useEffect } from "react";
import Introduction from "../components/Introduction";
import {
    LazyAboutMe,
    LazySkills,
    LazyProjectsSection,
    LazyContactMe,
} from "../components/LazyComponents";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Introduction />
            <LazyAboutMe />
            <LazySkills />
            <LazyProjectsSection />
            <LazyContactMe />
        </>
    );
};

export default Home;
