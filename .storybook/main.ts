import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@/utils": path.resolve(__dirname, "../src/utils"),
        "@/components": path.resolve(__dirname, "../src/components"),
        "@/icons": path.resolve(__dirname, "../public/icons"),
        "@/hooks": path.resolve(__dirname, "../src/hooks"),
      };
    }

    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
