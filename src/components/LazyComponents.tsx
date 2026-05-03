import React, { Suspense, lazy } from "react";

const AboutMe = lazy(() => import("./AboutMe"));
const Skills = lazy(() => import("./Skills"));
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const ContactMe = lazy(() => import("./ContactMe"));

const Fallback = () => <div className="lazy-fallback" aria-hidden="true" />;

export const LazyAboutMe = () => (
    <Suspense fallback={<Fallback />}>
        <AboutMe />
    </Suspense>
);

export const LazySkills = () => (
    <Suspense fallback={<Fallback />}>
        <Skills />
    </Suspense>
);

export const LazyProjectsSection = () => (
    <Suspense fallback={<Fallback />}>
        <ProjectsSection />
    </Suspense>
);

export const LazyContactMe = () => (
    <Suspense fallback={<Fallback />}>
        <ContactMe />
    </Suspense>
);
