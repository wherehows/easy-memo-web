import { NextIntlClientProvider } from "next-intl";
import userEvent from "@testing-library/user-event";
import MainPage from "./page";
import { act, render } from "@testing-library/react";
import messages from "../../../messages/ko.json";

jest.mock("next/navigation", () => ({
  usePathname: () => "/ko",
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({ locale: "ko" }),
  useSelectedLayoutSegment: () => ({ locale: "ko" }),
}));

it("should show empty text and button disabled when there is no memo", async () => {
  const screen = render(
    <NextIntlClientProvider locale="ko" messages={messages}>
      <MainPage />
    </NextIntlClientProvider>
  );

  const button = await screen.findByRole("button", { name: "편집" });
  const emptyText = await screen.findByText(messages.except.empty);
  expect(button).toBeDisabled();
  expect(emptyText).toBeInTheDocument();
});
