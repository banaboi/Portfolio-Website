interface ProjectData {
    title: string;
    tech: string[];
    desc: string;
    src: string;
    demo: string;
}

const projectData: ProjectData[] = [
    {
        title: "Circles",
        tech: ["reactjs ", "python ", "fastapi"],
        desc: "University degree planner for UNSW students",
        src: "https://github.com/csesoc/Circles",
        demo: "https://circles.csesoc.unsw.edu.au/degree-wizard",
    },
    {
        title: "Hyope Web Page",
        tech: ["typescript ", "reactjs ", "sass ", "nextjs"],
        desc: "Co-built the main webpage for the small venture Hyope",
        src: "",
        demo: "https://hyope.com/",
    },

    {
        title: "Bliv",
        tech: ["typescript ", "react-native ", "redux"],
        desc: "A medieval Pixel Battle Game which I co-built as part of Hyope",
        src: "",
        demo: "https://hyope.com/app/bliv",
    },
    {
        title: "Chess Clone",
        tech: ["javascript ", "html ", "css"],
        desc: "A simple chess game that I built using vanilla Javascript",
        src: "https://github.com/banaboi/Chess",
        demo: "https://banaboi.github.io/Chess/",
    },

    {
        title: "Invoice Automator",
        tech: ["python"],
        desc: "Python utility using Google API to automatically generate invoices",
        src: "https://github.com/banaboi/InvoiceAutomator",
        demo: "",
    },

    {
        title: "Minesweeper Clone",
        tech: ["javascript ", "html ", "css"],
        desc: "Minesweeper built as a web application",
        src: "https://github.com/banaboi/Minesweeper",
        demo: "https://banaboi.github.io/Minesweeper/",
    },
];

export default projectData;
