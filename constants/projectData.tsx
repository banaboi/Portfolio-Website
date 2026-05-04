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
        title: "FirmwareScan",
        tech: ["Python", "NVD API", "IEC 62443"],
        desc: "CVE scanner for vendored embedded C/C++ libraries.",
        src: "https://github.com/banaboi/firmwarescan",
        demo: "",
        year: "2026",
        role: "Solo",
    },
    {
        title: "House Search",
        tech: ["Python", "Playwright", "Google Maps API"],
        desc: "Scrapes Domain.com.au listings and ranks them by transit time.",
        src: "https://github.com/banaboi/house_search",
        demo: "https://banaboi.github.io/house_search/",
        year: "2026",
        role: "Solo",
    },
    {
        title: "Circles",
        tech: ["React", "Python", "FastAPI"],
        desc: "University degree planner used by thousands of UNSW students.",
        src: "https://github.com/csesoc/Circles",
        demo: "https://circles.csesoc.unsw.edu.au/degree-wizard",
        year: "2022",
        role: "Contributor",
    },
];

export default projectData;
