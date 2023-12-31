import React from "react";
import type { Preview } from "@storybook/react";
import { appleGothic } from "../src/app/layout";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        "div",
        { className: `${appleGothic.className} h-[100%]` },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
