import next from "eslint-config-next/core-web-vitals";

// Next 16 removed the `next lint` command, so we run ESLint directly with the
// flat config array that `eslint-config-next` ships.
const config = [
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "coverage/**",
            "next-env.d.ts",
        ],
    },
    ...next,
];

export default config;
