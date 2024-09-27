import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                strong: "0 0 50px 0 #D7D7D7",
            },
            animation: {
                rotate: "rotate 10s infinite linear",
            },
            keyframes: {
                rotate: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
            colors: {
                "primary": "#ae00fe",
                "secondary": "#652bb7",
                "custom-gray": "#949494",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
