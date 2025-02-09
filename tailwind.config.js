/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5DC",
        background: "#E6E6FA",
        secondary: "#66CDAA",
        panel: "#FFFDD0",
        uBlack: "#1f2937",
        uGray: "#4b5563",
        uGrayLight: "#9ca3af",
        success: "#10B981",
        failed: "#dc2626",
      },
    },
  },
  plugins: [],
};