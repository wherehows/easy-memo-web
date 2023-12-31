import { useState } from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(
    key,
    defaultValue,
    supports_html5_storage() ? window.localStorage : new TempMemory()
  );
};

export const useSessionStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(
    key,
    defaultValue,
    supports_html5_storage() ? window.sessionStorage : new TempMemory()
  );
};

const useStorage = <T,>(
  key: string,
  defaultValue: T,
  storageObject: Storage | TempMemory
) => {
  const [value, _setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);

    try {
      if (jsonValue != null) return JSON.parse(jsonValue);
    } catch (e) {
      console.error("storage 에러 발생,", e);
    }

    return defaultValue;
  });

  const setValue = (value: T) => {
    _setValue(value);
    storageObject.setItem(key, JSON.stringify(value));
  };

  const remove = () => {
    _setValue(undefined);
    storageObject.removeItem(key);
  };

  return [value, setValue, remove];
};

const supports_html5_storage = () => {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
};

class TempMemory {
  private cache: { [key: string]: string | undefined } = {};

  constructor() {
    this.cache = {};
  }
  setItem(cacheKey: string, data: string) {
    this.cache[cacheKey] = data;
  }
  getItem(cacheKey: string) {
    return this.cache[cacheKey];
  }
  removeItem(cacheKey: string) {
    this.cache[cacheKey] = undefined;
  }
}
