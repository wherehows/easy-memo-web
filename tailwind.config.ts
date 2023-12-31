import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mbx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
