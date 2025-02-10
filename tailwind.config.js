/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5DC",
        background: "#E6E6FA",
        secondary: "#40B5AD",
        panel: "#FFFDD0",
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