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
