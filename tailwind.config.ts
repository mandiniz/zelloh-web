// tailwind.config.ts
const config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        primary: "#CCFF00", // Amarillo neón Zelloh
        secondary: "#8A2BE2", // Morado eléctrico
        card: "#0A0A0A",
        border: "#1A1A1A",
      },
      borderRadius: {
        'zelloh': '2rem',
      }
    },
  },
  plugins: [],
};
export default config;