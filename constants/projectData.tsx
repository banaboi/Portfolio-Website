interface ProjectData {
    title: string;
    tech: string[];
    desc: string;
    src: string;
    demo: string;
    year: string;
    role: string;
}

const projectData: ProjectData[] = [
    {
        title: "Circles",
        tech: ["React", "Python", "FastAPI"],
        desc: "University degree planner used by thousands of UNSW students.",
        src: "https://github.com/csesoc/Circles",
        demo: "https://circles.csesoc.unsw.edu.au/degree-wizard",
        year: "2022",
        role: "Contributor",
    },
    {
        title: "Hyope Web",
        tech: ["TypeScript", "React", "Next.js", "Sass"],
        desc: "Marketing site for the Hyope game studio venture.",
        src: "",
        demo: "",
        year: "2022",
        role: "Co-builder",
    },
    {
        title: "Bliv",
        tech: ["TypeScript", "React Native", "Redux"],
        desc: "Medieval pixel-art battle game built under Hyope.",
        src: "",
        demo: "",
        year: "2022",
        role: "Co-builder",
    },
    {
        title: "Chess Clone",
        tech: ["JavaScript", "HTML", "CSS"],
        desc: "Browser chess game built in vanilla JavaScript.",
        src: "https://github.com/banaboi/Chess",
        demo: "https://banaboi.github.io/Chess/",
        year: "2021",
        role: "Solo",
    },
    {
        title: "Invoice Automator",
        tech: ["Python"],
        desc: "Python utility using the Google API to auto-generate invoices.",
        src: "https://github.com/banaboi/InvoiceAutomator",
        demo: "",
        year: "2021",
        role: "Solo",
    },
    {
        title: "Minesweeper Clone",
        tech: ["JavaScript", "HTML", "CSS"],
        desc: "Minesweeper rebuilt as a web application.",
        src: "https://github.com/banaboi/Minesweeper",
        demo: "https://banaboi.github.io/Minesweeper/",
        year: "2020",
        role: "Solo",
    },
];

export default projectData;
