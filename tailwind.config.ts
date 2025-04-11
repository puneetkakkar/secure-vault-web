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
              foreground: "#000000",
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
            default: {
              "50": "#0d0d0e",
              "100": "#19191c",
              "200": "#26262a",
              "300": "#323238",
              "400": "#3f3f46",
              "500": "#65656b",
              "600": "#8c8c90",
              "700": "#b2b2b5",
              "800": "#d9d9da",
              "900": "#ffffff",
              foreground: "#fff",
              DEFAULT: "#3f3f46",
            },
            primary: {
              "50": "#4d4d4d",
              "100": "#797979",
              "200": "#a6a6a6",
              "300": "#d2d2d2",
              "400": "#ffffff",
              "500": "#ffffff",
              "600": "#ffffff",
              "700": "#ffffff",
              "800": "#ffffff",
              "900": "#ffffff",
              foreground: "#000",
              DEFAULT: "#ffffff",
            },
            secondary: {
              "50": "#1c0747",
              "100": "#2d0b70",
              "200": "#3d0f99",
              "300": "#4e13c2",
              "400": "#5e17eb",
              "500": "#7a40ef",
              "600": "#9668f2",
              "700": "#b391f6",
              "800": "#cfb9f9",
              "900": "#ebe2fd",
              foreground: "#fff",
              DEFAULT: "#5e17eb",
            },
            success: {
              "50": "#073c1e",
              "100": "#0b5f30",
              "200": "#0f8341",
              "300": "#13a653",
              "400": "#17c964",
              "500": "#40d27f",
              "600": "#68dc9a",
              "700": "#91e5b5",
              "800": "#b9efd1",
              "900": "#e2f8ec",
              foreground: "#000",
              DEFAULT: "#17c964",
            },
            warning: {
              "50": "#4a320b",
              "100": "#744e11",
              "200": "#9f6b17",
              "300": "#ca881e",
              "400": "#f5a524",
              "500": "#f7b54a",
              "600": "#f9c571",
              "700": "#fad497",
              "800": "#fce4bd",
              "900": "#fef4e4",
              foreground: "#000",
              DEFAULT: "#f5a524",
            },
            danger: {
              "50": "#49051d",
              "100": "#73092e",
              "200": "#9e0c3e",
              "300": "#c80f4f",
              "400": "#f31260",
              "500": "#f53b7c",
              "600": "#f76598",
              "700": "#f98eb3",
              "800": "#fbb8cf",
              "900": "#fee1eb",
              foreground: "#000",
              DEFAULT: "#f31260",
            },
            background: "#000000",
            foreground: "#ffffff",
            content1: {
              DEFAULT: "#18181b",
              foreground: "#fff",
            },
            content2: {
              DEFAULT: "#27272a",
              foreground: "#fff",
            },
            content3: {
              DEFAULT: "#3f3f46",
              foreground: "#fff",
            },
            content4: {
              DEFAULT: "#52525b",
              foreground: "#fff",
            },
            focus: "#006FEE",
            overlay: "#ffffff",
          },
        },
      },
    }),
  ],
};
export default config;

// {
//   "themes": {
//     "light": {
//       "colors": {
//         "default": {
//           "50": "#fafafa",
//           "100": "#f2f2f3",
//           "200": "#ebebec",
//           "300": "#e3e3e6",
//           "400": "#dcdcdf",
//           "500": "#d4d4d8",
//           "600": "#afafb2",
//           "700": "#8a8a8c",
//           "800": "#656567",
//           "900": "#404041",
//           "foreground": "#000",
//           "DEFAULT": "#d4d4d8"
//         },
//         "primary": {
//           "50": "#ffffff",
//           "100": "#ffffff",
//           "200": "#ffffff",
//           "300": "#ffffff",
//           "400": "#ffffff",
//           "500": "#ffffff",
//           "600": "#d2d2d2",
//           "700": "#a6a6a6",
//           "800": "#797979",
//           "900": "#4d4d4d",
//           "foreground": "#000",
//           "DEFAULT": "#ffffff"
//         },
//         "secondary": {
//           "50": "#ebe2fd",
//           "100": "#cfb9f9",
//           "200": "#b391f6",
//           "300": "#9668f2",
//           "400": "#7a40ef",
//           "500": "#5e17eb",
//           "600": "#4e13c2",
//           "700": "#3d0f99",
//           "800": "#2d0b70",
//           "900": "#1c0747",
//           "foreground": "#fff",
//           "DEFAULT": "#5e17eb"
//         },
//         "success": {
//           "50": "#e2f8ec",
//           "100": "#b9efd1",
//           "200": "#91e5b5",
//           "300": "#68dc9a",
//           "400": "#40d27f",
//           "500": "#17c964",
//           "600": "#13a653",
//           "700": "#0f8341",
//           "800": "#0b5f30",
//           "900": "#073c1e",
//           "foreground": "#000",
//           "DEFAULT": "#17c964"
//         },
//         "warning": {
//           "50": "#fef4e4",
//           "100": "#fce4bd",
//           "200": "#fad497",
//           "300": "#f9c571",
//           "400": "#f7b54a",
//           "500": "#f5a524",
//           "600": "#ca881e",
//           "700": "#9f6b17",
//           "800": "#744e11",
//           "900": "#4a320b",
//           "foreground": "#000",
//           "DEFAULT": "#f5a524"
//         },
//         "danger": {
//           "50": "#fee1eb",
//           "100": "#fbb8cf",
//           "200": "#f98eb3",
//           "300": "#f76598",
//           "400": "#f53b7c",
//           "500": "#f31260",
//           "600": "#c80f4f",
//           "700": "#9e0c3e",
//           "800": "#73092e",
//           "900": "#49051d",
//           "foreground": "#000",
//           "DEFAULT": "#f31260"
//         },
//         "background": "#ffffff",
//         "foreground": "#000000",
//         "content1": {
//           "DEFAULT": "#ffffff",
//           "foreground": "#000"
//         },
//         "content2": {
//           "DEFAULT": "#f4f4f5",
//           "foreground": "#000"
//         },
//         "content3": {
//           "DEFAULT": "#e4e4e7",
//           "foreground": "#000"
//         },
//         "content4": {
//           "DEFAULT": "#d4d4d8",
//           "foreground": "#000"
//         },
//         "focus": "#006FEE",
//         "overlay": "#000000"
//       }
//     },
//     "dark": {
//       "colors": {
//         "default": {
//           "50": "#0d0d0e",
//           "100": "#19191c",
//           "200": "#26262a",
//           "300": "#323238",
//           "400": "#3f3f46",
//           "500": "#65656b",
//           "600": "#8c8c90",
//           "700": "#b2b2b5",
//           "800": "#d9d9da",
//           "900": "#ffffff",
//           "foreground": "#fff",
//           "DEFAULT": "#3f3f46"
//         },
//         "primary": {
//           "50": "#4d4d4d",
//           "100": "#797979",
//           "200": "#a6a6a6",
//           "300": "#d2d2d2",
//           "400": "#ffffff",
//           "500": "#ffffff",
//           "600": "#ffffff",
//           "700": "#ffffff",
//           "800": "#ffffff",
//           "900": "#ffffff",
//           "foreground": "#000",
//           "DEFAULT": "#ffffff"
//         },
//         "secondary": {
//           "50": "#1c0747",
//           "100": "#2d0b70",
//           "200": "#3d0f99",
//           "300": "#4e13c2",
//           "400": "#5e17eb",
//           "500": "#7a40ef",
//           "600": "#9668f2",
//           "700": "#b391f6",
//           "800": "#cfb9f9",
//           "900": "#ebe2fd",
//           "foreground": "#fff",
//           "DEFAULT": "#5e17eb"
//         },
//         "success": {
//           "50": "#073c1e",
//           "100": "#0b5f30",
//           "200": "#0f8341",
//           "300": "#13a653",
//           "400": "#17c964",
//           "500": "#40d27f",
//           "600": "#68dc9a",
//           "700": "#91e5b5",
//           "800": "#b9efd1",
//           "900": "#e2f8ec",
//           "foreground": "#000",
//           "DEFAULT": "#17c964"
//         },
//         "warning": {
//           "50": "#4a320b",
//           "100": "#744e11",
//           "200": "#9f6b17",
//           "300": "#ca881e",
//           "400": "#f5a524",
//           "500": "#f7b54a",
//           "600": "#f9c571",
//           "700": "#fad497",
//           "800": "#fce4bd",
//           "900": "#fef4e4",
//           "foreground": "#000",
//           "DEFAULT": "#f5a524"
//         },
//         "danger": {
//           "50": "#49051d",
//           "100": "#73092e",
//           "200": "#9e0c3e",
//           "300": "#c80f4f",
//           "400": "#f31260",
//           "500": "#f53b7c",
//           "600": "#f76598",
//           "700": "#f98eb3",
//           "800": "#fbb8cf",
//           "900": "#fee1eb",
//           "foreground": "#000",
//           "DEFAULT": "#f31260"
//         },
//         "background": "#000000",
//         "foreground": "#ffffff",
//         "content1": {
//           "DEFAULT": "#18181b",
//           "foreground": "#fff"
//         },
//         "content2": {
//           "DEFAULT": "#27272a",
//           "foreground": "#fff"
//         },
//         "content3": {
//           "DEFAULT": "#3f3f46",
//           "foreground": "#fff"
//         },
//         "content4": {
//           "DEFAULT": "#52525b",
//           "foreground": "#fff"
//         },
//         "focus": "#006FEE",
//         "overlay": "#ffffff"
//       }
//     }
//   },
//   "layout": {
//     "disabledOpacity": "0.5"
//   }
// }
