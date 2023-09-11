import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#121212",
                "bg-background-01": "#16161899",
            },
            colors: {
                "label-02": "#EBEBF599",
                "label-03": "#EBEBF54D",
            },
        },
    },
    plugins: [],
};
export default config;
