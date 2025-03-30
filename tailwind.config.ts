import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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
    heroui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#374151",
            default: {
              DEFAULT: "#5E17EB",
              foreground: "#FFFFFF",
            },
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
              "100": "#301050",
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
