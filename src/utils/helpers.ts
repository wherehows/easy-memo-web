import dayjs from "dayjs";
import { RefObject } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import "dayjs/locale/zh-cn";
import "dayjs/locale/ja";
import "dayjs/locale/en";

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

export const formatTimeDifference = (createdAt: Date) => {
  const now: Date = new Date();
  const milliSeconds = now.getTime() - createdAt.getTime();

  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60 || minutes < 60 || hours < 24 || days < 3) {
    const locale = "";
    dayjs.extend(relativeTime);
    return dayjs().locale("zh-cn").to(dayjs(createdAt));
  }

  return dayjs().locale("zh-cn").format("YYYY-MM-DD");
};
