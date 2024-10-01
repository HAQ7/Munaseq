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
        width1: "width 0.7s infinite alternate linear",
        width2: "width 0.7s 0.1s infinite alternate linear",
        width3: "width 0.7s 0.2s infinite alternate linear",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        width: {
          from: { width: "0px" },
          to: { width: "54px" },
        },
      },
      colors: {
        primary: "#ae00fe",
        secondary: "#652bb7",
        "custom-gray": "#949494",
        "custom-black": "#333333",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(90deg, #ae00fe 0%, #652bb7 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
