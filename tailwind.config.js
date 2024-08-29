/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#344054",
        secondary: "#D0D5DD",
        placeholder: "#667085",
        check: "#9f1239",
        focus: "#D6BBFB",
      },
      boxShadow: {
        focus: "0px 0px 0px 4px rgba(158, 119, 237, 0.3)",
      },
    },
  },
  plugins: [],
};
