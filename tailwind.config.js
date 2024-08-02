const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        move: "move 5s linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      boxShadow: {
        custom: `2px 2px 0`,
        "custom-hover": `1px 1px 0`,
      },
      fontFamily: {
        sans: ["CabinetGrotesk", "Satoshi"],
      },
      gridTemplateRows: {
        "auto-250": "repeat(auto-fill, 250px)",
      },
      gridTemplateColumns: {
        "4-minmax": "repeat(4, minmax(150px, 1fr))",
      },
      colors: {
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        darkslate: {
          50: "#3D3D3D",
          100: "#2C2C2C",
          200: "#262626",
          300: "#202020",
          400: "#1A1A1A",
          500: "#171717",
          600: "#141414",
          700: "#111111",
          800: "#0E0E0E",
          900: "#0B0B0B",
        },
        primary: {
          100: "#F9CDD3",
          200: "#F3A3AA",
          300: "#EC7981",
          400: "#E64F59",
          500: "#E63946",
          600: "#CF2F3D",
          700: "#B82534",
          800: "#A01B2B",
          900: "#891321",
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
