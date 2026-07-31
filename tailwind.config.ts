import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070712",
        aurora: "#8b5cf6",
        pulse: "#22d3ee",
        ember: "#fb7185"
      },
      boxShadow: {
        glow: "0 0 60px rgba(139, 92, 246, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
