const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "green-custom": "#41ff52",
        "gray-dark-custom": "#2B343B",
        "gray-light-custom": "#3F474D",
        "orange-custom": "rgb(245, 194, 118)",
        "red-custom": "rgb(211, 109, 109)",
        "white-custom": "#F2F5F3",
      },
      boxShadow: {
        main: "0 4px 100px -15px rgba(0, 0, 0, 0.5)",
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
