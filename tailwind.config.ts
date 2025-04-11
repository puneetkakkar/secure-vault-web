import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

// Define the purple color palette to use throughout the application
const purpleColors = {
  "50": "#FAF5FF",
  "100": "#F3E8FF",
  "200": "#E9D5FF",
  "300": "#D8B4FE",
  "400": "#C084FC",
  "500": "#A855F7",
  "600": "#9333EA",
  "700": "#7E22CE",
  "800": "#6B21A8",
  "900": "#581C87",
  DEFAULT: "#A855F7",
};

// Define dark theme specific colors
const darkPurpleColors = {
  "50": "#FAF5FF", // Lightest shade (almost white)
  "100": "#F3E8FF", // Very light
  "200": "#E9D5FF", // Light
  "300": "#D8B4FE", // Medium light
  "400": "#C084FC", // Medium
  "500": "#A855F7", // Medium dark
  "600": "#9333EA", // Dark
  "700": "#7E22CE", // Darker
  "800": "#6B21A8", // Very dark
  "900": "#581C87", // Darkest
  DEFAULT: "#C084FC", // Default is brighter in dark mode for better visibility
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: purpleColors,
      },
      darkMode: {
        colors: {
          purple: darkPurpleColors,
        },
      },
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
      },
      boxShadow: {
        "custom-light":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "custom-dark":
          "0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in-up": "slideInUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 7s ease-in-out infinite",
        "float-fast": "float 5s ease-in-out infinite",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      transitionDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      transitionDuration: {
        "50": "50ms",
        "75": "75ms",
      },
      transitionTimingFunction: {
        "quick-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
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
              "50": "#F8F5FF",
              "100": "#F0EBFE",
              "200": "#E1D2FD",
              "300": "#C9ADFC",
              "400": "#A87FF9",
              "500": "#8C57F5",
              "600": "#7135F1",
              "700": "#5E17EB",
              "800": "#4A0CD4",
              "900": "#3908A9",
              DEFAULT: "#5E17EB",
              foreground: "#FFFFFF",
            },
            primary: {
              "50": "#F8F5FF",
              "100": "#F0EBFE",
              "200": "#E1D2FD",
              "300": "#C9ADFC",
              "400": "#A87FF9",
              "500": "#8C57F5",
              "600": "#7135F1",
              "700": "#5E17EB",
              "800": "#4A0CD4",
              "900": "#3908A9",
              DEFAULT: "#5E17EB",
              foreground: "#FFFFFF",
            },
            secondary: {
              "50": "#F9FAFB",
              "100": "#F3F4F6",
              "200": "#E5E7EB",
              "300": "#D1D5DB",
              "400": "#9CA3AF",
              "500": "#6B7280",
              "600": "#4B5563",
              "700": "#374151",
              "800": "#1F2937",
              "900": "#111827",
              DEFAULT: "#6B7280",
              foreground: "#FFFFFF",
            },
            focus: "#BEF264",
          },
        },
        dark: {
          colors: {
            background: "#0E001F",
            foreground: "#FFFFFF",
            default: {
              "50": "#FFFFFF",
              "100": "#F8F5FF",
              "200": "#F0EBFE",
              "300": "#E1D2FD",
              "400": "#C9ADFC",
              "500": "#A87FF9",
              "600": "#8C57F5",
              "700": "#7135F1",
              "800": "#5E17EB",
              "900": "#4A0CD4",
              DEFAULT: "#FFFFFF",
              foreground: "#5E17EB",
            },
            primary: {
              // "100": "#301050",
              "50": "#FFFFFF",
              "100": "#F8F5FF",
              "200": "#F0EBFE",
              "300": "#E1D2FD",
              "400": "#C9ADFC",
              "500": "#A87FF9",
              "600": "#8C57F5",
              "700": "#7135F1",
              "800": "#5E17EB",
              "900": "#4A0CD4",
              DEFAULT: "#FFFFFF",
              foreground: "#5E17EB",
            },
            secondary: {
              // DEFAULT: "#9CA3AF",
              // foreground: "#111827",
              "50": "#FFFFFF",
              "100": "#F9FAFB",
              "200": "#F3F4F6",
              "300": "#E5E7EB",
              "400": "#D1D5DB",
              "500": "#9CA3AF",
              "600": "#6B7280",
              "700": "#4B5563",
              "800": "#374151",
              "900": "#1F2937",
              DEFAULT: "#FFFFFF",
              foreground: "#374151",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
};
export default config;
