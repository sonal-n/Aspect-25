const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/app/**/*.{ts,tsx,js,jsx,mdx}", "./src/components/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-sakana)", "var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
