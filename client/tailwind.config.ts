import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      tablet: "768px",
      desktop: "1440px",
    },
  },
  plugins: [],
} satisfies Config;
