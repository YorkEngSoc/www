import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dodger-blue": {
          50: "#EFF8FF",
          100: "#DFF0FF",
          200: "#B8E3FF",
          300: "#78CDFF",
          400: "#38B6FF",
          500: "#069AF1",
          600: "#007ACE",
          700: "#0061A7",
          800: "#02528A",
          900: "#084572",
          950: "#062B4B",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        ease: "ease",
      },
      screens: {
        "3xl": "2560px",
        "h-xl-low": { raw: "(max-height: 600px) and (min-width: 1280px)" },
        "h-xl": { raw: "(min-height: 600px) and (max-height: 750px) and (min-width: 1280px)" },
      },
    },
  },
  plugins: [],
};
export default config;
