/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  extend: {
    fontFamily: {
      heading: "var(--font-heading)",
      body: "var(--font-body)",
    },
    fontSize: {
      "display-40": ["47px", { lineHeight: "54px", fontWeight: "600" }],
      "display-64": ["64px", { lineHeight: "80px", fontWeight: "700" }],
    },
  },
},

  plugins: [],
};
