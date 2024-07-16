import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

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

// Generate spacing scale (100 = 8px)
const spacingScale: { [key: number]: string } = {};
for (const value of [100, 150, 200, 300, 400, 500, 1600])
  spacingScale[value] = `${value / 12.5}px`;

export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      canvas: palette.green[200],
    },
    extend: {},
    fontFamily: {
      sans: ["Karla", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      heading: [
        "32px",
        {
          lineHeight: "100%",
          letterSpacing: "-1px",
          fontWeight: "700",
        },
      ],
      "base-bold": [
        "18px",
        {
          lineHeight: "150%",
          letterSpacing: "0",
          fontWeight: "700",
        },
      ],
      base: [
        "18px",
        {
          lineHeight: "150%",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      sm: [
        "16px",
        {
          lineHeight: "150%",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
    },
    screens: {
      tablet: "768px",
      desktop: "1440px",
    },
    spacing: spacingScale,
  },
  plugins: [],
} satisfies Config;
