/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FB9C39",
        background: "#F1F4F8",
        secondary: "#00007Bff",
        panel: "#d7eaff",
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