import type { Config } from "tailwindcss";

const palette = {
  gray: {
    500: "#86A2A5",
    900: "#2A4144",
  },
  green: {
    200: "#E0F1E8",
    600: "#0C7D69",
  },
  red: "#D73C3C",
  white: "#FFF",
};

export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      canvas: palette.green[200],
    },
    extend: {},
    screens: {
      tablet: "768px",
      desktop: "1440px",
    },
  },
  plugins: [],
} satisfies Config;
