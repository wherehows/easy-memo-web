import { TempMemoryType } from "@/utils/storage";
import { useState } from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(key, defaultValue, localStorage);
};

export const useSessionStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(key, defaultValue, localStorage);
};

const useStorage = <T,>(
  key: string,
  defaultValue: T,
  storageObject: Storage | TempMemoryType
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
