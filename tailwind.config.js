/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      size: {
        4.5: "1.125rem",
      },
      colors: {
        brand: "#d3ed17",
      },
    },
  },
  plugins: [],
}
