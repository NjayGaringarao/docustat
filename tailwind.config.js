/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#102542",
        background: "#FBF5DD",
        secondary: "#F87060",
        panel: "#928DAB",
        uBlack: "#1f2937",
        uGray: "#4b5563",
        uGrayLight: "#36454F",
        success: "#10B981",
        failed: "#dc2626",
      },
    },
  },
  plugins: [],
};