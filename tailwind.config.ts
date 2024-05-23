import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#374151",
            primary: {
              DEFAULT: "#5E17EB",
              foreground: "#FFFFFF",
            },
            focus: "#BEF264",
          },
        },
        dark: {
          colors: {
            background: "#0E001F",
            foreground: "#FFFFFF",
            primary: {
              DEFAULT: "#FFFFFF",
              foreground: "#5E17EB",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
};
export default config;
