import React from "react";
import type { Preview } from "@storybook/react";
import { appleGothic } from "../src/app/layout";

const preview: Preview = {
  parameters: {
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
