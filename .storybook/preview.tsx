import React from "react";
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import appleGothic from "../src/utils/font";
import { NextIntlClientProvider } from "next-intl";
import messages from "../messages/ko.json";

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
      return (
        <NextIntlClientProvider locale="ko" messages={messages}>
          <div className={`${appleGothic.className} h-[100%]`}>
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },
  ],
};

export default preview;
