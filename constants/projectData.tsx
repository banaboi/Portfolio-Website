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
        desc: "CLI that finds CVEs in vendored embedded C/C++ dependencies by extracting library versions from source and binaries, mapping to NVD CPEs, and generating PDF vulnerability reports.",
        src: "https://github.com/banaboi/firmwarescan",
        demo: "",
        year: "2026",
        role: "Solo",
    },
    {
        title: "House Search",
        tech: ["Python", "Playwright", "Google Maps API"],
        desc: "Scrapes Domain.com.au listings, enriches them with transit times to key locations, and outputs a mobile-friendly HTML report.",
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
        title: "Invoice Automator",
        tech: ["Python"],
        desc: "Python utility using the Google API to auto-generate invoices.",
        src: "https://github.com/banaboi/InvoiceAutomator",
        demo: "",
        year: "2021",
        role: "Solo",
    },
];

export default projectData;
