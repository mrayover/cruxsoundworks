module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9b2915",
        neutral: "#fefcf9",
        dark: "#2f2f2f"
      },
      fontFamily: {
        serif: ["Georgia", "serif"]
      }
    },
  },
  plugins: [],
}