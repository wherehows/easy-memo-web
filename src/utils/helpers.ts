import { RefObject } from "react";

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

  if (seconds < 60) return "방금 전";
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  if (days < 3) return `${Math.floor(days)}일 전`;

  const year = createdAt.getFullYear();
  const month = (createdAt.getMonth() + 1).toString().padStart(2, "0");
  const day = createdAt.getDate().toString().padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};
