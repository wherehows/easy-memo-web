import { RefObject } from "react";
import { LOCALES } from "./navigation";
import dayjs from "./dayjsExt";

export const classNames = (...classes: (boolean | string)[]) =>
  classes.filter(Boolean).join(" ");

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getRefValue = <C>(ref: RefObject<C>) => ref.current as C;

export const formatTimeDifference = (
  createdAt: Date,
  locale: (typeof LOCALES)[number]
) => {
  const now: Date = new Date();
  const milliSeconds = now.getTime() - createdAt.getTime();

  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60 || minutes < 60 || hours < 24 || days < 3) {
    return dayjs().locale(locale).to(dayjs(createdAt));
  }

  return dayjs().locale(locale).format("YYYY-MM-DD");
};

export const postMessage = <T>(type: string, data: T) =>
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type,
      data,
    })
  );
