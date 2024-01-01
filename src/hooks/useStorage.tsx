import {
  CheckedLocalStorageType,
  CheckedSessionStorageType,
  checkedLocalStorage,
  checkedSessionStorage,
} from "@/utils/storage";
import { useState } from "react";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(key, defaultValue, checkedLocalStorage);
};

export const useSessionStorage = <T,>(key: string, defaultValue: T) => {
  return useStorage(key, defaultValue, checkedSessionStorage);
};

const useStorage = <T,>(
  key: string,
  defaultValue: T,
  storageObject: CheckedLocalStorageType | CheckedSessionStorageType
) => {
  const [value, _setValue] = useState(() => {
    return storageObject.getItem(key, defaultValue);
  });

  const setValue = (value: T) => {
    _setValue(value);
    storageObject.setItem(key, value);
  };

  const remove = () => {
    _setValue(undefined);
    storageObject.removeItem(key);
  };

  return [value, setValue, remove];
};
