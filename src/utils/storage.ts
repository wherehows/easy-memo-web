export const supports_html5_storage = () => {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
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
