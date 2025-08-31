import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 500: "#6C63FF" }
      }
    }
  },
  plugins: []
} satisfies Config;
