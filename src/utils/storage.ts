export const isStorageAvailable = (type: "localStorage" | "sessionStorage") => {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    // ref: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
  }
};

class TempMemory<T> {
  private cache: { [key: string]: T | undefined } = {};

  constructor() {
    this.cache = {};
  }
  setItem(key: string, value: T) {
    this.cache[key] = value;
  }
  getItem(key: string, defaultValue: T) {
    return this.cache[key] || defaultValue;
  }
  removeItem(key: string) {
    this.cache[key] = undefined;
  }
}

export type TempMemoryType<T> = TempMemory<T>;

export const checkedLocalStorage = {
  getItem: <T>(key: string, defaultValue: T) => {
    const jsonValue = localStorage.getItem(key);

    try {
      if (jsonValue) return JSON.parse(jsonValue);
    } catch (error: any) {
      alert(`저장 공간에 문제가 있어요. ${error.message}`);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    return defaultValue;
  },
  setItem: <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
} as const;

export const checkedSessionStorage = {
  getItem: <T>(key: string, defaultValue: T) => {
    const jsonValue = sessionStorage.getItem(key);

    try {
      if (jsonValue) return JSON.parse(jsonValue);
    } catch (error: any) {
      alert(`저장 공간에 문제가 있어요. ${error.message}`);
      sessionStorage.setItem(key, JSON.stringify(defaultValue));
    }

    return defaultValue;
  },
  setItem: <T>(key: string, value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
} as const;

export type CheckedLocalStorageType = typeof checkedLocalStorage;

export type CheckedSessionStorageType = typeof checkedSessionStorage;
