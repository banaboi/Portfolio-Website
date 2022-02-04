interface ProjectData {
    title: string;
    tech: string[];
    desc: string;
    src: string;
    demo: string;
}

const projectData: ProjectData[] = [
    {
        title: "Chess Clone",
        tech: ["javascript ", "html ", "css"],
        desc: "A simple chess game that I built using vanilla Javascript",
        src: "https://github.com/banaboi/Chess",
        demo: "https://banaboi.github.io/Chess/",
    },

    {
        title: "Bliv",
        tech: ["typescript ", "react-native ", "redux"],
        desc: "A medieval Pixel Battle Game which I co-built as part of Hyope",
        src: "",
        demo: "https://hyope.com/app/bliv",
    },

    {
        title: "Invoice Automator",
        tech: ["python"],
        desc: "Python utility using Google API to automatically generate invoices",
        src: "https://github.com/banaboi/Chess",
        demo: "",
    },
];

export default projectData;
