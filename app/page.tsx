import Introduction from "../components/Introduction";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import ProjectsSection from "../components/ProjectsSection";
import ContactMe from "../components/ContactMe";
import JsonLd from "../components/JsonLd";

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luke Banicevic",
    url: "https://lukebanicevic.com",
    jobTitle: "Software Engineer II",
    worksFor: { "@type": "Organization", name: "ResMed" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "UNSW" },
    sameAs: [
        "https://github.com/banaboi",
        "https://www.linkedin.com/in/luke-banicevic-30860115b/",
    ],
};

export default function Home() {
    return (
        <>
            <JsonLd data={personJsonLd} />
            <Introduction />
            <AboutMe />
            <Skills />
            <ProjectsSection />
            <ContactMe />
        </>
    );
}
